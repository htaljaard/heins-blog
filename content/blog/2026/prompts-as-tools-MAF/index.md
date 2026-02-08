---
title: "Prompts as Agent Tools - Microsoft Agent Framework"
date: "2026-02-08"
slug: "maf-prompts-as-tools"
video: ""
hero_image: ""
hero_image_alt: ""
hero_image_credit_text: ""
hero_image_credit_link: ""
related_posts: []
series: "Microsoft Agent Framework"
stack: [".NET", "C#"]
next: ""
previous: ""
---

# Bringing Semantic Kernel's Prompt-as-Tool Pattern to Microsoft.Extensions.AI

One of my favorite features in Semantic Kernel was the ability to turn prompts into tools. This powerful pattern allows AI agents to leverage specialized prompts as reusable capabilities, enabling more modular and maintainable agent architectures. When working with Microsoft.Extensions.AI (MAF), I discovered this functionality wasn't available out of the box. So, I fiddled a bit and found a way to do it... I'm excited to share how you can do the same.

## Why Prompt-as-Tool Matters

At my current employer, ASI Solutions, we built this functionality into our Agent Platform (Anabelle) and you will also see it available in Copilot Studio. This gives end users / citizen devs the ability to standardise specific prompts. A practical use cases of this might be:

- A lesson plan generator with specific formatting rules allowing a school to have consitency in AI-Assisted Lesson plans. 
- A policy writer function that allows an organisation to have consitency in the structure of documents produced by AI. 
- A summarization tool with domain-specific requirements.


Instead of hard-coding these capabilities into your main agent's instructions, the prompt-as-tool pattern lets you:
1. **Encapsulate specialized prompts** as discrete, callable tools
2. **Let the agent decide** when to use them based on the conversation
3. **Reuse prompts** across multiple agents
4. **Maintain cleaner agent instructions** by separating concerns

## The Architecture

Our implementation consists of two main components:
1. **PromptToolConfiguration**: A record that defines the tool's metadata and template
2. **PromptTool**: An `AIFunction` implementation that executes the prompt template

Let's build this step by step.

## Step 1: Define the Configuration Record

First, we need a way to configure our prompt tools. We'll use a C# record to hold all the necessary information:

```csharp
/// <summary>
/// Configuration for a prompt tool
/// </summary>
/// <param name="Name">The name of the tool</param>
/// <param name="Description">Description of what the tool does</param>
/// <param name="PromptTemplate">The prompt template with placeholders like {{paramName}}</param>
/// <param name="Parameters">Dictionary of parameter names and their descriptions</param>
internal record PromptToolConfiguration(
    string Name,
    string Description,
    string PromptTemplate,
    IReadOnlyDictionary<string, string> Parameters
);
```

**What's happening here:**
- **Name**: The identifier the AI agent will see when choosing tools
- **Description**: Critical for helping the agent understand when to use this tool
- **PromptTemplate**: Your prompt with `{{placeholder}}` syntax for parameters
- **Parameters**: Describes each parameter so the agent knows what to provide

The record pattern gives us immutability and clean initialization syntax.

## Step 2: Implement the AIFunction

Next, we create a class that inherits from `AIFunction`, which is the base type for all tools in Microsoft.Extensions.AI:

```csharp
internal class PromptTool : AIFunction
{
    private readonly PromptToolConfiguration _config;

    public PromptTool(PromptToolConfiguration config)
    {
        _config = config ?? throw new ArgumentNullException(nameof(config));
    }

    public override string Name => _config.Name;
    public override string Description => _config.Description;
    
    // ... JsonSchema and InvokeCoreAsync to follow
}
```

**Key points:**
- We store the configuration as an immutable field
- Override `Name` and `Description` to expose our configuration to the agent
- The constructor validates that configuration is provided

## Step 3: Generate the JSON Schema

The agent needs to understand what parameters your tool expects. We do this by generating a JSON schema dynamically:

```csharp
public override JsonElement JsonSchema
{
    get
    {
        // Build JSON schema for the function parameters
        var properties = new JsonObject();
        var required = new JsonArray();

        foreach (var param in _config.Parameters)
        {
            properties[param.Key] = new JsonObject
            {
                ["type"] = "string",
                ["description"] = param.Value
            };
            required.Add(JsonValue.Create(param.Key));
        }

        var schema = new JsonObject
        {
            ["type"] = "object",
            ["properties"] = properties,
            ["required"] = required
        };

        return JsonSerializer.SerializeToElement(schema);
    }
}
```

**What's happening here:**
- We iterate through each parameter in our configuration
- Create a JSON property definition for each one (currently all strings)
- Mark all parameters as required
- Return a properly formatted JSON schema that the agent can understand

This schema is crucial—it's how the agent knows what arguments to provide when calling your tool.

## Step 4: Execute the Template

Finally, we implement the core logic that processes the prompt template:

```csharp
protected override ValueTask<object?> InvokeCoreAsync(
    AIFunctionArguments arguments, 
    CancellationToken cancellationToken)
{
    // Build the prompt by replacing placeholders with argument values
    string prompt = _config.PromptTemplate;
    
    foreach (var param in _config.Parameters.Keys)
    {
        if (arguments.TryGetValue(param, out var value))
        {
            // Replace {{paramName}} with the actual value
            prompt = prompt.Replace($"{{{{{param}}}}}", value?.ToString() ?? string.Empty);
        }
    }

    // Return the formatted prompt - the agent will process it
    return ValueTask.FromResult<object?>(prompt);
}
```

**Key implementation details:**
- We start with the original template string
- Iterate through each expected parameter
- Replace `{{paramName}}` placeholders with actual values from the arguments
- Return the fully formatted prompt

The agent's runtime will take this returned prompt and process it through the LLM, effectively creating a specialized sub-prompt execution.

## Step 5: Using Your Prompt Tool

Now comes the fun part—actually using it! Here's how to create and register a prompt tool:

```csharp
// Create a prompt tool configuration
var lessonPlanConfig = new PromptToolConfiguration(
    Name: "Lesson_Plan",
    Description: "Writes a lesson plan about a topic",
    PromptTemplate: """
        Write a lesson plan that follows a socratic style. 
        
        The topic is about {{topic}}.
        
        You must sound like a Aussie Yoda. Use lots of slang and colloquialisms.
        """,
    Parameters: new Dictionary<string, string>
    {
        { "topic", "The topic of the lesson plan" }
    }
);

// Instantiate the tool
var lessonPlanTool = new PromptTool(lessonPlanConfig);

// Register it with your agent
var agent = client.AsIChatClient().AsAIAgent(
    instructions: instructions, 
    tools: [lessonPlanTool, kbTool, CurrentDateTool]
);
```

**Usage flow:**
1. Define your configuration with a descriptive name and clear description
2. Write your prompt template with `{{parameter}}` placeholders
3. Specify each parameter with a helpful description
4. Create the `PromptTool` instance
5. Add it to your agent's tools array

## Real-World Example

In the complete implementation, the agent can now seamlessly invoke the lesson plan tool:

```csharp
var agentThread = await agent.GetNewThreadAsync();

while (true)
{
    Console.Write("You: ");
    string userInput = Console.ReadLine() ?? string.Empty;
    
    if (string.IsNullOrWhiteSpace(userInput))
        break;
    
    Console.Write("Agent: ");
    await foreach (var message in agent.RunStreamingAsync(userInput, thread: agentThread))
    {
        Console.Write(message);
    }
    Console.WriteLine();
}
```

When a user asks: **"Write me a lesson plan about fishing"**

The agent will:
1. Recognize this matches the `Lesson_Plan` tool's description
2. Extract "fishing" as the topic parameter
3. Call the tool with `{"topic": "fishing"}`
4. Receive the formatted prompt
5. Process it and return a Yoda-styled, Socratic lesson plan about fishing

## Benefits of This Approach

**Separation of Concerns**: Your main agent instructions stay clean and focused. Specialized behaviors live in their own tool definitions.

**Reusability**: Define a prompt tool once, use it across multiple agents.

**Flexibility**: Change the prompt template without touching agent code. Swap out implementations easily.

**Discoverability**: Tools with good descriptions help the agent choose the right capability at the right time.

**Type Safety**: Strongly typed configuration reduces runtime errors.

## Possible Enhancements

While this implementation works great, here are some ideas for extending it:

1. **Parameter Types**: Currently all parameters are strings. You could extend the schema generation to support numbers, booleans, arrays, and objects.

2. **Optional Parameters**: Add support for parameters that aren't required, with default values.

3. **Nested Templates**: Allow prompt tools to call other prompt tools for compositional behaviors.

4. **Caching**: Cache frequently used prompt generations to improve performance.

5. **Validation**: Add parameter validation before template substitution.

6. **Streaming Support**: Return streaming responses for long-form content generation.

## Conclusion

The prompt-as-tool pattern is a powerful way to build modular, maintainable AI agent systems. While Semantic Kernel provided this capability natively, implementing it in Microsoft.Extensions.AI proved straightforward thanks to the framework's clean extensibility model.

By inheriting from `AIFunction` and implementing a few key methods, we've created a flexible system for turning any prompt template into a callable tool. This pattern opens up possibilities for building sophisticated multi-agent systems where specialized capabilities can be composed and reused.

The complete code is simple enough to include directly in your project, yet powerful enough to handle complex scenarios. Give it a try in your next MAF project—you might find it becomes one of your favorite patterns too!

---

## Complete Source Code

**PromptTool.cs**
```csharp
using Microsoft.Extensions.AI;
using Microsoft.Agents.AI;
using System;
using System.Collections.Generic;
using System.Text.Json;
using System.Text.Json.Nodes;

namespace MAFPromptTools
{
    /// <summary>
    /// Configuration for a prompt tool
    /// </summary>
    internal record PromptToolConfiguration(
        string Name,
        string Description,
        string PromptTemplate,
        IReadOnlyDictionary<string, string> Parameters
    );

    /// <summary>
    /// AI Function that executes a prompt template as a tool
    /// </summary>
    internal class PromptTool : AIFunction
    {
        private readonly PromptToolConfiguration _config;

        public PromptTool(PromptToolConfiguration config)
        {
            _config = config ?? throw new ArgumentNullException(nameof(config));
        }

        public override string Name => _config.Name;
        public override string Description => _config.Description;

        public override JsonElement JsonSchema
        {
            get
            {
                var properties = new JsonObject();
                var required = new JsonArray();

                foreach (var param in _config.Parameters)
                {
                    properties[param.Key] = new JsonObject
                    {
                        ["type"] = "string",
                        ["description"] = param.Value
                    };
                    required.Add(JsonValue.Create(param.Key));
                }

                var schema = new JsonObject
                {
                    ["type"] = "object",
                    ["properties"] = properties,
                    ["required"] = required
                };

                return JsonSerializer.SerializeToElement(schema);
            }
        }

        protected override ValueTask<object?> InvokeCoreAsync(
            AIFunctionArguments arguments, 
            CancellationToken cancellationToken)
        {
            string prompt = _config.PromptTemplate;
            
            foreach (var param in _config.Parameters.Keys)
            {
                if (arguments.TryGetValue(param, out var value))
                {
                    prompt = prompt.Replace($"{{{{{param}}}}}", value?.ToString() ?? string.Empty);
                }
            }

            return ValueTask.FromResult<object?>(prompt);
        }
    }
}
```

Happy coding! 🚀

---
title: "Announcing a unified Agent Framework"
date: "2025-10-2"
slug: "announcing-agent-framework"
video: ""
hero_image: ""
hero_image_alt: ""
hero_image_credit_text: ""
hero_image_credit_link: ""
related_posts: []
series: "AI Framework"
stack: [".NET", "C#", "Azure Open AI"]
next: ""
previous: ""
---

# Building Agentic AI Apps with Microsoft Agent Framework in .NET

Microsoft has just released the **Agent Framework**, an open-source engine designed to power agentic AI applications. If you've been working with Semantic Kernel, this new framework might feel familiar—but it’s built with a sharper focus on modularity, orchestration, and real-world agent behaviours.

Let’s explore why this matters, how to migrate from Semantic Kernel, and walk through a basic setup using .NET.

---

## Why Microsoft Built a New Agent Framework

The rise of agentic AI—systems that can reason, plan, and act autonomously—has pushed developers to rethink how we structure AI applications. Semantic Kernel laid the groundwork for prompt orchestration and tool integration, but developers needed:

- **More modularity**: A clean separation between agents, tools, memory, and orchestration.
- **Better lifecycle management**: Agents that can handle approvals, retries, and multi-step reasoning.
- **Open extensibility**: A framework that’s easy to extend and integrate with existing systems.

The Agent Framework delivers all of this, with a clear architecture and support for multiple platforms including .NET and Python.

---

## Migrating from Semantic Kernel

If you’ve built apps with Semantic Kernel, migrating to Agent Framework is straightforward. There are a few namespaces and packages that need to be replaces, but its overall an easy process. [Here](https://github.com/microsoft/agent-framework/tree/main/dotnet/samples/SemanticKernelMigration) is the documentation that you need to follow to migrate. 

---

## Basic Setup in .NET: Using Function Tools with Approvals

Let’s walk through a basic example using the Agent Framework in .NET. This sample demonstrates how to use a function tool that requires approval before execution.

### Prerequisites

First thing you will need are a few nuget packages. Don't make the mistake I did and install ```Microsoft.Agents.AI```

```xml
    <PackageReference Include="Azure.AI.OpenAI" Version="2.1.0" />
    <PackageReference Include="Azure.Identity" Version="1.16.0" />
    <PackageReference Include="Microsoft.Agents.AI.OpenAI" Version="1.0.0-preview.251001.3" />

```

### Setup

You will need an Azure Open AI endpoint for this example. Once you have that, you will create a new Agent with base instructions.

```csharp

var endpoint = Environment.GetEnvironmentVariable("AZURE_OPENAI_ENDPOINT") ?? throw new InvalidOperationException("AZURE_OPENAI_ENDPOINT is not set.");
var deploymentName = Environment.GetEnvironmentVariable("AZURE_OPENAI_DEPLOYMENT_NAME") ?? "gpt-4o-mini";
var apiKey = Environment.GetEnvironmentVariable("AZURE_OPENAI_API_KEY");

const string AgentName = "Helper";
const string AgentInstructions = "You are a helpful assistant that can provide information about the weather.";

AIAgent agent = new AzureOpenAIClient(
    new Uri(endpoint),
    new AzureKeyCredential(apiKey!))
     .GetChatClient(deploymentName)
     .CreateAIAgent(AgentInstructions, AgentName);

var response = agent.RunAsync("Hello!");

```
Easy right? Let's stup it up.

### Multi Turn

Multi Turn uses an ```AgentThread``` to keep track of the conversation. You instantiate a thread and and then chat away...

```csharp

AgentThread thread = agent.GetNewThread();

while (true)
{
    Console.Write("You: ");
    var userInput = Console.ReadLine();



    if (string.IsNullOrEmpty(userInput) || userInput.Equals("exit", StringComparison.OrdinalIgnoreCase))
    {
        break;
    }

    var agentResponse = agent.RunAsync(userInput!, thread);

    Console.WriteLine($"Agent: {agentResponse}");
}


```

### Tools

Tools are added when you create the function. There are quite a few overloads to explore here. The one I am specifically looking to gigure out is the ability to add a prompt - like Semantic Kernel can. Don't have an example of that yet though... Microsoft even released a relatively easy way to do HITL (Human In The Loop)... NICE! The Function approval is still in evaluation, so you will get editor warnings.


First we define a function. The annotations help the agent decide when to use the tools. 
```csharp
[Description("Get the weather for a given location.")]
static string GetWeather([Description("The location to get the weather for.")] string location)
    => $"The weather in {location} is cloudy with a high of 15°C.";

```

Now we add the tools (with approval) to the agent.


```csharp
#pragma warning disable MEAI001 // Type is for evaluation purposes only and is subject to change or removal in future updates. Suppress this diagnostic to proceed.
AIAgent agent = new AzureOpenAIClient(
    new Uri(endpoint),
    new AzureKeyCredential(apiKey!))
     .GetChatClient(deploymentName)
     .CreateAIAgent(AgentInstructions, AgentName, tools: [new ApprovalRequiredAIFunction(AIFunctionFactory.Create(GetWeather))]);

```

In our Chat Loop, we now need to check for and respond to user approvals...

```csharp

while (true)
{
    Console.Write("You: ");
    var userInput = Console.ReadLine();

    if (string.IsNullOrEmpty(userInput) || userInput.Equals("exit", StringComparison.OrdinalIgnoreCase))
    {
        break;
    }

    var updates = await agent.RunStreamingAsync(userInput!, thread).ToListAsync();
    var userInputRequests = updates.SelectMany(x => x.UserInputRequests).ToList();

    while (userInputRequests.Count > 0)
    {
        var userInputResponses = userInputRequests.OfType<FunctionApprovalRequestContent>().Select(x =>
        {
            Console.WriteLine();
            Console.WriteLine($"The agent is requesting to call the function '{x.FunctionCall.Name}' with the following arguments:");
            return new ChatMessage(ChatRole.User, [x.CreateResponse(Console.ReadLine()?.Equals("Y", StringComparison.OrdinalIgnoreCase) ?? false)]);


        }).ToList();


        updates = await agent.RunStreamingAsync(userInputResponses, thread).ToListAsync();
        userInputRequests = updates.SelectMany(x => x.UserInputRequests).ToList();

    }

    Console.WriteLine($"\nAgent: {updates.ToAgentRunResponse()}");
    Console.WriteLine();
}

```



This setup shows how agents can interact with tools that require human-in-the-loop decisions, a key feature for enterprise-grade AI systems.

---

## Final Thoughts

The Microsoft Agent Framework is a powerful evolution of Semantic Kernel abd Autogen. Yes, it is yet another change we need to consider, but after spending a few hours with it, I think it is a good change. The big question is with the new Agent Framework and ```Microsoft.Extensions.AI``` where does that leave Semantic Kernel?

You can explore the full source code and samples on GitHub: https://github.com/microsoft/agent-framework

---

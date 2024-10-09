---
title: "Getting started with Semantic Kernel"
date: "2024-10-08"
slug: "getting-started-with-semantic-kernel"
hero_image: "./image.png"
hero_image_alt: ""
hero_image_credit_text: ""
hero_image_credit_link: ""
related_posts: []
series: "Semantic Kernel"
stack: [".NET", "C#"]
---

The world of Generative AI Solutions is vast and complex. It can be difficult to know where to start. In this blog post, we will walk you through the process of getting started with Semantic Kernel, 
a powerful tool that can help you generate high-quality content quickly and easily. When I started in the GenAI arena (shortly after the launch of Azure OpenAI), I quicly realised that the orchastration of the LLMs will be immensely important. This is where Semantic Kernel comes in.

Back then (and probably still now) LangChain was the dominant player. But, as I am at heart a .NET guy, I really didn't want to invest too much time in getting into it (my Python isn't great).

I poked around for a bit, explored PromptFlow, which, in its own right is really cool, but finally, when SK was released, I knew that this was the tool for me. In this artricle, I will take you through my thoughts on SK and how to get started with it.

## What is Semantic Kernel?
Semantic Kernel is a lightweight, open-source development kit that lets you easily build AI agents and integrate the latest AI models into your C#, Python, or Java codebase. It serves as an efficient middleware that enables rapid delivery of enterprise-grade solutions. 
That is the official blurb. It is accurate, but you can basically see it as a lightweight SDK that can help you quickly and easily integrate GenAI into your .NET projects - whether you are building a chatbot or extending an existing application with AI capabilities.

### Prerequisites
For this guide, you will need an Azure OpenAI or OpenAI subscription.

## Getting started

Getting started is really easy... as with most .NET projects, you start by getting the NuGet package. 

```bash
dotnet add package Microsoft.SemanticKernel --version 1.21.1
```

You will then proceed to use the very friendly builder pattern that the team provides. It is really easy to get started with.Though you can invoke prompts directly, 
its most likely that you will want to use it in the context of a chat - yes - even if you are not building a chatbot, the chat completion interface is your friend. 

The following snippet assumes that you have the model information. If you don't know how to get it, check out the [Microsoft Learn Documentation](https://learn.microsoft.com/en-us/azure/ai-services/openai/quickstart?tabs=command-line%2Ctypescript%2Cpython-new&pivots=programming-language-csharp).

```csharp
var builder = Kernel.CreateBuilder().AddAzureOpenAIChatCompletion(modelId, endpoint, apiKey);
var kernel = builder.Build();
```
That's if for the setup. Now you can start using the kernel to generate text. 
First, you will get a copy of the chat completion service and instantiate a chat history object. 

```csharp
var chatCompletionService = kernel.GetRequiredService<IChatCompletionService>();
var history = new ChatHistory();
```
Now, you can start chatting. 

```csharp
string? userInput;
do {
    // Collect user input
    Console.Write("User > ");
    userInput = Console.ReadLine();

    // Add user input
    history.AddUserMessage(userInput);

    // Get the response from the AI
    var result = await chatCompletionService.GetChatMessageContentAsync(
        history,
        executionSettings: openAIPromptExecutionSettings,
        kernel: kernel);

    // Print the results
    Console.WriteLine("Assistant > " + result);

    // Add the message from the agent to the chat history
    history.AddMessage(result.Role, result.Content ?? string.Empty);
} while (userInput is not null)
```

And that's it! You are now ready to using GenAI in your .NET projects. In the coming article, I will go into more detail about how to use the SK in a more complex scenario like RAG, structuring your responses, streaming and making your bot sing and dance... 

### A quick note on Dependency Injection
If you are using SK in a .NET project, don't be afraid of injecting it as a transient. It is really lightweight and you can use it in a similar way to how you would use any other service. Some of the use cases that I have had in the past actually requires you to 
register it as a transient to ensure that you do not leak data between chat contexts... but that is a story for another day.

## Want to learn more?

- [Microsoft Learn](https://learn.microsoft.com/en-us/semantic-kernel/overview/)
- [SK Github Repo](https://github.com/microsoft/semantic-kernel)
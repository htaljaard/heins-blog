---
title: "Unit Testing Metrics for Open Telemetry"
date: "2025-01-16"
slug: "unit-testing-metrics-for-otel"
video: ""
hero_image: ""
hero_image_alt: ""
hero_image_credit_text: ""
hero_image_credit_link: ""
related_posts: []
series: "Open Telemetry"
stack: [".NET", "C#"]
next: ""
previous: ""
---
# Introduction

Recently, I was working on a project and got to the point where we wanted to write some tests for the Open Telemetry Metric Collection. Don't judge me for this, but I realised at that 
point that I have never written any tests for metrics at all. After scratching around for a bit, I got the tests to work and I wanted to share my experience. This article is focused on Unit 
Testing.

## Tech
- From a testing perspective we are going to use xUnit and NSubstitute. 
- We are using Azure Monitor for Telemetry. 
- The architecture of the project is a Modular Monolith

## Project Setup
Here, we hook up our telemetry to our Service Collection

```csharp
public static class TelemetryModuleExtensions
{
    private const string ConnectionStringName = "APPLICATIONINSIGHTS_CONNECTION_STRING";

    public static IServiceCollection AddTelemetryModuleServices(
        this IServiceCollection services,
        List<Assembly> mediatorAssemblies,
        IConfiguration config,
        ILogger logger
    )
    {
        var azureMonitorConnectionString = config.GetConnectionString(ConnectionStringName);

        if (string.IsNullOrEmpty(azureMonitorConnectionString))
        {
            logger.Error("ApplicationInsights:ConnectionString is not set");
            throw new ArgumentNullException("ApplicationInsights:ConnectionString");
        }

        services.AddSingleton<MyMetrics>();

        services
            .AddOpenTelemetry()
            .WithMetrics(
                metrics =>
                    metrics
                        .AddMeter(MyMetric.MetricName)
                        .AddAspNetCoreInstrumentation()
                        .AddHttpClientInstrumentation()
            )
            .UseAzureMonitor(options => options.ConnectionString = azureMonitorConnectionString);

        mediatorAssemblies.Add(typeof(TelemetryModuleExtensions).Assembly);

        return services;
    }
}

```

Also, here is the detail of the metric. It is pretty simple. As you can see, we are writing a chat app (uzing Azure OpenAI) - yes - I have jumped on that bandwagon 😅.

```csharp


public class MyMetric
{
    private readonly Counter<int> _chatCounter;
    private readonly Histogram<double> _responseTime;
    private readonly Counter<int> _documentCounter;

    public const string MetricName = "MyMetric.Metrics";
    public const string VersionNumber = "1.0.0";

    public MyMetric(IMeterFactory meterFactory)
    {
        var _meter = meterFactory.Create(MetricName, VersionNumber);

        _chatCounter = _meter.CreateCounter<int>(
            name: "mymetric.messages.sent",
            unit: "1",
            description: "The number of chat messages sent by users"
        );

        _documentCounter = _meter.CreateCounter<int>(
            name: "mymetric.documents.uploaded",
            unit: "1",
            description: "The number of documents uploaded by users"
        );

        _responseTime = _meter.CreateHistogram<double>(
            name: "mymetric.response.time",
            unit: "ms",
            description: "The response time of the chat service in milliseconds"
        );
    }

    public void AddChatMessage(KeyValuePair<string, object?>[] tags)
    {
        _chatCounter.Add(1, tags);
    }

    public void AddDocumentUploaded(KeyValuePair<string, object?>[] tags)
    {
        _documentCounter.Add(1, tags);
    }

    public void RecordResponseTime(double time, KeyValuePair<string, object?>[] tags)
    {
        _responseTime.Record(time, tags);
    }
}

```



# Challenges
OK, lets look at the challenges first. 

## IMeterFactory and NSubstitute
NSustitute gave me some issues mocking the ```IMeterFactory```. The factory method to create the metric kept failing, so I couldn't mock it, I needed a way to instantiate 
a proper IMeterFactory. 

Problem Code:
```csharp
 var _meter = meterFactory.Create(MetricName, VersionNumber);
 ```

 Solution:
 We needed to instantiate a IMeterFactory as part of the service collection of the test, pretty simple (once you know). 
 ```csharp

public class MyMetricTests
{
   private readonly IServiceProvider _serviceProvider;

    public MyMetricTests()
    {
        var services = new ServiceCollection();
        services.AddMetrics();
        services.AddSingleton<MyMetrics>();
        _serviceProvider = services.BuildServiceProvider();
    }
}
 ```

 That helped me solve the first problem with the tests... here is the Arrange and Act part of the test if you want to follow allong.

 ```csharp
[Fact]
    public void AddChatMessage_Should_IncrementChatCounter()
    {
        // Arrange
        var factory = _serviceProvider.GetRequiredService<IMeterFactory>();
        var _sut = _serviceProvider.GetRequiredService<MyMetric>();

        var collector = new MetricCollector<int>(
            factory,
            MyMetric.MetricName,
            "mymetric.messages.sent"
        );

        var tags = new KeyValuePair<string, object?>[]
        {
            new KeyValuePair<string, object?>("Personality", "Test")
        };

        // Act
        _sut.AddChatMessage(tags);
   
    }

 ```

 Now, on to the second problem

 ## Verifying Metrics
 This is a unit test, so, we don't want infrastructure - how do we actually collect the metric as the metrics are private members of the class? Enter ```MetricCollector```. 
 I have added the full test to help with context.

```csharp
    [Fact]
    public void AddChatMessage_Should_IncrementChatCounter()
    {
        // Arrange
        var factory = _serviceProvider.GetRequiredService<IMeterFactory>();
        var _sut = _serviceProvider.GetRequiredService<MyMetric>();

        var collector = new MetricCollector<int>(
            factory,
            MyMetric.MetricName,
            "MyMetric.messages.sent"
        );

        var tags = new KeyValuePair<string, object?>[]
        {
            new KeyValuePair<string, object?>("Personality", "Test")
        };

        // Act
        _sut.AddChatMessage(tags);

        // Assert
        var measurements = collector.GetMeasurementSnapshot();
        measurements.Should().HaveCount(1);
        measurements[0].Value.Should().Be(1);
    }
```

# Summary
To test metrics, you need to instantiate a service collection for your tests and you need to use ```MeterCollector``` to collect the metrics. Its actually quite simple - 
but it always is once you have the solution. 

# Useful articles

[Metrics Instrumentation - Microsoft Learn](https://learn.microsoft.com/en-us/dotnet/core/diagnostics/metrics-instrumentation)







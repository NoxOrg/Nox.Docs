---
title: Nox Messenging
category: Nox.Lib
description: Docs intro
layout: ../../layouts/MainLayout.astro
---
***

Our system will require the ability to create and publish various system events as well as the ability 'consume' or listen out and react to those events.

> 💡 Nox uses the [MassTransit](https://masstransit.io/) library which provides an open-source distributed messaging framework with support for [Azure Service Bus](https://azure.microsoft.com/en-gb/products/service-bus/), [RabbitMQ](https://www.rabbitmq.com/), [Amazon SQS](https://aws.amazon.com/sqs/), [ActiveMQ](https://activemq.apache.org/), [Kafka](https://kafka.apache.org/) as well as a beta implementation of [gRPC](https://grpc.io/).

### Adding message support in Nox

 By now you can probably guess that adding message support within our Nox solution is as simple as updating our solution design files. The good news is that you would be correct. We'll start by specifying our messenger(s) of choice in our solution definition file.

You may have noticed in our quick-start project that we specified a messaging provider as per the code block below:

```yaml
messagingProviders:
  - name: InProcess
    provider: mediator
```
Again, this isn't a requirement since Nox will use this as its default under-the-hood messenger by default, but we included it for the sake of clarity.

> 💡 MassTransit includes an implementation of the [Mediator pattern](https://en.wikipedia.org/wiki/Mediator_pattern) which runs in-process and in-memory with no transport required.

We'll choose RabbitMQ for our sample project, so let's start by updating our ```./Design/SampleCurrency.solution.nox.yaml``` file and substitute Mediator with RabbitMQ:

```yaml
messagingProviders:
  - name: AppServiceBus
    provider: rabbitMQ
    connectionString: rabbitmq://guest:guest@localhost/
```

Our ```./Design/SampleCurrency.solution.nox.yaml``` file should look similar to the graphic below now:

<div align="center">
    <img src="https://noxorg.dev/docs/images/vscode_sample-messenger-define.png" alt="Overview" width="100%">
    <br>
</div>

### Add messenger to our entities
We're doing a little bit more than simply specifying a message provider here. Actually we're telling our entity to publish events on state change as well as which message transport to use. Later we can decide which events we'd like to subscribe or listen to.

> 💡 Our sample project data can currently be updated via the loader we configured earlier or via the API which was scaffolded out the box.

Let's add the following node to our ```./Design/Currency/Currency.entity.nox.yaml``` and ```./Design/Currency/Currency.loader.nox.yaml``` files:

```yaml
messaging:
  - messagingProvider: Mediator
  - messagingProvider: AppServiceBus
```

Our ```Currency``` design files should look similar to the graphic below now:

<div align="center">
    <img src="https://noxorg.dev/docs/images/vscode_sample-currency-messaging.png" alt="Overview" width="100%">
    <br>
</div>

### Add and start our messenger

Let's add the following section to our ```./docker-compose.yaml``` file:

```yaml
rabbitmq:
    container_name: rabbitmq_container
    image: masstransit/rabbitmq:latest
    ports:
      - "5672:5672"
      - "15672:15672"
```
<div align="center">
    <img src="https://noxorg.dev/docs/images/vscode_sample-docker-rabbitmq.png" alt="Overview" width="100%">
    <br>
</div>

Let's start our messenger by running our updated docker-compose file.

```powershell
docker-compose up -d
dotnet run
```

RabbitMQ should now be running in a Docker container, and clicking on the ports listed in Docker Desktop should start up the RabbitMQ console. Logging in with the default RabbitMQ credentials ```Username: guest``` and ```Password: guest``` and clicking on the 'Connections' tab should confirm that our SampleCurrencyService is connected.

<div align="center">
    <img src="https://noxorg.dev/docs/images/localhost_sample-rabbitmq-connections.png" alt="Overview" width="100%">
    <br>
</div>

Clicking on the 'Exchanges' tab will reveal that an exchange has been created for the ```Nox:CurrencyUpdatedDomainEvent``` event.

<div align="center">
    <img src="https://noxorg.dev/docs/images/localhost_sample-rabbitmq-exchanges.png" alt="Overview" width="100%">
    <br>
</div>

### Create a listener application

The last piece of the puzzle is to create a separate consumer or listener that will react to events that we specify. The consumer can be part of our project or it can be an external application. We'll go with the latter for our consumer.

Since the listener will be running as a background process we'll use .NET to scaffold a worker service which offers us a host along with dependency injection that will allow us to easily include the Nox library.

```powershell
dotnet new worker -o SampleListener
```

Next we'll add the Nox package to our application

```powershell
dotnet add package Nox.Lib
```
Edit your Program.cs file and add the highlighted 👇 code sections:
```csharp
using SampleListener;
// (1) 👇 Add the following use library statement
using Nox.Messaging;

IHost host = Host.CreateDefaultBuilder(args)
    .ConfigureServices(services =>
    {
        services.AddHostedService<Worker>();
        // (2) 👇 Add Nox listeners to services.
        services.AddNoxListeners();
    })
    .Build();

await host.RunAsync();
```

As with our SampleCurrency project, let's create a ```./Design``` folder for our design files and start by creating ```./Design/SampleListener.solution.nox.yaml``` with the code below:

```yaml
#
# SampleListener.solution.nox.yaml
#

name: SampleListener

description: Sample Listener project

database:
  name: SampleCurrencyDb
  provider: sqlServer
  options: Trusted_Connection=no;connection timeout=120;TrustServerCertificate=True
  server: localhost
  user: sa  
  password: Developer*123

messagingProviders:
  - name: AppServiceBus
    provider: rabbitMQ
    connectionString: rabbitmq://guest:guest@localhost/
```

Next we'll create the entity we'll be monitoring as well as the properties we're interested in. We'll create ```./Design/Currency/Currency.entity.nox.yaml``` as below:

```yaml
#
# Currency.entity.nox.yaml
#

name: Currency
description: Currency definition and related data

messaging:
  - messagingProvider: AppServiceBus

attributes:

  - name: Id
    description: The currency's unique identifier 
    isPrimaryKey: true
    type: int

  - name: Name
    description: The currency's name 
    isRequired: true
    type: string
    maxWidth: 128

  - name: ISO_Alpha3
    description: The currency's official ISO 4217 alpha-3 code
    isRequired: true
    isUnicode: false
    type: char
    minWidth: 3
    maxWidth: 3

  - name: Symbol
    description: The currency's well known symbol
    type: string
    maxWidth: 5
```

### Creating event consumers

Next we'll create a consumer class that reacts to a ```CurrencyUpdatedDomainEvent```. Start by creating a ```./Consumers``` folder in our project's root folder and add a new class called ```CurrencyUpatedConsumer.cs``` with the code below:

```csharp
using MassTransit;
using Nox;

namespace SampleListener.Consumers
{
    public class CurrencyUpdatedEventConsumer : IConsumer<CurrencyUpdatedDomainEvent>
    {
        public Task Consume(ConsumeContext<CurrencyUpdatedDomainEvent> context)
        {
            var eventSource = context.Message.EventSource.ToString();
            var payload = context.Message.Payload;

            if (payload is not null)
            {
                System.Console.WriteLine($"Currency: {payload.Name}({payload.Symbol}) has been updated.");
            }
            return Task.CompletedTask;
        }
    }
}
```

The ```Consume``` method is where you can add the code that you'd like to run. We'll keep things simple by writing which currency has been updated.

Running our SampleListener application reveals a few areas of interest. When we examine the RabbitMQ console we'll notice that we now have an additional ```SampleListener``` connection for our Listener.

<div align="center">
    <img src="https://noxorg.dev/docs/images/localhost_sample-rabbitmq-connections2.png" alt="Overview" width="100%">
    <br>
</div>

And in addition to the new connection, we'll notice that a ```currency-updated-event``` exchange has also been created.

<div align="center">
    <img src="https://noxorg.dev/docs/images/localhost_sample-rabbitmq-exchanges2.png" alt="Overview" width="100%">
    <br>
</div>

If we click on the 'Queues' tab we now have a queue for our ```currency-updated-event```

<div align="center">
    <img src="https://noxorg.dev/docs/images/localhost_sample-rabbitmq-queues2.png" alt="Overview" width="100%">
    <br>
</div>

Let's change Bitcoin to Dogecoin via the API as per the Postman screen below:

<div align="center">
    <img src="https://noxorg.dev/docs/images/postman_sample-currency-put-dogecoin.png" alt="Overview" width="100%">
    <br>
</div>

We get confirmation via our application console that our ```CurrencyUpdatedDomainEvent``` has been triggered and successfully picked up by our listener class:
<div align="center">
    <img src="https://noxorg.dev/docs/images/terminal_sample-listener-currency-updated-dogecoin.png" alt="Overview" width="100%">
    <br>
</div>

Let's create an additional consumer class that reacts to a ```CurrencyCreatedDomainEvent``` by adding a new class called ```CurrencyCreatedConsumer.cs``` with the code below:

```csharp
using MassTransit;
using Nox;

namespace SampleListener.Consumers
{
    public class CurrencyCreatedEventConsumer : IConsumer<CurrencyCreatedDomainEvent>
    {
        readonly ILogger<CurrencyCreatedEventConsumer> _logger;

        public CurrencyCreatedEventConsumer(ILogger<CurrencyCreatedEventConsumer> logger)
        {
            _logger = logger;
        }
        public Task Consume(ConsumeContext<CurrencyCreatedDomainEvent> context)
        {
            var eventSource = context.Message.EventSource.ToString();
            var eventType = context.Message.EventType.ToString();
            var payload = context.Message.Payload;

            if (payload is not null)
            {
                _logger.LogInformation($"[{eventSource}] Currency: {payload.Name}({payload.Symbol}) has been {eventType.ToLower()}.");
            }
            return Task.CompletedTask;
        }
    }
}
```

> 💡 A few changes to notice, we're injecting a logger rather than ouputting to the console. Also take note of the ```EventSource```, ```EventType``` and ```Payload``` properties on ```context.Message```. Finally you'll notice the properties we specified on our ```./Design/Currency/Currency.entity.nox.yaml``` are available on ```context.Message.Payload```

<div align="center">
    <img src="https://noxorg.dev/docs/images/vscode_sample-currency-created.png" alt="Overview" width="100%">
    <br>
</div>

Finally, let's recreate Bitcoin via the API as per the Postman screen below:

<div align="center">
    <img src="https://noxorg.dev/docs/images/postman_sample-currency-post-bitcoin.png" alt="Overview" width="100%">
    <br>
</div>

We get confirmation via our application console that our ```CurrencyCreatedDomainEvent``` has been triggered and successfully picked up by our listener class:

<div align="center">
    <img src="https://noxorg.dev/docs/images/terminal_sample-listener-currency-created-bitcoin.png" alt="Overview" width="100%">
    <br>
</div>

It's time to add [exchange rate data](./nox-lib-sample-seed-exchange-rates) to our project.
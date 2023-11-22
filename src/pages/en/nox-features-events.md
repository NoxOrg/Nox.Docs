---
title: Events in Nox
category: Nox.Lib
description: Docs intro
layout: ../../layouts/MainLayout.astro
---
***
Nox has a feature-rich toolset that supports a comprehensive implementation of its event driven architecture.

### Nox Event Features
- Domain events reflect entity state and operate within the bounded context of the application domain.
- Integration events are visible to—and can be consumed by—external application services
- Complex workflows can be implemented through the built-in event notification and subscription features. 
- Service autonomy enables systems to catch-up/synchronize after service interruptions
- Event streams offer full observability and analytical tools

### Domain Events for Entities

As with many of Nox's features, *Domain Events* are configured in the relevant entity's configuration file.

Under the `persistence` section we configure the behaviour of the various actions for our entities, `create`, `read`, `update` and `delete` which can be turned on or off using the boolean `isEnabled` attribute. Along with this switch we also specify the event behaviour associated with the action.

The `raiseEvents` attribute accepts `domainEventsOnly`, `domainAndIntegrationEvents` and `never`. The values are fairly self-explanatory. Let's start by configuring event behaviour for our `Currency` entity.

Update the `persistence` section of the `.nox/Design/Currency/Currency.entity.nox.yaml` file to match the code snippet below:

```yaml
persistence: 
  isAudited: false
  tableName: Currency
  schema: dbo
  create:
    isEnabled: true
    raiseEvents: domainAndIntegrationEvents
  read:
    isEnabled: true
  update:
    isEnabled: true
    raiseEvents: domainEventsOnly
  delete:
    isEnabled: true
    raiseEvents: never
```

As per the configuration above, domain events will be raised for `Currency` when a `create` or `update` action is triggered, but not for `delete`

### Default Integration Events

The `domainAndIntegrationEvents` configuration option will trigger what Nox refers to as a *default integration event*, which is an event operating outside the bounded context and visible to external services.

> 💡 Integration events within Nox subscribe to the [CloudEvents](https://cloudevents.io/) [specification](https://github.com/cloudevents/spec)

As per the screenshot below, we can see that the Nox library has generated an integration event declaration `CurrencyCreated.g.cs` as well as a handler `CurrencyCreatedRaiseIntegrationEventDomainEventHandler.g.cs` that will raise an integration event when a `CurrencyCreated` domain event is raised.

<div align="center">
    <img src="https://noxorg.dev/docs/images/visual-studio_nox-features-events-integration-declaration-handler.png" alt="Overview" width="100%">
    <br>
</div>


### Custom Integration Events

On the other hand, *custom integration events* allow us to create custom event handlers with our own code.

Custom integration events are declared under the `Application` section of the Nox solution file. We can model the event and attributes as per our requirements.

Let's declare a custom integration event that will be raised when a high-rated cryptocurrency is loaded on our system. We'll start by adding the declaration below to our `.nox/design/Cryptocash.solution.nox.yaml` solution file:


```yaml
integrationEvents:
  - name: TopCryptoCurrency
    description: Top rated cryptocurrency added to system
    type: object
    domainContext: Currency
    objectTypeOptions:
      attributes:
        - name: Name
          type: text

        - name: Symbol
          type: text

        - name: Rating
          type: number
```

> 💡 The `DomainContext` property is used to identify either the EntityName, BusinessProcessName or BoundedContext that the event pertains to.

Notice that the Nox library generates the custom event declaration `Application.IntegrationEvents/TopCryptoCurrency.g.cs`

<div align="center">
    <img src="https://noxorg.dev/docs/images/visual-studio_nox-features-events-custom-integration-declaration.png" alt="Overview" width="100%">
    <br>
</div>

All that remains is for us to implement our handler. Since integration events use the underlying domain events architecture, we raise integration events by consuming domain events.

> 💡 Custom event handlers are created by extending [MediatR's](https://github.com/jbogard/MediatR/blob/master/src/MediatR/INotificationHandler.cs) `INotificationHandler` class and responding to notifications when the relevant domain event is raised.

Let's create a folder for our custom event handlers called `Application/DomainEventHandlers` and we'll call our handler `CurrencyCreatedDomainEventTopCryptoCurrencyHandler.cs`


```csharp
using Cryptocash.Domain;
using Cryptocash.Application.Dto;
using MediatR;
using Nox.Infrastructure.Messaging;

namespace Cryptocash.Application.DomainEventHandlers
{
    internal class CurrencyCreatedDomainEventTopCryptoCurrencyHandler : INotificationHandler<Cryptocash.Domain.CurrencyCreated>
    {
        protected readonly IOutboxRepository _outboxRepository;

        public CurrencyCreatedDomainEventTopCryptoCurrencyHandler(IOutboxRepository outboxRepository) { _outboxRepository = outboxRepository; }

        public async Task Handle(Cryptocash.Domain.CurrencyCreated domainEvent, CancellationToken cancellationToken)
        {
            string[] topCryptoCurrencies = { "Bitcoin", "Ethereum", "Dogecoin" };
            int currencyRating = Array.IndexOf(topCryptoCurrencies, domainEvent.Currency.Name.Value) + 1;

            if (currencyRating > 0)
            {
                var @event = CreateIntegrationEvent(domainEvent.Currency, currencyRating);
                await _outboxRepository.AddAsync(@event);
            }
        }

        private static IntegrationEvents.TopCryptoCurrency CreateIntegrationEvent(Currency? currency, int rating)
          => new()
          {
              Name = currency?.Name?.Value,
              Symbol = currency?.Symbol?.Value,
              Rating = rating
          };
    }
}
```

Our custom integration event handler has now been created and the event is raised when I create one of the cryptocurrencies listed in my handler.
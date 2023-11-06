---
title: Adding Custom Commands
category: Nox.Lib
description: Docs intro
layout: ../../layouts/MainLayout.astro
---
***
Nox offers several ways to customise commands. They are:

- Extend the generated command handler by overriding the `OnExecutingAsync` and/or `OnCompletedAsync` methods.
- Access non-entity properties that we created on our custom DTOs.
- Override the `Handle` method of the generated handler to completely implement your own command handler. 

## Change Request or Entity

During execution of the command we can modify the request by overriding the `OnExecutingAsync` method of the base command handler. We can also modify the content of the command entity by overriding the `OnCompletedAsync` method. Note also that we have access to the additional properties that we added to our custom DTO earlier.

See the code snippet below for an example:

```csharp
using Cryptocash.Domain;
using Humanizer;
using Microsoft.IdentityModel.Tokens;

namespace Cryptocash.Application.Commands;

internal partial class CreateCurrencyCommandHandler
{
    protected override async Task OnExecutingAsync(CreateCurrencyCommand request)
    {
        if (request.EntityDto.ISO_Alpha3.IsNullOrEmpty())
        {
            request.EntityDto.IsTradeable = false;
        }
    }

    protected override async Task OnCompletedAsync(CreateCurrencyCommand request, Currency entity)
    {
        entity.Name = Nox.Types.Text.From(entity.Name.Value.Titleize());

        if (!request.EntityDto.IsTradeable)
        {
            // Enter your custom code here
        }
    }
}
```

## Create a Custom Command Handler

In some instances we may want to completely implement our own custom command handler. This is easily achieved by overriding the `Handle` method of the base handler. 

See the code snippet below for an example:


```csharp
using Cryptocash.Application.Dto;

namespace Cryptocash.Application.Commands;

internal partial class CreateCurrencyCommandHandler
{
    public override async Task<CurrencyKeyDto> Handle(CreateCurrencyCommand request, CancellationToken cancellationToken)
    {
        // Custom code to implement the handler
        return await base.Handle(request, cancellationToken);
    }
}
```

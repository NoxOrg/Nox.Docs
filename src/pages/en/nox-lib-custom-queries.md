---
title: Adding Custom Queries
category: Nox.Lib
description: Docs intro
layout: ../../layouts/MainLayout.astro
---
***
Nox offers several ways to customise queries. They are:

- Override the `OnResponse` method of the generated query handler.
- Override the `Handle` method of the generated query handler to completely implement your own handler. 
- Define a new class to implement your own query validator.

## Implement a Custom Handler

By overriding the `Handle` method of the generated query handler, you can implement your own custom handler.

See the code snippet below for an example:

```csharp
using Cryptocash.Application.Dto;

namespace Cryptocash.Application.Queries;

internal partial class GetCurrencyByIdQueryHandler
{
    public override Task<IQueryable<CurrencyDto>> Handle(GetCurrencyByIdQuery request, CancellationToken cancellationToken)
    {
        // Enter code to implement your own handler
        return base.Handle(request, cancellationToken);
    }
}
```

## Configure a Query Filter

By using the `IQueryable` interface and overriding the `OnResponse` method of the base query handler, you can easily include a condition to filter your query result. Note that this method is executed after the default query handler has been executed and operates on the resultant data set.

See the code snippet below for an example where we use this method to exclude crypto currencies from our result:

```csharp
using FluentValidation;
using Cryptocash.Application.Dto;
using Microsoft.IdentityModel.Tokens;

namespace Cryptocash.Application.Queries;

internal partial class GetCurrenciesQueryHandler
{
    protected override IQueryable<CurrencyDto> OnResponse(IQueryable<CurrencyDto> response)
    {
        return response.Where(currency => !currency.ISO_Alpha3.IsNullOrEmpty());
    }
}
```

## Create a Query Validator

In some instances we may want to specify certain security or validation behaviour for our queries (or commands). We can achieve this by attaching a validation rule to our query which is executed before the default query (or command) handler runs. 

See the code snippet below for an example where we attach a rule to the query to specify valid currencies for our query:


```csharp
using FluentValidation;

namespace Cryptocash.Application.Queries
{

    public class GetCurrencyByIdQueryValidator : AbstractValidator<GetCurrencyByIdQuery>
    {
        public GetCurrencyByIdQueryValidator(ILogger<GetCurrencyByIdQuery> logger)
        {
            string[] validCurrencies = { "USD", "EUR" };
            RuleFor(query => query.keyId).Must(key => validCurrencies.Contains(key) ).WithMessage("Invalid currency selected for territory");
        }
    }
}
```

---
title: Adding Custom DTOs
category: Nox.Lib
description: Docs intro
layout: ../../layouts/MainLayout.astro
---
***
Nox offers several ways to customise DTOs. They include:

- Extend the generated DTO class and add any additional properties you may require.
- Create a custom DTO class outside of the Nox solution entity model.

## Extending Generated DTOs

As detailed in the [Application DTO section](nox-generator-overview#application-dtos) of our Nox.Generator overview, a `<entity name>Dto`, `<entity name>CreateDto` and `<entity name>UpdateDto` is generated for each of the entities defined in our Nox solution.

We can extend of the the generated partial classes and add our own custom propterties to the DTOs. Modifying the properties in the `<entity name>CreateDto` will apply to the `Post` method in the OData endpoint. Similarly, modifying the properties in the `<entity name>UpdateDto` will apply to the `Put` and `Patch` methods in the OData endpoint.

See the code snippet below for an example:

```csharp
using System.ComponentModel.DataAnnotations;

namespace Cryptocash.Application.Dto;

public partial class CurrencyCreateDto
{
    [Required(ErrorMessage = "Define if the currency is tradeable")]
    public bool IsTradeable { get; set; }
}
```

## Create a Custom DTO

Our next example deals with creating a custom DTO outside of our Nox solution entity model. We'll simply create a new class `Application/Dto/TokenTypeDto.cs` and specify the new DTO as per the code snippet below:

```csharp
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.OData.ModelBuilder;

namespace Cryptocash.Application.Dto
{
    public record TokenTypeDto(int Id, string Type, string Name);

    public static class TokenTypeDtoOdataExtensions
    {
        public static ODataModelBuilder ConfigureTokenTypeDto(this ODataModelBuilder oDataModelBuilder)
        {
            // Registering custom dto in Odata
            oDataModelBuilder.EntitySet<TokenTypeDto>("TokenTypes");
            oDataModelBuilder.EntityType<TokenTypeDto>().HasKey(e => new { e.Id });

            return oDataModelBuilder;
        }
    }
}
```

In addition to specifying the new DTO, we'll also register it with the `ODataModelBuilder` in our startup fixture. For our example, we'll update the `builder.Services.AddNox()` line `Program.cs` as follows:

```csharp
builder.Services.AddNox((oDataModelBuilder) => {
    // Register a custom DTO with OData
    oDataModelBuilder.ConfigureTokenTypeDto();
});
```
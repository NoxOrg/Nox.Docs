---
title: Customising your project
category: Nox.Lib
description: Docs intro
layout: ../../layouts/MainLayout.astro
---
***
Arguably, one of the most important use-cases of any currency exchange system would be to provide the exchange rate for a currency, be it the current rate or perhaps a historical one.

We're going to extend our project with a custom API endpoint that will do exactly that for us. It will also highlight how simple it is to access our scaffolded database entities from our code.

### Create a custom API controller

Let's create a new controller class for our API as per the code snippet below and call it ```./Controllers/GetRatesController.cs```

```csharp
using Microsoft.AspNetCore.Mvc;
using Nox;
using Humanizer;

namespace SampleCurrencyService.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GetRatesController : ControllerBase
    {
        private readonly NoxDomainDbContext _dbContext;

        public GetRatesController(NoxDomainDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet(Name = "GetRates")]
        public string Get(string currency, string asAt = "")
        {
            Currency? requestedCurrency = _dbContext.Currency.Where(c => c.Name == currency).FirstOrDefault();

            if (requestedCurrency == null)
            {
                return $"The currency [{currency}] was not found!";
            }

            ExchangeRate? exchangeRate;

            if (String.IsNullOrEmpty(asAt))
            {
                exchangeRate = _dbContext.ExchangeRate.Where(x => x.Currency.Id == requestedCurrency.Id).OrderByDescending(a => a.AsAt).First();
            } else
            {
                exchangeRate = _dbContext.ExchangeRate.Where(x => x.Currency.Id == requestedCurrency.Id && x.AsAt == DateTimeOffset.Parse(asAt)).FirstOrDefault();
            }

            if (exchangeRate == null || exchangeRate.AsAt == null || exchangeRate.Rate == null)
            {
                return $"No exchange rates were found for the {currency} on {DateTime.Parse(asAt).ToOrdinalWords()}!";
            }

            return $"As at the {exchangeRate.AsAt.Value.DateTime.ToOrdinalWords()}, the Swiss Franc -> {requestedCurrency.Name} exchange rate was CHF1.00 = {requestedCurrency.Symbol}{exchangeRate.Rate.Value.ToString("0.00")}";
        }
    }
}
```
Out project structure should be similar to the graphic below:

<div align="center">
    <img src="https://noxorg.dev/docs/images/vscode_sample-new-controller.png" alt="Overview" width="100%">
    <br>
</div>

### Nox.Generator

Now would be as good a time as any to peek under the hood and see what Nox is doing in the background with our design YAML files.

At compile time [Nox.Generator](https://github.com/NoxOrg/Nox.Lib/tree/main/src/Nox.Generator), which extends Microsoft's [```ISourceGenerator```](https://learn.microsoft.com/en-us/dotnet/api/microsoft.codeanalysis.isourcegenerator?view=roslyn-dotnet-4.6.0) interface, generates class definitions of all of our defined entities.

If you have a look under your solution dependencies you'll notice an ```Analyzers``` section which lists the generated classes under the ```Nox.Generator``` section.

As per the Visual Studio graphic below, we've hightligted the auto-generated ```Currency.g.cs``` class as an example, as well as ```NoxDbContext.g.cs``` which we'll expand on in the next section.

<div align="center">
    <img src="https://noxorg.dev/docs/images/visual-studio_sample-nox-generator.png" alt="Overview" width="100%">
    <br>
</div>

### NoxDomainDbContext

The auto-generated ```NoxDbContext.g.cs``` contatins both ```NoxDbContext``` as well as ```NoxDomainDbContext``` classes. The latter proves very useful in addressing our domain entities from our code editor, as illustrated in the graphic below:

<div align="center">
    <img src="https://noxorg.dev/docs/images/vscode_sample-noxdomaindbcontext-currency.png" alt="Overview" width="100%">
    <br>
</div>

### Custom controller

There's nothing out of the ordinary in our custom controller per se—apart from ```NoxDomainDbContext``` perhaps, but it's worth highlighting one or two areas.

As alluded to previously, we're injecting ```NoxDomainDbContext``` into our class instead of ```DbContext```. This provides us will all the expected database access behaviour along with the afore-mentioned domain properties.

Since ```NoxDomainDbContext``` extends ```DbContext``` we also have full access to EF Core LINQ facilities on the ```DbSet``` properties. We're doing method-syntax queries to find the currency and relevant exchange rate to match the currency and date parameters passed via the API.

<div align="center">
    <img src="https://noxorg.dev/docs/images/vscode_sample-getratescontroller-codehighlights.png" alt="Overview" width="100%">
    <br>
</div>

Finally, we're using the [Humanizer](https://github.com/Humanizr/Humanizer) package to display dates in a slightly more human-friendly and conversational manner.

<div align="center">
    <img src="https://noxorg.dev/docs/images/browser_sample-getrates-usdollar.png" alt="Overview" width="100%">
    <br>
</div>

That's it for now. This section really just aimed to highlight how simple it is to extend your Nox solution with custom code.
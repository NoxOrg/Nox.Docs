---
title: Exploring the API
category: Nox.Lib
description: Docs intro
layout: ../../layouts/MainLayout.astro
---
***
Startup [Postman](https://www.postman.com/) or your browser and navigate to `http://localhost:5237/WeatherForecast` to see that the Microsoft standard weather forecast API works.

![MS Weather Forecast API](https://noxorg.dev/docs/images/postman_get-weatherforecast.gif)

### Swagger Docs
---
To view the dynamic endpoints that Nox added to your project, browse to `http://localhost:5237/swagger`

![Swagger](https://noxorg.dev/docs/images/localhost_swagger-endpoints.gif)

### Add a Currency
---
In Postman, setup a `POST` request to `http://localhost:5237/api/Currencies`, and on the `Body` tab, set the `content-type` to `raw` and `JSON` and the body content to:

```json
{
    "Id": 8383,
    "Name": "Bitcoin",
    "Symbol": "₿",
    "ISO_Alpha3": "XBT"
}
```
When you click on the `Send` button, you should get a `201` (Created) response.

![Add a Currency](https://noxorg.dev/docs/images/postman_post-currency-bitcoin.gif)

You can create an entry for US Dollars by replacing the body with:

```json
{
    "Id": 840,
    "Name": "US Dollar",
    "Symbol": "$",
    "ISO_Alpha3": "USD"
}
```
![Add US Dollar Currency](https://noxorg.dev/docs/images/postman_post-currency-usdollar.gif)

### Display Currencies
---

To display the currencies you've just added send a `GET` request to `http://localhost:5237/api/Currencies`

![Display Currencies](https://noxorg.dev/docs/images/postman_get-currencies.gif)


### Filtering and Pagination
---

You can try the following url's with `GET` to further explore the API.

```
http://localhost:5237/odata/Currencies(840)
http://localhost:5237/odata/Currencies(840)/Name
http://localhost:5237/odata/Currencies?$select=Id,Name
http://localhost:5237/odata/Currencies?$select=Id,Name&$orderby=Name
http://localhost:5237/odata/Currencies?$filter=Name eq 'US Dollar'
http://localhost:5237/odata/Currencies?$filter=Name ne 'US Dollar'
```

You can read up more about the many features of OData at [www.odata.org/](https://www.odata.org/)
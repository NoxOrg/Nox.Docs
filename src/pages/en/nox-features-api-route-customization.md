---
title: API Route Customization
category: Nox.Lib
description: Docs intro
layout: ../../layouts/MainLayout.astro
---
***
Nox supports API route customization and mapping as well as extensive configuration options using simple yaml directives. These features are configured in the Nox solution file.


No need to know OData by providing route mappings that can be translated into OData queries using yaml configuration
Enable simple and elegant endpoints which translates complex OData queries

### Basic Route Mapping

Route mapping/customization is configured in the `presentation:apiConfiguration` section of the Nox solution file. One or more API route mappings can be configured by adding an `apiRouteMappings` node.

Simply assign a descriptive name in the `route` attribute and supply a valid OData URL translation in the `targetUrl` attribute.

```yaml
presentation:
  apiConfiguration: 
    apiRouteMappings:
        
      - name: CryptoCurrencies
        description: Returns a list of Cryptocurrencies (ISO_Alpha3 code empty) 
        httpVerb: get
        route: /CryptoCurrencies
        targetUrl: /Currencies?$filter=ISO_Alpha3%20eq%20%27%27

        responseOutput: 
          name: CryptoCurrencies
          description: List all Cryptocurrencies
          type: object
          objectTypeOptions:
            attributes:
              - name: Name
                description: The name of the currency
                type: string
              - name: Id
                description: The descriptive name of the currency
                type: string
              - name: ISO_Alpha3
                description: The 3-character ISO 4217 code of the currency
                type: string
              - name: Symbol
                description: The recognised currency symbol
                type: string
```

As per the swagger graphic below, notice that the new mapped endpoint is now available:

<div align="center">
    <img src="https://noxorg.dev/docs/images/browser_nox-features-swagger-api-route-mapping.png" alt="Overview" width="100%">
    <br>
</div>

And if we send the request via swagger, the cryptocurrencies are returned (ISO_Alpha3 is empty), as per the graphic below:

<div align="center">
    <img src="https://noxorg.dev/docs/images/browser_nox-features-swagger-api-route-mapping-200.png" alt="Overview" width="100%">
    <br>
</div>

### Using Parameters

Apart from mapping complex OData queries into convenient routes, Nox also supports passing parameters in the route URL.

Let's say for example we'd like to specify which field we'd like to return from our API call. We can specify a parameter name in curly braces inside the `route` and `targetUrl` attributes, as per the code snippet below:

```yaml
- name: CryptoCurrenciesByProperty
  description: Return a specified property of a list of Cryptocurrencies. 
  httpVerb: get
  route: /CryptoCurrencies/{propertyName}
  targetUrl: /Currencies?$filter=ISO_Alpha3%20eq%20%27%27&$select={propertyName}

  responseOutput: 
    name: CryptoCurrencies
    description: List of Cryptocurrencies
    type: object
    attributes:
    - name: Name
      description: The name of the currency
      type: string
```

As illustrated by the graphic below, by adding the desired property name to the route, the query returns only the name property.

<div align="center">
    <img src="https://noxorg.dev/docs/images/browser_nox-features-http-api-route-mapping-parameter.png" alt="Overview" width="100%">
    <br>
</div>

Using the `requestInput` attribute, you can describe and accept URL parameters within Swagger's ***Parameters*** section.

Update `CryptoCurrenciesByProperty` route mapping created earlier by adding the `requestInput` attribute as per the code snippet below:

```yaml
- name: CryptoCurrenciesByProperty
  description: Return a specified property of a list of Cryptocurrencies. 
  httpVerb: get
  route: /CryptoCurrencies/{propertyName}
  targetUrl: /Currencies?$filter=ISO_Alpha3%20eq%20%27%27&$select={propertyName}

  # Add this section to enable parameters within Swagger
  requestInput:
    - name: Property
      description: Currency property name that you'd like to return
      type: string

  responseOutput: 
    name: CryptoCurrencies
    description: List of Cryptocurrencies
    type: object
    attributes:
    - name: Name
      description: The name of the currency
      type: string
```

Running our Cryptocash application will now reveal a section in Swagger to populate the parameter along with descriptive details as per the yaml specification: 

<div align="center">
    <img src="https://noxorg.dev/docs/images/browser_nox-features-swagger-api-route-mapping-requestinput.png" alt="Overview" width="100%">
    <br>
</div>

### Using RouteQuery

The `RouteQuery` URL directive will enable you to submit an OData query in a conventional manner as part of the request URL.

Let's modify our previous example to return a single result using an OData `top` directive:

```yaml
- name: CryptoCurrenciesByProperty
  description: Return a specified property of a list of Cryptocurrencies. 
  httpVerb: get
  route: /CryptoCurrencies/{propertyName}
  # Add a {RouteQuery} directive to targetUrl as below
  targetUrl: /Currencies?$filter=ISO_Alpha3%20eq%20%27%27&$select={propertyName}&{$RouteQuery}

  requestInput:
    - name: Property
      description: Currency property name that you'd like to return
      type: string

  responseOutput: 
    name: CryptoCurrencies
    description: List of Cryptocurrencies
    type: object
    attributes:
    - name: Name
      description: The name of the currency
      type: string
```

On our request URL, everything to the right of the `?` will be considered the `RouteQuery`

<div align="center">
    <img src="https://noxorg.dev/docs/images/browser_nox-features-http-api-route-mapping-routequery.png" alt="Overview" width="100%">
    <br>
</div>

### Using RequestBody

For route mappings using an update http verb, the `RequestBody` attribute should be configured.

Let's add a `POST` request for Cryptocurrencies:

```yaml
      - name: CreateCryptoCurrencies
        description: Create a Cryptocurrency. 
        httpVerb: post
        route: /CryptoCurrencies
        targetUrl: /Currencies

        requestBodyType: json

        jsonBodyType: 
          name: CryptoPost
          type: object
          attributes:
            - name: Id
              type: string
            - name: Name
              type: string
            - name: ISO_Alpha3
              type: string
              default: ""
            - name: Symbol
              type: string

        responseOutput: 
          name: CryptoCurrencies
          description: List of currencies
          type: object
          attributes:
              - name: Name
                description: The name of the currency
                type: string
              - name: Id
                description: The descriptive name of the currency
                type: string
              - name: ISO3
                description: The 3-character ISO code of the currency
                type: string
              - name: Symbol
                description: The recognised currency symbol
                type: string
```

As per the swagger graphic below, notice that a new `POST` endpoint called `CreateCryptoCurrencies` have been created. The swagger interface also includes and editable request body in JSON format as per the configuration of the `RequestBody` attribute in our route mapping.

<div align="center">
    <img src="https://noxorg.dev/docs/images/browser_nox-features-swagger-api-route-mapping-post-201.png" alt="Overview" width="100%">
    <br>
</div>
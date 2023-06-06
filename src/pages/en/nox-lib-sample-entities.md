---
title: Adding Entities
category: Nox.Lib
description: Docs intro
layout: ../../layouts/MainLayout.astro
---
***
Let's add Country and Exchange Rate entities to our solution next. We'll simply add new entity defintion files to our ```./Design``` folder.

### Add Country entity

Add a new ```./Design/Country``` folder and create the ```Country.entity.nox.yaml``` file.

> 💡 We'll take this opportunity to add some additional country-related info fields that will prove useful for our Currency Exchange solution later.

```yaml
#
# Country.entity.nox.yaml
#

name: Country
description: Countries and related data
pluralName: Countries
table: Country
schema: dbo

relatedParents: [Currency]
    
attributes:

  - name: Id
    description: The country's unique identifier 
    isPrimaryKey: true
    type: int
    canFilter: true
    canSort: true

  - name: Name
    description: The country's common name 
    isRequired: true
    type: string
    maxWidth: 64
    canFilter: true
    canSort: true

  - name: FormalName
    description: The country's official name
    type: string
    maxWidth: 64
    canFilter: true
    canSort: true

  - name: ISO_Alpha3
    description: The country's official ISO 4217 alpha-3 code
    isRequired: true
    isUnicode: false
    type: char
    minWidth: 3
    maxWidth: 3

  - name: ISO_Alpha2
    description: The country's official ISO 4217 alpha-2 code
    isRequired: true
    isUnicode: false
    type: char
    minWidth: 2
    maxWidth: 2

  - name: ISO_Numeric
    description: The country's official ISO 4217 alpha-3 code
    isRequired: true
    isUnicode: false
    type: char
    minWidth: 3
    maxWidth: 3

  - name: DialingCodes
    description: The country's phone dialing codes (comma-delimited)
    isUnicode: false
    type: string
    maxWidth: 32

  - name: Capital
    description: The capital city of the country
    type: string
    maxWidth: 64

  - name: Demonym
    description: Noun denoting the natives of the country
    type: string
    maxWidth: 64

  - name: AreaInSquareKilometres
    description: Country area in square kilometers 
    type: int

  - name: GeoLattitude
    description: The the north–south position of the workplace's point on the surface of the Earth
    type: decimal
    maxWidth: 18
    precision: 15
    isRequired: true

  - name: GeoLongitude
    description: The the east-west position of the workplace's point on the surface of the Earth
    type: decimal
    maxWidth: 18
    precision: 15
    isRequired: true

  - name: GeoRegion
    description: The region the country is in
    type: string
    isUnicode: false
    maxWidth: 8
    isRequired: true

  - name: GeoSubRegion
    description: The sub-region the country is in
    type: string
    isUnicode: false
    maxWidth: 32
    isRequired: false

  - name: GeoWorldRegion
    description: The world region the country is in
    type: string
    isUnicode: false
    maxWidth: 4
    isRequired: true

  - name: Population
    description: The estimated population of the country
    type: int

  - name: TopLevelDomains
    description: The top level internet domains regitered to the country (comma-delimited)
    type: string
    isUnicode: true
    maxWidth: 32
```

### Add Exchange Rate

Add a new ```./Design/ExchangeRate``` folder and create the ```ExchangeRate.entity.nox.yaml``` file.

```yaml
#
# ExchangeRate.entity.nox.yaml
#

name: ExchangeRate

description: The exchange rate at a piont in time vs CHF (reference currency)

relatedParents: [Currency]

attributes:

  - name: Id
    description: The unique identifier of an exchange rate
    isPrimaryKey: true
    type: int
    canFilter: true
    canSort: true

  - name: AsAt
    description: The date and time at which the rate changed
    type: datetime

  - name: Rate
    description: The exchange rate relative to Swiss Franc (CHF)
    type: decimal
    maxWidth: 14
    precision: 8
```
### Add migrations and update database

Let's add migrations and update the database to include our new ```Country``` and ```ExchangeRate``` tables

```powershell
dotnet ef migrations add AddCountryExchangeRate --context NoxDbContext
dotnet ef database update --context NoxDbContext
```
Your solution ```./Design``` folder should look like the graphic below now, and the new migrations have been added to the ```./Migrations``` folder:

<div align="center">
    <img src="https://noxorg.dev/docs/images/vscode_design-folder-add-entities.png" alt="Overview" width="100%">
    <br>
</div>

And reviewing the ```SampleCurrencyDb``` in your database utitily of choice will confirm that the ```Country``` and ```ExchangeRate``` tables have been added.

<div align="center">
    <img src="https://noxorg.dev/docs/images/dbeaver_country-exchange-tables.png" alt="Overview" width="100%">
    <br>
</div>

### A note on data relations and foreign keys

The eagle-eyed among you may have noticed that when we declared our ```Country``` and ```CurrencyExchange``` entities, we used the ```relatedParents``` property to specify a relation to the ```Currency``` entity.

<div align="center">
    <img src="https://noxorg.dev/docs/images/vscode_sample-related-parents.png" alt="Overview" width="100%">
    <br>
</div>

And if we expand the ER diagram of our ```Country``` and ```ExchangeRate``` tables, we will notice that the Nox library have scaffolded our database relations as well as foreign keys and indexes.

<div align="center">
    <img src="https://noxorg.dev/docs/images/dbeaver_sample-foreign-keys.png" alt="Overview" width="100%">
    <br>
</div>

Next we'll move on to the exciting part, let's [source and import some data into our solution](./nox-lib-sample-seed-data).
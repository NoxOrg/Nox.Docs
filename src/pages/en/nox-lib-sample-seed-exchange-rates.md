---
title: Exchange Rate Data
category: Nox.Lib
description: Docs intro
layout: ../../layouts/MainLayout.astro
---
***
It's time to wrap up our project with a final step, arguably the actual reason we started the project. Let's take a moment to recap all the components we've added to our microservice since its humble quick-start beginnings:

- We started by considering the various entities and architecture of our microservice and neatly defined that in yaml files in our design folder.
- We scaffolded the database provider of our choice with tables and indexes based on our yaml definitions in our design file.
- We seeded data for our microservice by simply specifying the source and update strategy in our entity design files.
- We reviewed the monitoring and observability of our microservice using the Hangfire console.
- We added an additional messenger to our microservice and added listeners to react to entity state change.

### Adding exchange rates

You'll know by now that adding external data for exchange rates is as simple as creating a loader entity file and specifying the source. Let's create a ```./Design/ExchangeRate/ExchangeRate.loader.nox.yaml``` file and add the code included below:

```yaml
#
# ExchangeRate.loader.nox.yaml
#

name: ExchangeRateLoader

description: Loads exchange rate data 

schedule:
  start: Every day at 1am
  runOnStartup: true

loadStrategy: 
  type: MergeNew
  columns: [CreateDate]
  
target:
  entity: ExchangeRate
  
sources:

  - dataSource: CsvSeedData
    query: exchange-rate-seeddata.csv 

  - dataSource: ExcelSeedData
    query: exchange-rate-seeddata.xlsx
    
  - dataSource: ParquetSeedData
    query: exchange-rate-seeddata.parquet

  - dataSource: XmlSeedData
    query: exchange-rate-seeddata.xml;ElementName=fxRate
```

We'll use this final steps to show Nox's support for additional input data formats. We've sourced exchange rate data in four different formats for different periods. We specify all relevant data sources in the ```sources``` node in our loader file.

Finally we'll tell our microservice about the location of this data by adding these additional sources to the ```dataSources``` node in our ```./Design/SampleCurrency.service.nox.yaml``` file as outlined in the code snippet below. You'll recall that we already have ```JsonSeedData``` specified from earlier in our project for country and currency data.

```yaml
dataSources:
  - name: JsonSeedData
    provider: json
    options: Source=File;Path=./Data/;

  - name: CsvSeedData
    provider: csv
    options: Source=File;Path=./Data/;

  - name: ExcelSeedData
    provider: excel
    options: Source=File;Path=./Data/;
    
  - name: ParquetSeedData
    provider: parquet
    options: Source=File;Path=./Data/;

  - name: XmlSeedData
    provider: xml
    options: Source=File;Path=./Data/;
```

All that remains is to restart our microservice and note that the exchange rate data has now been seeded.

<div align="center">
    <img src="https://noxorg.dev/docs/images/postman_sample-get-exchange-rates.png" alt="Overview" width="100%">
    <br>
</div>
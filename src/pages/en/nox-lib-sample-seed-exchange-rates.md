---
title: Exchange Rate Data
category: Nox.Lib
description: Docs intro
layout: ../../layouts/MainLayout.astro
---
***
It's time to wrap up our project with a final step, arguably the actual reason we started the project. Let's take a moment to recap all the components we've added to our microservice since its humble quick-start beginnings:

- We started by considering the various entities and architecture of our microservice and neatly defined them in yaml files in our solution design folder.
- The Nox library scaffolded the database provider of our choice with tables and indexes based on the definitions in our solution design files.
- We seeded data for our microservice by simply specifying the source and update strategy in our entity design files.
- We reviewed the monitoring and observability of our microservice using the Hangfire console.
- We added an additional messenger to our microservice and added listeners to react to entity state change.

### Let's review our exchange rate source data

You might recall that in an earlier step of our project where we [seeded currency and country data](./nox-lib-sample-seed-data), we copied a number of additional exchange rate source files from [this project repo](https://github.com/NoxOrg/Nox/tree/main/docs/sample-data).

> 💡 Nox supports the import of several data formats including JSON, CSV, Excel, Parquet and XML.

Let's take a closer look at the individual files. Open ```exchange-rate-seeddata.csv``` in a utility of your choice. We've chosen [Visual Studio Code](https://code.visualstudio.com/):

<div align="center">
    <img src="https://noxorg.dev/docs/images/vscode_sample-csv-data.png" alt="Overview" width="100%">
    <br>
</div>

Next we'll open ```exchange-rate-seeddata.parquet``` in a desktop or online utility. We've used [Oqtacore's online viewer](https://parquet-viewer-online.com/)

<div align="center">
    <img src="https://noxorg.dev/docs/images/browser_sample-parquet-data.png" alt="Overview" width="100%">
    <br>
</div>

> 💡 [Apache Parquet](https://parquet.apache.org/) is an open-source data storage format that is similar to CSV but stores data in binary format. It is a column-oriented with support for complex objects with multiple levels, allowing for efficient data storage and retrieval. It is extensively used within AWS and allows to save up to 95% of costs for computing. [This article](https://towardsdatascience.com/demystifying-the-parquet-file-format-13adb0206705) by Michael Berk does a good job explaining parquet's benefits.

Next we'll open ```exchange-rate-seeddata.xlsx``` in MS-Excel:

<div align="center">
    <img src="https://noxorg.dev/docs/images/excel_sample-excel-data.png" alt="Overview" width="100%">
    <br>
</div>

And finally we'll open ```exchange-rate-seeddata.xml``` in an online utility. We've used [this one](https://countwordsfree.com/xmlviewer) and beautified the result:

<div align="center">
    <img src="https://noxorg.dev/docs/images/browser_sample-xml-data.png" alt="Overview" width="100%">
    <br>
</div>

Closer inspection of these files will reveal record count and date range detail as outlined below:

| Filename                       | Records | Date From  | Date To    |
|--------------------------------|--------:|------------|------------|
|                                |         |            |            |
| exchange-rate-seeddata.csv     | 40,223  | 01/01/2020 | 30/06/2020 |
| exchange-rate-seeddata.parquet |  9,016  | 01/07/2020 | 31/12/2020 |
| exchange-rate-seeddata.xlsx    | 40,880  | 01/01/2021 | 31/12/2021 |
| exchange-rate-seeddata.xml     | 40,223  | 01/01/2022 | 31/12/2022 |

So, in addition to our currency and country JSON data, we have exchange rate information for 2020-2022 in four different formats. All that's left is to import the data into our sample exchange rate service.

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

We specify all relevant data sources in the ```sources``` node in our loader file.

Finally we'll tell our microservice about the location of this data by adding these additional sources to the ```dataSources``` node in our ```./Design/SampleCurrency.solution.nox.yaml``` file as outlined in the code snippet below. You'll recall that we already have ```JsonSeedData``` specified from earlier in our project for country and currency data.

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

All that remains is to restart our microservice and note that the exchange rate data has now been imported.

Doing a GET request on our ```/api/ExchangeRates``` endpoint via Postman confirms this fact.

<div align="center">
    <img src="https://noxorg.dev/docs/images/postman_sample-get-exchange-rates.png" alt="Overview" width="100%">
    <br>
</div>

The ```Rate``` value of the sample data shows the exchange rate in relation to the Swiss Franc. Whilst browsing our source exchange rate data earlier you may have noticed records with a ```Rate``` = 1, of which the ```CurrencyId``` were 756.

Doing a GET request on our ```/api/ExchangeRates(756)``` endpoint via Postman shows us that our reference currency is indeed the Swiss Franc.

<div align="center">
    <img src="https://noxorg.dev/docs/images/postman_sample-currency-get-swissfranc.png" alt="Overview" width="100%">
    <br>
</div>

Now that we have all our input data available, let's look at how we can [customise our project](./nox-lib-sample-custom-controller).
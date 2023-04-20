---
title: Seeding Project Data
category: Nox.Lib
description: Docs intro
layout: ../../layouts/MainLayout.astro
---
***
For this section of our sample project we'll look at the following actions:
- Source some sample data for our ```Currency```, ```Country``` and ```ExchangeRate``` entities
- Extend our entities with ***loaders*** to automatically import and persist data to our database

### Source data

Nox's [ETL](https://en.wikipedia.org/wiki/Extract,_transform,_load) module supports various data formats including SQL datasources, JSON, CSV, EXCEL, XML, and Parquet.

For our sample project we've sourced and compiled country, currency and exchange rate data in a few different formats. To keep things simple for a start we'll only configure our project to import country and currency data in JSON format. [Later](./nox-lib-sample-seed-exchange-rates) in the project we'll include exchange rate data files in CSV, Excel, XML and Parquet formats.

Let's start by creating a ```./Data``` folder in the root folder of our project and copy all the data files contained in [this folder](https://github.com/NoxOrg/Nox/tree/main/docs/sample-data) into our newly created folder.

### Creating a Loader file

We can specify data sources for our project entities by adding a ```<your service>.loader.nox.yaml``` file in their relevant folders in the ```./Design``` directory.

<div align="center">
    <img src="https://noxorg.dev/docs/images/vscode_sample-data-and-loaders.png" alt="Overview" width="100%">
    <br>
</div>

We'll discuss the [anatomy of a loader file](./tech_nox-lib_loader) in detail later, but for now let's create loader files for ```Currency``` and ```Country```.

Create the ```./Design/Country/Country.loader.nox.yaml``` file and copy/paste the yaml code below into the file.

```yaml
#
# Country.loader.nox.yaml
#

name: CountryLoader

description: Loads country data 

schedule:
  start: Every month on the 1st at 2am
  retry:
    limit: 10
    delaySeconds: 60
    doubleDelayLimit: 5

loadStrategy: 
  type: MergeNew
  columns: [CreateDate,EditDate]

target:
  entity: Country
  
sources:
  - dataSource: JsonSeedData
    minimumExpectedRecords: 160
    query: country-seeddata.json 
```

Create the ```./Design/Currency/Currency.loader.nox.yaml``` file and copy/paste the yaml code below into the file.

```yaml
#
# Currency.loader.nox.yaml
#

name: CurrencyLoader

description: Loads currency data 

schedule:
  start: Every 2 minutes
  retry:
    limit: 10
    delaySeconds: 60
    doubleDelayLimit: 5

loadStrategy: 
  type: MergeNew
  columns: [CreateDate,EditDate]

target:
  entity: Currency

sources:
  - dataSource: JsonSeedData
    query: currency-seeddata.json 
```

### Specifying data source properties

Now that we've specifed the sources of our data for our entities, we need to tell the extract module where to find this data. We'll head back to ```./Design/SampleCurrency.service.nox.yaml``` and add a new ```dataSources``` node to our file:

```yaml
dataSources:
  - name: JsonSeedData
    provider: json
    options: Source=File;Path=./Data/;
```
<div align="center">
    <img src="https://noxorg.dev/docs/images/vscode_sample-data-sources.png" alt="Overview" width="100%">
    <br>
</div>

### Let's seed our data

All that remains is to save our new design files and run the project. Have a look at the highlighted areas in the Terminal output below:

<div align="center">
    <img src="https://noxorg.dev/docs/images/terminal_sample-seeded-data.png" alt="Overview" width="100%">
    <br>
</div>

You'll notice that the Nox ETL module has extracted 117 ```Currency``` and 179 ```Country``` records from the respective specified data sources. And the database graphic below confirms that:

<div align="center">
    <img src="https://noxorg.dev/docs/images/dbeaver_sample-seeded-data.png" alt="Overview" width="100%">
    <br>
</div>

Let's take a look at how Nox manages [background jobs](./nox-lib-sample-jobs).
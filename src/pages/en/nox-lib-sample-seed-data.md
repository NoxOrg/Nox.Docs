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

For our sample project we've sourced and compiled
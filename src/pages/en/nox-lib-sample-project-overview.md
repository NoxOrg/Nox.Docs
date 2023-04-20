---
title: Project Overview
category: Nox.Lib
description: Docs intro
layout: ../../layouts/MainLayout.astro
---
***
We're going to extend the simple currency service we created in the quick-start section to start acting a bit more like a proper currency exhange microservice. [This article](https://www.investopedia.com/terms/c/currency-exchange.asp) over at [Investopedia](https://www.investopedia.com/) will provide great background on what we're aiming to achieve.

<div align="center">
    <img src="https://noxorg.dev/docs/images/Currency-Exchange-banner.png" alt="Overview" width="100%">
    <br>
</div>

These are the steps we'll be undertaking:
- Create some project order by moving our project and entity definition files into a central [design folder](./nox-lib-design-folder)
- Take full control of our project's [database migrations](./nox-lib-sample-db-migrations) using EFCore Tools
- Define additional country and exchange-rate [entities](./nox-lib-sample-entities) alongside our original currency entity
- Configure our project to source [seed data](./nox-lib-sample-seed-data) from external sources for all/any of our project entities using Nox's built-in ETL module.
- Look at how [jobs](./nox-lib-sample-jobs) are scheduled and monitored using Hangfire
- Add a [messenger](./nox-lib-sample-messaging) using MassTransit and set up event listeners

> 💡 We're going to recreate our SampleCurrencyService project from scratch since we want to take full control of our database migrations. In our quick-start version, we had the ```autoMigrations=true``` property set in the ```SampleCurrency.service.nox.yaml``` design file. In a production environment, database migrations would typically be a more considered action.

## Clean our previous project

Let's stop and remove our SQL Server Docker container. You can use the Docker Desktop GUI if you prefer.

```powershell
docker stop sqlserver_container
docker rm sqlserver_container
```

Let's remove our previously created project.

```powershell
Remove-Item -Recurse .\SampleCurrencyService
```

## Recreate our starting project

Follow the [Quick-start guide](./nox-lib-quick-start-project) again up to the point before we run the project using the ```dotnet run``` command. The only change will be to set the ```autoMigrations=false``` directive in the ```SampleCurrency.service.nox.yaml``` design file as below.

```yaml
#
# SampleCurrency.service.nox.yaml
#
# yaml-language-server: $schema=https://noxorg.dev/schemas/NoxConfiguration.json
#

name: SampleCurrencyService

description: Sample Currency Microservice

autoMigrations: false

database:
  name: SampleCurrencyDb
  provider: sqlServer
  server: localhost
  user: sa  
  password: Developer*123

messagingProviders:
  - name: InProcess
    provider: mediator
```

Let's take a look at the [design folder](./nox-lib-design-folder) and see how we'll be using that to organise our project.
---
title: Project Overview
category: Nox.Lib
description: Docs intro
layout: ../../layouts/MainLayout.astro
---
***
We're going to extend the simple currency service we created in the quick-start section to start acting a bit more like a proper currency exhange microservice.

To achieve this we'll do the following:
- Define additional country and exchange-rate entities alongside our original currency entity
- Add some seed data for all three our defined entities
- Define some loader configuration files to specify the source of our seed data as well as update behaviour and frequency

> 💡 We're going to recreate our SampleCurrencyService project from scratch since we want to take full control of out database migrations. In our quick-start version, we had the ```autoMigrations=true``` property set in the ```SampleCurrency.service.nox.yaml``` design file. In a production environment, database migrations would typically be a more considered action.

## Clean our previous project

Let's stop and remove our SQL Server Docker container. You can use the Docker Desktop GUI if you prefer.

```powershell
docker stop sqlserver_container
docker rm sqlserver_container
```

Let's remove our previously created project.

```powershell
Remove-Item -Recurse -Force .\SampleCurrencyService
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
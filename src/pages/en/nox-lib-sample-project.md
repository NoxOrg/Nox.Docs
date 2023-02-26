---
title: Sample Project
category: Nox.Lib
description: Docs intro
layout: ../../layouts/MainLayout.astro
---
### Prerequisites
---

Make sure you have .NET 6 or later and Docker installed on your PC.
```powershell
dotnet --version

docker-compose --version
```
### Creating a Project
---
Create .NET 6.0 web api project at the command line in your repositories using `dotnet`
```powershell
dotnet new webapi -o SampleCurrencyService

cd SampleCurrencyService
```
At this point you can do a normal `dotnet run` which will present you with the standard Microsoft demo WeatherController.

### Adding Nox
---
Add the Nox.Lib nuget package to your project.
```powershell
dotnet add package Nox.Lib
```
Edit your Program.cs file and add the following three lines:
```csharp
using Nox; // <--- Add this (1) <---

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddNox(); // <--- Add this (2) <---
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseNox(); // <--- Add this (3) <---

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
```
### Define Your Service and Entities
---
Create a new file to define your service called `SampleCurrency.service.nox.yaml`
```yaml
#
# SampleCurrency.service.nox.yaml
#
# yaml-language-server: $schema=https://noxorg.dev/schemas/NoxConfiguration.json
#

name: SampleCurrencyService

description: Sample Currency Microservice

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
Create an entity definition in `Currency.entity.nox.yaml`

```yaml
#
# Currency.entity.nox.yaml
#

name: Currency
description: Currency definition and related data

attributes:

  - name: Id
    description: The currency's unique identifier 
    isPrimaryKey: true
    type: int

  - name: Name
    description: The currency's name 
    isRequired: true
    type: string
    maxWidth: 128

  - name: ISO_Alpha3
    description: The currency's official ISO 4217 alpha-3 code
    isRequired: true
    isUnicode: false
    type: char
    minWidth: 3
    maxWidth: 3

  - name: Symbol
    description: The currency's well known symbol
    type: string
    maxWidth: 5
```
### Setup SqlServer with Docker
---
Create a `docker-compose.yaml` for running a Sql Server conatainer
```yaml
version: '3.7'

services:
  sqlserver:
    container_name: sqlserver_container
    image: "mcr.microsoft.com/azure-sql-edge:latest"
    user: root
    ports:
      - "1433:1433"
    environment:
      SA_PASSWORD: "Developer*123"
      ACCEPT_EULA: "Y"
      MSSQL_PID: "Developer"
    volumes:
      - ./.docker-data/sqlserver:/var/opt/mssql/data
```
Then start your database with:
```bash
docker-compose up -d
```
### Start Your Service
---
Finally, start your API with:
```powershell
dotnet run
```
The application will start up, Nox will dynamically process the YAML files. Take note of the port that `dotnet new webapi` assigned to your project.

![Http Port](https://noxorg.dev/docs/images/nox-lib_startup-port.png)

In this case the `http` port is `5237` and we will use it below (use your port number wherever you see `5237` instead).

Alternatively, you can change the port your service uses by editing the `applicationUrl` in the `profiles` section in `.\Properties\launcgSettings.json` as follows.

```json
  "profiles": {
    "SampleCurrencyService": {
      "commandName": "Project",
      "dotnetRunMessages": true,
      "launchBrowser": true,
      "launchUrl": "swagger",
      "applicationUrl": "https://localhost:7237;http://localhost:5237",
      "environmentVariables": {
        "ASPNETCORE_ENVIRONMENT": "Development"
      }
    },
```
You will then be able to follow the exploration section of these docs using the same port.
---
title: Building a Nox Solution
category: Nox.Lib
description: Docs intro
layout: ../../layouts/MainLayout.astro
---
### The prep work
---

Make sure you have .NET 7 and Docker installed on your PC.
```powershell
dotnet --version

docker-compose --version
```
Create .NET 7.0 web api project at the command line in your repositories using `dotnet`
```powershell
dotnet new webapi -o Cryptocash

cd Cryptocash
```
At this point you can do a normal `dotnet run` which will present you with the standard Microsoft demo WeatherController.

### Define the solution
---

> 💡 The ***Nox Solution*** is the central pivot around which most of Nox's domain driven design revolves. This *Solution* along with *Entities*, *Events* and *Value Objects* are the building blocks of every Nox solution.

Our *Nox solution* comprises the main `[solution_name].solution.nox.yaml` file as well as one or more `[entity_name].entity.nox.yaml` entity file(s). In the interest of consistency and visibility, the Nox generator looks for these *solution design* files in a separate folder off the project root called ```./.nox/design```.

We specify this design folder in our project file so that they can be included at build time. Add/modify the `<Additional files />` tag in your `[solution_name].csproj` file with the code 👇 below:

```csharp
<ItemGroup>
  <AdditionalFiles Include=".\.nox\design\**\*.yaml" />
</ItemGroup>
```

Create a new file in the `./.nox/design` folder to define your solution called `Cryptocash.solution.nox.yaml`
```yaml
#
# Cryptocash.solution.nox.yaml
#
# yaml-language-server: $schema=https://noxorg.dev/schemas/solution.json
#

name: Cryptocash

description: A sample solution for the imaginary Crypocash business

domain:

  entities:

    - $ref: ./Currency/currency.entity.nox.yaml

infrastructure:
  
  persistence:

    databaseServer:
      name: Cryptocash
      provider: sqlServer
      options: Trusted_Connection=no;connection timeout=120;TrustServerCertificate=True
      serverUri: localhost
      user: sa  
      password: Developer*123
```

Next we'll define our first domain entity. Arguably, entities are the most important building blocks of any Nox solution. Let's add a *Currency* entity for our solution by creating a ```Currency.entity.nox.yaml``` file in the ```./.nox/design/Currency``` subfolder. Notice that we've created a subfolder for our *Currency* entity, and we'll follow this practice for each of our subsequent domain entities.

```yaml
#
# Currency.entity.nox.yaml
#

name: Currency

description: Currency definition and related data

keys:

  - name: Id
    isRequired: true
    description: The currency's unique identifier 
    type: currencyCode3

attributes:

  - name: Name
    description: The currency's name
    type: text
    textTypeOptions:
      minLength: 4
      maxLength: 63
    isRequired: true

  - name: CurrencyIsoNumeric
    description: Currency's iso number id
    type: currencyNumber     
    isRequired: true 

  - name: Symbol
    description: The currency's well-known symbol
    type: text
    textTypeOptions:
      maxLength: 5
    isRequired: true
```

Our project structure should look similar to the image below now

<div align="center">
    <img src="https://noxorg.dev/docs/images/vscode_quick-start-nox-design-folder.png" alt="Overview" width="100%">
    <br>
    <br>
</div>

### Add the Nox library
---
Add the [Nox.Lib nuget](https://www.nuget.org/packages/Nox.Lib) package to your project.
```powershell
dotnet add package Nox.Lib
```
Edit your Program.cs file and add/modify the following 👇 code sections:
```csharp
// (1) 👇 Add the following use library statement
using Nox;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// (2) 👇 Add Nox to the builder
builder.AddNox();

var app = builder.Build();

// (3) 👇 Add Nox to the application middleware
app.UseNox();

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

### Setup SQL Server
---

Let's spin up SQL Server in a Docker container. Create a `docker-compose.yaml` for running a SQL Server container in the root folder of your project.
```yaml
version: '3.7'

volumes:
  sqlserver: 
  
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
      - sqlserver:/var/opt/mssql/data
```
Then start your database with:
```bash
docker-compose up -d
```

### Database Migrations

We'll use Microsoft's [Entity Framework Core tools](https://learn.microsoft.com/en-us/ef/core/get-started/overview/first-app?tabs=netcore-cli) to scaffold our ```Cryptocash``` database and ```Currency``` table.

A glance at our Sql Server Docker instance will confirm that our ```Cryptocash``` project database has not yet been created.

<div align="center">
    <img src="https://noxorg.dev/docs/images/vscode_database-before.png" alt="Overview" width="100%">
    <br>
</div>

#### Prerequisites
---
Check if you have .NET [EF Core tools](https://www.nuget.org/packages/dotnet-ef) installed.
```powershell
dotnet ef --version
```

If you don't, install it as per below:
```powershell
dotnet tool install --global dotnet-ef
```

We're using SQL Server for our sample, so we'll add the relevant EF Core package to our project. If you're using an alternative database provider you can check for the appropriate directive [here](https://learn.microsoft.com/en-us/ef/core/providers/?tabs=dotnet-core-cli).

```powershell
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
dotnet add package Microsoft.EntityFrameworkCore.Design
```

#### Add & apply migrations
---
```powershell
dotnet ef migrations add InitialCreate --context CryptocashDbContext
```
Once we've run the command we'll notice a new ```./Migrations``` folder in our project containing the newly scaffolded migration files.

<div align="center">
    <img src="https://noxorg.dev/docs/images/vscode_migrations-folder.png" alt="Overview" width="100%">
    <br>
</div>

Let's apply the migrations as per the code snipped below:

```powershell
dotnet ef database update --context CryptocashDbContext
```
Now we'll notice that our ```Cryptocash``` database has been created and that it contains a ```Currency``` table with fields as per our ```./.nox/design/Currency.entity.nox.yaml``` definition.

<div align="center">
    <img src="https://noxorg.dev/docs/images/vscode_database-after.png" alt="Overview" width="100%">
    <br>
</div>

As expected, a simple Sql ```SELECT``` statement confirms that no data currently exists. 
### Run the project
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
    "Cryptocash": {
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
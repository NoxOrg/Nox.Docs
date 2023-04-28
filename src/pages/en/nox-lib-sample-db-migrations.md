---
title: Adding Database Migrations
category: Nox.Lib
description: Docs intro
layout: ../../layouts/MainLayout.astro
---
***
We're going to use Microsoft's [Entity Framework Core tools](https://learn.microsoft.com/en-us/ef/core/get-started/overview/first-app?tabs=netcore-cli) to scaffold our ```SampleCurrencyDb``` database and ```Currency``` table.

<div align="center">
    <img src="https://noxorg.dev/docs/images/vscode_database-before.png" alt="Overview" width="100%">
    <br>
</div>

A glance at our Sql Server Docker instance will confirm that our ```SampleCurrencyDb``` project database has not yet been created.

### Prerequisites
---

Check if you have .NET [EF Core tools](https://www.nuget.org/packages/dotnet-ef) installed.
```powershell
dotnet ef --version
```

If you don't, install it as per below:
```powershell
dotnet tool install --global dotnet-ef
```

### Adding Packages to our project
We're using Sql Server for our sample project, so we'll add the relevant EF Core package to our project. If you're using an alternative database provider you can check for the appropriate directive [here](https://learn.microsoft.com/en-us/ef/core/providers/?tabs=dotnet-core-cli).

```powershell
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
dotnet add package Microsoft.EntityFrameworkCore.Design
```

### Add Migrations
```powershell
dotnet ef migrations add InitialCreate --context NoxDbContext
```
Once we've run the command we'll notice a new ```./Migrations``` folder in our project containing the newly scaffolded migration files.

<div align="center">
    <img src="https://noxorg.dev/docs/images/vscode_migrations-folder.png" alt="Overview" width="100%">
    <br>
</div>

### Apply Migrations

```powershell
dotnet ef database update --context NoxDbContext
```
Now we'll notice that our ```SampleCurrencyDb``` database has been created and that it contains a ```Currency``` table with fields as per our ```./Design/Currency.entity.nox.yaml``` definition.

<div align="center">
    <img src="https://noxorg.dev/docs/images/vscode_database-after.png" alt="Overview" width="100%">
    <br>
</div>

As expected, a simple Sql ```SELECT``` statement confirms that no data currently exists.

Let's turn our attention to [adding additional entities](./nox-lib-sample-entities) to our project.
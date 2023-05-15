---
title: How does it work?
category: Nox
description: Docs intro
layout: ../../layouts/MainLayout.astro
---
***
At the heart of every Nox project lies a `solution definition` which is typically comprised of a `solution definition file` along with one (or more) `entity definition file(s)`. Together, they describe the solution we are building, along with the database provider (SQL Server, PostgreSQL, MySQL, etc.) and data schema used to generate the tables.

Apart from the afore-mentioned, these definition files can also be used to specify project elements like messaging provider (RabbitMQ, Azure Service Bus, Amazon SQS), data sources (JSON, CSV, EXCEL, Parquet, XML), version control (Azure DevOps), and identity management (Azure AD).

The `solution definition file` can either be manually authored or auto-generated using the [Nox.Cli](https://github.com/NoxOrg/Nox.Cli) command-line tool. It uses YAML-syntax and a JSON schema to ensure readability and accuracy. The `entity definition file(s)` are manually defined.

<div align="center">
    <br>
    <img src="https://noxorg.dev/docs/images/nox_tech-stack.png" alt="Overview" width="100%">
    <br>
    <br>
</div>

## Using the Solution Definition file

The Nox framework is aimed at both developers and DevOps engineers, and whilst their use-cases will differ slightly, the productivity benefits are evident to both user-types.

### Developers
From a development perspective, once the `solution design file(s)` are placed in the root project folder (or a dedicated 'design' sub-folder), and the Nox library is added to your source code the solution can be built with all the relevant components being automatically scaffolded.

### DevOps Engineers
From a DevOps Engineer perspective, the `solution definition file` is referenced via a series of command-line instructions that can create environments (DEV, UAT, PROD, etc.), set up version control repositories, user groups & permissions as well as commissioning databases.

Let's [get started](./getting-started)
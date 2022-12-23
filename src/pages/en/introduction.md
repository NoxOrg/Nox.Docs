---
title: Introduction
description: Docs intro
layout: ../../layouts/MainLayout.astro
---

Nox lets you focus on your business problem and domain, and provides you with the following auto-magic features:-

- Declaration of your core application and domain (models, data, entities, attributes and bounded contexts) in a declaritive and easily maintainable way (YAML, using YamlDotNet)
- Automatic (and selective) Create, Read, Update and Delete (CRUD) API for entities and/or aggregate roots (supports REST with OData, with GraphQL and gRPC in the making)
- The choice of persisting your data in any database with current support for Sql Server, Postgress or MySql (using Entity Framework)
- Automated Database Migrations (coming soon)
- Validation of entities and attributes (using FluentValidation)
- Logging, Observability and Monitoring (using SeriLog)
- Events and Messaging (In process/Mediator, Azure Servicebus, Amazon SQS, RabbitMQ) using MassTransit
- Extract-transform and load definitions from any database, file or API with bulk load and merge support
- A task scheduler for running recurring tasks at periodic intervals (using Hangfire)
- Automated DevOps including testing and deployment

## Built With
---
[![.NET][.NET]][.NET-url]
[![ETLBox][ETLBox]][ETLBox-url]
[![AutoMapper][AutoMapper]][AutoMapper-url]
[![Hangfire][Hangfire.io]][Hangfire-url]
[![MassTransit][MassTransit]][MassTransit-url]
[![YamlDotNet][YamlDotNet]][YamlDotNet-url]
[![FluentValidation][FluentValidation]][FluentValidation-url]

## Acknowledgments

Nox would not have been possible without the many open-source projects that it draws from. The goal is to build on top of an already rich ecosystem of great libraries and tools like Microsoft's .NetCore, YamlDotNet, NewtonSoft.Json, Hangfire, Serilog, SqlKata, ETLBox, Entity Framework, MassTransit and others.


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/noxorg/Nox.svg?style=for-the-badge
[contributors-url]: https://github.com/noxorg/Nox/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/noxorg/Nox.svg?style=for-the-badge
[forks-url]: https://github.com/noxorg/Nox/network/members
[stars-shield]: https://img.shields.io/github/stars/noxorg/Nox.svg?style=for-the-badge
[stars-url]: https://github.com/noxorg/Nox/stargazers
[issues-shield]: https://img.shields.io/github/issues/noxorg/Nox.svg?style=for-the-badge
[issues-url]: https://github.com/noxorg/Nox/issues
[license-shield]: https://img.shields.io/github/license/noxorg/Nox.svg?style=for-the-badge
[license-url]: https://github.com/noxorg/Nox/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://ch.linkedin.com/in/sharpeandre
[product-screenshot]: images/goo-goo.gif
[ETLBox]: https://img.shields.io/badge/ETLBox-000000?style=for-the-badge
[ETLBox-url]: https://www.etlbox.net/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[Hangfire.io]: https://img.shields.io/badge/Hangfire-0769AD?style=for-the-badge
[Hangfire-url]: https://www.hangfire.io/ 
[.NET]: https://img.shields.io/badge/.NET-512BD4?style=for-the-badge&logo=dotnet&logoColor=white
[.NET-url]: https://dotnet.microsoft.com/
[MassTransit]: https://img.shields.io/badge/MassTransit-0EA5E9?style=for-the-badge
[MassTransit-url]: https://masstransit-project.com/
[YamlDotNet]: https://img.shields.io/badge/YamlDotNet-8B0000?style=for-the-badge
[YamlDotNet-url]: https://github.com/aaubry/YamlDotNet
[AutoMapper]: https://img.shields.io/badge/AutoMapper-BE161D?style=for-the-badge
[AutoMapper-url]: https://automapper.org/
[FluentValidation]: https://img.shields.io/badge/FluentValidation-2980B9?style=for-the-badge
[FluentValidation-url]: https://docs.fluentvalidation.net/
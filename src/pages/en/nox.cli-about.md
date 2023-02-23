---
title: About Nox.Cli
description: Docs intro
layout: ../../layouts/MainLayout.astro
---
***
Nox.Cli is a companion command-line tool that supports the core [Nox library](https://github.com/NoxOrg/Nox). Its *raison d'être* is to build upon Nox's strong efficiency focus by extending that vision to the entire Enterprise Software Roadmap. This includes fast-tracking of DevOps functions like deployment to multiple environments, setting up CI/CD pipelines and configuring resource permissions. This is achieved by integrating seamlessly with existing enterprise assets and services like Helm charts, Azure KeyVault and Active Directory.

Nox.Cli is declarative in nature with the primary aim of describing a project or solution. It uses a range of plugin technologies in the development, infrastructure and DevOps realms to rapidly configure and deploy a solution in the enterprise.

<div align="center">
    <img src="https://noxorg.dev/docs/images/nox-cli_component-diagram.png" alt="Overview" width="100%">
</div>

### Main Features
---

- Accelerate and simplify the development and deployment of enterprise-grade microservices**
- Cross-platform implementation with support for Windows, Linux and MacOS
- Easy to install and run on developer/engineer desktop or integrate directly into DevOps pipeline
- Workflows use YAML-syntax and is based on GitHub Actions
- Self-documentation of project workflow to fast-track productivity of all team members that work on a project
- Open-source plugin-based architecture allows for using/customising existing actions or developing your own
- Users are identified based on Azure Login or other interactive authorisation service
- Input commands (workflows) can be project-specific or organisation-centric by way of a Tenant manifest maintained by DevOps
- Both project and Tenant KeyVaults are supported
- Can be used both for local development environment and DevOps pipeline
- Central management and deployment of common organisational scripts
- Automatically updates scripts and notifies developers of version updates
- Support secure remote task execution


** In conjunction with the [Nox.NET](https://github.com/NoxOrg/Nox) library

### Built With
---
[![.NET][.NET]][.NET-url]
[![schema.org][schema.org]][schema.org-url]
[![YamlDotNet][YamlDotNet]][YamlDotNet-url]

[build-shield]: https://img.shields.io/github/actions/workflow/status/noxorg/nox.cli/nox_ci.yaml?branch=main&event=push&label=Build&style=for-the-badge
[build-url]: https://github.com/noxorg/nox.cli/actions/workflows/nox_ci.yaml?query=branch%3Amain
[contributors-shield]: https://img.shields.io/github/contributors/noxorg/nox.cli.svg?style=for-the-badge
[contributors-url]: https://github.com/noxorg/nox.cli/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/noxorg/nox.cli.svg?style=for-the-badge
[forks-url]: https://github.com/noxorg/nox.cli/network/members
[stars-shield]: https://img.shields.io/github/stars/noxorg/nox.cli.svg?style=for-the-badge
[stars-url]: https://github.com/noxorg/nox.cli/stargazers
[issues-shield]: https://img.shields.io/github/issues/noxorg/nox.cli.svg?style=for-the-badge
[issues-url]: https://github.com/noxorg/nox.cli/issues
[license-shield]: https://img.shields.io/github/license/noxorg/nox.cli.svg?style=for-the-badge
[license-url]: https://github.com/noxorg/nox.cli/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://ch.linkedin.com/in/sharpeandre
[security-shield]: https://img.shields.io/sonar/vulnerabilities/NoxOrg_Nox/main?server=https%3A%2F%2Fsonarcloud.io&style=for-the-badge
[security-url]: https://sonarcloud.io/project/security_hotspots?id=NoxOrg_Nox
[product-screenshot]: images/goo-goo.gif
[schema.org]: https://img.shields.io/badge/schema.org-8B0000?style=for-the-badge
[schema.org-url]: https://www.schema.org/
[.NET]: https://img.shields.io/badge/.NET-512BD4?style=for-the-badge&logo=dotnet&logoColor=white
[.NET-url]: https://dotnet.microsoft.com/
[YamlDotNet]: https://img.shields.io/badge/YamlDotNet-0769AD?style=for-the-badge
[YamlDotNet-url]: https://github.com/aaubry/YamlDotNet

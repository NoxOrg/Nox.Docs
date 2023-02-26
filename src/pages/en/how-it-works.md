---
title: How does it work?
description: Docs intro
layout: ../../layouts/MainLayout.astro
---
***
At its core, Nox relies on a `project definition file` which describes the attributes as well as the deployment strategy and associated tech–stack.

This file can either be manually authored or auto–generated using the [Nox.Cli](https://github.com/NoxOrg/Nox.Cli) command–line tool. It uses YAML–syntax and a JSON schema to ensure readability and accuracy.

<div align="center">
    <img src="https://noxorg.dev/docs/images/nox_tech-stack.png" alt="Overview" width="100%">
</div>

## Using the Project Definition file

The Nox project is aimed at both developers and DevOps engineers, and whilst their use–cases will differ slightly, the productivity benefits are evident to both user–types.

#### Developers
From a development perspective, once the `project definition file` is placed in the project folder, and the Nox library is added to your source code the project can be built with all the relevant components being automatically scaffolded.

#### DevOps Engineers
From a DevOps Engineer perspective, the `project definition file` is referenced via a series of command–line instructions that can propogate environments (DEV, UAT, PROD, etc.), set up version control repositories, user groups & permissions as well as commissioning databases.

Let's [get started](./getting-started)
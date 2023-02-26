---
title: Sample Project
category: Nox.Cli
description: Docs intro
layout: ../../layouts/MainLayout.astro
---
***
The development project built for our [Nox](https://github.com/NoxOrg/Nox) sample was a [simple currency microservice](https://github.com/NoxOrg/Nox#creating-a-project) with all the expected CRUD endpoints to add & maintain the currencies of our choice. We're going to use the Nox.Cli companion tool to set up the entire DevOps environment that accompanies that project.

### Defining the Project

Running the `nox new` command outlines its usage options as seen below: -

```powershell
nox new
```

<div align="center">
    <img src="https://noxorg.dev/docs/images/nox-cli_new.png" alt="Overview">
    <br/>
    <br/>
</div>

Let's create a folder for our project and run the `nox new service` command from within the newly created folder: -

```powershell
mkdir CurrencyConverter
cd .\CurrencyConverter\
nox new service
```
A series of questions follows which will determine the initial configuration of our project environment. Upon completion of the input, these options will be saved into the project configuration file called `{service.name}.service.nox.yaml`

<div align="center">
    <img src="https://noxorg.dev/docs/images/nox-cli_new-input.png" alt="Overview">
    <br/>
    <br/>
</div>

As you can see, the service configuration file is now present in our default project directory. Opening this file in a code editor of your choice will reveal configuration options that echoes your input from the preceding interactive step.

<div align="center">
    <img src="https://noxorg.dev/docs/images/nox_directory-service-yaml.png" alt="Overview">
    <br/>
    <br/>
</div>

The YAML file is registered with [schema.org](https://schema.org/) so we get linting and auto-completion to ensure accuracy and speed in configuring our service. The schema used to describe our sample project can be viewed [here](https://noxorg.dev/schemas/NoxConfiguration.json).

<div align="center">
    <img src="https://noxorg.dev/docs/images/vscode_service-yaml.png" alt="Overview">
    <br/>
</div>

### Commissioning the Environment

Now we have defined the project attributes but all we have is a simple YAML file, but no environment as yet. Well this is where the magic really starts. We'll turn our attention to the `nox sync` command and its various options to read our project configuration file and set up the project environment as per our input.

```powershell
nox sync
```

<div align="center">
    <img src="https://noxorg.dev/docs/images/nox-cli_sync.png" alt="Overview">
    <br/>
</div>

#### Version Control

This step will go and check the specified DevOps server and create our version control repository if not already present.
```powershell
nox sync version-control
```
<div align="center">
    <img src="https://noxorg.dev/docs/images/nox-cli_sync-version-control.png" alt="Overview">
    <br/>
    <br/>
</div>

Subsequent to running this command a cursory glance at our DevOps server will reveal the newly created project.

<div align="center">
    <img src="https://noxorg.dev/docs/images/dev-azure-com_projects.png" alt="Overview">
    <br/>
</div>

#### Azure Active Directory

```powershell
nox sync azure-active-directory
```
<div align="center">
    <img src="https://noxorg.dev/docs/images/nox-cli_sync-azure-active-directory.png" alt="Overview">
    <br/>
    <br/>
</div>

You'll notice that your project group have now been created on Azure Active Directory.
<div align="center">
    <img src="https://noxorg.dev/docs/images/portal-azure-com_group-overview.png" alt="Overview">
    <br/>
    <br/>
</div>

If you click on the Members link of the group you'll seet that the users are as per your earlier project configuration.
<div align="center">
    <img src="https://noxorg.dev/docs/images/portal-azure-com_group-members.png" alt="Overview">
    <br/>
</div>

#### Database

```powershell
nox sync database
```
<div align="center">
    <img src="https://noxorg.dev/docs/images/nox-cli_sync-database.png" alt="Overview">
    <br/>
</div>

#### Helm Chart

```powershell
nox sync helm-chart
```
<div align="center">
    <img src="https://noxorg.dev/docs/images/nox-cli_sync-helm-chart.png" alt="Overview">
    <br/>
    <br/>
</div>

Having a look at your project on the DevOps server will reveal that the Helm Chart repo have been created.

<div align="center">
    <img src="https://noxorg.dev/docs/images/dev-azure-com_repos-helm-chart.png" alt="Overview">
    <br/>
    <br/>
</div>

And selecting the `App.Helmchart` repo will show the relevant files.

<div align="center">
    <img src="https://noxorg.dev/docs/images/dev-azure-com_repos-helm-chart-detail.png" alt="Overview">
    <br/>
</div>
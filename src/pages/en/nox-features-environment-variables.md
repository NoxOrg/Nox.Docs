---
title: Environment Variables
category: Nox.Lib
description: Docs intro
layout: ../../layouts/MainLayout.astro
---
***
Apart from the standard .NET feature-set to protect sensitive information, NOX also supports a convenient way to use environment variables for this purpose.

Nox will expand any text with the following convention `${{ env.VAR_NAME }}` to the value of **VAR_NAME** Environment Variable if found.

Environment variables used in our Nox solution file can be set/declared in one of two ways, either at a global PC/Server level or in your YAML file.

For our example we'll set more sensitive info on a global level, and database settings in the solution file.

### Setting Environment Variables - Global

Windows environment variables can be set globally using the `setx` commandlet within `cmd.exe`. The code snippet below outlines how we'll set the `DB_USER` and `DB_PASSWORD` globally on our PC.

```cmd
setx DB_USER sa
setx DB_PASSWORD Developer*123
```

Restart your `cmd.exe` window and confirm that your environmental settings have been applied globally as per the screenshot below:

<div align="center">
    <img src="https://noxorg.dev/docs/images/cmd_nox-features-environment-variables.png" alt="Overview" width="100%">
    <br>
</div>

### Set Environment Variables in YAML

We'll need to make the following changes in our Cryptocash solution file, `.nox/design/Cryptocash.solution.nox.yaml`.

Let's start by declaring and assigning the variables we intend to use at the top of our Nox solution file using the YAML `variables` node. Add this code after the `description` node:

```yaml
variables:
  DB_PROVIDER: slqServer
  DB_SERVER: localhost
  DB_PORT: "1433"
```

Let's update our Cryptocash solution file, `.nox/design/Cryptocash.solution.nox.yaml` and substitute the hardcoded values with the new values set as environment variables:

```yaml
infrastructure:
  
  persistence:

    databaseServer:
      name: Cryptocash
      provider: ${{ env.DB_PROVIDER }}
      options: Trusted_Connection=no;connection timeout=120;TrustServerCertificate=True
      serverUri: ${{ env.DB_SERVER }}
      port: ${{ env.DB_PORT }}
      user: ${{ env.DB_USER }}
      password: ${{ env.DB_PASSWORD }}
```

Our Cryptocash solution file now looks like the screenshot below:

<div align="center">
    <img src="https://noxorg.dev/docs/images/vscode_nox-features-environment-variables.png" alt="Overview" width="100%">
    <br>
</div>

The Nox generator will now substitute these environment variable values in our assembly. 
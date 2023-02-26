---
title: Installation
category: Nox.Cli
description: Docs intro
layout: ../../layouts/MainLayout.astro
---
### Prerequisites
---

Make sure you have .NET 6.0 or later installed on your PC.
```powershell
dotnet --version
```

If you don't have .NET installed you can download the latest version [here](https://dotnet.microsoft.com/en-us/download).

### Install the Nox.Cli tool
---
The Nox.Cli tool is hosted on nuget.org [here](https://www.nuget.org/packages/Nox.Cli) and additional installation options are detailed there. The recommended installation method is outlined below: -
```powershell
dotnet tool install --global Nox.Cli
```
Running the Nox.Cli tool installation with the global option yields the following output: -

<div align="center">
    <img src="https://noxorg.dev/docs/images/nox-cli_install-clean.png" alt="Overview" width="100%">
</div>

Running Nox.Cli for the first time yields the following output: -

```powershell
nox
```

<div align="center">
    <img src="https://noxorg.dev/docs/images/nox-cli_run-check-credentials.png" alt="Overview" width="100%">
    <br/>
    <br/>
</div>

> 💡 You may notice from the screenshot that if you are logged in to Azure it will automatically use these credentials. In the event that you're not logged into Azure you will be redirected to Microsoft login screen in a browser: -

<div align="center">
    <img src="https://noxorg.dev/docs/images/windows_login-selection.png" alt="Overview">
    <br/>
    <br/>
</div>

> 💡 The second important thing to note is that apart from the `--version` and `--logout` commands, the additional commands listed above are dynamically added from the workflows folder in your local repository or from a script repository which is linked to your organisation, hosted at `https://noxorg.dev/workflows/{tenant.id}/index.php`
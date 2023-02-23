---
title: Manifest File
category: Nox.Cli
description: Docs intro
layout: ../../layouts/MainLayout.astro
---
***
The manifest file is tasked with propogating the enterprise–level configurations related to our project. It is hosted in a tenant–specific folder on the Nox website and would typically be maintained by the DevOps team.

<div align="center">
    <img src="https://noxorg.dev/docs/images/vscode_manifest-yaml.png" alt="Overview">
    <br/>
    <br/>
</div>

Firstly, the `secrets:` section is where we link to our secrets provider and vault url.

The `branches:` section is where we specify the command 'categories'—for the lack of a more tech–propriate term.
You'll recall from running the `nox` command previously that it listed the `new`, `sync` and `version` commands as options. We'll disregard the `logout` command for now as it's baked into the tool. You will however see how these three commands have been propogated from the manifest file.

<div align="center">
    <img src="https://noxorg.dev/docs/images/vscode_new-service.png" alt="Overview">
    <br/>
    <br/>
</div>

Reviewing the various workflow yaml files will show how commands and their aliases are linked to the branches, outlined above. In the `NewNoxService.workflow.nox.yaml` example above, we can see how the `service` command, the `sv` alias and `|sv - Creates a new NOX app/service` description is linked to the `new` branch.

Further examination of the file will also reveal the various steps performed as part of the workflow.

<div align="center">
    <img src="https://noxorg.dev/docs/images/nox-cli_new-service-highlighted.png" alt="Overview">
    <br/>
    <br/>
</div>

Similarly, in the `SyncDatabaseScript.workflow.nox.yaml` example below, we can see how the `database` command, the `db` alias and `|db - Ensures hosted database and roles exist for your NOX definition` description is linked to the `sync` branch.

<div align="center">
    <img src="https://noxorg.dev/docs/images/vscode_sync-database.png" alt="Overview">
    <br/>
    <br/>
</div>

And the output when running the `nox sync` command without any arguments reflect this: -

<div align="center">
    <img src="https://noxorg.dev/docs/images/nox-cli_sync-database-highlighted.png" alt="Overview">
    <br/>
    <br/>
</div>

Finally, the `remote-task-proxy:` section points to the url and authorisation–provide for the remote task executor which will conver in more detail later.
---
title: The Nox 'Design' Folder
category: Nox.Lib
description: Docs intro
layout: ../../layouts/MainLayout.astro
---
***
Now that we're extending our solution, it's a good idea to get a bit more organised. We're going to create a new folder in the root of our solution to keep all the configuration files that define the design of our Nox solution.

We'll call it ```./Design```, but you can call it whatever you like.

Next we'll update our ```appsettings.json``` file by adding a dedicated Nox section and specifying where the design files are stored. Add/modify the following 👇 code sections:

```json
{
    "Logging": {
        "LogLevel": {
            "Default": "Debug",
      "System": "Information",
      "Microsoft": "Information"
    }
  },
  // 👇 Add a Nox section and specify the DefinitionRootPath
  "Nox": {
    "DefinitionRootPath": "./Design"
  }
}
```
> 💡 The Nox library is intuitive enough to scan your project folder tree to locate solution design files. Strictly speaking the step outlined above isn't required, but it's a good practice to include it for the sake of clarity.

We'll follow this by moving the ```SampleCurrency.solution.nox.yaml``` file that we've previously created from the root folder into our newly created ```./Design``` folder.

We'll also create a subfolder for each of our entities. For this example we'll move the ```Currency.entity.nox.yaml``` file into a ```./Design/Currency``` subfolder.

Our project structure should look similar to the image below now

<div align="center">
    <img src="https://noxorg.dev/docs/images/nox-lib-sample-design-folder.png" alt="Overview" width="100%">
    <br>
    <br>
</div>

For our next step, we'll build the project and [add and apply initial database migration](./nox-lib-sample-db-migrations)
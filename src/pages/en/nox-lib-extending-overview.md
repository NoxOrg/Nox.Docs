---
title: Customising your Solution
category: Nox.Lib
description: Docs intro
layout: ../../layouts/MainLayout.astro
---
***
Nox offers several ways to add custom endpoint/controllers, commands, queries and DTOs. The options include:

- Extend existing partial classes that have been generated
- Override methods in classes that have been generated
- Create new class defintions for custom functionality

> 💡 Learn more about .NET source generators and how they're implemented by reading [this article](https://learn.microsoft.com/en-us/dotnet/csharp/roslyn-sdk/source-generators-overview).

In a code editor that enables you to view generated source code, like [Visual Studio](https://visualstudio.microsoft.com/vs/community/), collapse the Dependencies > Analyzers > Nox.Generator > Nox.Generator.NoxCodeGenerator tree under the Solution Explorer tab.

<div align="center">
    <img src="https://noxorg.dev/docs/images/visual-studio_sample-nox-generator2.png" alt="Overview" width="100%">
    <br>
</div>

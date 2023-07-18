---
title: Getting started
category: Nox
description: Docs intro
layout: ../../layouts/MainLayout.astro
---
***
We've chosen a simple currency converter use-case for our sample project. It's a universally understood concept which relies on a relatively static set of entities (global currencies and countries) along with associated values which are dynamic (real-time) in nature.

The first—and most important—part of realizing our sample project will be creating the `solution definition` file. There are two ways we can achieve this, and typically the approach will be defined by which hat you're wearing—developer or DevOps engineer.

### Developer
We're going to use our code-editor of choice to create the `solution definition yaml` file. We'll add the Nox library to our souce code, build our solution and we'll be up & running with a simple currency microservice with all the expected CRUD endpoints.

I'm a developer, [get me outta here](nox-lib-quick-start-project)

### DevOps engineer
We're going to use the Nox.Cli tool to define our solution and scaffold our entire environment, including version-control repository, project team, deployment environments, and database.

I like clicking ⚙️, [let's do this](nox-cli-installation)
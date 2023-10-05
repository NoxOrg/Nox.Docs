---
title: Domain Aggregation in Nox
category: Nox.Lib
description: Docs intro
layout: ../../layouts/MainLayout.astro
---
***

Nox supports the *Aggregate* pattern in [Domain-Driven Design](https://en.wikipedia.org/wiki/Domain-driven_design) (DDD), essentially allowing you to group Domain Objects into a cluster that can be treated as a single unit.

> *"An aggregate will have one of its component objects be the aggregate root. Any references from outside the aggregate should only go to the aggregate root. The root can thus ensure the integrity of the aggregate as a whole."* - [Martin Fowler](https://en.wikipedia.org/wiki/Martin_Fowler_(software_engineer))

If you'd like an overview of the Aggregate Pattern within DDD, [this excellent article](https://code-maze.com/csharp-design-pattern-aggregate/) over at [CodeMaze](https://code-maze.com/) does a great job explaining the concept, along with an illustrative use-case.

### Creating an Aggregate Root

The built-in code generation feature in Nox makes it very simple to enable *Domain Aggregation*. As with many of Nox's features, it is configured in the entity file.

To create an *aggregate root* entity—also referred to as a *parent entity*—or convert an existing entity, we simply:
- Add an `ownedRelationShips` node below the `attributes` in our entity design file
- Give the relationship a descriptive name and specify the relationship type
- Link it to a child/owned entity

As the name suggests, `ownedRelationShips` enables an aggregate root to be linked to one or multiple entities.

Let's return to `Currency`, the single entity we've declared up to now. We'll create a new *owned relationship* `CurrencyCommonBankNotes` and link it to a new entity called `BankNote` which we'll create in the next step.

Add the code snippet below to `.nox/Design/Currency/Currency.entity.nox.yaml`

```yaml
ownedRelationships:
    
  - name: CurrencyCommonBankNotes
    description: commonly used
    relationship: zeroOrMany
    entity: BankNote
```

### Declaring an Owned Entity

An *owned entity*—also referred to as a *child entity*—is created in the same way as any other entity in Nox, as long as the entity name matches the name assigned to the `entity` attribute in the `ownedRelationships` node of the parent entity definition file.

Add a new ```./Design/BankNote``` folder and create the ```BankNote.entity.nox.yaml``` file as per the code snippet below:

```yaml
#
# BankNote.entity.nox.yaml
#

name: BankNote

description: Bank Notes in circulation related to specific a specific currency

keys:

  - name: Id
    isRequired: true
    description: Currency bank note unique identifier 
    type: autoNumber

attributes:

  - name: CashNote
    description: Currency's cash bank note identifier
    type: text
    textTypeOptions:
      minLength: 4
      maxLength: 63
    isRequired: true

  - name: Value
    description: Bank note value
    type: money     
    isRequired: true  

persistence:
    isAudited: false
```
### Update the Database

Let's add a database migration for our new `BankNote` entity and apply it to the `Cryptocash` database.

```powershell
dotnet ef migrations add AddBankNote --context CryptocashDbContext
```
Have a look in the ```./Migrations``` folder and you'll notice that in addition to the normal `<timestamp>_AddBankNote.cs` migration, there is also a `<timestamp>_AddBankNoteOwned.cs` migration which takes care of configuring all the database settings for the child entity.

<div align="center">
    <img src="https://noxorg.dev/docs/images/vscode_nox-features-database-migrations-folder.png" alt="Overview" width="100%">
    <br>
</div>

Let's apply the migrations as per the code snippet below:

```powershell
dotnet ef database update --context CryptocashDbContext
```
Now we'll notice if we refresh our ```Cryptocash``` database view, the `BankNote` table has been created along with the additional *owned entity* attributes like the `CurrencyId` field and the `FK_BankNote_Currencies_CurrencyId` key linking it to its parent.

<div align="center">
    <img src="https://noxorg.dev/docs/images/vscode_nox-features-database-migration-addbanknote.png" alt="Overview" width="100%">
    <br>
</div>

We have successfully converted our `Currency` entity into an aggregate root, and created an owned entity by linking the `BankNote` entity to it.
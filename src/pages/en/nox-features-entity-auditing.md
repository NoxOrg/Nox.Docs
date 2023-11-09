---
title: Entity Auditing in Nox
category: Nox.Lib
description: Docs intro
layout: ../../layouts/MainLayout.astro
---
***

Nox has out-the-box support to enable the auditability of any entity within your Nox Solution. Within the current implementation, the audit information is persisted at database level, with the addition of dedicated fields inside the entity table.

### Enable Auditing on an Entity

As with many of Nox's features, *entity auditability* is configured in the relevant entity file.

Let's create a new *Exchange Rate* entity for our project by creating a new `.nox/Design/ExchangeRate/ExchangeRate.entity.nox.yaml` file as per the code snippet below:

```yaml
#
# ExchangeRate.entity.nox.yaml
#

name: ExchangeRate

description: Exchange rate and related data

keys:

  - name: Id
    isRequired: true
    description: Exchange rate unique identifier 
    type: autoNumber

attributes:

  - name: EffectiveRate
    description: Exchange rate conversion amount
    type: number     
    isRequired: true  

  - name: EffectiveAt
    description: Exchange rate conversion amount
    type: dateTime     
    isRequired: true  

persistence:
    isAudited: true
```

Of specific interest here is the inclusion of the `isAudited: true` attribute under the `persistence` node.

> ⚠️ Within Nox, entity auditing is disabled at child/[owned entity](https://noxorg.dev/en/nox-features-domain-aggregation/#declaring-an-owned-entity) level. For owned entities, ensure that auditing is set at the parent/[aggregate root](https://noxorg.dev/en/nox-features-entity-auditing) entity level.

That's all it takes to turn on auditability on any entity within our Nox solution.

### Update the Database

We'll add migrations and update the Cryptocash database:

```powershell
dotnet ef migrations add AddExchangeRate --context AppDbContext
dotnet ef database update --context AppDbContext
```

Let's have a closer look at what the Nox.Generator have done as well as the resultant migration.

- Unlike `BankNote` and `Currency` which extends the `EntityBase` class, `ExchangeRate` extends `AuditableEntityBase` which in turn extends `IEntity`, `IEntityAuditCreated`, `IEntityAuditUpdated` and `IEntityAuditDeleted`.
- It's evident from the added migration that all the required create, update and delete fields have been added to the `ExchangeRate` model, and by extension, to the database.

<div align="center">
    <img src="https://noxorg.dev/docs/images/visual-studio_nox-features-entity-auditability.png" alt="Overview" width="100%">
    <br>
</div>

### View Audit Information

As have been indicated previously, audit information is persisted at database level. So all that remains to do is process some create, update and delete actions and have a look at the information available to us.

We'll start by processing a `POST` request to create a new `ExchangeRate` record.

Nox supports two additional HTTP header attributes. `X-User-Name` is used to indicate the currently logged in user or process name. `X-System-Name` indicates the system from which the request originates. For our example we'll populate these attributes as per the screenshot below:

<div align="center">
    <img src="https://noxorg.dev/docs/images/postman_nox-features-auditability-post-header.png" alt="Overview" width="100%">
    <br>
</div>

All that remains is to create the JSON body and click *Send*. We get a 201 confirmation that a new `ExchangeRate` entry have been created.

<div align="center">
    <img src="https://noxorg.dev/docs/images/postman_nox-features-auditability-post-body-201.png" alt="Overview" width="100%">
    <br>
</div>

Using a database management utility of our choice, we can see that our `ExchangeRate` entry have been persisted and the `CreatedAtUtc`, `CreatedBy` and `CreatedVia` fields reflect all the audit info we expect.

<div align="center">
    <img src="https://noxorg.dev/docs/images/vscode_nox-features-auditability-database-created.png" alt="Overview" width="100%">
    <br>
</div>

### Audit Info for Updates

Let's update the `ExchangeRate` entry we've just created with a new value and effective date. We'll need to get the ETag off the record we're updating. Since there's only one entry we'll do a `GET` request on `api/ExchangeRates`

<div align="center">
    <img src="https://noxorg.dev/docs/images/postman_nox-features-auditability-get-etag.png" alt="Overview" width="100%">
    <br>
</div>

Next we'll create a new `PUT` request as per the screenshot below. We'll keep the `X-User-Name` and `X-System-Name` attributes as per our `POST` request, and we'll assign the ETag we copied in the previous step to the `If-Match` attribute on our request header. Don't forget to update the request URL with the Id of the record we're updating:

<div align="center">
    <img src="https://noxorg.dev/docs/images/postman_nox-features-auditability-put-header.png" alt="Overview" width="100%">
    <br>
</div>

Update the JSON body with the new rate and effective date/time and click *Send*. We get a 200 confirmation that the `ExchangeRate` entry have been updated.

<div align="center">
    <img src="https://noxorg.dev/docs/images/postman_nox-features-auditability-put-body-200.png" alt="Overview" width="100%">
    <br>
</div>

Looking at the database entry, we can see that our `ExchangeRate` entry have been updated and the `LastUpdatedAtUtc`, `LastUpdatedBy` and `LastUpdatedVia` fields reflect the audit info to match the action.

<div align="center">
    <img src="https://noxorg.dev/docs/images/vscode_nox-features-auditability-database-updated.png" alt="Overview" width="100%">
    <br>
</div>

### Audit Info for Delete

Finally let's delete the `ExchangeRate` entry we've just created and updated. Again, we'll need to get the ETag of the entry we're planning to delete. Create the `DELETE` request as per the screenshot below.

Assign the ETag to the `If-Match` attribute on our request header and update the request URL with the Id of the record we're deleting. Click *Send* and notice the 204 confirmation that our request have been successful.

<div align="center">
    <img src="https://noxorg.dev/docs/images/postman_nox-features-auditability-delete-header-204.png" alt="Overview" width="100%">
    <br>
</div>

Looking at the database entry, we can see that our `ExchangeRate` entry have been ['soft' deleted](https://en.wiktionary.org/wiki/soft_deletion) and the `DeletedAtUtc`, `DeletedBy` and `DeletedVia` fields reflect the audit info to match the delete action.

> 💡 Nox doesn't use a dedicated flag to mark records as deleted, rather it is extrapolated from the `DeletedAtUtc` field.

<div align="center">
    <img src="https://noxorg.dev/docs/images/vscode_nox-features-auditability-database-deleted.png" alt="Overview" width="100%">
    <br>
</div>
---
title: Localization in Nox
category: Nox.Lib
description: Docs intro
layout: ../../layouts/MainLayout.astro
---
***
Nox has a rich feature-set that supports the adaptation of the solution to different cultures and languages, known as [localization](https://en.wikipedia.org/wiki/Internationalization_and_localization). It is simple to configure and implement localization support within your Nox solution.

### Setting Solution Defaults
Default localization settings are configured in the Nox solution file. Let's update our Cryptocash solution by adding a `localization` node under the `application` section of our `.nox/design/Cryptocash.solution.nox.yaml` file as per the code snippet below:

```yaml
localization:
  supportedCultures:
    - fr-FR
    - de-DE
    - en-US
  defaultCulture: en-US
```

### Configure Entities
Localization for entities are configured at entity attribute level and is found at the `<entity>TypeOptions` property of supported entity types.

To illustrate, let's add a `Country` entity to our Cryptocash solution and configure the country name as a localized field. Create a new entity file `.nox/design/Country/Country.entity.nox.yaml` as per the code snippet below:

```yaml
#
# Country.entity.nox.yaml
#
# yaml-language-server: $schema=https://noxorg.dev/schemas/entity.json
#

name: Country

description: Country and related data

keys:

  - name: Id
    isRequired: true
    description: Country unique identifier 
    type: countryCode2 

attributes:

  - name: Name
    description: Country's name
    type: text
    textTypeOptions:
      minLength: 4
      maxLength: 63
      isLocalized: true
    isRequired: true

  - name: CountryIsoNumeric
    description: Country's iso number id
    type: countryNumber     
    isRequired: false  

  - name: CountryIsoAlpha3
    description: Country's iso alpha3 id
    type: countryCode3     
    isRequired: false

persistence:
    isAudited: false    
    create:
        isEnabled: true
        raiseEvents: domainEventsOnly
    read:
        isEnabled: true
    update:
        isEnabled: true
        raiseEvents: domainEventsOnly
    delete:
        isEnabled: true
        raiseEvents: domainEventsOnly
```
Under the `Name` attribute, take note of the `isLocalized: true` property that has been set, under the `textTypeOptions`.

Closer inspection of the Nox generated code will reveal among others, a `CountryLocalizedDto` class definition as well as a new model entity called `CountryLocalized` which includes an `Id` and `CultureCode` along with the localized field we specified.

<div align="center">
    <img src="https://noxorg.dev/docs/images/visual-studio_nox-features-localization-generated-code.png" alt="Overview" width="100%">
    <br>
</div>

Since our entity localization table have been added to the Cryptocash model, we'll add migrations and update the Cryptocash database:

```powershell
dotnet ef migrations add CountryLocalized --context AppDbContext
dotnet ef database update --context AppDbContext
```

### Default Culture

Our API requests supports the addition of a specific culture code related to our request—we'll cover this in more detail below. When no culture code is specified, the application will use the `defaultCulture` that we specified in our Nox solution file.

Let's see our localization changes in action. We'll start by adding a new country entry via the `/api/Countries` endpoint, as per the Postman graphic below. In this instance we won't specify a culture code.

<div align="center">
    <img src="https://noxorg.dev/docs/images/postman_nox-features-localization-localized-post.png" alt="Overview" width="100%">
    <br>
</div>

Using a database utility of choice, we'll notice that our migrations have added the `CountriesLocalized` table, and that apart from the country we created being persisted to the default `Countries` table, an entry have also been created in the `CountriesLocalized` table with a `CultureCode` of `en-US`.

<div align="center">
    <img src="https://noxorg.dev/docs/images/dbeaver_nox-features-localization-localized-post.png" alt="Overview" width="100%">
    <br>
</div>

### Update Localized Information

Next we'll update our added country with an additional translation for our localized `name` property.

As per the Postman graphic below, do the following:
- Add the relevant country key to the request Url
- On the header tab add the `If-Match` Http header property and paste the eTag in double quotes
- Add the `Accept-Language` Http header property and specify the relevant culture code

<div align="center">
    <img src="https://noxorg.dev/docs/images/postman_nox-features-localization-localized-put-header.png" alt="Overview" width="100%">
    <br>
</div>

Update the request body with the translated information, as per the graphic below and click send:

<div align="center">
    <img src="https://noxorg.dev/docs/images/postman_nox-features-localization-localized-put-body-200.png" alt="Overview" width="100%">
    <br>
</div>

If you've received a `200 OK` response to your `PUT` request, your database entries should now look similar to the graphic below. You'll notice that an additional entry with the translated name and culture code have now been persisted to the `CountriesLocalized` table.

<div align="center">
    <img src="https://noxorg.dev/docs/images/dbeaver_nox-features-localization-localized-put.png" alt="Overview" width="100%">
    <br>
</div>
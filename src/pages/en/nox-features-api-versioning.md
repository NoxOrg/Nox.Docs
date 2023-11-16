---
title: API Versioning
category: Nox.Lib
description: Docs intro
layout: ../../layouts/MainLayout.astro
---
***
Nox supports API versioning as well as the ability to specify a custom API route prefix. Both of these facilities can be configured in the Nox solution file.

### API Versioning

By default, Nox will append all API route prefixes with `/v1`, so default API endpoints will typically be prefixed with `/api/v1/` as illustrated by the graphic below:

<div align="center">
    <img src="https://noxorg.dev/docs/images/browser_nox-features-swagger-api-default-version.png" alt="Overview" width="100%">
    <br>
</div>

Nox offers the ability to customise this default behaviour by specifying an API version in the solution file, which will then be included in the API route prefix.

```yaml
name: Cryptocash

version: "2.0"

description: A sample solution for the imaginary Crypocash business
```

As illustrated by the graphic below, by adding a `version` attribute to the Nox solution, the API will be versioned with the major number of the configured version.

<div align="center">
    <img src="https://noxorg.dev/docs/images/browser_nox-features-swagger-api-nox-version.png" alt="Overview" width="100%">
    <br>
</div>

### Custom Route Prefix

It is also possible to override the default `/api/` route prefix with a custom prefix—or none if you prefer—of your choice. Simply add an `endpoints` node under the `infrastructure` section of your solution file and include an `apiRoutePrefix` property with the prefix of your choice.

To illustrate, let's modify the `infrastructure` section of our `.nox/design/Cryptocash.solution.nox.yaml` solution by setting the `apiRoutePrefix` to `testapi`, as per the code snippet below:

```yaml
infrastructure:
  
  endpoints:
    
    apiRoutePrefix: testapi
```

If we start our Cryptocash API we'll notice that the API route prefix is now as per our configuration

<div align="center">
    <img src="https://noxorg.dev/docs/images/browser_nox-features-swagger-api-custom-route-testapi.png" alt="Overview" width="100%">
    <br>
</div>

If you'd prefer to have no API route prefix, set `apiRoutePrefix` to `/`, as per the code snippet below:

```yaml
infrastructure:
  
  endpoints:
    
    apiRoutePrefix: /
```

As illustrated, this results in an API endpoints with no route prefix:

<div align="center">
    <img src="https://noxorg.dev/docs/images/browser_nox-features-swagger-api-custom-route-root.png" alt="Overview" width="100%">
    <br>
</div>
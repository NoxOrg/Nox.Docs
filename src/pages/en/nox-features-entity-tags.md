---
title: Concurrency Control in Nox
category: Nox.Lib
description: Docs intro
layout: ../../layouts/MainLayout.astro
---
***

Nox implements an Optimistic Concurrency Control strategy through the use of Entity Tags (ETags). This [Wiki entry](https://en.wikipedia.org/wiki/Optimistic_concurrency_control) as well as [this article](https://fideloper.com/etags-and-optimistic-concurrency-control) provides a succinct and to-the-point explanation of this strategy.

Have a look at the `GET` request on the Euro currency below. You'll notice that both an `@odata.etag` and native `Etag` property is returned and that they have the same value:

<div align="center">
    <img src="https://noxorg.dev/docs/images/postman_nox-features-etag-get.png" alt="Overview" width="100%">
    <br>
</div>

As is standard practice when using ETags for Concurrency Control, we'll need to supply this ETag as part of our `PUT`, `PATCH` or `DELETE` request, along with the relevant ID of the entity we're looking to update.

We'll add the `If-Match` property to our HTTP Request header and populate the value with the ETag from our `GET` request. The ETags will be matched server-side and an HTTP error will be returned if the values don't match.

<div align="center">
    <img src="https://noxorg.dev/docs/images/postman_nox-features-etag-put-header.png" alt="Overview" width="100%">
    <br>
</div>

In our `GET` request example above for Euro, our `ISO_Alpha3` field is blank, so we'll update that to the correct value. Select the 'Body' tab and change the input to JSon and format the Request body as per the example below. Finally, click 'Send'.
<div align="center">
    <img src="https://noxorg.dev/docs/images/postman_nox-features-etag-put-body.png" alt="Overview" width="100%">
    <br>
</div>

The screenshot below confirms that our `ISO_Alpha3` value has been successfully updated, and a new ETag value has been assigned to the record in question.

<div align="center">
    <img src="https://noxorg.dev/docs/images/postman_nox-features-etag-put-200.png" alt="Overview" width="100%">
    <br>
</div>

If we omit the ETag from our Request header, or if we provide an ETag that doesn't match the one on the currently persisted record, we receive a 409 error, as illustrated in the screenshot below.

<div align="center">
    <img src="https://noxorg.dev/docs/images/postman_nox-features-etag-put-409.png" alt="Overview" width="100%">
    <br>
</div>
---
title: Concurrency Control in Nox
category: Nox.Lib
description: Docs intro
layout: ../../layouts/MainLayout.astro
---
***

Nox implements an Optimistic Concurrency Control strategy through the use of Entity Tags (ETags). This [Wiki entry](https://en.wikipedia.org/wiki/Optimistic_concurrency_control) as well as [this article](https://fideloper.com/etags-and-optimistic-concurrency-control) provides a succinct and to-the-point explanation of this strategy.

### Updating an Entity

Have a look at the `GET` request on the Euro currency below. You'll notice that both an `@odata.etag` and native `ETag` property is returned and that they have the same value:

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

### Working with Aggregates

When working with aggregate member entities that are children of [Aggregate](https://martinfowler.com/bliki/DDD_Aggregate.html) Root entities, all operations that changes the state of the entity (PUT, PATCH and DELETE) as well as the creation of the entity itself (POST) must include the ETag in the HTTP Request Header.

Have a look at the Swagger screenshot below which outlines all the endpoints available for our `BankNote` entity which is a child of our `Currency` entity. Because `BankNote` is an owned entity of `Currency`, no external access is allowed directly to `BankNote`, so all creates/updates is made through the parent entity `Currency`.

<div align="center">
    <img src="https://noxorg.dev/docs/images/browser_nox-features-swagger-banknotes-endpoints.png" alt="Overview" width="100%">
    <br>
</div>

Let's start by obtaining the current ETag from the aggregate root (parent) of the entity that we want to update. In our example we'll do a `GET` request on `Currencies` using USD as a key:

<div align="center">
    <img src="https://noxorg.dev/docs/images/postman_nox-features-etag-get-parent.png" alt="Overview" width="100%">
    <br>
</div>

Next we'll create a `POST` request to add a new `BankNote` entry, let's say 'One Dollar' for our US Dollar currency.

Start by updating the `POST` request URL to include the currency and the child entity `/api/Currencies/USD/CommonBankNotes`. Add the `If-Match` header attribute and paste the ETag obtained from the parent entity, in our case, the US Dollar currency record.

<div align="center">
    <img src="https://noxorg.dev/docs/images/postman_nox-features-etag-put-child-header.png" alt="Overview" width="100%">
    <br>
</div>

Format the HTTP Request body as per the JSon example in the screenshot below. Click 'Send' and you should get a `201` confirmation that your One Dollar banknote have been successfully created under the US Dollar currency.

<div align="center">
    <img src="https://noxorg.dev/docs/images/postman_nox-features-etag-put-child-body-201.png" alt="Overview" width="100%">
    <br>
</div>
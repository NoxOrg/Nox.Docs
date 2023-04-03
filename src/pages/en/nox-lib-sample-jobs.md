---
title: Getting to know Nox jobs
category: Nox.Lib
description: An overview of how Nox manages background jobs
layout: ../../layouts/MainLayout.astro
---
***

An essential part of any microservice is the ability to schedule and manage, as well as monitor background jobs. For our sample project, we're dealing with dynamic data and our microservice needs to cater for this.

### Hangfire

Nox uses the [Hangfire](https://www.hangfire.io/) library for background task scheduling and processing.

If we append the ```/jobs``` qualifier to the URL our API is running on we can access the Hangfire dashboard that provides all necessary info into the jobs the Nox library has scheduled to manage our data.

<div align="center">
    <img src="https://noxorg.dev/docs/images/localhost_sample-hangfire-overview.png" alt="Overview" width="100%">
    <br>
</div>

### Scheduling jobs

You may have noticed a ```schedule``` node in the ```Country``` and ```Currency``` entity loader files that we defined. This section essentially outlines when and how frequently we'd like our source data to be checked for changes.

<div align="center">
    <img src="https://noxorg.dev/docs/images/vscode_sample-job-schedule.png" alt="Overview" width="100%">
    <br>
</div>

Clicking the ***Recurring Jobs*** tab of the Hangfire dashboard will confirm that our jobs have been scheduled as expected along with next and last execution detail.

Note that the [Nox.Cron](https://www.nuget.org/packages/Nox.Cron) package has converted the 'Engligh' prase specified in the ```schedule.start``` node of our entity loader file to a valid [Cron](https://en.wikipedia.org/wiki/Cron) expression, as shown below:.

<div align="center">
    <img src="https://noxorg.dev/docs/images/localhost_sample-hangfire-recurring-jobs.png" alt="Overview" width="100%">
    <br>
</div>

Clicking the ***Jobs > Succeeded*** tab of the Hangfire dashboard shows us that the ```Currency``` loader has run every 2 minutes as per our instruction.

<div align="center">
    <img src="https://noxorg.dev/docs/images/localhost_sample-hangfire-succeeded-jobs.png" alt="Overview" width="100%">
    <br>
</div>
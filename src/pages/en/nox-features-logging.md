---
title: Logging in Nox
category: Nox.Lib
description: Docs intro
layout: ../../layouts/MainLayout.astro
---
***
Nox solutions are configured with logging using [Serilog](https://serilog.net/) and writes to the Console and Debug sinks by default.

### Serilog Features
- Serilog is simple to set up and configure with wide .NET platform support and active community support
- Log data can be persisted in popular structured formats like JSON, XML and other
- Structured logging enables performance analysis and diagnostic information with strong support for analytical tools
- Apart from [Console](https://github.com/serilog/serilog-sinks-console), [File](https://github.com/serilog/serilog-sinks-file) and [Debug](https://github.com/serilog/serilog-sinks-debug), a comprehensive [list of sinks](https://github.com/serilog/serilog/wiki/Provided-Sinks) (log targets) are supported

### Using LoggerConfiguration

You can disable Nox logging by modifying the `builder.AddNox()` section in your `Program.cs` or startup assembly as per the code snippet below:

Even though logging is enabled out-the-box, you may want to modify or add additional behaviour. This is simple to achieve by configuring Serilog's `LoggerConfiguration` object. [This article](https://github.com/serilog/serilog/wiki/Configuration-Basics) is a good resource on configuration basics.

Registering custom logging behaviour is as simple as modifying the `builder.AddNox()` section in your `Program.cs` or startup assembly with the custom `LoggerConfiguration` object.

The example below adds and additional File sink logging option inside `Program.cs` of our Cryptocash sample:

```csharp
builder.AddNox((noxOptions) =>
{
    noxOptions.WithNoxLogging((loggerConfiguration) =>
    {
        loggerConfiguration.WriteTo.File(@"mylogs.txt");  
    });
}); 
```

Alternatively, logging can disabled as per the code snippet below:

```csharp
builder.AddNox((noxOptions) =>
{
    noxOptions.WithoutNoxLogging();
}); 
```
### Using AppSettings

By default Nox sets `.ReadFrom.Configuration(configuration)` that enables Serilog to be configured via user and application settings. See [this overview](https://github.com/serilog/serilog-settings-configuration) for more information.

The example below creates a `logs` subfolder and will create a daily logfile of which the name is post-fixed with the date.

```json
"Serilog": {
  "Using": [ "Serilog.Sinks.Console", "Serilog.Sinks.File" ],
  "WriteTo": [
    { "Name": "Console" },
    {
      "Name": "File",
      "Args": {
        "path": "logs/logFromAppsettings-.txt",
        "rollingInterval": "Day"
      }
    }
  ]
}
```
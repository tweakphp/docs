# Vapor

- [Introduction](#introduction)
- [Connect to Serverless Server](#connect-to-serverless-server)
- [Select Connection](#select-connection)
- [Run Code](#run-code)
- [How it works?](#how-it-works)

## Introduction

TweakPHP supports running PHP code directly inside a Laravel Vapor environment with vapor tinker cli. This allows you to test and execute code within the same context as your deployed serverless infrastructure.

::: danger
There are no safety checks or restrictions in place.
**If you select a production environment, the code will be executed directly in that environment.**
Use this feature with caution and verify the selected environment before running any code.
:::

## Connect to Serverless Server

To connect to a Vapor environment, make sure your project contains a valid vapor.yml file at its root. TweakPHP will automatically detect environments from vapor file.

## Select Connection

Once a vapor.yml file is detected, TweakPHP automatically extracts the available environments and displays them in the environment selection dropdown. The Vapor CLI is used behind the scenes to establish the connection.

## Run Code

Select the desired environment, write your PHP code in the editor without including `<?php` or `?>` tags — TweakPHP will handle them automatically if they are present. Once ready, click Run or hit `Command+R` on mac or `Ctrl+R` to execute the code inside the selected Vapor environment. The output will be streamed back to the interface.

::: info
Stack trace visualization is disabled when running in Vapor environments and the use of custom loaders is not supported.
:::

## How it works?

TweakPHP leverages the Vapor CLI to run your code inside a selected environment:
1.	Reads available environments from the vapor.yml file.
2.	Allows the user to select an environment via the interface.
3.	Submits the code using a CLI command (vapor tinker cli).
4.	Captures and returns the output to the interface.

This approach ensures your code is executed in the same environment as your deployed application, including its runtime, services, and configuration.

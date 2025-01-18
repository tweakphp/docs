# Docker

- [Introduction](#introduction)
- [Connect to Docker](#connect-to-docker)
    - [Local Docker](#local-docker)
    - [Docker over SSH](#docker-over-ssh)
- [Run Code](#run-code)
- [How it works?](#how-it-works)

## Introduction

TweakPHP enables you to run code inside docker containers.

## Connect to Docker

After you opened a project, You can click on the docker icon at top toolbar and hit the connect item. Then a modal will apear to connect to any container you want.

### Local Docker

Select the `local` host and then it will load the containers running on your machine. Select a container and specify the working directory and hit the `connect` button.

::: warning
Make sure the docker service is running on your machine first
:::

### Docker over SSH

Select any other SSH connections that you already have and then it will load the containers running on that machine. Select a container and specify the working directory and hit the `connect` button.

If you don't have any SSH connectinos, click on the plus icon to add one.

::: warning
Make sure the docker service is running on your host first
:::

## Run Code

Just like running code on the [Local](./start.md#run-code) mode, You can run the code on docker as well.

## How it works?

Everytime you connect to a docker container, TweakPHP detects the PHP version installed and then copies the bundled client file (`.phar`) into the container and then runs the code.

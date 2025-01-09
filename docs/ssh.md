# SSH

- [Introduction](#introduction)
- [Connect to Server](#connect-to-server)
- [Add Connection](#add-connection)
- [Run Code](#run-code)
- [How it works?](#how-it-works)

## Introduction

You can connect the opened project to a remote server via SSH and TweakPHP will let you run the code on the project inside the remote server 😎

## Connect to Server

After you opened a project, You can click on the server icon (SSH) at top toolbar and hit the connect item. Then a modal will apear to connect to any existing servers or add a new server.

If you've already added a server, then you can click on the `wifi` icon to connect.

## Add Connection

To add a connection, click on the plus icon on the connections list modal and enter your server's details and hit the connect button.

::: warning
Currentlty TweakPHP doesn't encrypt the passwords and they're being stored as plain text on app's local storage on your machine. So we recomend to use the `Private Key` authentication method.
:::

## Run Code

Just like running code on the [Local](./start.md#run-code) mode, You can run the code on SSH as well.

## How it works?

Everytime you connect to a remote server, TweakPHP detects the PHP version installed on the remote server and then it uploads the bundled client file (`.phar`) into the server under `~/.tweakphp/client-x.x.phar` (for example: `~/.tweakphp/client-8.2.phar`). The `x.x` is the PHP version.

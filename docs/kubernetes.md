# Kubernetes

- [Introduction](#introduction)
- [Requirements](#requirements)
- [Connect to Pod](#connect-to-pod)
- [Run Code](#run-code)
- [How it works?](#how-it-works)

## Introduction

TweakPHP enables you to run code inside Kubernetes pods.

## Requirements

`kubectl` must be installed on your system and executable using `kubectl` command.

Also you need to have kubernetes context already set up.

## Connect to Pod

After you opened a project, You can click on the kubernetes icon at top toolbar and hit the connect item. Then a modal will apear to connect to pods.

Fill the form by selecting the context and then a namespace and the working directory on the pod.

After creating the connection, you can click on the Connect icon (WiFi) and it will load the existing pods. Select a pod and then it will connect.

## Run Code

Just like running code on the [Local](./start.md#run-code) mode, You can run the code on kubernetes as well.

## How it works?

Everytime you connect to a kubernetes pod, TweakPHP detects the PHP version installed and then copies the bundled client file (`.phar`) into the pod and then runs the code.

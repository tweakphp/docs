# Start Tweaking

- [Introduction](#introduction)
- [Run Code](#run-code)
- [How it works?](#how-it-works)

## Introduction

To get started, You need to have your project on your local machine. Click the plus icon on the top left corner and open a project from your projects history or a new one from your local disk.

## Run Code

After you opened a project, you can write something on the editor and hit `Command+R` on mac or `Ctrl+R` on other operating systems to run the code.

The results appear in the output panel next to the editor. Depending on the selected output mode you get plain text, or one card per statement with dumps and return values. Read more about the [output modes](./editor-output.md)

## How it works?

TweakPHP uses a bundled [client library](https://github.com/tweakphp/client) into `phar` files to load your project using different loaders based on the framework you use and then runs the code withing your project.

You can read more about the client library [here](./client.md)
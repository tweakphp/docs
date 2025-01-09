# Introduction

TweakPHP is a desktop application with a code editor to tweak your PHP code.

It uses a bundled client php package to run your code inside your project.

Depending on the framework of your project it recognizes how to load your app.

For example, If your project is Laravel, It will include `vendor/autoload.php` and then botstraps your Laravel app and then runs your code in it.

## Features

Here are some of the features that TweakPHP provides you.

- **Local Run**: Run your PHP code in your local projects.
- **Docker Run**: Run your PHP code inside a docker container.
- **SSH Run**: Run your PHP code inside a remote server via SSH.
- **Code Editor**: Uses Monaco Editor to write code.
- **LSP**: Uses phpactor to show auto completions when writing code.
- **Themes**: Supports dark and light mode themes.
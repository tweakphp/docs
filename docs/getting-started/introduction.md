# Introduction

TweakPHP is a desktop application with a code editor to tweak your PHP code.

It uses a bundled client php package to run your code inside your project.

Depending on the framework of your project it recognizes how to load your app.

For example, If your project is Laravel, It will include `vendor/autoload.php` and then bootstraps your Laravel app and then runs your code in it.

## Features

Here are some of the features that TweakPHP provides you.

- **Local Run**: Run your PHP code in your local projects.
- **Docker Run**: Run your PHP code inside a docker container.
- **Kubernetes Run**: Run your PHP code inside Kubernetes pods.
- **SSH Run**: Run your PHP code inside a remote server via SSH.
- **Vapor Run**: Run your PHP code directly inside Vapor environment, if your project contains a vapor.yml file.
- **WSL**: Open and run projects that live inside a WSL distro on Windows.
- **Code Editor**: Uses Monaco Editor to write code, with optional Vim keybindings.
- **LSP**: Uses Intelephense to show auto completions when writing code.
- **AI Completion**: Get code completions powered by OpenRouter, aware of your project's framework.
- **Snippets**: Save reusable pieces of code and insert them into any project.
- **Workspace Folders**: Group related projects together in the sidebar.
- **MCP Server**: Let AI agents like Claude or Cursor execute PHP code through TweakPHP.
- **Themes**: Ships with eight editor themes that also color the app interface.

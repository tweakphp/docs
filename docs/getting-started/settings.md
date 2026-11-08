# Settings

- [Introduction](#introduction)
- [Update](#update)
- [PHP Path](#php-path)
- [Theme](#theme)
- [Editor](#editor)
- [Output](#output)
- [Docker/Kubernetes timeout](#docker-kubernetes-timeout)

## Introduction

TweakPHP allows you to adjust some settings and customize the app.

In order to do so, click on the gear button in the bottom left corner to navigate to the settings. The settings are organized in five sections:

- **General**: app version, PHP path, theme, editor and output preferences (described below)
- **AI Completion**: models and prompt templates, see [AI Completion](../ai-completion.md)
- **Loaders**: manage your custom loaders, see [Custom Loaders](../custom-loaders.md)
- **MCP Server**: enable and monitor the built-in MCP server, see [MCP Server](../mcp-server.md)
- **About**: links to the website, the GitHub repository and a way to support the project

## Update

TweakPHP will show you a small dot badge on the settings button indicating that there is a new release available. To update to the latest version, Just navigate to the settings and click on update button to install.

## PHP Path

To run code in your local projects you need to have PHP installed on your machine. TweakPHP uses this binary to run your code and to detect your project's framework and PHP version.

The `Detect` button scans the common PHP locations on your system and offers the results as suggestions, so usually you don't have to type the path by hand. On Windows it scans your WSL distros too, see [WSL](../wsl.md).

::: info
Although it is not mandatory but the app will show you an error if there is no PHP Path set. To bypass this, you can just set a dummy path as the `PHP Path`
:::

## Theme

TweakPHP ships with eight themes that color both the code editor and the app interface, whose accent follows the selected theme:

- `dracula` (default)
- `nord`
- `monokai`
- `github-light`
- `catppuccin`
- `night-owl`
- `rose-pine`
- `ultra-dark`

## Editor

- **Editor font size**: the font size used in the code editor.
- **Editor word wrap**: wrap long lines instead of horizontal scrolling.
- **Vim mode**: enable Vim keybindings (modes, motions, commands) in the code editor.
- **Intelephense License key**: optional. Leave empty to use the free version of the language server; set your license key to unlock its premium features. Changing it restarts the language server.

## Output

These options control how the results of a run are displayed. They mirror the toggles available in the title bar, and every mode is described in detail in [Editor & Output](../editor-output.md).

- **Output Mode**: `Output only`, `Stacked output` or `Full stack`.
- **Stacked Dump**: render dump cards in `Compact` or `Extended` form.
- **Streaming Output**: show output progressively while the code is still running.
- **Query Log**: log the database queries executed by your code.

## Docker/Kubernetes timeout

The maximum time in seconds TweakPHP waits for a Docker or Kubernetes command before giving up. Raise it if you run heavy code inside containers or pods.

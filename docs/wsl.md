# WSL

- [Introduction](#introduction)
- [Opening a WSL project](#opening-a-wsl-project)
- [PHP path](#php-path)
- [How it works?](#how-it-works)

## Introduction

On Windows, TweakPHP supports WSL natively. You can open a project that lives inside a WSL distro and run code in it without any manual bridging: no copies of the project on the Windows side, no custom scripts.

## Opening a WSL project

Open the project through its UNC path, the same way you would reference it from Windows Explorer:

```
\\wsl.localhost\Ubuntu-22.04\home\you\my-project
\\wsl$\Ubuntu-22.04\home\you\my-project
```

Once opened, hitting run executes the code inside that distro, with the project's own PHP version. TweakPHP translates Windows and Linux paths back and forth for you and resolves the right distro even if you run several of them.

## PHP path

You can point the PHP path setting to a Windows binary as usual, or to a PHP inside a distro using its UNC path:

```
\\wsl.localhost\Ubuntu-22.04\usr\bin\php
```

If a project lives in a distro and your configured PHP belongs to another one, TweakPHP adapts and runs the code with the distro's own PHP.

The `Detect` button in the settings scans your distros too (via `wsl -l`), so you usually don't have to type any of this by hand.

## How it works?

Under the hood, when the opened project is a WSL path, TweakPHP runs the bundled client inside the distro with `wsl -d <distro> php ...`, converting the project path to its Linux form (`/home/you/my-project`) first. The PHP version is detected inside the distro and the matching client `phar` is used, exactly like on a normal Linux machine.

::: info
The PHP language server (Intelephense) is not available on Windows yet, so editor completions are limited there.
:::

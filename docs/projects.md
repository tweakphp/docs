# Projects

- [Introduction](#introduction)
- [Adding a project](#adding-a-project)
- [Workspace folders](#workspace-folders)
- [Pinning](#pinning)
- [Colors and tags](#colors-and-tags)
- [Duplicating](#duplicating)
- [Archiving](#archiving)
- [Sidebar](#sidebar)

## Introduction

Everything you open in TweakPHP is a project. The sidebar on the left keeps them organized: pinned projects at the top, your folders in the middle, and the rest below.

## Adding a project

Click `Add new project` at the top of the sidebar (or hit `Command+N` / `Ctrl+N`). The modal shows your recently opened projects and an `Open folder` button to browse the disk. The first entry is a bundled Laravel playground in `~/.tweakphp/laravel`, ready to use if you just want to try things out.

## Workspace folders

Folders group related projects together, for example by client or repository. Click the `+` next to the `Folders` heading to create one, then drag projects into it.

Folders can be reordered by dragging them, collapsed and expanded, and renamed or removed from their context menu. When you delete a folder you can choose to keep its projects or delete them along with it.

::: info
Folders are local to the app: they don't touch the folders on your disk.
:::

## Pinning

Pinned projects always sit at the top of the sidebar. Right click a project and hit `Pin`, or simply drag it into the `Pinned` section. Dragging a project back to a folder or to the recent list unpins it.

## Colors and tags

From the project context menu you can:

- Pick a **Color** among nineteen swatches. It shows as a small dot next to the project name.
- Assign a **Level** tag like `local`, `testing`, `development`, `staging` or `production` (or type a custom one). It appears as the dot's tooltip.

This makes it easy to tell at a glance which project you are about to run code in.

## Duplicating

`Duplicate` from the context menu clones a project with its code, folder, pin state and its connections. Handy when you want to experiment on a copy without touching the original.

## Archiving

Finished with a project? Archive it instead of keeping it around:

- Right click and choose `Archive`
- Hit `Command+W` / `Ctrl+W` on the open project
- Or middle-click the project in the sidebar

A confirmation modal appears with three choices: **Archive** keeps the project restorable, **Delete permanently** wipes it for good together with its connections and code history, and **Cancel** leaves everything untouched. Archived projects are collected in the `Archive` page (the box icon in the sidebar footer) where you can restore them or delete them permanently, with a preview of their last code.

## Sidebar

The sidebar width is adjustable: drag its right edge to make room for long project names, and it will remember the size. The footer shows the detected PHP version, the framework of the active project and the LSP status dot, which you can click to restart the language server.

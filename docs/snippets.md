# Snippets

- [Introduction](#introduction)
- [Managing snippets](#managing-snippets)
- [Saving from the editor](#saving-from-the-editor)
- [Using a snippet](#using-a-snippet)

## Introduction

Snippets are reusable pieces of PHP code stored locally in the app. Save that `User::query()->...` you keep retyping, or a testing block for your API, and insert it into any project whenever you need it.

## Managing snippets

Click the bookmark icon in the top toolbar to open the snippets modal. From there you can:

- Search snippets by title or code (Esc clears the search)
- Create a new one with the `New snippet` button
- Edit or delete existing ones

A snippet only needs code, the title is optional. Use the arrow keys to move through the list and `Enter` to edit the highlighted snippet.

## Saving from the editor

When some code in the editor is worth keeping, select it and hit `Command+Shift+S` / `Ctrl+Shift+S`, or right click and choose `Save Snippet`. Without a selection the whole editor content is saved. Confirm in the modal and the snippet is stored, with the selection wrapped in an undo step if you inserted one.

## Using a snippet

Open the snippets modal and choose what to do with a snippet:

- **Insert at cursor**: drops the code where your cursor is (or at the end of the file if you never placed the cursor in the editor).
- **Replace all**: swaps the entire editor content for the snippet. It asks for confirmation first.

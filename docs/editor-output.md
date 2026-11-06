# Editor & Output

- [Running code](#running-code)
- [Output modes](#output-modes)
- [Stacked dumps](#stacked-dumps)
- [Streaming output](#streaming-output)
- [Query log](#query-log)
- [Code history](#code-history)
- [Keyboard shortcuts](#keyboard-shortcuts)

## Running code

Hit `Command+R` on mac or `Ctrl+R` elsewhere (or the play button in the title bar) and the code in the editor runs inside your project.

If part of the code is selected, only the selection runs. With nothing selected, the whole editor content runs.

## Output modes

The title bar has a button that cycles through three output modes, and you can set the default one in the [settings](./getting-started/settings.md#output):

- **Output only**: the classic plain text output. Everything your code prints lands here as-is.
- **Stacked output**: each statement gets its own card, showing what it printed or dumped. This mode also renders framework dumps (like Symfony's HTML dump) properly.
- **Full stack**: same as stacked, but intermediate results are shown too. If a statement returns a value without printing anything, it appears as a "Return value" card.

If you mostly work with `echo` and `var_dump`, output only is fine. If you explore objects and return values, give full stack a try.

::: info
On Vapor environments the output mode is forced to plain output.
:::

## Stacked dumps

In the stacked modes, all output functions are recognized, including multiple calls in the same run: `echo`, `print`, `printf`, `var_dump`, `print_r`, `var_export`, `fwrite`, Laravel's `dump` and `dd`, `ray` and more. Each one becomes its own card in the output, so dumping five times gives you five cards instead of a wall of text.

The `Stacked Dump` setting switches the dump rendering between `Compact` and `Extended`.

## Streaming output

With streaming enabled (default), the code runs through a streaming executor and the output appears as it is produced. You will see cards appear one by one while a long script is still running. Turn it off from the title bar or the settings if you prefer to get everything at once at the end.

## Query log

When the output mode is `Stacked output` or `Full stack`, you can toggle the query log from the title bar (the database icon). Every database query executed by your code then shows up as a card attached to the statement that triggered it:

- The full SQL with the bindings interpolated
- The execution time
- The raw bindings, when present
- A red card whenever a query fails

::: info
The query log needs a stacked output mode to be active. In `Output only` mode the toggle is disabled.
:::

## Code history

Every change you make in the editor is recorded locally (in the app's SQLite database), together with the cursor position. This means undo and redo keep working even after you close the app or restart your machine:

- `Command+Z` / `Ctrl+Z` to undo
- `Command+Shift+Z` / `Ctrl+Shift+Z` (or `Ctrl+Y`) to redo

Undoing and then writing something new discards the redo branch, just like any other editor.

## Keyboard shortcuts

| Shortcut | Action |
|---|---|
| `Command+R` / `Ctrl+R` | Run code (or run the selection) |
| `Command+Z` / `Ctrl+Z` | History: undo |
| `Command+Shift+Z` / `Ctrl+Shift+Z` | History: redo |
| `Command+Shift+S` / `Ctrl+Shift+S` | Save snippet |

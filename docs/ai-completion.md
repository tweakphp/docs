# AI Completion

- [Introduction](#introduction)
- [Setup](#setup)
- [How it works](#how-it-works)
- [Prompt templates](#prompt-templates)
- [Privacy](#privacy)

## Introduction

TweakPHP can complete your code while you write, powered by [OpenRouter](https://openrouter.ai). The completions are framework aware: the prompts include information about your project's framework and version, so writing code in a Laravel project gives you Laravel-flavored suggestions.

## Setup

Open the settings and go to the `AI Completion` section:

1. Toggle the `Active` switch
2. Choose a model from the dropdown. The list is fetched live from OpenRouter, so you need a valid API key first. Not sure what to pick? `GPT-4o-mini` is recommended as a good balance of speed and quality.
3. Paste your OpenRouter `API key`

That's it. Back in the editor, completions start appearing when you pause typing.

## How it works

The completion detects what you are doing and reacts accordingly:

- **Generate from comment**: write a `// Fetch all active users` on an empty line and pause. The model generates the code for it.
- **Complete a comment**: pause in the middle of a `//` or `/* */` comment and it gets finished for you.
- **Complete code**: otherwise it simply continues the code at your cursor.

Errors show up as a toast, usually meaning the API key is missing or the model is unavailable.

## Prompt templates

Under the settings you can customize the three prompt templates used for the scenarios above. Each template supports these placeholders:

| Placeholder | Replaced with |
|---|---|
| `{{frameworkGuidelines}}` | Guidelines for the detected framework and version |
| `{{fullCodeWithCursor}}` | The editor content with the cursor position |
| `{{commentLine}}` | The comment line being completed (when relevant) |

Tweak them to match your coding style, then hit `Save`. The `Reset` button brings the defaults back.

## Privacy

Your API key is stored locally on your machine and is only used to send requests to the selected provider. Nothing is shared anywhere else, but keep in mind that the code around your cursor is sent to the provider to generate completions.

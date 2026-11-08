# MCP Server

- [Introduction](#introduction)
- [What is MCP?](#what-is-mcp)
- [Enable MCP Server](#enable-mcp-server)
- [Configure Your AI Agent](#configure-your-ai-agent)
- [Available Tools](#available-tools)
  - [Execution](#execution)
  - [Connections](#connections)
  - [Projects](#projects)
  - [Workspace folders](#workspace-folders)
- [Connection Types](#connection-types)
- [Common Workflows](#common-workflows)
- [Troubleshooting](#troubleshooting)

## Introduction

TweakPHP includes a built-in MCP (Model Context Protocol) server that enables AI coding agents like Claude Desktop, Cursor, and other MCP-compatible tools to execute PHP code through TweakPHP's execution infrastructure.

The server runs over plain HTTP on your machine and exposes 21 tools. They cover everything you can do in the app itself: run code, manage connections, open and organize projects, and inspect past executions.

## What is MCP?

Model Context Protocol (MCP) is an open protocol that standardizes how AI applications interact with external tools and data sources. TweakPHP's MCP server implements the Streamable HTTP transport: it listens for `POST` requests on `http://127.0.0.1:<port>/mcp` and handles each request statelessly.

## Enable MCP Server

To start using the MCP server:

1. Open TweakPHP application
2. Navigate to **Settings** (gear icon in sidebar)
3. Click on **MCP Server** tab
4. Toggle **Enable MCP Server** to ON
5. Note the port number (default: 3000)
6. Click **Save Settings**

The server will start automatically and bind to `127.0.0.1` (localhost only) for security. The settings page also shows the server status (uptime, request count) and a ready-to-copy config snippet.

::: warning
The MCP server only accepts connections from localhost. It cannot be accessed from the network.
:::

## Configure Your AI Agent

### Claude Desktop

Claude Desktop connects to MCP servers over stdio, so use [`mcp-remote`](https://www.npmjs.com/package/mcp-remote) as a bridge to the HTTP endpoint. Add the following to your configuration file:

**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`

**Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

**Linux**: `~/.config/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "tweakphp": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "http://127.0.0.1:3000/mcp"]
    }
  }
}
```

### Cursor

Add to your Cursor MCP configuration:

```json
{
  "mcp": {
    "servers": {
      "tweakphp": {
        "url": "http://127.0.0.1:3000/mcp",
        "type": "http"
      }
    }
  }
}
```

### Custom MCP Client

Use the MCP SDK with the Streamable HTTP transport:

```typescript
import { Client } from '@modelcontextprotocol/sdk/client/index.js'
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js'

const client = new Client({
  name: 'my-agent',
  version: '1.0.0'
})

const transport = new StreamableHTTPClientTransport(new URL('http://127.0.0.1:3000/mcp'))
await client.connect(transport)
```

## Available Tools

One thing to know before diving in: **every connection belongs to a project**. To run code you either point the tool at an open project with `projectId` (it runs with the connection assigned to that project), or pass an explicit `connectionId`. The execution tools accept both.

### Execution

#### execute_php

Execute PHP code through a TweakPHP connection (local, Docker, SSH, kubectl, or Vapor).

**Parameters:**
- `code` (string, required): PHP code to execute
- `projectId` (number, optional): open project ID, executes with its assigned connection
- `connectionId` (string, optional): ID of a stored connection (use this or `projectId`)
- `timeout` (number, optional): timeout in milliseconds (default: 30000)

**Example:**
```typescript
const result = await client.callTool('execute_php', {
  code: '<?php echo "Hello from TweakPHP!";',
  projectId: 1
})
// result.output → the printed output
// result.exitCode, result.duration, result.connectionType, result.connectionName
```

#### execute_with_loader

Execute PHP code with a framework context loaded (Laravel or Symfony), bootstrapping the framework of a specific open project.

**Parameters:**
- `code` (string, required): PHP code to execute
- `loader` (string, required): framework type: `"laravel"` or `"symfony"`
- `projectId` (number, optional): open project ID, bootstraps its framework
- `projectPath` (string, optional): path to the framework project
- `connectionId` (string, optional): ID of a stored connection (use this or `projectId`)
- `timeout` (number, optional): timeout in milliseconds (default: 60000)

**Example:**
```typescript
const result = await client.callTool('execute_with_loader', {
  code: '<?php echo app()->version();',
  loader: 'laravel',
  projectId: 1
})
```

#### get_php_info

Get PHP version and configuration details from the connection assigned to a project.

**Parameters:**
- `projectId` (number, required): open project ID
- `section` (string, optional): `"general"`, `"modules"`, `"environment"`, `"variables"` or `"all"` (default: `"all"`)

**Example:**
```typescript
const info = await client.callTool('get_php_info', {
  projectId: 1,
  section: 'general'
})
```

#### get_execution_history

Retrieve past PHP execution records from TweakPHP.

**Parameters:**
- `limit` (number, optional): maximum records to return (default: 50, max: 1000)
- `offset` (number, optional): pagination offset (default: 0)
- `filter` (object, optional):
  - `connectionType` (string): filter by connection type
  - `status` (string): filter by `"success"` or `"error"`
  - `dateFrom` (string): filter by start date (ISO 8601)
  - `dateTo` (string): filter by end date (ISO 8601)

**Example:**
```typescript
const history = await client.callTool('get_execution_history', {
  limit: 10,
  filter: { status: 'error' }
})
// history.records, history.total
```

### Connections

#### switch_connection

Switch a project to a different execution environment. The connection is verified first, then assigned to the project.

**Parameters:**
- `connectionId` (string, optional): switch to an existing stored connection
- `connectionType` (string, optional): `"local"`, `"docker"`, `"ssh"`, `"kubectl"` or `"vapor"`, with `connectionConfig`
- `connectionConfig` (object, optional): configuration for the new connection (see [Connection Types](#connection-types))
- `projectId` (number, optional): with it, the connection is assigned to that project; with `connectionType: "local"` and no config it disconnects the project back to implicit local. Without `projectId` the connection is only verified (and stored unassigned)

#### list_connections

List execution environments. With `projectId`: the project's own connections and its resolved active connection. Without: all stored connections, each labelled with its owner project.

**Parameters:**
- `projectId` (number, optional): list only this project's connections
- `typeFilter` (string, optional): filter by connection type
- `includeDiscovered` (boolean, optional): set to `true` to auto-discover active Docker containers on the host

#### create_connection

Create a connection owned by a project and set it as the project's active connection. Secrets are accepted but never returned in responses.

**Parameters:**
- `projectId` (number, required): project that owns the new connection
- `type` (string, required): `"local"`, `"docker"`, `"ssh"`, `"kubectl"` or `"vapor"`
- `config` (object, required): type-specific fields (see [Connection Types](#connection-types))

#### update_connection

Update an existing connection. Type and project ownership cannot be changed; projects using the connection see the new configuration automatically.

**Parameters:**
- `connectionId` (string, required): ID of the connection to update
- `changes` (object, required): fields to merge into the stored configuration

#### delete_connection

Delete a connection owned by a project. The project falls back to the implicit local connection.

**Parameters:**
- `connectionId` (string, required): ID of the connection to delete

### Projects

These tools mirror what you can do in the TweakPHP window.

| Tool | Parameters | What it does |
|---|---|---|
| `list_projects` | `includeTrashed` (bool), `folderId` (number) | List open projects with their folder, pin state, tag, color and connection |
| `create_project` | `path`*, `name`, `folderId`, `color`, `tag`, `code` | Open a new project (same as "Add new project") |
| `update_project` | `projectId`*, `name`, `code`, `folderId`, `color`, `tag`, `pinned` | Write editor code, rename, recolor, retag, pin/unpin, move to a folder |
| `delete_project` | `projectId`*, `force` (bool) | Move to trash, or delete permanently with `force: true` |
| `restore_project` | `projectId`* | Restore a trashed project |
| `duplicate_project` | `projectId`* | Clone code, folder, pin state and connection |
| `set_active_project` | `projectId`* | Make the project active in the window |

`code` in `update_project` replaces the whole editor content, and `create_project` defaults it to `<?php\n\n`. Nullable fields accept `null` to clear the value.

### Workspace folders

| Tool | Parameters | What it does |
|---|---|---|
| `list_folders` | — | List the workspace folders |
| `create_folder` | `name`* | Create a folder (1-100 characters) |
| `update_folder` | `folderId`*, `name` | Rename a folder |
| `delete_folder` | `folderId`* | Delete it; its projects are kept and become unassigned |
| `reorder_folders` | `folderIds`* | Reorder by providing the full ordered list of ids |

## Connection Types

All five TweakPHP connection types are supported. The `config` fields below apply to `create_connection` and `switch_connection`.

### Local

Run PHP code on your local machine.

```json
{ "type": "local", "config": { "php": "/usr/bin/php", "path": "/var/www/html" } }
```

### Docker

Run PHP code inside Docker containers, on your machine or over an SSH host.

```json
{ "type": "docker", "config": { "container_id": "a1b2c3", "container_name": "my-php-container", "working_directory": "/var/www/html" } }
```

See [Docker documentation](./docker.md) for more details.

### SSH

Run PHP code on remote servers via SSH.

```json
{ "type": "ssh", "config": { "host": "example.com", "port": 22, "username": "deploy", "auth_type": "privateKey", "privateKey": "/path/to/key", "path": "/var/www/html" } }
```

See [SSH documentation](./ssh.md) for more details.

### Kubernetes

Run PHP code in Kubernetes pods.

```json
{ "type": "kubectl", "config": { "context": "production", "namespace": "default", "pod": "my-php-pod", "path": "/var/www/html" } }
```

See [Kubernetes documentation](./kubernetes.md) for more details.

### Laravel Vapor

Run PHP code in Laravel Vapor environments.

```json
{ "type": "vapor", "config": { "environment": "production" } }
```

See [Vapor documentation](./vapor.md) for more details.

## Common Workflows

### Execute Simple PHP Code

```typescript
const result = await client.callTool('execute_php', {
  code: '<?php echo json_encode(["status" => "ok"]);',
  projectId: 1 // an open project id, as returned by list_projects
})

console.log(result.output) // {"status":"ok"}
```

::: info
Tool results come back as JSON in the response content. The examples below show the logical fields of each result (like `output` or `records`), depending on how your client unwraps them.
:::

### Test a Laravel Application

```typescript
// Open the project first
const project = await client.callTool('create_project', {
  path: '/var/www/my-laravel-app'
})

// Execute with the Laravel context bootstrapped
const result = await client.callTool('execute_with_loader', {
  code: '<?php echo app()->version();',
  loader: 'laravel',
  projectId: project.id // from the create_project result
})

console.log('Laravel Version:', result.output)
```

### Debug a Remote Server

```typescript
// Point the project at a remote server over SSH
await client.callTool('switch_connection', {
  projectId: 1,
  connectionType: 'ssh',
  connectionConfig: {
    host: 'production.example.com',
    port: 22,
    username: 'deploy',
    auth_type: 'privateKey',
    privateKey: '/path/to/key',
    path: '/var/www/html'
  }
})

// Check PHP configuration on the remote machine
const info = await client.callTool('get_php_info', {
  projectId: 1,
  section: 'modules'
})
```

### Review Execution History

```typescript
// Get recent errors
const history = await client.callTool('get_execution_history', {
  limit: 10,
  filter: { status: 'error' }
})

// Analyze errors
for (const record of history.records) {
  console.log(`Error at ${record.executedAt}:`)
  console.log(record.output)
}
```

## Troubleshooting

### Server Won't Start

**Check if port is already in use:**
```bash
# macOS/Linux
lsof -i :3000

# Windows
netstat -ano | findstr :3000
```

**Solution:**
1. Change port in TweakPHP Settings → MCP Server
2. Update AI agent configuration with new port
3. Restart TweakPHP

### Connection Errors

**No connection assigned to the project:**
```typescript
// List what the project has, then switch to one of them
await client.callTool('list_connections', { projectId: 1 })

await client.callTool('switch_connection', {
  projectId: 1,
  connectionType: 'local'
})
```

### Timeout Errors

**Increase timeout for slow operations:**
```typescript
await client.callTool('execute_php', {
  code: slowCode,
  timeout: 60000 // 60 seconds
})
```

### Framework Loader Issues

**Use execute_with_loader for framework code:**
```typescript
// Bad: Using execute_php for framework code
await client.callTool('execute_php', {
  code: '<?php echo app()->version();'  // Won't work!
})

// Good: Using execute_with_loader
await client.callTool('execute_with_loader', {
  code: '<?php echo app()->version();',
  loader: 'laravel',
  projectId: 1
})
```

### Check Logs

Logs are located at:
- **macOS**: `~/Library/Application Support/TweakPHP/logs/mcp-server.log`
- **Windows**: `%APPDATA%\TweakPHP\logs\mcp-server.log`
- **Linux**: `~/.config/TweakPHP/logs/mcp-server.log`

View recent logs:
```bash
tail -f ~/Library/Application\ Support/TweakPHP/logs/mcp-server.log
```

## Security

The MCP server is designed with security in mind:

- **Localhost Only**: Always binds to `127.0.0.1` and cannot be accessed from the network
- **Sandboxed Execution**: All code execution goes through TweakPHP's existing client infrastructure
- **Credential Sanitization**: Passwords and private keys are automatically sanitized from logs and tool responses
- **No Direct Shell Access**: No direct shell access is provided

## Performance Tips

1. **Reuse Connections**: Switch once, execute many times
2. **Use Appropriate Timeouts**: Simple code (10-30s), framework code (30-60s)
3. **Leverage Execution History**: Check history before re-executing identical code
4. **Limit Concurrent Executions**: Maximum 5 concurrent executions supported

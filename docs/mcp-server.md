# MCP Server

- [Introduction](#introduction)
- [What is MCP?](#what-is-mcp)
- [Enable MCP Server](#enable-mcp-server)
- [Configure Your AI Agent](#configure-your-ai-agent)
- [Available Tools](#available-tools)
- [Connection Types](#connection-types)
- [Common Workflows](#common-workflows)
- [Troubleshooting](#troubleshooting)

## Introduction

TweakPHP includes a built-in MCP (Model Context Protocol) server that enables AI coding agents like Claude Desktop, Cursor, and other MCP-compatible tools to execute PHP code through TweakPHP's execution infrastructure.

## What is MCP?

Model Context Protocol (MCP) is an open protocol that standardizes how AI applications interact with external tools and data sources. TweakPHP's MCP server exposes five powerful tools that let AI agents execute PHP code across different environments.

## Enable MCP Server

To start using the MCP server:

1. Open TweakPHP application
2. Navigate to **Settings** (gear icon in sidebar)
3. Click on **MCP Server** tab
4. Toggle **Enable MCP Server** to ON
5. Note the port number (default: 3000)
6. Click **Save Settings**

The server will start automatically and bind to `127.0.0.1` (localhost only) for security.

::: warning
The MCP server only accepts connections from localhost. It cannot be accessed from the network.
:::

## Configure Your AI Agent

### Claude Desktop

Add the following to your Claude Desktop configuration file:

**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`

**Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

**Linux**: `~/.config/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "tweakphp": {
      "command": "node",
      "args": ["-e", "require('http').request({host:'127.0.0.1',port:3000,method:'POST',path:'/mcp'},r=>{let d='';r.on('data',c=>d+=c);r.on('end',()=>console.log(d))}).end(JSON.stringify(process.argv[2]))"],
      "env": {}
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
        "url": "http://127.0.0.1:3000",
        "type": "http"
      }
    }
  }
}
```

### Custom MCP Client

Use the MCP SDK to connect:

```typescript
import { Client } from '@modelcontextprotocol/sdk/client/index.js'
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js'

const client = new Client({
  name: 'my-agent',
  version: '1.0.0'
})

await client.connect(new StdioClientTransport({
  command: 'node',
  args: ['-e', 'require("http").request({host:"127.0.0.1",port:3000,method:"POST",path:"/mcp"},r=>{let d="";r.on("data",c=>d+=c);r.on("end",()=>console.log(d))}).end(JSON.stringify(process.argv[2]))']
}))
```

## Available Tools

### 1. execute_php

Execute PHP code through any TweakPHP execution client.

**Parameters:**
- `code` (string, required): PHP code to execute
- `connectionId` (string, optional): ID of stored connection to use
- `timeout` (number, optional): Timeout in milliseconds (default: 30000)

**Example:**
```typescript
const result = await client.callTool('execute_php', {
  code: '<?php echo "Hello from TweakPHP!";'
})
```

### 2. execute_with_loader

Execute PHP code with framework context loaded (Laravel or Symfony).

**Parameters:**
- `code` (string, required): PHP code to execute
- `loader` (string, required): Framework type: "laravel" or "symfony"
- `projectPath` (string, optional): Path to framework project
- `connectionId` (string, optional): ID of stored connection to use
- `timeout` (number, optional): Timeout in milliseconds (default: 60000)

**Example:**
```typescript
const result = await client.callTool('execute_with_loader', {
  code: '<?php echo app()->version();',
  loader: 'laravel'
})
```

### 3. get_execution_history

Retrieve execution history from TweakPHP's database.

**Parameters:**
- `limit` (number, optional): Maximum records to return (default: 50)
- `offset` (number, optional): Pagination offset (default: 0)
- `filter` (object, optional): Filter criteria
  - `connectionType` (string): Filter by connection type
  - `status` (string): Filter by "success" or "error"
  - `dateFrom` (string): Filter by start date (ISO 8601)
  - `dateTo` (string): Filter by end date (ISO 8601)

**Example:**
```typescript
const history = await client.callTool('get_execution_history', {
  limit: 10,
  filter: { status: 'error' }
})
```

### 4. switch_connection

Switch between different execution environments.

**Parameters (Option 1 - Existing Connection):**
- `connectionId` (string, required): ID of stored connection

**Parameters (Option 2 - New Connection):**
- `connectionType` (string, required): "local", "docker", "ssh", "kubectl", or "vapor"
- `connectionConfig` (object, required): Connection-specific configuration

**Example:**
```typescript
await client.callTool('switch_connection', {
  connectionType: 'docker',
  connectionConfig: {
    container_name: 'my-php-container',
    working_directory: '/var/www/html'
  }
})
```

### 5. get_php_info

Retrieve PHP environment information.

**Parameters:**
- `section` (string, optional): Section to retrieve: "general", "modules", "environment", "variables", or "all" (default: "all")

**Example:**
```typescript
const info = await client.callTool('get_php_info', {
  section: 'general'
})
```

## Connection Types

The MCP server supports all TweakPHP connection types:

### Local Connection

Run PHP code on your local machine.

```typescript
await client.callTool('switch_connection', {
  connectionType: 'local',
  connectionConfig: {
    php: '/usr/bin/php',
    path: '/var/www/html'
  }
})
```

### Docker Connection

Run PHP code inside Docker containers.

```typescript
await client.callTool('switch_connection', {
  connectionType: 'docker',
  connectionConfig: {
    container_name: 'my-php-container',
    working_directory: '/var/www/html'
  }
})
```

See [Docker documentation](./docker.md) for more details.

### SSH Connection

Run PHP code on remote servers via SSH.

```typescript
await client.callTool('switch_connection', {
  connectionType: 'ssh',
  connectionConfig: {
    host: 'example.com',
    username: 'deploy',
    port: 22,
    password: 'your-password'
  }
})
```

See [SSH documentation](./ssh.md) for more details.

### Kubernetes Connection

Run PHP code in Kubernetes pods.

```typescript
await client.callTool('switch_connection', {
  connectionType: 'kubectl',
  connectionConfig: {
    pod_name: 'my-php-pod',
    namespace: 'production',
    container: 'php'
  }
})
```

See [Kubernetes documentation](./kubernetes.md) for more details.

### Laravel Vapor Connection

Run PHP code in Laravel Vapor environments.

```typescript
await client.callTool('switch_connection', {
  connectionType: 'vapor',
  connectionConfig: {
    environment: 'production',
    project_id: '12345'
  }
})
```

See [Vapor documentation](./vapor.md) for more details.

## Common Workflows

### Execute Simple PHP Code

```typescript
const result = await client.callTool('execute_php', {
  code: '<?php echo json_encode(["status" => "ok"]);'
})

console.log(result.data.output) // {"status":"ok"}
```

### Test Laravel Application

```typescript
// Switch to Laravel project
await client.callTool('switch_connection', {
  connectionType: 'local',
  connectionConfig: {
    php: '/usr/bin/php',
    path: '/var/www/my-laravel-app'
  }
})

// Execute with Laravel context
const result = await client.callTool('execute_with_loader', {
  code: '<?php echo app()->version();',
  loader: 'laravel'
})

console.log('Laravel Version:', result.data.output)
```

### Debug Remote Server

```typescript
// Connect to remote server
await client.callTool('switch_connection', {
  connectionType: 'ssh',
  connectionConfig: {
    host: 'production.example.com',
    username: 'deploy',
    privateKey: '/path/to/key'
  }
})

// Check PHP configuration
const info = await client.callTool('get_php_info', {
  section: 'modules'
})

console.log('Loaded Extensions:', info.data.sections.modules.loaded)
```

### Review Execution History

```typescript
// Get recent errors
const history = await client.callTool('get_execution_history', {
  limit: 10,
  filter: { status: 'error' }
})

// Analyze errors
for (const record of history.data.records) {
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

**No active connection available:**
```typescript
// Set a connection first
await client.callTool('switch_connection', {
  connectionType: 'local',
  connectionConfig: {
    php: '/usr/bin/php'
  }
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
  loader: 'laravel'
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
- **Credential Sanitization**: Passwords and private keys are automatically sanitized from logs
- **No Direct Shell Access**: No direct shell access is provided

## Performance Tips

1. **Reuse Connections**: Switch once, execute many times
2. **Use Appropriate Timeouts**: Simple code (10-30s), framework code (30-60s)
3. **Leverage Execution History**: Check history before re-executing identical code
4. **Limit Concurrent Executions**: Maximum 5 concurrent executions supported

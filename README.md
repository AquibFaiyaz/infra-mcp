# infra-mcp

A lightweight MCP server for exposing infrastructure and VPS monitoring tools via the Model Context Protocol.

## What it does

This project provides an MCP service that exposes tools for:
- local system monitoring: disk usage and memory usage
- remote VPS inspection via SSH
- Docker container listing on the VPS
- PostgreSQL table listing and schema inspection in a Dockerized Postgres instance

## Getting started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file or export environment variables in your shell.
   ```bash
   cp .env.example .env
   ```
3. Run the server:
   ```bash
   node server.js
   ```

## Supported environment variables

The service now reads configuration from environment variables, making it reusable across hosts:

- `VPS_HOST` - remote VPS hostname or IP (required for remote tools)
- `VPS_USER` - SSH user for VPS commands
- `VPS_SSH_OPTIONS` - optional SSH options, e.g. `-i /path/to/key -p 2222`
- `DISK_USAGE_COMMAND` - local disk command, default `df -h`
- `MEMORY_USAGE_COMMAND` - local memory command, default `vm_stat` on macOS and `free -m` on Linux
- `VPS_DISK_USAGE_COMMAND` - remote disk command, default `df -h`
- `VPS_MEMORY_USAGE_COMMAND` - remote memory command, default `free -m`
- `VPS_DOCKER_COMMAND` - remote Docker list command, default `docker ps`
- `POSTGRES_CONTAINER` - remote Docker Postgres container name
- `POSTGRES_USER` - remote Postgres user
- `POSTGRES_DB` - remote Postgres database
- `POSTGRES_SCHEMA` - optional schema filter for table schema lookup
- `VPS_PSQL_COMMAND` - remote psql binary path or command

## Tool summary

Registered MCP tools:
- `get_server_time`
- `get_disk_usage`
- `get_memory_usage`
- `get_vps_hostname`
- `get_vps_disk_usage`
- `get_vps_memory_usage`
- `list_vps_containers`
- `list_postgres_tables`
- `get_table_schema`

## Notes

- Remote VPS tools now use `VPS_HOST`, `VPS_USER`, and optional `VPS_SSH_OPTIONS`.
- `.env.example` is included to help bootstrap configuration.
- The repo still uses native `ssh` and `docker exec` commands from Node.js.
- There is no test suite configured yet.

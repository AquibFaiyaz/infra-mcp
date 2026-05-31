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
2. Run the server:
   ```bash
   node server.js
   ```

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

## Recommended configuration

To make this MCP service generic and reusable, move hardcoded values into environment variables:

- `VPS_HOST`
- `VPS_USER`
- `POSTGRES_CONTAINER`
- `POSTGRES_USER`
- `POSTGRES_DB`
- `POSTGRES_SCHEMA` (optional)
- `DISK_USAGE_COMMAND` (optional)
- `MEMORY_USAGE_COMMAND` (optional)
- `VPS_MEMORY_USAGE_COMMAND` (optional)

## Notes

- This repo uses native `ssh` and `docker exec` commands from Node.js.
- There is no test suite configured yet.
- The current implementation assumes a macOS host for local memory reporting and a Linux VPS for remote commands.

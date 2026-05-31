import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { registerVpsTool } from "./tools/vps.js";





import { registerTimeTool } from "./tools/time.js";
import { registerDiskTool } from "./tools/disk.js";
import { registerMemoryTool } from "./tools/memory.js";
import { registerVpsDiskTool } from "./tools/vpsDiskUsage.js";
import { registerVpsMemoryTool } from "./tools/vpsMemoryUsage.js";
import { registerDockerTool } from "./tools/vpsDocker.js";
import { registerPostgresTool } from "./tools/vpsPostgres.js";
import { registerPostgresTableSchemaTool } from "./tools/vpsPgTableSchema.js";





const server = new McpServer({
  name: "infra-mcp",
  version: "1.0.0",
});

registerTimeTool(server);
registerDiskTool(server);
registerMemoryTool(server);
registerVpsTool(server);
registerVpsDiskTool(server);
registerVpsMemoryTool(server);
registerDockerTool(server);
registerPostgresTool(server);
registerPostgresTableSchemaTool(server);

const transport = new StdioServerTransport();

await server.connect(transport);

console.error("Infra MCP running...");
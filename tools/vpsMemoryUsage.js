import { exec } from "child_process";
import { promisify } from "util";
import { ENV, buildSshCommand } from "./env.js";

const execAsync = promisify(exec);

export function registerVpsMemoryTool(server) {
  server.tool(
    "get_vps_memory_usage",
    "Returns VPS memory usage",
    {},
    async () => {
      const { stdout } = await execAsync(
        buildSshCommand(ENV.VPS_MEMORY_USAGE_COMMAND)
      );

      return {
        content: [
          {
            type: "text",
            text: stdout,
          },
        ],
      };
    }
  );
}
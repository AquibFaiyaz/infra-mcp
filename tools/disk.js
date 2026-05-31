import { exec } from "child_process";
import { promisify } from "util";
import { ENV } from "./env.js";

const execAsync = promisify(exec);

export function registerDiskTool(server) {
  server.tool(
    "get_disk_usage",
    "Get disk usage information",
    {},
    async () => {
      const { stdout } = await execAsync(ENV.DISK_USAGE_COMMAND);

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
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

export function registerDiskTool(server) {
  server.tool(
    "get_disk_usage",
    "Get disk usage information",
    {},
    async () => {
      const { stdout } = await execAsync("df -h");

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
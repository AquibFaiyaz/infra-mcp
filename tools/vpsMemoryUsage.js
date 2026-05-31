import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

export function registerVpsMemoryTool(server) {
  server.tool(
    "get_vps_memory_usage",
    "Returns VPS memory usage",
    {},
    async () => {
      const { stdout } = await execAsync(
        "ssh root@84.247.133.122 'free -m'"
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
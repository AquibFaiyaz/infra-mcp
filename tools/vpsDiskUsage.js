import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

export function registerVpsDiskTool(server) {
  server.tool(
    "get_vps_disk_usage",
    "Returns disk usage of the VPS",
    {},
    async () => {
      const { stdout } = await execAsync(
        "ssh root@84.247.133.122 'df -h'"
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
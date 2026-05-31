import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

export function registerVpsTool(server) {
  server.tool(
    "get_vps_hostname",
    "Returns the hostname of the VPS server",
    {},
    async () => {
      const { stdout } = await execAsync(
        "ssh root@84.247.133.122 hostname"
      );

      return {
        content: [
          {
            type: "text",
            text: stdout.trim(),
          },
        ],
      };
    }
  );
}
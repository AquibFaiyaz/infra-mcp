import { exec } from "child_process";
import { promisify } from "util";
import { ENV, buildSshCommand } from "./env.js";

const execAsync = promisify(exec);

export function registerVpsDiskTool(server) {
  server.tool(
    "get_vps_disk_usage",
    "Returns disk usage of the VPS",
    {},
    async () => {
      const { stdout } = await execAsync(
        buildSshCommand(ENV.VPS_DISK_USAGE_COMMAND)
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
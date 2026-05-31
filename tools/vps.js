import { exec } from "child_process";
import { promisify } from "util";
import { buildSshCommand } from "./env.js";

const execAsync = promisify(exec);

export function registerVpsTool(server) {
  server.tool(
    "get_vps_hostname",
    "Returns the hostname of the VPS server",
    {},
    async () => {
      const { stdout } = await execAsync(buildSshCommand("hostname"));

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
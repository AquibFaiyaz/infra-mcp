import { exec } from "child_process";
import { promisify } from "util";
import { ENV, buildSshCommand } from "./env.js";

const execAsync = promisify(exec);

export function registerDockerTool(server) {
  server.tool(
    "list_vps_containers",
    "Lists all running Docker containers on the VPS",
    {},
    async () => {
      const { stdout } = await execAsync(buildSshCommand(ENV.VPS_DOCKER_COMMAND));

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
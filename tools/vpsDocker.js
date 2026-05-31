import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

export function registerDockerTool(server) {
  server.tool(
    "list_vps_containers",
    "Lists all running Docker containers on the VPS",
    {},
    async () => {
      const { stdout } = await execAsync(
        "ssh root@84.247.133.122 'docker ps'"
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
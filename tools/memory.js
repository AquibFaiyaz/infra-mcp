import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

export function registerMemoryTool(server) {
  server.tool(
    "get_memory_usage",
    "Get memory usage information",
    {},
    async () => {
      const { stdout } = await execAsync("vm_stat");

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
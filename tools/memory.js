import { exec } from "child_process";
import { promisify } from "util";
import { ENV } from "./env.js";

const execAsync = promisify(exec);

export function registerMemoryTool(server) {
  server.tool(
    "get_memory_usage",
    "Get memory usage information",
    {},
    async () => {
      const { stdout } = await execAsync(ENV.MEMORY_USAGE_COMMAND);

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
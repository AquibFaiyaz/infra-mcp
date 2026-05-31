import { exec } from "child_process";
import { promisify } from "util";
import { ENV, buildSshCommand } from "./env.js";

const execAsync = promisify(exec);

export function registerPostgresTool(server) {
  server.tool(
    "list_postgres_tables",
    "Lists all tables in the PostgreSQL database",
    {},
    async () => {
      const command = `docker exec ${ENV.POSTGRES_CONTAINER} ${ENV.VPS_PSQL_COMMAND} -U ${ENV.POSTGRES_USER} -d ${ENV.POSTGRES_DB} -c "\\dt"`;
      const { stdout } = await execAsync(buildSshCommand(command));

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
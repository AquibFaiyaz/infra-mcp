import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

export function registerPostgresTool(server) {
  server.tool(
    "list_postgres_tables",
    "Lists all tables in the PostgreSQL database",
    {},
    async () => {
      const { stdout } = await execAsync(
        `ssh root@84.247.133.122 "docker exec postgres-db psql -U aquib -d javajdbc -c '\\dt'"`
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
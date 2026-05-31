import { exec } from "child_process";
import { promisify } from "util";
import { z } from "zod";

const execAsync = promisify(exec);

export function registerPostgresTableSchemaTool(server) {
  server.tool(
    "get_table_schema",
    "Returns column definitions for a PostgreSQL table",
    {
      tableName: z.string(),
    },
    async ({ tableName }) => {
      const sql = `
      SELECT
        column_name,
        data_type,
        is_nullable
      FROM information_schema.columns
      WHERE table_name='${tableName}'
      ORDER BY ordinal_position;
    `;

      const command = `ssh root@84.247.133.122 "docker exec postgres-db psql -U aquib -d javajdbc -c \\"${sql}\\""`;

      const { stdout } = await execAsync(command);

      return {
        content: [
          {
            type: "text",
            text: stdout,
          },
        ],
      };
    },
  );
}

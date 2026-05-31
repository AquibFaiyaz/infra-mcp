import { exec } from "child_process";
import { promisify } from "util";
import { z } from "zod";
import { ENV, buildSshCommand, escapeSqlLiteral } from "./env.js";

const execAsync = promisify(exec);

export function registerPostgresTableSchemaTool(server) {
  server.tool(
    "get_table_schema",
    "Returns column definitions for a PostgreSQL table",
    {
      tableName: z.string(),
    },
    async ({ tableName }) => {
      const safeTableName = escapeSqlLiteral(tableName);
      const schemaFilter = ENV.POSTGRES_SCHEMA
        ? `AND table_schema='${escapeSqlLiteral(ENV.POSTGRES_SCHEMA)}'`
        : "";
      const sql = `SELECT column_name, data_type, is_nullable FROM information_schema.columns WHERE table_name='${safeTableName}' ${schemaFilter} ORDER BY ordinal_position;`;
      const command = `docker exec ${ENV.POSTGRES_CONTAINER} ${ENV.VPS_PSQL_COMMAND} -U ${ENV.POSTGRES_USER} -d ${ENV.POSTGRES_DB} -c "${sql.replace(/"/g, '\\"')}"`;

      const { stdout } = await execAsync(buildSshCommand(command));

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

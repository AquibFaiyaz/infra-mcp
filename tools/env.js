import { platform } from "process";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.join(__dirname, "..", ".env");

try {
  const dotenv = await import("dotenv");
  dotenv.config({ path: envPath });
} catch {
  // dotenv is optional; environment variables can still be provided by the shell.
}

function shellEscape(value) {
  return value.replace(/'/g, "'\\''");
}

export const ENV = {
  VPS_HOST: process.env.VPS_HOST || "",
  VPS_USER: process.env.VPS_USER || "root",
  VPS_SSH_OPTIONS: process.env.VPS_SSH_OPTIONS || "",
  POSTGRES_CONTAINER: process.env.POSTGRES_CONTAINER || "postgres-db",
  POSTGRES_USER: process.env.POSTGRES_USER ,
  POSTGRES_DB: process.env.POSTGRES_DB ,
  POSTGRES_SCHEMA: process.env.POSTGRES_SCHEMA || "public",
  DISK_USAGE_COMMAND: process.env.DISK_USAGE_COMMAND || "df -h",
  MEMORY_USAGE_COMMAND:
    process.env.MEMORY_USAGE_COMMAND ||
    (platform === "darwin" ? "vm_stat" : "free -m"),
  VPS_DISK_USAGE_COMMAND: process.env.VPS_DISK_USAGE_COMMAND || "df -h",
  VPS_MEMORY_USAGE_COMMAND: process.env.VPS_MEMORY_USAGE_COMMAND || "free -m",
  VPS_DOCKER_COMMAND: process.env.VPS_DOCKER_COMMAND || "docker ps",
  VPS_PSQL_COMMAND: process.env.VPS_PSQL_COMMAND || "psql",
};

export function buildSshCommand(command) {
  if (!ENV.VPS_HOST) {
    throw new Error(
      "Environment variable VPS_HOST is required for remote VPS tools.",
    );
  }

  const sshOptions = ENV.VPS_SSH_OPTIONS
    ? `${ENV.VPS_SSH_OPTIONS.trim()} `
    : "";
  return `ssh ${sshOptions}${ENV.VPS_USER}@${ENV.VPS_HOST} '${shellEscape(command)}'`;
}

export function escapeSqlLiteral(value) {
  return value.replace(/'/g, "''");
}

import { defineConfig } from "drizzle-kit";
import { AppEnvs } from "./src/lib/read-env";

export default defineConfig({
  schema: "./src/lib/database/drizzle-orm/schema.ts",
  out: "./src/lib/database/drizzle-orm/migrations",
  dialect: "mysql",
  dbCredentials: {
    url: AppEnvs.DATABASE_URL,
  },
  verbose: true,
  strict: true,
});

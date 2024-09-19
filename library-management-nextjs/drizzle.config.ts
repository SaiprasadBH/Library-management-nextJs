import { defineConfig } from "drizzle-kit";
import { AppEnvs } from "@/lib/core/read-env";
import "@/lib/database/drizzle-orm/envConfig";

export default defineConfig({
  schema: "./src/lib/database/drizzle-orm/schema.ts",
  dialect: "postgresql",
  out: "./src/lib/database/drizzle-orm",
  dbCredentials: {
    url: process.env.POSTGRES_URL!,
  },
  migrations: {
    prefix: "supabase",
    table: "library_migrations",
    schema: "public",
  },
  verbose: true,
  strict: true,
});

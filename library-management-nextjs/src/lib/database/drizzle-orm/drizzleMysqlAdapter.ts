import { sql } from "@vercel/postgres"; // `@vercel/postgres` package for connecting to PostgreSQL
import { AppEnvs } from "../../core/read-env";
import { members, books, transactions } from "./schema";
import "@/lib/database/drizzle-orm/envConfig";
import * as schema from "@/lib/database/drizzle-orm/schema";
import { VercelPgDatabase } from "drizzle-orm/vercel-postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";
export interface IDrizzleAdapter {
  getConnection: () => Promise<VercelPgDatabase<typeof schema>>;
}

export class DrizzleAdapter implements IDrizzleAdapter {
  constructor() {}

  async getConnection() {
    const connection = drizzle(sql, { schema });
    return connection;
  }
}

const drizzleAdapter = new DrizzleAdapter();
export { drizzleAdapter, members, books, transactions };

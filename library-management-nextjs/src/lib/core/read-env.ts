import "dotenv/config";
import { configDotenv } from "dotenv";

configDotenv();
interface AppEnv {
  DATABASE_URL: string;
  NEXTAUTH_SECRET: string;
}

// Access and validate environment variables
const getAppEnvs = (): AppEnv => {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined in the environment variables");
  }
  if (!process.env.NEXTAUTH_SECRET) {
    throw new Error("NEXTAUTH_SECRET is not defined in environment variable");
  }

  return {
    DATABASE_URL: process.env.DATABASE_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  };
};

export const AppEnvs = getAppEnvs();

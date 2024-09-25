import "dotenv/config";
import { configDotenv } from "dotenv";

configDotenv();
interface AppEnv {
  NEXTAUTH_SECRET: string;
  NEXT_PUBLIC_CALENDLY_ACCESS_TOKEN: string;
}

// Access and validate environment variables
const getAppEnvs = (): AppEnv => {
  if (!process.env.NEXTAUTH_SECRET) {
    throw new Error("NEXTAUTH_SECRET is not defined in environment variable");
  }
  if (!process.env.NEXT_PUBLIC_CALENDLY_ACCESS_TOKEN) {
    throw new Error(
      "NEXT_PUBLIC_CALENDLY_ACCESS_TOKEN is not defined in the environment variables"
    );
  }

  return {
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXT_PUBLIC_CALENDLY_ACCESS_TOKEN:
      process.env.NEXT_PUBLIC_CALENDLY_ACCESS_TOKEN,
  };
};

export const AppEnvs = getAppEnvs();

import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User {
    role?: string; // Add custom properties here
  }

  interface Session {
    user: User; // Ensure session user type includes role
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string; // Add custom properties here
  }
}

import NextAuth, { User } from "next-auth";
import { authConfig } from "./auth.config";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { IMember } from "../src/lib/definitions";
import { z } from "zod";
import { MemberRepository } from "./lib/repositories/member.repository";
import { drizzleAdapter } from "./lib/database/drizzle-orm/drizzleMysqlAdapter";
import Google from "next-auth/providers/google";
import { createMember } from "./lib/actions";

function mapMemberToUser(member: IMember): User {
  return {
    id: member.id.toString(),
    name: member.name,
    email: member.email,
  };
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Google,
    CredentialsProvider({
      authorize: async (credentials) => {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (!parsedCredentials.success) {
          console.log("Invalid credentials format");
          return null;
        }

        const { email, password } = parsedCredentials.data;

        try {
          const memberRepo = new MemberRepository(drizzleAdapter);
          const user = await memberRepo.getByEmail(email);
          if (!user) {
            console.log("User not found");
            return null;
          }

          const passwordMatched = await bcrypt.compare(password, user.password);
          if (!passwordMatched) {
            console.log("Password does not match");
            return null;
          }

          return mapMemberToUser(user);
        } catch (error) {
          console.error("Error during authentication:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          if (user) {
            const memberRepo = new MemberRepository(drizzleAdapter);
            const existingUser = await memberRepo.getByEmail(user.email!);
            if (!existingUser) {
              const result = await memberRepo.create({
                name: user.name!,
                email: user.email!,
                age: 18,
                password: "GoogleLogin@123",
                role: "user",
                address: "default address",
              });
            }
          }
        } catch (error) {
          console.error("Error creating user:", error);
          return false;
        }
      }
      return true;
    },
  },
});

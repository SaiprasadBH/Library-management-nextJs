import NextAuth, { User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { IMember } from "@/lib/definitions";
import { z } from "zod";
import Google from "next-auth/providers/google";
import { GoogleProfile } from "next-auth/providers/google";
import { authConfig } from "./auth.config";
import { MemberRepository } from "./lib/repositories/member.repository";
import { drizzleAdapter } from "./lib/database/drizzle-orm/drizzleMysqlAdapter";
import { hashPassword } from "./lib/hashing/passwordHashing";
import { IMemberBase } from "./lib/database/zod/member.schema";

const memberRepo = new MemberRepository(drizzleAdapter);

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/login",
  },
  providers: [
    Google({
      profile(profile: GoogleProfile) {
        return { role: profile.role ?? "user", ...profile };
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },
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

          const userData = {
            id: user.id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
          };
          console.log("User data: ", userData);
          return userData;
        } catch (error) {
          console.error("Error during authentication:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    ...authConfig.callbacks,

    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          if (user.email && user.name) {
            const existingUser = await memberRepo.getByEmail(user.email);

            let userDetails: IMemberBase;
            if (!existingUser) {
              userDetails = {
                name: user.name,
                email: user.email,
                age: 18,
                password: await hashPassword("GooglePassword@123"),
                role: "user",
                address: "default address",
              };
              const result = await memberRepo.create(userDetails);
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
export { NextAuth };

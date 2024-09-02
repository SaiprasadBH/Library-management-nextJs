"use server";
import { ZodError } from "zod";
import {
  drizzleAdapter,
  books,
  members,
} from "./database/drizzle-orm/drizzleMysqlAdapter";
import { IMemberBase } from "./definitions";
import { IMember, MemberBaseSchema } from "./database/zod/member.schema";
import { hashPassword } from "./hashing/passwordHashing";
import { eq } from "drizzle-orm";
import { MemberRepository } from "./repositories/member.repository";
import { BookRepository } from "./repositories/book.repository";

export const memberRepo = new MemberRepository(drizzleAdapter);
export const bookRepo = new BookRepository(drizzleAdapter);

export async function fetchAllBooks() {
  const dbConnection = await drizzleAdapter.getPoolConnection();
  const booksArray = dbConnection.select().from(books);
  return booksArray;
}

export async function login(prevState: any, formData: FormData) {
  return { success: true };
}

export async function registerUser(prevState: any, formData: FormData) {
  const user: IMemberBase = {
    name: formData.get("name") as string,
    age: Number(formData.get("age")),
    email: formData.get("email") as string,
    address: formData.get("address") as string,
    password: formData.get("password") as string,
    role: formData.get("role") as "user" | "admin",
  };

  try {
    const validatedUser: IMemberBase = MemberBaseSchema.parse(user);
    const userInDatabase = await memberRepo.getByEmail(validatedUser.email);
    if (userInDatabase && userInDatabase.email === validatedUser.email) {
      throw new Error("User already exists");
    }
    const hashedPassword = await hashPassword(validatedUser.password);
    const validatedUserWithHashedPassword: IMemberBase = {
      ...validatedUser,
      password: hashedPassword,
    };
    console.log(validatedUserWithHashedPassword);
    const response = await memberRepo.create(
      validatedUserWithHashedPassword as IMemberBase
    );
    console.log(response);

    if (!response) {
      throw new Error("Registration failed");
    }

    return { success: true };
  } catch (error) {
    if (error instanceof ZodError) {
      return { error: error.errors[0].message || "Invalid input" };
    } else if ((error as Error).message) {
      return { error: `${(error as Error).message}` };
    }

    return { error: "An unexpected error occurred" };
  }
}

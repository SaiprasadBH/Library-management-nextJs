"use server";
import { ZodError } from "zod";
import {
  drizzleAdapter,
  books,
  members,
} from "./database/drizzle-orm/drizzleMysqlAdapter";
import { IMemberBase } from "./definitions";
import { MemberBaseSchema } from "./database/zod/member.schema";

export async function fetchAllBooks() {
  const dbConnection = await drizzleAdapter.getPoolConnection();
  const booksArray = dbConnection.select().from(books);
  return booksArray;
}

export async function CreateUser(user: IMemberBase) {
  const dbConnection = await drizzleAdapter.getPoolConnection();
  const [createdUser] = await dbConnection.insert(members).values(user);
  return createdUser;
}

export async function registerUser(prevState: any, formData: FormData) {
  const user = {
    name: formData.get("name"),
    age: Number(formData.get("age")),
    email: formData.get("email"),
    address: formData.get("address"),
    password: formData.get("password"),
    role: formData.get("role"),
  };

  try {
    const validatedUser = MemberBaseSchema.parse(user);
    const response = await CreateUser(validatedUser);

    if (!response) {
      throw new Error("Registration failed");
    }

    return { success: true };
  } catch (error) {
    if (error instanceof ZodError) {
      return { error: error.errors[0].message || "Invalid input" };
    }
    return { error: "An unexpected error occurred" };
  }
}

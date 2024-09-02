"use server";
import { ZodError } from "zod";
import {
  drizzleAdapter,
  books,
  members,
} from "./database/drizzle-orm/drizzleMysqlAdapter";
import { IMemberBase } from "./definitions";
import { MemberBaseSchema } from "./database/zod/member.schema";
import { hashPassword } from "./hashing/passwordHashing";
import { eq } from "drizzle-orm";

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
export async function getUserByEmail(email: string) {
  const dbConnection = await drizzleAdapter.getPoolConnection();
  const user = await dbConnection
    .select()
    .from(members)
    .where(eq(members.email, email));
  return user;
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

  console.log("user:", user);

  try {
    const validatedUser: IMemberBase = MemberBaseSchema.parse(user);
    console.log("validated User", validatedUser);
    const userInDatabase = await getUserByEmail(validatedUser.email);
    console.log("user in database", userInDatabase);
    if (
      userInDatabase.length > 0 &&
      userInDatabase[0].email === validatedUser.email
    ) {
      throw new Error("User already exists");
    }
    const hashedPassword = await hashPassword(validatedUser.password);
    const validatedUserWithHashedPassword: IMemberBase = {
      ...validatedUser,
      password: hashedPassword,
    };
    console.log(validatedUserWithHashedPassword);
    const response = await CreateUser(
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
    console.error(error);

    return { error: "An unexpected error occurred" };
  }
}

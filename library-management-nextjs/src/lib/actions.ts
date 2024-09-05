"use server";
import { ZodError } from "zod";
import {
  drizzleAdapter,
  books,
  members,
} from "./database/drizzle-orm/drizzleMysqlAdapter";
import { IBook, IMemberBase } from "./definitions";
import { IMember, MemberBaseSchema } from "./database/zod/member.schema";
import { hashPassword } from "./hashing/passwordHashing";
import { eq } from "drizzle-orm";
import { MemberRepository } from "./repositories/member.repository";
import { BookRepository } from "./repositories/book.repository";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { IPagedResponse, IPageRequest } from "./core/pagination";
import { redirect } from "next/navigation";
import {
  BookSchema,
  BookSchemaBase,
  BookUpdateSchema,
  IBookBase,
} from "./database/zod/book.schema";
import { error } from "console";
import { revalidatePath } from "next/cache";

const memberRepo = new MemberRepository(drizzleAdapter);
const bookRepo = new BookRepository(drizzleAdapter);

export async function fetchAllBooks() {
  const dbConnection = await drizzleAdapter.getPoolConnection();
  const booksArray = dbConnection.select().from(books);
  return booksArray;
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
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

export async function fetchBooks(
  params: IPageRequest
): Promise<IPagedResponse<IBook>> {
  try {
    const result = await bookRepo.list(params);
    if (!result) {
      throw new Error("No results returned from repository");
    }
    return result;
  } catch (error) {
    console.error("Error fetching books:", error);
    throw new Error("Failed to fetch books");
  }
}

export async function updateBook(
  id: number,
  prevState: any,
  formData: FormData
) {
  console.log(formData.get("numOfPages"));
  const book: IBookBase = {
    title: formData.get("title") as string,
    author: formData.get("author") as string,
    publisher: formData.get("publisher") as string,
    genre: formData.get("genre") as string,
    isbnNo: formData.get("isbnNo") as string,
    numOfPages: Number(formData.get("numOfPages")),
    totalNumOfCopies: Number(formData.get("totalNumOfCopies")),
  };
  try {
    const response = await bookRepo.update(id, book);

    if (!response) {
      return {
        error: "Error:Failed to update book",
      };
    }
  } catch (error) {
    if (error instanceof ZodError) {
      return { error: error.errors[0].message || "Invalid input" };
    } else if ((error as Error).message) {
      return { error: `${(error as Error).message}` };
    }

    return { error: "An unexpected error occurred" };
  }
  revalidatePath(`/admin/books`);
  redirect("/admin/books");
}
export async function deleteBook(id: number) {
  try {
    const deletedBook = await bookRepo.delete(id);
    if (!deleteBook) {
      return { error: "failed to delete book" };
    }
    revalidatePath("/admin/books");
    redirect("/admin/books");
    return { success: true };
  } catch (error) {
    return { error: "Database Error: Failed to Delete book" };
  }
}

export async function createBook(prevState: any, formData: FormData) {
  try {
    const book: IBookBase = {
      title: formData.get("title") as string,
      author: formData.get("author") as string,
      publisher: formData.get("publisher") as string,
      genre: formData.get("genre") as string,
      isbnNo: formData.get("isbnNo") as string,
      numOfPages: Number(formData.get("numofPages")),
      totalNumOfCopies: Number(formData.get("totalNumOfCopies")),
    };

    const response = await bookRepo.create(book);
    if (!response) {
      throw new Error("failed to create book");
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

export async function getBookById(id: number) {
  try {
    return await bookRepo.getById(id);
  } catch (err) {
    console.error("unexpected error occured");
  }
}

"use server";
import { ZodError } from "zod";
import {
  drizzleAdapter,
  books,
  members,
} from "./database/drizzle-orm/drizzleMysqlAdapter";
import {
  IBook,
  IMemberBase,
  ITransaction,
  ITransactionBase,
} from "./definitions";
import { IMember, MemberBaseSchema } from "./database/zod/member.schema";
import { hashPassword } from "./hashing/passwordHashing";
import { eq } from "drizzle-orm";
import { MemberRepository } from "./repositories/member.repository";
import { BookRepository } from "./repositories/book.repository";
import { auth, signIn } from "@/auth";
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
import { TransactionRepository } from "./repositories/transaction.repository";
import { MySql2Database } from "drizzle-orm/mysql2";

const memberRepo = new MemberRepository(drizzleAdapter);
const bookRepo = new BookRepository(drizzleAdapter);
const connection = await drizzleAdapter.getPoolConnection();
const transactionRepo = new TransactionRepository(drizzleAdapter);

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
    const result = await signIn("credentials", {
      redirect: false,
      email: formData.get("email"),
      password: formData.get("password"),
    });
    if (result) {
      redirect("/admin/books");
    }
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
    role: "user",
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
      throw new Error("No books returned from repository");
    }
    return result;
  } catch (error) {
    console.error("Error fetching books:", error);
    throw new Error("Failed to fetch books");
  }
}

export async function fetchMembers(
  params: IPageRequest
): Promise<IPagedResponse<IMember>> {
  try {
    const result = await memberRepo.list(params);
    if (!result) {
      throw new Error("No member returned from repository");
    }
    return result;
  } catch (err) {
    console.error("Error in fetching member", error);
    throw new Error("Falid to fetch members");
  }
}
export async function fetchRequests(params: IPageRequest) {
  try {
    const result = transactionRepo.listRequests(params);
    if (!result) {
      throw new Error("No transaction returned from repository");
    } else {
      return result;
    }
  } catch (error) {
    console.error("Error in listing transaction", error);
  }
}

export async function fetchNonPendingTransactions(params: IPageRequest) {
  try {
    const result = transactionRepo.listNonPendingTransactions(params);
    if (!result) {
      throw new Error("No transaction returned from repository");
    } else {
      return result;
    }
  } catch (error) {
    console.error("Error in listing transaction", error);
  }
}

export async function updateBook(
  id: number,
  prevState: any,
  formData: FormData
) {
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
      throw new Error("failed to delete book");
    }
    revalidatePath("/admin/books");
  } catch (error) {
    console.error(error);
  } finally {
    redirect("/admin/books");
  }
}

export async function deleteMember(id: number) {
  try {
    const deletedMember = await memberRepo.delete(id);
    if (!deletedMember) {
      throw new Error("failed to delete member");
    }
    revalidatePath("/admin/members");
  } catch (error) {
    console.error(error);
  } finally {
    redirect("/admin/members");
  }
}

export async function deleteTransaction(id: number) {
  try {
    const deletedMember = await transactionRepo.delete(id);
    if (!deletedMember) {
      throw new Error("failed to delete transaction");
    }
    revalidatePath("/admin/transactions");
  } catch (error) {
    console.error(error);
  } finally {
    redirect("/admin/transactions");
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
export async function createMember(prevState: any, formData: FormData) {
  try {
    const member: IMemberBase = {
      name: formData.get("name") as string,
      age: Number(formData.get("age")),
      email: formData.get("email") as string,
      address: formData.get("address") as string,
      password: formData.get("password") as string,
      role: formData.get("role") as "admin" | "librarian" | "user",
    };

    const response = await memberRepo.create(member);
    if (!response) {
      throw new Error("failed to create member");
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

export async function getUserDetails() {
  const session = await auth();
  const user = session!.user;
  const email = user!.email;
  try {
    const userDetails = await memberRepo.getByEmail(email as string);
    if (!userDetails) {
      throw new Error("User details not be found");
    }
    return { userDetails };
  } catch (error) {
    console.error("Error finding details of user", error);
  }
}

export async function createBookRequest(id: number) {
  try {
    const user = await getUserDetails();
    const transactionData: ITransactionBase = {
      memberId: BigInt(user?.userDetails.id!),
      bookId: BigInt(id),
    };
    const response = await transactionRepo.create(transactionData);
    if (!response) {
      return { error: "failed to create request" };
    }
    revalidatePath("/admin/books");
    return { success: true };
  } catch (error) {
    console.error(error);
    return {
      error: (error as Error).message,
    };
  }
}

export async function approveRequest(id: number) {
  try {
    const response = await transactionRepo.updateStatus(id, "issued");
    if (!response) {
      return { error: "Failed to approve request" };
    }
    revalidatePath("/admin/requests");
    return { success: true };
  } catch (error) {
    console.error(error);
    return {
      error: (error as Error).message,
    };
  }
}

export async function rejectRequest(id: number) {
  try {
    const response = await transactionRepo.updateStatus(id, "rejected");
    if (!response) {
      return { error: "Failed to reject request" };
    }
    revalidatePath("/admin/requests");
    return { success: true };
  } catch (error) {
    console.error(error);
    return {
      error: (error as Error).message,
    };
  }
}

export async function returnRequest(id: number) {
  try {
    const response = await transactionRepo.updateStatus(id, "returned");
    if (!response) {
      return { error: "Failed to return book" };
    }
    revalidatePath("/admin/return-book");
    return { success: true };
  } catch (error) {
    console.error(error);
    return {
      error: (error as Error).message,
    };
  }
}

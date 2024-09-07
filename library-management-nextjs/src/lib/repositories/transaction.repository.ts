import { BookRepository } from "@/lib/repositories/book.repository";
import { IRepository } from "../core/repository";
import { MemberRepository } from "@/lib/repositories/member.repository";
import { ITransaction, ITransactionBase } from "../models/transaction.model";
import { ITransactionBaseSchema } from "@/lib/database/zod/transaction.schema";
import { IBook } from "@/lib/definitions";
import {
  drizzleAdapter,
  transactions,
  books,
} from "@/lib/database/drizzle-orm/drizzleMysqlAdapter";
import { eq, sql } from "drizzle-orm";
import { IPagedResponse, IPageRequest } from "../core/pagination";

export class TransactionRepository
  implements Omit<IRepository<ITransactionBase, ITransaction>, "update">
{
  constructor(private readonly dbConnFactory: typeof drizzleAdapter) {}
  private bookRepo: BookRepository = new BookRepository(this.dbConnFactory);
  private memberRepo: MemberRepository = new MemberRepository(
    this.dbConnFactory
  );

  async create(data: ITransactionBase): Promise<ITransaction | undefined> {
    //const validatedData = ITransactionBaseSchema.parse(data);
    const validatedData = data;
    console.log(validatedData);
    const book = await this.bookRepo.getById(Number(validatedData.bookId));

    if (!book || book.availableNumOfCopies <= 0) {
      throw new Error("The book is not available or has no available copies.");
    }

    const updatedBook: IBook = {
      ...book,
      availableNumOfCopies: book.availableNumOfCopies - 1,
    };

    const newTransaction: ITransaction = {
      id: 0,
      memberId: BigInt(validatedData.memberId),
      bookId: BigInt(validatedData.bookId),
      bookStatus: "pending",
      dateOfIssue: new Date().toISOString().split("T")[0],
    };

    const db = await this.dbConnFactory.getPoolConnection();
    try {
      const createdTransaction: ITransaction = await db.transaction(
        async (tx) => {
          const [result] = await tx
            .select()
            .from(transactions)
            .where(eq(transactions.bookId, validatedData.bookId));
          await tx.insert(transactions).values(newTransaction);
          return result;
        }
      );
      await this.bookRepo.update(book.id, updatedBook);

      return createdTransaction;
    } catch (err) {
      throw new Error("Transaction creation failed: " + (err as Error).message);
    }
  }

  async delete(id: number): Promise<ITransaction | undefined> {
    const transaction = await this.getById(id);
    if (!transaction) {
      throw new Error(
        "Transaction not found. Please enter correct transaction ID."
      );
    }

    if (transaction.bookStatus === "returned") {
      throw new Error("This book has already been returned.");
    }

    const book = await this.bookRepo.getById(Number(transaction.bookId));
    if (!book) {
      throw new Error("Book not found.");
    }

    const updatedBook: IBook = {
      ...book,
      availableNumOfCopies: book.availableNumOfCopies + 1,
    };

    const db = await this.dbConnFactory.getPoolConnection();
    try {
      const updatedTransaction = await db.transaction(async (tx) => {
        await tx
          .update(transactions)
          .set({ bookStatus: "returned" })
          .where(eq(transactions.id, id));
        await tx
          .update(books)
          .set({ availableNumOfCopies: updatedBook.availableNumOfCopies })
          .where(eq(books.id, book.id));
        return transaction;
      });

      return updatedTransaction;
    } catch (err) {
      throw new Error("Transaction deletion failed: " + (err as Error).message);
    }
  }

  async getById(transactionId: number): Promise<ITransaction | undefined> {
    const db = await this.dbConnFactory.getPoolConnection();
    const [selectedTransaction] = await db
      .select()
      .from(transactions)
      .where(eq(transactions.id, transactionId));

    if (!selectedTransaction) {
      throw new Error(
        "Transaction not found. Please enter correct transaction ID."
      );
    }
    return selectedTransaction;
  }

  async list(params: IPageRequest): Promise<IPagedResponse<ITransaction>> {
    const db = await this.dbConnFactory.getPoolConnection();
    let searchWhereClause;

    if (params.search) {
      const search = `%${params.search.toLowerCase()}%`;
      searchWhereClause = sql`${transactions.bookId} LIKE ${search} OR ${transactions.memberId} LIKE ${search}`;
    }

    const items = await db
      .select()
      .from(transactions)
      .where(searchWhereClause)
      .offset(params.offset)
      .limit(params.limit);

    const [{ count: total }] = await db
      .select({ count: sql<number>`count(*)` })
      .from(transactions)
      .where(searchWhereClause);

    return {
      items,
      pagination: {
        offset: params.offset,
        limit: params.limit,
        total,
      },
    };
  }
}

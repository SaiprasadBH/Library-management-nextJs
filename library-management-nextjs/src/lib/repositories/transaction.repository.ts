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
  members,
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

  async create(data: ITransactionBase): Promise<ITransaction> {
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

    const newTransaction = {
      memberId: BigInt(validatedData.memberId),
      bookId: BigInt(validatedData.bookId),
      bookStatus: "pending",
      dateOfIssue: new Date().toISOString().split("T")[0],
    };

    const db = await this.dbConnFactory.getConnection();
    try {
      const createdTransaction: ITransaction = await db.transaction(
        async (tx) => {
          const [result] = await tx
            .select()
            .from(transactions)
            .where(eq(transactions.bookId, validatedData.bookId));
          await tx.insert(transactions).values(newTransaction as ITransaction);
          return result;
        }
      );
      await this.bookRepo.update(book.id, updatedBook);

      return createdTransaction;
    } catch (err) {
      throw new Error("Transaction creation failed: " + (err as Error).message);
    }
  }

  async updateStatus(
    id: number,
    bookStatus: "pending" | "issued" | "rejected" | "returned"
  ): Promise<ITransaction | undefined> {
    const transaction = await this.getById(id);
    if (!transaction) {
      throw new Error("Transaction not found.");
    }

    const db = await this.dbConnFactory.getConnection();
    let updatedTransaction: ITransaction | undefined;

    // If the status is "rejected" or "returned", update the book's available copies
    if (bookStatus === "rejected" || bookStatus === "returned") {
      const book = await this.bookRepo.getById(Number(transaction.bookId));
      if (!book) {
        throw new Error("Book not found.");
      }

      const updatedBook: IBook = {
        ...book,
        availableNumOfCopies: book.availableNumOfCopies + 1,
      };

      await this.bookRepo.update(book.id, updatedBook);
    }

    // Update the bookStatus and possibly the dateOfIssue if status is 'issued'
    try {
      updatedTransaction = await db.transaction(async (tx) => {
        const updateData: Partial<ITransaction> = { bookStatus };

        if (bookStatus === "issued") {
          updateData.dateOfIssue = new Date().toISOString().split("T")[0];
        }

        await tx
          .update(transactions)
          .set(updateData)
          .where(eq(transactions.id, id));

        return transaction;
      });

      return updatedTransaction;
    } catch (err) {
      throw new Error(
        "Transaction status update failed: " + (err as Error).message
      );
    }
  }

  async delete(id: number): Promise<ITransaction | undefined> {
    const transaction = await this.getById(id);
    if (!transaction) {
      throw new Error(
        "Transaction not found. Please enter correct transaction ID."
      );
    }

    if (transaction.bookStatus === "pending") {
      throw new Error(
        "Pending transaction cannot be deleted please approve or reject"
      );
    }

    const db = await this.dbConnFactory.getConnection();
    try {
      const updatedTransaction = await db.transaction(async (tx) => {
        await tx.delete(transactions).where(eq(transactions.id, id));
        return transaction;
      });

      return updatedTransaction;
    } catch (err) {
      throw new Error("Transaction deletion failed: " + (err as Error).message);
    }
  }

  async getById(transactionId: number): Promise<ITransaction | undefined> {
    const db = await this.dbConnFactory.getConnection();
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
    const db = await this.dbConnFactory.getConnection();
    let searchWhereClause;

    if (params.search) {
      const search = `%${params.search.toLowerCase()}%`;
      searchWhereClause = sql`${transactions.bookId} ILIKE ${search} OR ${transactions.memberId} ILIKE ${search}`;
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
  async listRequests(params: IPageRequest) {
    const db = await this.dbConnFactory.getConnection();
    let searchWhereClause;

    // Always include the condition for bookStatus = 'pending'
    if (params.search) {
      const search = `%${params.search.toLowerCase()}%`;
      // Search for bookStatus = 'pending' and apply search filters
      searchWhereClause = sql`${transactions.bookStatus} = 'pending' 
        AND (
          ${transactions.bookId} ILIKE ${search} 
          OR ${members.name} ILIKE ${search}
          OR ${members.email} ILIKE ${search}
          OR ${books.title} ILIKE ${search}
          OR ${books.isbnNo} ILIKE ${search}
        )`;
    } else {
      // If no search term is provided, filter only by 'pending' transactions
      searchWhereClause = sql`${transactions.bookStatus} = 'pending'`;
    }

    // Perform the join with members and books to fetch all necessary information
    const items = await db
      .select({
        id: transactions.id,
        memberName: members.name,
        memberEmail: members.email,
        bookTitle: books.title,
        bookStatus: transactions.bookStatus,
      })
      .from(transactions)
      .leftJoin(members, sql`${transactions.memberId} = ${members.id}`)
      .leftJoin(books, sql`${transactions.bookId} = ${books.id}`)
      .where(searchWhereClause)
      .offset(params.offset)
      .limit(params.limit);

    // Fetch the total count of pending requests
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

  async listNonPendingTransactions(params: IPageRequest) {
    const db = await this.dbConnFactory.getConnection();
    let searchWhereClause;

    // Prepare search clause if search is provided
    if (params.search) {
      const search = `%${params.search.toLowerCase()}%`;
      // Filter by non-pending status and apply search on books and members
      searchWhereClause = sql`${transactions.bookStatus} != 'pending' 
        AND (
          ${transactions.bookId} ILIKE ${search} 
          OR ${members.name} ILIKE ${search} 
          OR ${members.email} ILIKE ${search} 
          OR ${books.title} ILIKE ${search}
          OR ${books.isbnNo} ILIKE ${search}
        )`;
    } else {
      // Filter only by non-pending transactions
      searchWhereClause = sql`${transactions.bookStatus} != 'pending'`;
    }

    // Perform the join with members and books
    const items = await db
      .select({
        id: transactions.id,
        memberName: members.name,
        memberEmail: members.email,
        bookTitle: books.title,
        isbn: books.isbnNo,
        bookStatus: transactions.bookStatus,
      })
      .from(transactions)
      .leftJoin(members, sql`${transactions.memberId} = ${members.id}`)
      .leftJoin(books, sql`${transactions.bookId} = ${books.id}`)
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

  async listIssuedTransactions(params: IPageRequest) {
    const db = await this.dbConnFactory.getConnection();
    let searchWhereClause;

    // Search for transactions with bookStatus = 'issued'
    if (params.search) {
      const search = `%${params.search.toLowerCase()}%`;
      searchWhereClause = sql`${transactions.bookStatus} = 'issued' 
        AND (
          ${transactions.bookId} ILIKE ${search} 
          OR ${members.name} ILIKE ${search}
          OR ${members.email} ILIKE ${search}
          OR ${books.title} ILIKE ${search}
          OR ${books.isbnNo} ILIKE ${search}
        )`;
    } else {
      // If no search term is provided, filter only by 'issued' transactions
      searchWhereClause = sql`${transactions.bookStatus} = 'issued'`;
    }

    // Perform the join with members and books
    const items = await db
      .select({
        id: transactions.id,
        memberName: members.name,
        memberEmail: members.email,
        bookTitle: books.title,
        isbn: books.isbnNo,
        bookStatus: transactions.bookStatus,
      })
      .from(transactions)
      .leftJoin(members, sql`${transactions.memberId} = ${members.id}`)
      .leftJoin(books, sql`${transactions.bookId} = ${books.id}`)
      .where(searchWhereClause)
      .offset(params.offset)
      .limit(params.limit);

    // Fetch the total count of issued transactions
    const [{ count: total }] = await db
      .select({ count: sql<number>`count(*)` })
      .from(transactions)
      .where(searchWhereClause);

    // Return the paginated response
    return {
      items,
      pagination: {
        offset: params.offset,
        limit: params.limit,
        total,
      },
    };
  }

  async listMemberSpecificRequestedBooks(memberId: number) {
    try {
      const db = await this.dbConnFactory.getConnection();
      const whereClause = eq(transactions.memberId, BigInt(memberId));

      // Fetch transactions and join with books table to get title and author
      const items = await db
        .select({
          id: transactions.id,
          title: books.title,
          author: books.author,
          date: transactions.dateOfIssue,
          status: transactions.bookStatus,
        })
        .from(transactions)
        .innerJoin(books, eq(books.id, transactions.bookId))
        .where(whereClause);

      return items;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
  async listOverdueTransactions(params: IPageRequest) {
    const db = await this.dbConnFactory.getConnection();
    const fifteenDaysAgo = new Date();
    fifteenDaysAgo.setDate(fifteenDaysAgo.getDate() - 15);
    const overdueDate = fifteenDaysAgo.toISOString().split("T")[0];

    let searchWhereClause;

    if (params.search) {
      const search = `%${params.search.toLowerCase()}%`;
      searchWhereClause = sql`${transactions.bookStatus} = 'issued'
        AND ${transactions.dateOfIssue} < ${overdueDate}
        AND (
          ${books.title} ILIKE ${search}
          OR ${members.name} ILIKE ${search}
          OR ${members.email} ILIKE ${search}
          OR ${books.isbnNo} ILIKE ${search}
        )`;
    } else {
      searchWhereClause = sql`${transactions.bookStatus} = 'issued'
        AND ${transactions.dateOfIssue} < ${overdueDate}`;
    }

    const items = await db
      .select({
        id: transactions.id,
        memberName: members.name,
        memberEmail: members.email,
        bookTitle: books.title,
        dateOfIssue: transactions.dateOfIssue,
        bookStatus: transactions.bookStatus,
        isbn: books.isbnNo,
      })
      .from(transactions)
      .leftJoin(members, sql`${transactions.memberId} = ${members.id}`)
      .leftJoin(books, sql`${transactions.bookId} = ${books.id}`)
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

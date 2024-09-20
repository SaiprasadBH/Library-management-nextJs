import { IRepository } from "../core/repository";
import { IBook } from "../models/book.model";
import {
  BookSchema,
  BookSchemaBase,
  IBookBase,
} from "../database/zod/book.schema";
import { IPageRequest, IPagedResponse } from "../core/pagination";
import {
  drizzleAdapter,
  books,
  IDrizzleAdapter,
} from "../database/drizzle-orm/drizzleMysqlAdapter";
import { asc, desc, eq, like, sql } from "drizzle-orm";

export class BookRepository implements IRepository<IBookBase, IBook> {
  constructor(private readonly dbConnFactory: IDrizzleAdapter) {}

  async create(newBookdata: IBookBase): Promise<IBook | undefined> {
    let validatedData: Partial<IBook> = BookSchemaBase.parse(newBookdata);
    validatedData = {
      ...validatedData,
      availableNumOfCopies: validatedData.totalNumOfCopies,
    };

    const db = await this.dbConnFactory.getConnection(); // Updated to use getConnection
    const [insertedBook] = await db
      .insert(books)
      .values(validatedData as IBook)
      .returning({ id: books.id });
    const resultedBook = await this.getById(insertedBook.id);

    return resultedBook;
  }

  async update(bookId: number, data: IBookBase): Promise<IBook | undefined> {
    let validatedData: Partial<IBook>;
    if (Object.keys(data).includes("id"))
      validatedData = BookSchema.parse(data);
    else validatedData = BookSchemaBase.parse(data);

    const oldData = (await this.getById(bookId))!;
    const newData = {
      ...oldData,
      ...validatedData,
    };
    const updatedData: IBook = {
      ...newData,
      availableNumOfCopies:
        newData.totalNumOfCopies -
        (oldData.totalNumOfCopies - newData.availableNumOfCopies),
    };

    const db = await this.dbConnFactory.getConnection(); // Updated to use getConnection
    await db.update(books).set(updatedData).where(eq(books.id, bookId));

    return updatedData;
  }

  async delete(bookId: number): Promise<IBook | undefined> {
    const deletedBook = await this.getById(bookId);

    const db = await this.dbConnFactory.getConnection(); // Updated to use getConnection
    await db.delete(books).where(eq(books.id, bookId));

    return deletedBook;
  }

  async getById(bookId: number): Promise<IBook | undefined> {
    const db = await this.dbConnFactory.getConnection(); // Updated to use getConnection
    const [selectedBook] = await db
      .select()
      .from(books)
      .where(eq(books.id, bookId));

    if (!selectedBook) throw new Error("Book not found");
    return selectedBook;
  }

  async list(params: IPageRequest): Promise<IPagedResponse<IBook> | undefined> {
    const db = await this.dbConnFactory.getConnection(); // Updated to use getConnection
    let searchWhereClause;

    // Define the orderByColumn based on the sortField parameter
    let orderByColumn;
    switch (params.sortField) {
      case "title":
        orderByColumn = books.title; // Column from drizzle-orm
        break;
      case "author":
        orderByColumn = books.author; // Column from drizzle-orm
        break;
      case "publisher":
        orderByColumn = books.publisher; // Column from drizzle-orm
        break;
      case "genre":
        orderByColumn = books.genre; // Column from drizzle-orm
        break;
      case "isbnNo":
        orderByColumn = books.isbnNo; // Column from drizzle-orm
        break;
      default:
        orderByColumn = books.title; // Default to title if no valid sort field is provided
        break;
    }

    // Set the sort direction (default to ascending if not provided)
    const orderDirection =
      params.sortDirection === "desc"
        ? desc(orderByColumn)
        : asc(orderByColumn);

    // Apply search filtering if the search query is provided
    if (params.search) {
      const search = `%${params.search.toLowerCase()}%`;
      searchWhereClause = sql`${books.title} ILIKE ${search} OR ${books.isbnNo} ILIKE ${search} OR ${books.author} ILIKE ${search} OR ${books.genre} ILIKE ${search}`;
    }

    // Fetch items with sorting and pagination
    const items = await db
      .select()
      .from(books)
      .where(searchWhereClause)
      .orderBy(orderDirection)
      .offset(params.offset)
      .limit(params.limit);

    // Fetch total count for pagination
    const [{ count: total }] = await db
      .select({ count: sql<number>`count(*)` })
      .from(books)
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

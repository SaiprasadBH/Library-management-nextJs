import { IRepository } from "../core/repository";
import { IBook, IMember, IMemberBase } from "../definitions";
import { IPageRequest, IPagedResponse } from "../core/pagination";
import {
  books,
  drizzleAdapter,
  members,
  transactions,
} from "../database/drizzle-orm/drizzleMysqlAdapter";
import { and, eq, like, sql } from "drizzle-orm";
import { MemberBaseSchema } from "../database/zod/member.schema";

export class MemberRepository implements IRepository<IMemberBase, IMember> {
  constructor(private readonly dbConnFactory: typeof drizzleAdapter) {}

  async create(data: IMemberBase): Promise<IMember | undefined> {
    const validatedData = MemberBaseSchema.parse(data);

    const db = await this.dbConnFactory.getPoolConnection();
    const [insertedMember] = await db
      .insert(members)
      .values(validatedData as IMember);
    const resultedMember = await this.getById(insertedMember.insertId);

    return resultedMember;
  }

  async update(
    memberId: number,
    data: IMemberBase
  ): Promise<IMember | undefined> {
    const validatedData = MemberBaseSchema.parse(data);

    const oldData = (await this.getById(memberId))!;
    const newData = {
      ...oldData,
      ...validatedData,
    };

    const db = await this.dbConnFactory.getPoolConnection();
    await db.update(members).set(newData).where(eq(members.id, memberId));

    return newData as IMember;
  }

  async delete(memberId: number): Promise<IMember | undefined> {
    const deletedMember = await this.getById(memberId);

    const db = await this.dbConnFactory.getPoolConnection();
    await db.delete(members).where(eq(members.id, memberId));

    return deletedMember;
  }

  async getById(memberId: number): Promise<IMember | undefined> {
    const db = await this.dbConnFactory.getPoolConnection();
    const [selectedMember] = await db
      .select()
      .from(members)
      .where(eq(members.id, memberId));

    if (!selectedMember) throw new Error("User not found");
    return selectedMember;
  }

  async getByEmail(email: string): Promise<IMember | undefined> {
    const db = await this.dbConnFactory.getPoolConnection();
    const [selectedMember] = await db
      .select()
      .from(members)
      .where(eq(members.email, email));

    return selectedMember;
  }

  async getBooks(memberId: number): Promise<IBook[] | undefined> {
    const db = await this.dbConnFactory.getPoolConnection();
    const whereClause = and(
      eq(transactions.memberId, BigInt(memberId)), // Convert memberId to BigInt for compatibility
      eq(transactions.bookStatus, "issued") // Check if the status is 'issued'
    );

    const issuedBooks = await db
      .select()
      .from(books)
      .innerJoin(transactions, eq(transactions.bookId, books.id))
      .where(whereClause);

    return issuedBooks.length
      ? issuedBooks.map((record) => record.books)
      : undefined;
  }

  async list(
    params: IPageRequest
  ): Promise<IPagedResponse<IMember> | undefined> {
    const db = await this.dbConnFactory.getPoolConnection();
    let searchWhereClause;

    if (params.search) {
      const search = `%${params.search.toLowerCase()}%`;
      searchWhereClause = sql`${members.name} LIKE ${search} OR ${members.email} LIKE ${search}`;
    }

    const items = await db
      .select()
      .from(members)
      .where(searchWhereClause)
      .offset(params.offset)
      .limit(params.limit);

    const [{ count: total }] = await db
      .select({ count: sql<number>`count(*)` })
      .from(members)
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

  async listBooks(
    memberId: number,
    params: IPageRequest
  ): Promise<IPagedResponse<IBook>> {
    const db = await this.dbConnFactory.getPoolConnection();

    // Define the whereClause using 'and' to combine the conditions
    const whereClause = and(
      eq(transactions.memberId, BigInt(memberId)), // Convert memberId to BigInt for compatibility
      eq(transactions.bookStatus, "issued") // Check if the status is 'issued'
    );

    const issuedBooks = await db
      .select()
      .from(books)
      .innerJoin(transactions, eq(transactions.bookId, books.id))
      .where(whereClause)
      .offset(params.offset)
      .limit(params.limit);

    const [{ total }] = await db
      .select({ total: sql<number>`COUNT(*)` })
      .from(transactions)
      .where(whereClause);

    return {
      items: issuedBooks.map((record) => record.books),
      pagination: {
        offset: params.offset,
        limit: params.limit,
        total,
      },
    };
  }
}

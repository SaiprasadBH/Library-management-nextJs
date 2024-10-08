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

    const db = await this.dbConnFactory.getConnection();
    const [insertedMember] = await db
      .insert(members)
      .values(validatedData as IMember)
      .returning({ id: members.id });
    const resultedMember = await this.getById(insertedMember.id);

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

    const db = await this.dbConnFactory.getConnection();
    await db.update(members).set(newData).where(eq(members.id, memberId));

    return newData as IMember;
  }

  async delete(memberId: number): Promise<IMember | undefined> {
    const deletedMember = await this.getById(memberId);

    const db = await this.dbConnFactory.getConnection();
    await db.delete(members).where(eq(members.id, memberId));

    return deletedMember;
  }

  async updateWallet(memberId: number, amount: number): Promise<void> {
    try {
      const db = await this.dbConnFactory.getConnection();

      // Fetch current wallet balance
      const member = await this.getById(memberId);
      if (!member) throw new Error("Member not found");

      // Update wallet with the new amount
      const newWalletBalance = member.wallet + amount;
      await db
        .update(members)
        .set({ wallet: newWalletBalance })
        .where(eq(members.id, memberId));
    } catch (error) {
      throw new Error("Falied to update member wallet:");
    }
  }

  async getById(memberId: number): Promise<IMember | undefined> {
    const db = await this.dbConnFactory.getConnection();
    const [selectedMember] = await db
      .select()
      .from(members)
      .where(eq(members.id, memberId));

    if (!selectedMember) throw new Error("User not found");
    return selectedMember;
  }

  async getByEmail(email: string): Promise<IMember | undefined> {
    const db = await this.dbConnFactory.getConnection();
    const [selectedMember] = await db
      .select()
      .from(members)
      .where(eq(members.email, email));

    return selectedMember;
  }

  async getBooks(memberId: number): Promise<IBook[] | undefined> {
    const db = await this.dbConnFactory.getConnection();
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
    const db = await this.dbConnFactory.getConnection();
    let searchWhereClause;

    if (params.search) {
      const search = `%${params.search.toLowerCase()}%`;
      searchWhereClause = sql`${members.name} ILIKE ${search} OR ${members.email} ILIKE ${search}`;
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
    const db = await this.dbConnFactory.getConnection();

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

import { IRepository } from "../core/repository";
import { IProfessor, IProfessorBase } from "../definitions";
import { IPageRequest, IPagedResponse } from "../core/pagination";
import {
  drizzleAdapter,
  professors,
  members,
} from "../database/drizzle-orm/drizzleMysqlAdapter";
import { eq, sql, and } from "drizzle-orm";
import { ProfessorBaseSchema } from "../database/zod/professor.schema";

export class ProfessorRepository
  implements IRepository<IProfessorBase, IProfessor>
{
  constructor(private readonly dbConnFactory: typeof drizzleAdapter) {}

  async create(data: IProfessorBase): Promise<IProfessor | undefined> {
    const validatedData = ProfessorBaseSchema.parse(data);

    const db = await this.dbConnFactory.getConnection();
    const [insertedProfessor] = await db
      .insert(professors)
      .values(validatedData as IProfessor)
      .returning({ id: professors.id });
    const resultedProfessor = await this.getById(insertedProfessor.id);

    return resultedProfessor;
  }

  async update(
    professorId: number,
    data: IProfessorBase
  ): Promise<IProfessor | undefined> {
    const validatedData = ProfessorBaseSchema.parse(data);

    const oldData = (await this.getById(professorId))!;
    const newData = {
      ...oldData,
      ...validatedData,
    };

    const db = await this.dbConnFactory.getConnection();
    await db
      .update(professors)
      .set(newData)
      .where(eq(professors.id, professorId));

    return newData as IProfessor;
  }

  async delete(professorId: number): Promise<IProfessor | undefined> {
    const deletedProfessor = await this.getById(professorId);

    const db = await this.dbConnFactory.getConnection();
    await db.delete(professors).where(eq(professors.id, professorId));

    return deletedProfessor;
  }

  async getById(professorId: number): Promise<IProfessor | undefined> {
    const db = await this.dbConnFactory.getConnection();
    const [selectedProfessor] = await db
      .select()
      .from(professors)
      .where(eq(professors.id, professorId));

    if (!selectedProfessor) throw new Error("Professor not found");
    return selectedProfessor;
  }

  async getByEmail(email: string): Promise<IProfessor | undefined> {
    const db = await this.dbConnFactory.getConnection();
    const [selectedProfessor] = await db
      .select()
      .from(professors)
      .where(eq(professors.email, email));

    return selectedProfessor;
  }

  async list(
    params: IPageRequest
  ): Promise<IPagedResponse<IProfessor> | undefined> {
    const db = await this.dbConnFactory.getConnection();
    let searchWhereClause;

    if (params.search) {
      const search = `%${params.search.toLowerCase()}%`;
      searchWhereClause = sql`${professors.name} ILIKE ${search} OR ${professors.email} ILIKE ${search}`;
    }

    const items = await db
      .select()
      .from(professors)
      .where(searchWhereClause)
      .offset(params.offset)
      .limit(params.limit);

    const [{ count: total }] = await db
      .select({ count: sql<number>`count(*)` })
      .from(professors)
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

  async getAll(): Promise<IProfessor[]> {
    const db = await this.dbConnFactory.getConnection();
    const allProfessors = await db.select().from(professors);

    return allProfessors;
  }
}

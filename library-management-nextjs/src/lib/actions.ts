import {
  drizzleAdapter,
  books,
  members,
} from "./database/drizzle-orm/drizzleMysqlAdapter";

export async function fetchAllBooks() {
  const dbConnection = await drizzleAdapter.getPoolConnection();
  const booksArray = dbConnection.select().from(books);
  return booksArray;
}

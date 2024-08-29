import {
  mysqlTable,
  int,
  varchar,
  serial,
  bigint,
  mysqlEnum,
} from "drizzle-orm/mysql-core";

// Books Table
export const books = mysqlTable("books", {
  id: serial("id"),
  title: varchar("title", { length: 35 }).notNull(),
  author: varchar("author", { length: 35 }).notNull(),
  publisher: varchar("publisher", { length: 35 }).notNull(),
  genre: varchar("genre", { length: 35 }).notNull(),
  isbnNo: varchar("isbnNo", { length: 13 }).notNull(),
  numOfPages: int("numOfPages").notNull(),
  totalNumOfCopies: int("totalNumOfCopies").notNull(),
  availableNumOfCopies: int("availableNumOfCopies").notNull(),
});

// Members Table
export const members = mysqlTable("members", {
  id: serial("id"),
  name: varchar("name", { length: 35 }).notNull(),
  age: int("age").notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  address: varchar("address", { length: 35 }).notNull(),
  password: varchar("password", { length: 255 }).notNull(), // Hashed password column
  role: mysqlEnum("role", ["user", "admin", "librarian"]).notNull(),
});

// Transactions Table
export const transactions = mysqlTable("transactions", {
  id: serial("id"),
  memberId: bigint("memberId", { mode: "bigint", unsigned: true })
    .references(() => members.id, { onDelete: "cascade" })
    .notNull(),
  bookId: bigint("bookId", { mode: "bigint", unsigned: true })
    .references(() => books.id, { onDelete: "cascade" })
    .notNull(),
  bookStatus: varchar("bookStatus", { length: 35 }).notNull(),
  dateOfIssue: varchar("dateOfIssue", { length: 15 }).notNull(),
  dueDate: varchar("dueDate", { length: 15 }).notNull(),
});

export const refreshTokensAndIp = mysqlTable("refreshTokensAndIp", {
  id: serial("id").primaryKey().notNull(), // Auto-incremented primary key
  refresh_token: varchar("refresh_token", { length: 255 }),
  email: varchar("email", { length: 255 }).references(() => members.email, {
    onDelete: "cascade",
  }),
  ip: varchar("ipAddress", { length: 255 }),
});

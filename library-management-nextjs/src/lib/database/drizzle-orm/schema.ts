import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";
import {
  pgTable,
  serial,
  text,
  integer,
  bigint,
  pgEnum,
  varchar,
  uniqueIndex,
} from "drizzle-orm/pg-core";

// Books Table
export const books = pgTable("books", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 35 }).notNull(),
  author: varchar("author", { length: 35 }).notNull(),
  publisher: varchar("publisher", { length: 35 }).notNull(),
  genre: varchar("genre", { length: 35 }).notNull(),
  isbnNo: varchar("isbnNo", { length: 13 }).notNull(),
  numOfPages: integer("numOfPages").notNull(),
  totalNumOfCopies: integer("totalNumOfCopies").notNull(),
  availableNumOfCopies: integer("availableNumOfCopies").notNull(),
  price: integer("price").notNull(),
  imageURL: varchar("imageURL", { length: 255 }),
});

// Enums
export const roleEnum = pgEnum("role", ["user", "admin"]);
export const statusEnum = pgEnum("bookStatus", [
  "returned",
  "issued",
  "pending",
  "rejected",
]);

// Members Table
export const members = pgTable(
  "members",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 35 }).notNull(),
    age: integer("age").notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    address: varchar("address", { length: 35 }).notNull(),
    password: varchar("password", { length: 255 }).notNull(),
    wallet: integer("wallet").notNull().default(0), // Added default value for wallet
    role: roleEnum("role").notNull(),
  },
  (members) => {
    return {
      uniqueEmailIdx: uniqueIndex("unique_email_idx").on(members.email),
    };
  }
);

// Transactions Table
export const transactions = pgTable("transactions", {
  id: serial("id").primaryKey(),
  memberId: bigint("memberId", { mode: "bigint" })
    .references(() => members.id, { onDelete: "cascade" })
    .notNull(),
  bookId: bigint("bookId", { mode: "bigint" })
    .references(() => books.id, { onDelete: "cascade" })
    .notNull(),
  bookStatus: statusEnum("bookStatus").notNull(),
  dateOfIssue: varchar("dateOfIssue", { length: 15 }),
});

// Professors Table
export const professors = pgTable(
  "professors",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 35 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    department: varchar("department", { length: 50 }),
    bio: varchar("bio", { length: 255 }),
    calendlyLink: varchar("calendlyLink", { length: 255 }),
    wallet: integer("wallet").notNull().default(0), // Added default value for wallet
  },
  (professors) => {
    return {
      uniqueEmailIdx: uniqueIndex("unique_prof_email_idx").on(professors.email),
    };
  }
);

export const payments = pgTable("payments", {
  id: serial("id").primaryKey(), // Primary key
  memberId: bigint("memberId", { mode: "bigint" }) // Foreign key to members table
    .references(() => members.id, { onDelete: "cascade" })
    .notNull(),
  professorId: bigint("professorId", { mode: "bigint" }) // Foreign key to professors table
    .references(() => professors.id, { onDelete: "cascade" })
    .notNull(),
  transactionId: varchar("transactionId", { length: 50 }).notNull(), // Unique transaction ID
  orderId: varchar("orderId", { length: 50 }).notNull(), // Unique order ID
  amount: integer("amount").notNull(), // Payment amount
});

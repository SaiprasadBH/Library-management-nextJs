import { IPagedResponse, IPageRequest } from "@/lib/core/pagination";
import PaginationControl from "@/components/ui/paginationControl";
import Search from "@/components/ui/search";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";
import { ITransaction } from "@/lib/definitions";
import { TransactionRepository } from "@/lib/repositories/transaction.repository";
import { drizzleAdapter } from "@/lib/database/drizzle-orm/drizzleMysqlAdapter";
import { MemberRepository } from "@/lib/repositories/member.repository";
import { drizzle } from "drizzle-orm/mysql2";
import { BookRepository } from "@/lib/repositories/book.repository";
import { ReturnButton } from "@/components/ui/customButtons";

export default async function BookReturnManagementPage({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const transactionRepo = new TransactionRepository(drizzleAdapter);
  const memberRepo = new MemberRepository(drizzleAdapter);
  const bookRepo = new BookRepository(drizzleAdapter);
  let currentPage = Number(searchParams?.page) || 1;
  const query = searchParams?.query || "";
  const limit = 5;

  const listParameters: IPageRequest = {
    search: query,
    offset: (currentPage - 1) * limit,
    limit: limit,
  };

  const paginatedBorrowedBooks: IPagedResponse<ITransaction> =
    await transactionRepo.listIssuedTransactions(listParameters);
  const paginationOptions = paginatedBorrowedBooks.pagination;
  const borrows = paginatedBorrowedBooks.items;

  const enrichedBorrows = await Promise.all(
    borrows.map(async (request) => {
      const member = await memberRepo.getById(Number(request.memberId));
      const book = await bookRepo.getById(Number(request.bookId));
      return {
        ...request,
        memberName: member?.name || "Unknown Member",
        memberEmail: member?.email || "Unknown Email",
        bookTitle: book?.title || "Unknown Book",
        isbn: book?.isbnNo,
      };
    })
  );

  return (
    <>
      <div className="w-full flex justify-between items-center mb-8">
        <h1 className="text-3xl font-serif lg:text-4xl">
          Book Return Management
        </h1>
      </div>
      <div className="mb-6"></div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Book</TableHead>
              <TableHead>ISBN</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {enrichedBorrows.map((borrow) => (
              <TableRow key={borrow.id}>
                <TableCell>{borrow.memberName}</TableCell>
                <TableCell>{borrow.memberEmail}</TableCell>
                <TableCell>{borrow.bookTitle}</TableCell>
                <TableCell>{borrow.isbn}</TableCell>
                <TableCell>
                  <ReturnButton transactionId={borrow.id}></ReturnButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {borrows.length === 0 && (
        <p className="text-center mt-4">No borrowed books found</p>
      )}
      <div className="flex justify-center mt-8">
        <PaginationControl
          currentPage={currentPage}
          options={paginationOptions}
        />
      </div>
    </>
  );
}

import { IPagedResponse, IPageRequest } from "@/lib/core/pagination";
import { PaginationControl } from "@/components/ui/paginationControl";
import { Search } from "@/components/ui/search";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
  let currentPage = Number(searchParams?.page) || 1;
  const query = searchParams?.query || "";
  const limit = 8;

  const listParameters: IPageRequest = {
    search: query,
    offset: (currentPage - 1) * limit,
    limit: limit,
  };

  const paginatedBorrowedBooks = await transactionRepo.listIssuedTransactions(
    listParameters
  );
  const paginationOptions = paginatedBorrowedBooks.pagination;
  const borrows = paginatedBorrowedBooks.items;

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-300">
          Book Return Management
        </h1>
      </div>

      <div className="bg-gray-800/50 rounded-lg shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-gray-700">
                <TableHead className="text-teal-400">Name</TableHead>
                <TableHead className="text-teal-400">Email</TableHead>
                <TableHead className="text-teal-400">Book</TableHead>
                <TableHead className="text-teal-400">ISBN</TableHead>
                <TableHead className="text-teal-400">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {borrows.map((borrow) => (
                <TableRow
                  key={borrow.id}
                  className="border-b border-gray-700 hover:bg-gray-700/50 transition-colors"
                >
                  <TableCell>{borrow.memberName}</TableCell>
                  <TableCell>{borrow.memberEmail}</TableCell>
                  <TableCell>{borrow.bookTitle}</TableCell>
                  <TableCell>{borrow.isbn}</TableCell>
                  <TableCell>
                    <ReturnButton transactionId={borrow.id} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {borrows.length === 0 && (
        <p className="text-center mt-4 text-gray-400">
          No borrowed books found
        </p>
      )}

      <div className="flex justify-center mt-8">
        <PaginationControl
          currentPage={currentPage}
          options={paginationOptions}
        />
      </div>
    </div>
  );
}

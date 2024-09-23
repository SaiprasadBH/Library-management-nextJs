import { IPagedResponse, IPageRequest } from "@/lib/core/pagination";
import { ITransaction } from "@/lib/definitions";
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
import { Button } from "@/components/ui/button";
import { Trash2, RefreshCw } from "lucide-react";
import { MemberRepository } from "@/lib/repositories/member.repository";
import { drizzleAdapter } from "@/lib/database/drizzle-orm/drizzleMysqlAdapter";
import { BookRepository } from "@/lib/repositories/book.repository";
import { DeleteButton } from "@/components/ui/customButtons";
import { fetchNonPendingTransactions } from "@/lib/actions";

export default async function Component({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const currentPage = Number(searchParams?.page) || 1;
  const query = searchParams?.query || "";
  const limit = 8;

  const memberRepo = new MemberRepository(drizzleAdapter);
  const bookRepo = new BookRepository(drizzleAdapter);

  const listParameters: IPageRequest = {
    search: query,
    offset: (currentPage - 1) * limit,
    limit: limit,
  };

  const paginatedTransactions = await fetchNonPendingTransactions(
    listParameters
  );
  if (!paginatedTransactions) {
    console.error(
      "paginated transaction undefined during fetchNonPending transaction"
    );
  }
  const paginationOptions = paginatedTransactions?.pagination;
  const transactions = paginatedTransactions?.items;
  if (!transactions) {
    console.error(" transaction undefined during fetchNonPending transaction");
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-300">
          Transaction Management
        </h1>
        <Button className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold transition-all duration-300 transform hover:scale-105">
          <RefreshCw className="mr-2 h-4 w-4" />
          Delete Returned
        </Button>
      </div>

      <div className="bg-gray-800/50 rounded-lg shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-gray-700">
                <TableHead className="text-teal-400 w-1/6">Name</TableHead>
                <TableHead className="text-teal-400 w-1/6">Email</TableHead>
                <TableHead className="text-teal-400 w-1/6">Book</TableHead>
                <TableHead className="text-teal-400 w-1/6">ISBN</TableHead>
                <TableHead className="text-teal-400 w-1/6">Status</TableHead>
                <TableHead className="text-teal-400 w-1/6">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions?.map((transaction) => (
                <TableRow
                  key={transaction.id}
                  className="border-b border-gray-700 hover:bg-gray-700/50 transition-colors"
                >
                  <TableCell>{transaction.memberName}</TableCell>
                  <TableCell>{transaction.memberEmail}</TableCell>
                  <TableCell>{transaction.bookTitle}</TableCell>
                  <TableCell>{transaction.isbn}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        transaction.bookStatus === "issued" ||
                        transaction.bookStatus === "pending"
                          ? "bg-yellow-500 text-yellow-900"
                          : transaction.bookStatus === "returned"
                          ? "bg-green-500 text-green-900"
                          : "bg-gray-500 text-red-900"
                      }`}
                    >
                      {transaction.bookStatus}
                    </span>
                  </TableCell>
                  <TableCell>
                    <DeleteButton
                      id={transaction.id}
                      name={`${transaction.memberEmail} related transaction`}
                      type="transaction"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {transactions!.length === 0 && (
        <p className="text-center mt-4 text-gray-400">No transactions found</p>
      )}

      <div className="flex justify-center mt-8">
        <PaginationControl
          currentPage={currentPage}
          options={paginationOptions!}
        />
      </div>
    </div>
  );
}

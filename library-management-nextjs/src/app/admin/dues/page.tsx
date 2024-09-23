import { IPagedResponse, IPageRequest } from "@/lib/core/pagination";
import { ITransaction } from "@/lib/definitions";
import { PaginationControl } from "@/components/ui/paginationControl";
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
import { fetchDueTransactions } from "@/lib/actions";
import Link from "next/link";

export default async function DueTransactionsPage({
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

  const listParameters: IPageRequest = {
    search: query,
    offset: (currentPage - 1) * limit,
    limit: limit,
  };

  const paginatedDues = await fetchDueTransactions(listParameters);
  const paginationOptions = paginatedDues?.pagination;
  const dues = paginatedDues?.items;

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-300">
          Due Transactions
        </h1>
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
                <TableHead className="text-teal-400 w-1/6">
                  Date of Issue
                </TableHead>
                <TableHead className="text-teal-400 w-1/6">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dues?.map((due) => (
                <TableRow
                  key={due.id}
                  className="border-b border-gray-700 hover:bg-gray-700/50 transition-colors"
                >
                  <TableCell>{due.memberName}</TableCell>
                  <TableCell>
                    <a
                      href={`mailto:${due.memberEmail}`}
                      className="text-teal-300 hover:underline"
                    >
                      {due.memberEmail}
                    </a>
                  </TableCell>
                  <TableCell>{due.bookTitle}</TableCell>
                  <TableCell>{due.isbn}</TableCell>
                  <TableCell>{due.dateOfIssue}</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-500 text-red-900">
                      Overdue
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {dues!.length === 0 && (
        <p className="text-center mt-4 text-gray-400">No dues found</p>
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

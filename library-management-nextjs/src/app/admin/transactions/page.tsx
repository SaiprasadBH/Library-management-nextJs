import { IPagedResponse, IPageRequest } from "@/lib/core/pagination";
import { ITransaction } from "@/lib/definitions";
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
  const limit = 5;

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

  const enrichedTransactions = await Promise.all(
    transactions!.map(async (request) => {
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
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-serif lg:text-4xl">
          Transaction Management
        </h1>
        <Button className="bg-red-500 hover:bg-red-600 text-white">
          <RefreshCw className="mr-2 h-4 w-4" />
          Delete Returned
        </Button>
      </div>
      <div className="mb-6"></div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/6">Name</TableHead>
              <TableHead className="w-1/6">Email</TableHead>
              <TableHead className="w-1/6">Book</TableHead>
              <TableHead className="w-1/6">ISBN</TableHead>
              <TableHead className="w-1/6">Status</TableHead>
              <TableHead className="w-1/6">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {enrichedTransactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{transaction.memberName}</TableCell>
                <TableCell>{transaction.memberEmail}</TableCell>
                <TableCell>{transaction.bookTitle}</TableCell>
                <TableCell>{transaction.isbn}</TableCell>
                <TableCell>{transaction.bookStatus}</TableCell>
                <TableCell>
                  <DeleteButton
                    id={transaction.id}
                    name={`${transaction.memberEmail} related trasaction`}
                    type="transaction"
                  ></DeleteButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {transactions!.length === 0 && (
        <p className="text-center mt-4">No transactions found</p>
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

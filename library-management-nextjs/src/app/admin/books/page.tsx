import { fetchBooks } from "@/lib/actions";
import { IPagedResponse, IPageRequest } from "@/lib/core/pagination";
import { IBook } from "@/lib/definitions";
import { PaginationControl } from "@/components/ui/paginationControl";
import { Search } from "@/components/ui/search";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PlusIcon } from "lucide-react";
import {
  BorrowButton,
  DeleteButton,
  EditButton,
} from "@/components/ui/customButtons";
import { SortableColumn } from "@/components/ui/sortable-table-header";

export default async function AdminHomePage({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
    sortField: string;
    sortDirection: string;
  };
}) {
  const currentPage = Number(searchParams?.page) || 1;
  const query = searchParams?.query || "";
  const sortField = searchParams?.sortField || "title";
  const sortDirection = searchParams?.sortDirection || "asc";
  const limit = 8;

  const listParameters: IPageRequest = {
    search: query,
    offset: (currentPage - 1) * limit,
    limit: limit,
    sortField,
    sortDirection,
  };

  const paginatedBooks: IPagedResponse<IBook> = await fetchBooks(
    listParameters
  );
  const paginationOptions = paginatedBooks.pagination;
  const books = paginatedBooks.items;
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-300">
          Book Management
        </h1>
        <Link href="/admin/books/create">
          <Button className="bg-gradient-to-r from-teal-400 to-cyan-300 hover:from-teal-500 hover:to-cyan-400 text-gray-900 font-bold transition-all duration-300 transform hover:scale-105">
            <span className="hidden sm:inline mr-2">Add Book</span>
            <PlusIcon className="h-5 w-5" />
          </Button>
        </Link>
      </div>

      <Search placeholder="Search for a book" />

      <div className="bg-gray-800/50 rounded-lg shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-gray-700">
                <SortableColumn label="Title" field="title" />
                <SortableColumn label="Author" field="author" />
                <SortableColumn label="Publisher" field="publisher" />
                <SortableColumn label="Genre" field="genre" />
                <SortableColumn label="ISBN" field="isbnNo" />
                <SortableColumn label="Pages" field="numOfPages" />

                <TableHead className="text-teal-400">Copies</TableHead>
                <TableHead className="text-teal-400">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {books.map((book) => (
                <TableRow
                  key={book.isbnNo}
                  className="border-b border-gray-700 hover:bg-gray-700/50 transition-colors"
                >
                  <TableCell>{book.title}</TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell>{book.publisher}</TableCell>
                  <TableCell>{book.genre}</TableCell>
                  <TableCell>{book.isbnNo}</TableCell>
                  <TableCell>{book.numOfPages}</TableCell>
                  <TableCell>{book.availableNumOfCopies}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <EditButton url={`books/${book.id}/edit`} />
                      <BorrowButton bookId={book.id} />
                      <DeleteButton
                        type="book"
                        id={book.id}
                        name={book.title}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {books.length === 0 && (
        <p className="text-center mt-4 text-gray-400">No books found</p>
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

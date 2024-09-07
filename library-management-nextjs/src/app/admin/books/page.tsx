import { fetchBooks } from "@/lib/actions";
import { IPagedResponse, IPageRequest } from "@/lib/core/pagination";
import { IBook, IBookBase } from "@/lib/definitions";
import PaginationControl from "@/components/ui/paginationControl";
import Search from "@/components/ui/search";
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
import { BookOpen, Edit, PlusIcon, Trash2 } from "lucide-react";
import {
  BorrowButton,
  DeleteButton,
  EditButton,
} from "@/components/ui/customButtons";

export default async function AdminHomePage({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  let currentPage = Number(searchParams?.page) || 1;
  const query = searchParams?.query || "";
  const limit = 5;

  const listParameters: IPageRequest = {
    search: query,
    offset: (currentPage - 1) * limit,
    limit: limit,
  };

  const paginatedBooks: IPagedResponse<IBook> = await fetchBooks(
    listParameters
  );
  const paginationOptions = paginatedBooks.pagination;
  const books = paginatedBooks.items;

  function handleBorrow() {}

  return (
    <>
      <div className="w-full flex justify-between items-center mb-8">
        <h1 className="text-3xl font-serif lg:text-4xl">Book Management</h1>
        <Link
          href="/admin/books/create"
          className="flex h-10 items-center rounded-lg bg-primary px-4 text-sm font-medium text-white transition-colors hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <span className="hidden md:block mr-2">Add Book</span>
          <PlusIcon className="h-5 w-5" />
        </Link>
      </div>
      <div className="mb-6">
        <Search placeholder="Search for a book" />
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Publisher</TableHead>
              <TableHead>Genre</TableHead>
              <TableHead>ISBN</TableHead>
              <TableHead>Pages</TableHead>
              <TableHead>Copies</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {books.map((book) => (
              <TableRow key={book.isbnNo}>
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>{book.publisher}</TableCell>
                <TableCell>{book.genre}</TableCell>
                <TableCell>{book.isbnNo}</TableCell>
                <TableCell>{book.numOfPages}</TableCell>
                <TableCell>{book.availableNumOfCopies}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <EditButton url={`books/${book.id}/edit`}></EditButton>
                    <BorrowButton bookId={book.id}></BorrowButton>
                    <DeleteButton
                      type="book"
                      id={book.id}
                      name={book.title}
                    ></DeleteButton>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {books.length === 0 && <p className="text-center mt-4">No books found</p>}
      <div className="flex justify-center mt-8">
        <PaginationControl
          currentPage={currentPage}
          options={paginationOptions}
        />
      </div>
    </>
  );
}

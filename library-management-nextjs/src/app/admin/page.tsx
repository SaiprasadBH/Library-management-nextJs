import { fetchBooks } from "@/lib/actions";
import { IPagedResponse, IPageRequest } from "@/lib/core/pagination";
import { IBookBase } from "@/lib/definitions";
import PaginationControl from "../../components/ui/paginationControl";
import Search from "../../components/ui/search";
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
import { Edit, Trash2 } from "lucide-react";

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
  const limit = 10;

  const listParameters: IPageRequest = {
    search: query,
    offset: (currentPage - 1) * limit,
    limit: limit,
  };

  const paginatedBooks: IPagedResponse<IBookBase> = await fetchBooks(
    listParameters
  );
  const paginationOptions = paginatedBooks.pagination;
  const books = paginatedBooks.items;

  return (
    <div className="flex flex-col min-h-screen">
      <nav className="bg-primary text-primary-foreground p-4">
        <div className="container mx-auto flex flex-wrap justify-between items-center">
          <Link href="/admin" className="text-2xl font-bold">
            Admin Panel
          </Link>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="/admin/requests" className="hover:underline">
              Requests
            </Link>
            <Link href="/admin/transactions" className="hover:underline">
              Transaction Management
            </Link>
            <Link href="/admin/dashboard" className="hover:underline">
              Dashboard
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex-1 overflow-auto p-8">
        <div className="w-full flex justify-center mb-8">
          <h1 className="text-3xl font-serif lg:text-6xl">Book Management</h1>
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
                  <TableCell>{book.totalNumOfCopies}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-destructive"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {books.length === 0 && (
          <p className="text-center mt-4">No books found</p>
        )}
        <div className="flex justify-center mt-8">
          <PaginationControl
            currentPage={currentPage}
            options={paginationOptions}
          />
        </div>
      </main>
    </div>
  );
}

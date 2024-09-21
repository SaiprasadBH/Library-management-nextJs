import { BookCard } from "@/components/ui/book-mangement/book-card";
import { PaginationControl } from "@/components/ui/paginationControl";
import { Search } from "@/components/ui/search";
import {
  fetchBooks,
  fetchUserSpecificBooks,
  getUserDetails,
} from "@/lib/actions";
import { IPagedResponse, IPageRequest } from "@/lib/core/pagination";
import { IBook } from "@/lib/definitions";

export default async function BooksPage({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  let currentPage = Number(searchParams?.page) || 1;
  const query = searchParams?.query || "";
  const limit = 8;

  const listParameters: IPageRequest = {
    search: query,
    offset: (currentPage - 1) * limit,
    limit: limit,
  };

  const currentUser = await getUserDetails();

  const paginatedBooks: IPagedResponse<IBook> = await fetchUserSpecificBooks(
    listParameters
  );
  const paginationOptions = paginatedBooks.pagination;
  const books = paginatedBooks.items;

  return (
    <main className="flex-1 overflow-auto p-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-10">
        <p className="text-2xl mb-3 sm:mb-0 font-serif lg:text-4xl text-clamp-1">
          Books
        </p>
        <PaginationControl
          currentPage={currentPage}
          options={paginationOptions}
        />
      </div>
      <div className="mb-10"></div>
      {books.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {books.map((book) => (
            <BookCard
              key={book.id}
              title={book.title}
              author={book.author}
              bookId={book.id}
              availableNumOfCopies={book.availableNumOfCopies}
              totalNumOfCopies={book.totalNumOfCopies}
            />
          ))}
        </div>
      ) : (
        <p>No books found</p>
      )}
    </main>
  );
}

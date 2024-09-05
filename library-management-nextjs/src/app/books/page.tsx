import { fetchBooks } from "@/lib/actions";
import { IPagedResponse, IPageRequest } from "@/lib/core/pagination";
import { IBook } from "@/lib/definitions";
import PaginationControl from "../../components/ui/paginationControl";
import { BookCard } from "../../components/ui/book-mangement/book-card";
import Search from "../../components/ui/search";

export default async function BooksPage({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  let currentPage = Number(searchParams?.page) || 1;
  const query = searchParams?.query ? searchParams.query : "";
  const limit = 8;

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

  return (
    <main className="flex-1 overflow-auto p-8">
      <div className="w-full flex justify-center">
        <h1 className="text-3xl mb-3 font-serif lg:text-6xl">Books</h1>
      </div>
      <div className="mb-10">
        <Search placeholder="search for a book"></Search>
      </div>
      {books.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {books.map((book) => (
            <BookCard title={book.title} author={book.author} key={book.id} />
          ))}
        </div>
      ) : (
        <p>No books found</p>
      )}

      <div className="justify-center p-10">
        <PaginationControl
          currentPage={currentPage}
          options={paginationOptions}
        />
      </div>
    </main>
  );
}

import { fetchBooks } from "@/lib/actions";
import { IPagedResponse, IPageRequest } from "@/lib/core/pagination";
import { IBook } from "@/lib/definitions";
import BooksClient from "@/components/ui/book-mangement/bookClient";

export default async function BooksPage({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
    sortField?: string;
    sortDirection?: string;
  };
}) {
  const currentPage = Number(searchParams?.page) || 1;
  const query = searchParams?.query || "";
  const sortField = searchParams?.sortField || "title";
  const sortDirection = searchParams?.sortDirection || "asc";
  const limit = 12; // Increased from 8 to 12 for better space utilization

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

  const paginationOptions = paginatedBooks;
  const books = paginatedBooks.items;

  return (
    <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 text-gray-100">
      <div className="container mx-auto ">
        {" "}
        {/* Increased max-width */}
        <BooksClient
          books={books}
          paginationOptions={paginationOptions}
          currentPage={currentPage}
          query={query}
          sortField={sortField}
          sortDirection={sortDirection}
        />
      </div>
    </main>
  );
}

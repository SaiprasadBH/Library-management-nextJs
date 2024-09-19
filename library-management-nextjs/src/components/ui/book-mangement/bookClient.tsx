"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { IBook } from "@/lib/definitions";
import { IPageRequest } from "@/lib/core/pagination";
import { BookCard } from "@/components/ui/book-mangement/book-card";

interface BooksClientProps {
  books: IBook[];
  paginationOptions: IPageRequest;
  currentPage: number;
  query: string;
  sortField: string;
  sortDirection: string;
}

export default function BooksClient({
  books,
  paginationOptions,
  currentPage,
  query,
  sortField,
  sortDirection,
}: BooksClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSortFieldChange = (newField: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sortField", newField);
    router.push(`?${params.toString()}`);
  };

  const handleSortDirectionChange = (newDirection: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sortDirection", newDirection);
    router.push(`?${params.toString()}`);
  };

  return (
    <div>
      {/* Sorting Controls */}
      <div className="flex mb-6 space-x-4">
        {/* Dropdown for sorting field */}
        <select
          value={sortField}
          onChange={(e) => handleSortFieldChange(e.target.value)}
          className="border p-2"
        >
          <option value="title">Title</option>
          <option value="author">Author</option>
          <option value="publisher">Publisher</option>
          <option value="genre">Genre</option>
          <option value="isbnNo">ISBN</option>
        </select>
        {/* Dropdown for sort direction */}
        <select
          value={sortDirection}
          onChange={(e) => handleSortDirectionChange(e.target.value)}
          className="border p-2"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      {/* Book Cards */}
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
              price={book.price}
            />
          ))}
        </div>
      ) : (
        <p>No books found</p>
      )}
    </div>
  );
}

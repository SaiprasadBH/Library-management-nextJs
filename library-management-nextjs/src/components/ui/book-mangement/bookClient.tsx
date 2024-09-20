"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { IBook } from "@/lib/definitions";
import { IPagedResponse, IPageRequest } from "@/lib/core/pagination";
import { BookCard } from "@/components/ui/book-mangement/book-card";
import { Search } from "@/components/ui/search";
import { PaginationControl } from "@/components/ui/paginationControl";
import { motion } from "framer-motion";

interface BooksClientProps {
  books: IBook[];
  paginationOptions: IPagedResponse<IBook>;
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
    <div className="space-y-8 w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-300">
          Explore Our Books
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto font-light">
          Discover a world of knowledge at your fingertips
        </p>
      </motion.div>
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <Search placeholder="Search for a book" />
        <PaginationControl
          currentPage={currentPage}
          options={paginationOptions.pagination}
        />
      </div>
      <div className="flex flex-wrap gap-4 justify-center md:justify-start">
        <select
          value={sortField}
          onChange={(e) => handleSortFieldChange(e.target.value)}
          className="bg-slate-800 text-gray-100 border border-teal-400/20 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
        >
          <option value="title">Title</option>
          <option value="author">Author</option>
          <option value="publisher">Publisher</option>
          <option value="genre">Genre</option>
          <option value="isbnNo">ISBN</option>
        </select>
        <select
          value={sortDirection}
          onChange={(e) => handleSortDirectionChange(e.target.value)}
          className="bg-slate-800 text-gray-100 border border-teal-400/20 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
      {books.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
          {books.map((book, index) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <BookCard
                title={book.title}
                author={book.author}
                bookId={book.id}
                availableNumOfCopies={book.availableNumOfCopies}
                totalNumOfCopies={book.totalNumOfCopies}
                price={book.price}
                imageUrl={book.imageURL ? book.imageURL : ""}
              />
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-300 text-xl">No books found</p>
      )}
    </div>
  );
}

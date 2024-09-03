import { BookRepository } from "@/lib/repositories/book.repository";
import { drizzleAdapter } from "@/lib/database/drizzle-orm/drizzleMysqlAdapter";
import BookPagination from "./paginationControl";

const bookRepository = new BookRepository(drizzleAdapter);

export default async function BooksPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const offset =
    typeof searchParams.offset === "string"
      ? parseInt(searchParams.offset, 10)
      : 0;
  const limit =
    typeof searchParams.limit === "string"
      ? parseInt(searchParams.limit, 10)
      : 20;
  const search =
    typeof searchParams.query === "string" ? searchParams.query : "";

  const initialData = await bookRepository.list({ offset, limit, search });

  return (
    <BookPagination
      initialItems={initialData?.items || []}
      initialPagination={initialData?.pagination || { offset, limit, total: 0 }}
    />
  );
}

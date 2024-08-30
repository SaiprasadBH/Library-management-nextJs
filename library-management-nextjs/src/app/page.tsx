import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/app/components/ui/dropdown-menu";
import { Avatar } from "@/app/components/ui/avatar";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";
import { BookIcon, MenuIcon, ReceiptIcon } from "lucide-react";
import { fetchAllBooks } from "@/lib/actions";
import { BookCard } from "./components/ui/book-card";
import { IBook } from "@/lib/definitions";
import { Input } from "./components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./components/ui/pagination";

export default async function Page() {
  const allBooks: IBook[] = await fetchAllBooks();
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="bg-primary text-primary-foreground py-4 px-6 flex items-center justify-between md:px-8 lg:px-10">
        <Link href="#" className="text-xl font-bold" prefetch={false}>
          Library Management
        </Link>
        <nav className="flex items-center gap-4 md:gap-6 lg:gap-8">
          <Input
            type="search"
            placeholder="Search books..."
            className="bg-muted text-foreground rounded-md px-8 py-2 w-full"
          />
          <div className="hidden sm:block">
            <Link
              href="/login"
              className="text-sm font-medium hover:underline"
              prefetch={false}
            >
              Login
            </Link>
          </div>
          <div className="hidden sm:block">
            <Link
              href="/register"
              className="text-sm font-medium hover:underline"
              prefetch={false}
            >
              Register
            </Link>
          </div>
          <div className="ml-auto hidden sm:block">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="h-8 w-8 rounded-full bg-primary-foreground text-primary flex items-center justify-center cursor-pointer md:h-9 md:w-9 lg:h-10 lg:w-10">
                  <span>JD</span>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Link
                    href="#"
                    className="flex items-center gap-2"
                    prefetch={false}
                  >
                    <BookIcon className="h-4 w-4" />
                    My Books
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link
                    href="#"
                    className="flex items-center gap-2"
                    prefetch={false}
                  >
                    <ReceiptIcon className="h-4 w-4" />
                    My Transactions
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="sm:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <MenuIcon className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Link
                    href="#"
                    className="flex items-center gap-2"
                    prefetch={false}
                  >
                    Login
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link
                    href="#"
                    className="flex items-center gap-2"
                    prefetch={false}
                  >
                    Register
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link
                    href="#"
                    className="flex items-center gap-2"
                    prefetch={false}
                  >
                    <BookIcon className="h-4 w-4" />
                    My Books
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link
                    href="#"
                    className="flex items-center gap-2"
                    prefetch={false}
                  >
                    <ReceiptIcon className="h-4 w-4" />
                    My Transactions
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </nav>
      </header>
      <main className="flex-1 py-8 px-6 md:px-8 lg:px-10">
        <div className="container mx-auto max-w-5xl">
          <h1 className="text-3xl font-bold mb-6 md:text-4xl lg:text-5xl">
            All Books
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {allBooks.map((book) => (
              <BookCard
                key={book.title}
                title={book.title}
                author={book.author}
              />
            ))}
            <Card className="h-full">
              <CardContent className="p-4 flex flex-col justify-between h-full">
                <div>
                  <h2 className="text-xl font-bold mb-2 md:text-2xl lg:text-3xl">
                    The Great Gatsby
                  </h2>
                  <p className="text-muted-foreground md:text-lg lg:text-xl">
                    F. Scott Fitzgerald
                  </p>
                </div>
                <Button className="mt-4 md:mt-6 lg:mt-8">Borrow</Button>
              </CardContent>
            </Card>
            <Card className="h-full">
              <CardContent className="p-4 flex flex-col justify-between h-full">
                <div>
                  <h2 className="text-xl font-bold mb-2 md:text-2xl lg:text-3xl">
                    To Kill a Mockingbird
                  </h2>
                  <p className="text-muted-foreground md:text-lg lg:text-xl">
                    Harper Lee
                  </p>
                </div>
                <Button className="mt-4 md:mt-6 lg:mt-8">Borrow</Button>
              </CardContent>
            </Card>
            <Card className="h-full">
              <CardContent className="p-4 flex flex-col justify-between h-full">
                <div>
                  <h2 className="text-xl font-bold mb-2 md:text-2xl lg:text-3xl">
                    1984
                  </h2>
                  <p className="text-muted-foreground md:text-lg lg:text-xl">
                    George Orwell
                  </p>
                </div>
                <Button className="mt-4 md:mt-6 lg:mt-8">Borrow</Button>
              </CardContent>
            </Card>
            <Card className="h-full">
              <CardContent className="p-4 flex flex-col justify-between h-full">
                <div>
                  <h2 className="text-xl font-bold mb-2 md:text-2xl lg:text-3xl">
                    Pride and Prejudice
                  </h2>
                  <p className="text-muted-foreground md:text-lg lg:text-xl">
                    Jane Austen
                  </p>
                </div>
                <Button className="mt-4 md:mt-6 lg:mt-8">Borrow</Button>
              </CardContent>
            </Card>
            <Card className="h-full">
              <CardContent className="p-4 flex flex-col justify-between h-full">
                <div>
                  <h2 className="text-xl font-bold mb-2 md:text-2xl lg:text-3xl">
                    The Catcher in the Rye
                  </h2>
                  <p className="text-muted-foreground md:text-lg lg:text-xl">
                    J.D. Salinger
                  </p>
                </div>
                <Button className="mt-4 md:mt-6 lg:mt-8">Borrow</Button>
              </CardContent>
            </Card>
            <Card className="h-full">
              <CardContent className="p-4 flex flex-col justify-between h-full">
                <div>
                  <h2 className="text-xl font-bold mb-2 md:text-2xl lg:text-3xl">
                    The Lord of the Rings
                  </h2>
                  <p className="text-muted-foreground md:text-lg lg:text-xl">
                    J.R.R. Tolkien
                  </p>
                </div>
                <Button className="mt-4 md:mt-6 lg:mt-8">Borrow</Button>
              </CardContent>
            </Card>
            <Card className="h-full">
              <CardContent className="p-4 flex flex-col justify-between h-full">
                <div>
                  <h2 className="text-xl font-bold mb-2 md:text-2xl lg:text-3xl">
                    Harry Potter and the Sorcerers Stone
                  </h2>
                  <p className="text-muted-foreground md:text-lg lg:text-xl">
                    J.K. Rowling
                  </p>
                </div>
                <Button className="mt-4 md:mt-6 lg:mt-8">Borrow</Button>
              </CardContent>
            </Card>
            <Card className="h-full">
              <CardContent className="p-4 flex flex-col justify-between h-full">
                <div>
                  <h2 className="text-xl font-bold mb-2 md:text-2xl lg:text-3xl">
                    To Kill a Mockingbird
                  </h2>
                  <p className="text-muted-foreground md:text-lg lg:text-xl">
                    Harper Lee
                  </p>
                </div>
                <Button className="mt-4 md:mt-6 lg:mt-8">Borrow</Button>
              </CardContent>
            </Card>
          </div>
          <div className="mt-8 flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>
                    2
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </main>
      <footer className="bg-primary text-primary-foreground py-4 px-6 text-center md:px-8 lg:px-10">
        <p className="md:text-lg lg:text-xl">
          &copy; 2023 Library Management. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

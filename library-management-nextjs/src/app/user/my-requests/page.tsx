import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import UserSpecificRequests from "@/components/ui/transaction-management/filter-user-requests";
import PaginationControl from "@/components/ui/paginationControl";

type Book = {
  id: number;
  title: string;
  author: string;
  date: string;
  status: "issued" | "rejected" | "pending";
};

const sampleBooks: Book[] = [
  {
    id: 1,
    title: "1984",
    author: "George Orwell",
    date: "2023-06-01",
    status: "issued",
  },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    date: "2023-06-02",
    status: "rejected",
  },
  {
    id: 3,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    date: "2023-06-03",
    status: "pending",
  },
  {
    id: 4,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    date: "2023-06-04",
    status: "issued",
  },
  {
    id: 5,
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    date: "2023-06-05",
    status: "pending",
  },
];

const currentPage = 1;
const search = "";
export default function Page() {
  return (
    <div>
      <UserSpecificRequests books={sampleBooks}></UserSpecificRequests>
    </div>
  );
}

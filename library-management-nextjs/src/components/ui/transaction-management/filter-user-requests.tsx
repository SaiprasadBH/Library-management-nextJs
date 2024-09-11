"use client";

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
import { IBook } from "@/lib/definitions";

interface UserSpecificRequestsProps {
  id: number;
  title: string;
  author: string;
  date: string;
  status: "issued" | "rejected" | "pending";
}
export default function UserSpecificRequests({
  books,
}: {
  books: UserSpecificRequestsProps[];
}) {
  const [filters, setFilters] = useState({
    issued: true,
    rejected: true,
    pending: true,
    returned: true,
  });

  const handleFilterChange = (status: keyof typeof filters) => {
    setFilters((prev) => ({ ...prev, [status]: !prev[status] }));
  };

  const filteredBooks = books.filter((book) => filters[book.status]);

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-wrap gap-4">
        <div className="flex items-center space-x-2">
          <Switch
            id="issued"
            checked={filters.issued}
            onCheckedChange={() => handleFilterChange("issued")}
          />
          <Label htmlFor="issued" className="text-green-600 font-medium">
            Issued
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="rejected"
            checked={filters.rejected}
            onCheckedChange={() => handleFilterChange("rejected")}
          />
          <Label htmlFor="rejected" className="text-red-600 font-medium">
            Rejected
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="pending"
            checked={filters.pending}
            onCheckedChange={() => handleFilterChange("pending")}
          />
          <Label htmlFor="pending" className="text-yellow-600 font-medium">
            Pending
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="returned"
            checked={filters.returned}
            onCheckedChange={() => handleFilterChange("returned")}
          />
          <Label htmlFor="returned" className="text-blue-600 font-medium">
            Returned
          </Label>
        </div>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Book</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBooks.map((book) => (
              <TableRow key={book.id}>
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>{book.date}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      book.status === "issued"
                        ? "bg-green-100 text-green-800"
                        : book.status === "rejected"
                        ? "bg-red-100 text-red-800"
                        : book.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {book.status.charAt(0).toUpperCase() + book.status.slice(1)}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {filteredBooks.length === 0 && (
        <p className="text-center mt-4">
          No books found matching the selected filters.
        </p>
      )}
    </div>
  );
}

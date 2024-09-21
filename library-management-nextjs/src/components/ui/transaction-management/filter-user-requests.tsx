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

interface UserSpecificRequestsProps {
  id: number;
  title: string;
  author: string;
  date: string | null;
  status: "issued" | "rejected" | "pending" | "returned";
}

type FilterStatus = "issued" | "rejected" | "pending" | "returned";

interface Filters {
  [key: string]: boolean;
  issued: boolean;
  rejected: boolean;
  pending: boolean;
  returned: boolean;
}

export default function UserSpecificRequests({
  books,
}: {
  books: UserSpecificRequestsProps[];
}) {
  const [filters, setFilters] = useState<Filters>({
    issued: true,
    rejected: true,
    pending: true,
    returned: true,
  });

  const handleFilterChange = (status: FilterStatus) => {
    setFilters((prev) => ({ ...prev, [status]: !prev[status] }));
  };

  const filteredBooks = books.filter((book) => filters[book.status]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4">
        <FilterSwitch
          id="issued"
          label="Issued"
          checked={filters.issued}
          onChange={() => handleFilterChange("issued")}
          color="green"
        />
        <FilterSwitch
          id="rejected"
          label="Rejected"
          checked={filters.rejected}
          onChange={() => handleFilterChange("rejected")}
          color="red"
        />
        <FilterSwitch
          id="pending"
          label="Pending"
          checked={filters.pending}
          onChange={() => handleFilterChange("pending")}
          color="yellow"
        />
        <FilterSwitch
          id="returned"
          label="Returned"
          checked={filters.returned}
          onChange={() => handleFilterChange("returned")}
          color="blue"
        />
      </div>
      <div className="overflow-x-auto rounded-lg border border-gray-700">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-800">
              <TableHead className="text-gray-300">Book</TableHead>
              <TableHead className="text-gray-300">Author</TableHead>
              <TableHead className="text-gray-300">Date</TableHead>
              <TableHead className="text-gray-300">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBooks.map((book) => (
              <TableRow key={book.id} className="border-t border-gray-700">
                <TableCell className="font-medium text-gray-200">
                  {book.title}
                </TableCell>
                <TableCell className="text-gray-300">{book.author}</TableCell>
                <TableCell className="text-gray-300">{book.date}</TableCell>
                <TableCell>
                  <StatusBadge status={book.status} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {filteredBooks.length === 0 && (
        <p className="text-center mt-4 text-gray-400">
          No books found matching the selected filters.
        </p>
      )}
    </div>
  );
}

interface FilterSwitchProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: () => void;
  color: string;
}

function FilterSwitch({
  id,
  label,
  checked,
  onChange,
  color,
}: FilterSwitchProps) {
  return (
    <div className="flex items-center space-x-2">
      <Switch
        id={id}
        checked={checked}
        onCheckedChange={onChange}
        className="data-[state=checked]:bg-teal-400"
      />
      <Label htmlFor={id} className={`text-${color}-400 font-medium`}>
        {label}
      </Label>
    </div>
  );
}

interface StatusBadgeProps {
  status: FilterStatus;
}

function StatusBadge({ status }: StatusBadgeProps) {
  const colors: Record<FilterStatus, string> = {
    issued: "bg-green-900 text-green-300",
    rejected: "bg-red-900 text-red-300",
    pending: "bg-yellow-900 text-yellow-300",
    returned: "bg-blue-900 text-blue-300",
  };

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status]}`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

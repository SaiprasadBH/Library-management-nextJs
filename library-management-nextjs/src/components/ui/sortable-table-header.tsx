"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { TableHead } from "@/components/ui/table";
import { ChevronDown, ChevronUp } from "lucide-react";

interface SortableColumnProps {
  label: string;
  field: string;
}

export function SortableColumn({ label, field }: SortableColumnProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSortField = searchParams.get("sortField");
  const currentSortDirection = searchParams.get("sortDirection") || "asc";

  const isActive = currentSortField === field;
  const isAscending = currentSortDirection === "asc";

  const toggleSort = useCallback(() => {
    const newDirection = isActive && isAscending ? "desc" : "asc";

    const params = new URLSearchParams(searchParams);
    params.set("sortField", field);
    params.set("sortDirection", newDirection);

    router.push(`/admin/books?${params.toString()}`);
  }, [router, searchParams, isActive, isAscending, field]);

  return (
    <TableHead onClick={toggleSort} className="cursor-pointer text-teal-400">
      <div className="flex items-center space-x-1">
        <span>{label}</span>
        {isAscending ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </div>
    </TableHead>
  );
}

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
import {
  fetchMemberSpecificBookRequestsWithStatus,
  getUserDetails,
} from "@/lib/actions";

const user = await getUserDetails();
if (!user) {
  console.error("failed to current user");
}
const sampleBooks = await fetchMemberSpecificBookRequestsWithStatus(user?.id!);

export default function Page() {
  return (
    <div>
      {sampleBooks ? (
        <UserSpecificRequests books={sampleBooks}></UserSpecificRequests>
      ) : (
        <p>No Transactions present as of Now</p>
      )}
    </div>
  );
}

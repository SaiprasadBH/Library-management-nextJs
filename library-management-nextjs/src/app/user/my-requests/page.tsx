import { useState } from "react";
import UserSpecificRequests from "@/components/ui/transaction-management/filter-user-requests";
import {
  fetchMemberSpecificBookRequestsWithStatus,
  getUserDetails,
} from "@/lib/actions";

export default async function Page() {
  const user = await getUserDetails();

  if (!user) {
    console.error("Failed to fetch current user");
    return <p>Failed to load user details</p>;
  }

  const sampleBooks = await fetchMemberSpecificBookRequestsWithStatus(
    user?.id!
  );

  return (
    <div>
      {sampleBooks?.length ? (
        <UserSpecificRequests books={sampleBooks} />
      ) : (
        <p>No Transactions present as of Now</p>
      )}
    </div>
  );
}

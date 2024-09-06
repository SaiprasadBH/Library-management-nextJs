import { fetchMembers } from "@/lib/actions";
import { IPagedResponse, IPageRequest } from "@/lib/core/pagination";
import { IMember, IMemberBase } from "@/lib/definitions";
import PaginationControl from "@/components/ui/paginationControl";
import Search from "@/components/ui/search";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PlusIcon } from "lucide-react";
import { DeleteButton } from "@/components/ui/customButtons";
import Link from "next/link";

export default async function MembersPage({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  let currentPage = Number(searchParams?.page) || 1;
  const query = searchParams?.query || "";
  const limit = 5;

  const listParameters: IPageRequest = {
    search: query,
    offset: (currentPage - 1) * limit,
    limit: limit,
  };

  const paginatedMembers: IPagedResponse<IMember> = await fetchMembers(
    listParameters
  );
  const paginationOptions = paginatedMembers.pagination;
  const members = paginatedMembers.items;

  return (
    <>
      <div className="w-full flex justify-between items-center mb-8">
        <h1 className="text-3xl font-serif lg:text-4xl">Member Management</h1>
        <Link
          href="/admin/members/create"
          className="flex h-10 items-center rounded-lg bg-primary px-4 text-sm font-medium text-white transition-colors hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <span className="hidden md:block mr-2">Add Member</span>
          <PlusIcon className="h-5 w-5" />
        </Link>
      </div>
      <div className="mb-6">
        <Search placeholder="Search for a member" />
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Age</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.map((member) => (
              <TableRow key={member.id}>
                <TableCell>{member.name}</TableCell>
                <TableCell>{member.age}</TableCell>
                <TableCell>{member.email}</TableCell>
                <TableCell>{member.address}</TableCell>
                <TableCell>{member.role}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <DeleteButton
                      type="member"
                      id={member.id}
                      name={member.name}
                    ></DeleteButton>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {members.length === 0 && (
        <p className="text-center mt-4">No members found</p>
      )}
      <div className="flex justify-center mt-8">
        <PaginationControl
          currentPage={currentPage}
          options={paginationOptions}
        />
      </div>
    </>
  );
}

import { fetchMembers, switchUserRoles } from "@/lib/actions";
import { IPagedResponse, IPageRequest } from "@/lib/core/pagination";
import { IMember, IMemberBase } from "@/lib/definitions";
import { PaginationControl } from "@/components/ui/paginationControl";
import { Search } from "@/components/ui/search";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PlusIcon, PencilIcon } from "lucide-react";
import { DeleteButton, SwitchRoleButton } from "@/components/ui/customButtons";
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
  const limit = 8;

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
    <div className="min-h-screen p-8 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-300">
            Member Management
          </h1>
          <Link
            href="/admin/members/create"
            className="flex h-10 items-center rounded-lg bg-gradient-to-r from-teal-400 to-cyan-300 hover:from-teal-500 hover:to-cyan-400 px-4 text-sm font-medium text-gray-900 transition-all duration-300 transform hover:scale-105"
          >
            <span className="hidden sm:block mr-2">Add Member</span>
            <PlusIcon className="h-5 w-5" />
          </Link>
        </div>

        <Search placeholder="Search for a member" />

        <div className="bg-gray-800/50 rounded-lg shadow-xl overflow-hidden backdrop-blur-xl border border-teal-500/20">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-gray-700">
                  <TableHead className="text-teal-400">Name</TableHead>
                  <TableHead className="text-teal-400">Age</TableHead>
                  <TableHead className="text-teal-400">Email</TableHead>
                  <TableHead className="text-teal-400">Address</TableHead>
                  <TableHead className="text-teal-400">Role</TableHead>
                  <TableHead className="text-teal-400">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {members.map((member) => (
                  <TableRow
                    key={member.id}
                    className="border-b border-gray-700 hover:bg-gray-700/50 transition-colors"
                  >
                    <TableCell className="font-medium">{member.name}</TableCell>
                    <TableCell>{member.age}</TableCell>
                    <TableCell>{member.email}</TableCell>
                    <TableCell>{member.address}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          member.role === "admin"
                            ? "bg-gradient-to-r from-purple-400 to-pink-400 text-gray-900"
                            : "bg-gradient-to-r from-blue-400 to-cyan-400 text-gray-900"
                        }`}
                      >
                        {member.role}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-4 justify-center">
                        <SwitchRoleButton id={member.id} role={member.role} />
                        <DeleteButton
                          type="member"
                          id={member.id}
                          name={member.name}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {members.length === 0 && (
          <p className="text-center mt-4 text-gray-400">No members found</p>
        )}

        <div className="flex justify-center mt-8">
          <PaginationControl
            currentPage={currentPage}
            options={paginationOptions}
          />
        </div>
      </div>
    </div>
  );
}

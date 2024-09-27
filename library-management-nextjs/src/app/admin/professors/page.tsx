import { fetchProfessorsList } from "@/lib/actions";
import { IPagedResponse, IPageRequest } from "@/lib/core/pagination";
import { IProfessor } from "@/lib/definitions";
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
import { PlusIcon, PencilIcon, ExternalLinkIcon } from "lucide-react";
import { DeleteButton } from "@/components/ui/customButtons";
import Link from "next/link";

export default async function ProfessorsPage({
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

  const paginatedProfessors: IPagedResponse<IProfessor> =
    await fetchProfessorsList(listParameters);
  const paginationOptions = paginatedProfessors.pagination;
  const professors = paginatedProfessors.items;

  return (
    <div className="min-h-screen p-4 sm:p-8 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-300">
            Professor Management
          </h1>
          <Link
            href="/admin/professors/create"
            className="flex h-10 items-center rounded-lg bg-gradient-to-r from-teal-400 to-cyan-300 hover:from-teal-500 hover:to-cyan-400 px-4 text-sm font-medium text-gray-900 transition-all duration-300 transform hover:scale-105"
          >
            <span className="hidden sm:block mr-2">Add Professor</span>
            <PlusIcon className="h-5 w-5" />
          </Link>
        </div>

        <Search placeholder="Search for a professor" />

        <div className="bg-gray-800/50 rounded-lg shadow-xl overflow-hidden backdrop-blur-xl border border-teal-500/20">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-gray-700">
                  <TableHead className="text-teal-400">Name</TableHead>
                  <TableHead className="text-teal-400">Email</TableHead>
                  <TableHead className="text-teal-400">Department</TableHead>
                  <TableHead className="text-teal-400">Bio</TableHead>
                  <TableHead className="text-teal-400">Calendly</TableHead>
                  <TableHead className="text-teal-400">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {professors.map((professor) => (
                  <TableRow
                    key={professor.id}
                    className="border-b border-gray-700 hover:bg-gray-700/50 transition-colors"
                  >
                    <TableCell className="font-medium">
                      {professor.name}
                    </TableCell>
                    <TableCell>{professor.email}</TableCell>
                    <TableCell>{professor.department}</TableCell>
                    <TableCell className="max-w-xs truncate">
                      {professor.bio}
                    </TableCell>
                    <TableCell>
                      {professor.calendlyLink && (
                        <a
                          href={professor.calendlyLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-teal-400 hover:text-teal-300 flex items-center"
                        >
                          <ExternalLinkIcon className="h-4 w-4 mr-1" />
                          <span className="hidden sm:inline">Calendly</span>
                        </a>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2 justify-center">
                        <Link
                          href={`/admin/professors/edit/${professor.id}`}
                          className="p-2 text-teal-400 hover:text-teal-300 transition-colors"
                        >
                          <PencilIcon className="h-5 w-5" />
                          <span className="sr-only">Edit</span>
                        </Link>
                        <DeleteButton
                          type="professor"
                          id={professor.id}
                          name={professor.name}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {professors.length === 0 && (
          <p className="text-center mt-4 text-gray-400">No professors found</p>
        )}

        <div className="flex justify-center mt-6 sm:mt-8">
          <PaginationControl
            currentPage={currentPage}
            options={paginationOptions}
          />
        </div>
      </div>
    </div>
  );
}

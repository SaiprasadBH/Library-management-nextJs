import { fetchRequests } from "@/lib/actions";
import { IPagedResponse, IPageRequest } from "@/lib/core/pagination";
import { PaginationControl } from "@/components/ui/paginationControl";
import { Search } from "@/components/ui/search";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ITransaction } from "@/lib/database/zod/transaction.schema";
import { ApproveButton, RejectButton } from "@/components/ui/customButtons";

export default async function RequestManagementPage({
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

  const paginatedRequest = await fetchRequests(listParameters);
  const requests = paginatedRequest?.items;

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-300">
          Request Management
        </h1>
      </div>

      <div className="bg-gray-800/50 rounded-lg shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-gray-700">
                <TableHead className="text-teal-400">Member</TableHead>
                <TableHead className="text-teal-400">Email</TableHead>
                <TableHead className="text-teal-400">Book Title</TableHead>
                <TableHead className="text-teal-400">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests?.map((request) => (
                <TableRow
                  key={request.id}
                  className="border-b border-gray-700 hover:bg-gray-700/50 transition-colors"
                >
                  <TableCell>{request.memberName}</TableCell>
                  <TableCell>{request.memberEmail}</TableCell>
                  <TableCell>{request.bookTitle}</TableCell>
                  <TableCell>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <ApproveButton transactionId={request.id} />
                      <RejectButton transactionId={request.id} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {requests?.length === 0 && (
        <p className="text-center mt-4 text-gray-400">No requests found</p>
      )}

      <div className="flex justify-center mt-8">
        {paginatedRequest?.pagination ? (
          <PaginationControl
            currentPage={currentPage}
            options={paginatedRequest?.pagination!}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

// import { fetchRequests } from "@/lib/actions";
// import { IPagedResponse, IPageRequest } from "@/lib/core/pagination";
// import PaginationControl from "@/components/ui/paginationControl";
// import Search from "@/components/ui/search";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Button } from "@/components/ui/button";
// import { CheckCircle, XCircle } from "lucide-react";
// import { ITransaction } from "@/lib/database/zod/transaction.schema";

// export default async function RequestManagementPage({
//   searchParams,
// }: {
//   searchParams?: {
//     query?: string;
//     page?: string;
//   };
// }) {
//   let currentPage = Number(searchParams?.page) || 1;
//   const query = searchParams?.query || "";
//   const limit = 5;

//   const listParameters: IPageRequest = {
//     search: query,
//     offset: (currentPage - 1) * limit,
//     limit: limit,
//   };

//   const paginatedRequests: IPagedResponse<ITransaction> = await fetchRequests(
//     listParameters
//   );
//   const paginationOptions = paginatedRequests.pagination;
//   const requests = paginatedRequests.items;

//   async function handleApprove(requestId: string) {
//     // Implement approve logic here
//     console.log(`Approve request ${requestId}`);
//   }

//   async function handleReject(requestId: string) {
//     // Implement reject logic here
//     console.log(`Reject request ${requestId}`);
//   }

//   return (
//     <>
//       <div className="w-full flex justify-between items-center mb-8">
//         <h1 className="text-3xl font-serif lg:text-4xl">Request Management</h1>
//       </div>
//       <div className="mb-6">
//         <Search placeholder="Search for a request" />
//       </div>
//       <div className="overflow-x-auto">
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>Member</TableHead>
//               <TableHead>Email</TableHead>
//               <TableHead>Book Title</TableHead>
//               <TableHead>Actions</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {requests.map((request) => (
//               <TableRow key={request.id}>
//                 <TableCell>{request.memberName}</TableCell>
//                 <TableCell>{request.memberEmail}</TableCell>
//                 <TableCell>{request.bookTitle}</TableCell>
//                 <TableCell>
//                   <div className="flex space-x-2">
//                     <Button
//                       onClick={() => handleApprove(request.id)}
//                       className="bg-green-500 hover:bg-green-600 text-white"
//                     >
//                       <CheckCircle className="mr-2 h-4 w-4" />
//                       Approve
//                     </Button>
//                     <Button
//                       onClick={() => handleReject(request.id)}
//                       className="bg-red-500 hover:bg-red-600 text-white"
//                     >
//                       <XCircle className="mr-2 h-4 w-4" />
//                       Reject
//                     </Button>
//                   </div>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </div>
//       {requests.length === 0 && (
//         <p className="text-center mt-4">No requests found</p>
//       )}
//       <div className="flex justify-center mt-8">
//         <PaginationControl
//           currentPage={currentPage}
//           options={paginationOptions}
//         />
//       </div>
//     </>
//   );
// }

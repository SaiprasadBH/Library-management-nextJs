// import {
//   fetchTransactions,
//   deleteTransaction,
//   deleteReturnedTransactions,
// } from "@/lib/actions";
// import { IPagedResponse, IPageRequest } from "@/lib/core/pagination";
// import { ITransaction } from "@/lib/definitions";
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
// import { Trash2, RefreshCw } from "lucide-react";

// export default function Component({
//   searchParams,
// }: {
//   searchParams?: {
//     query?: string;
//     page?: string;
//   };
// }) {
//   const currentPage = Number(searchParams?.page) || 1;
//   const query = searchParams?.query || "";
//   const limit = 5;

//   const listParameters: IPageRequest = {
//     search: query,
//     offset: (currentPage - 1) * limit,
//     limit: limit,
//   };

//   const paginatedTransactions: IPagedResponse<ITransaction> =
//     fetchTransactions(listParameters);
//   const paginationOptions = paginatedTransactions.pagination;
//   const transactions = paginatedTransactions.items;

//   async function handleDelete(transactionId: string) {
//     await deleteTransaction(transactionId);
//     // Refresh the transactions list after deletion
//     // This would typically be handled by a state management solution or SWR/React Query
//   }

//   async function handleDeleteReturned() {
//     await deleteReturnedTransactions();
//     // Refresh the transactions list after deletion
//     // This would typically be handled by a state management solution or SWR/React Query
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-3xl font-serif lg:text-4xl">
//           Transaction Management
//         </h1>
//         <Button
//           onClick={handleDeleteReturned}
//           className="bg-red-500 hover:bg-red-600 text-white"
//         >
//           <RefreshCw className="mr-2 h-4 w-4" />
//           Delete Returned
//         </Button>
//       </div>
//       <div className="mb-6">
//         <Search placeholder="Search for a transaction" />
//       </div>
//       <div className="overflow-x-auto">
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead className="w-1/6">Name</TableHead>
//               <TableHead className="w-1/6">Email</TableHead>
//               <TableHead className="w-1/6">Book</TableHead>
//               <TableHead className="w-1/6">ISBN</TableHead>
//               <TableHead className="w-1/6">Status</TableHead>
//               <TableHead className="w-1/6">Action</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {transactions.map((transaction) => (
//               <TableRow key={transaction.id}>
//                 <TableCell>{transaction.memberName}</TableCell>
//                 <TableCell>{transaction.memberEmail}</TableCell>
//                 <TableCell>{transaction.bookTitle}</TableCell>
//                 <TableCell>{transaction.isbn}</TableCell>
//                 <TableCell>{transaction.status}</TableCell>
//                 <TableCell>
//                   <Button
//                     onClick={() => handleDelete(transaction.id)}
//                     className="bg-red-500 hover:bg-red-600 text-white"
//                     aria-label={`Delete transaction for ${transaction.bookTitle}`}
//                   >
//                     <Trash2 className="h-4 w-4" />
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </div>
//       {transactions.length === 0 && (
//         <p className="text-center mt-4">No transactions found</p>
//       )}
//       <div className="flex justify-center mt-8">
//         <PaginationControl
//           currentPage={currentPage}
//           options={paginationOptions}
//         />
//       </div>
//     </div>
//   );
// }

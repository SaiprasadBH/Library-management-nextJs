// import { fetchBorrowedBooks } from "@/lib/actions";
// import { IPagedResponse, IPageRequest } from "@/lib/core/pagination";
// import { IBorrowedBook } from "@/lib/definitions";
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
// import { BookOpen } from "lucide-react";

// export default async function BookReturnManagementPage({
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

//   const paginatedBorrowedBooks: IPagedResponse<IBorrowedBook> =
//     await fetchBorrowedBooks(listParameters);
//   const paginationOptions = paginatedBorrowedBooks.pagination;
//   const borrowedBooks = paginatedBorrowedBooks.items;

//   async function handleReturn(borrowId: string) {
//     // Implement return logic here
//     console.log(`Return book with borrow ID ${borrowId}`);
//   }

//   return (
//     <>
//       <div className="w-full flex justify-between items-center mb-8">
//         <h1 className="text-3xl font-serif lg:text-4xl">
//           Book Return Management
//         </h1>
//       </div>
//       <div className="mb-6">
//         <Search placeholder="Search for a borrowed book" />
//       </div>
//       <div className="overflow-x-auto">
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>Name</TableHead>
//               <TableHead>Email</TableHead>
//               <TableHead>Book</TableHead>
//               <TableHead>ISBN</TableHead>
//               <TableHead>Action</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {borrowedBooks.map((borrowedBook) => (
//               <TableRow key={borrowedBook.id}>
//                 <TableCell>{borrowedBook.memberName}</TableCell>
//                 <TableCell>{borrowedBook.memberEmail}</TableCell>
//                 <TableCell>{borrowedBook.bookTitle}</TableCell>
//                 <TableCell>{borrowedBook.isbn}</TableCell>
//                 <TableCell>
//                   <Button
//                     onClick={() => handleReturn(borrowedBook.id)}
//                     className="bg-primary hover:bg-primary/90 text-white"
//                   >
//                     <BookOpen className="mr-2 h-4 w-4" />
//                     Return
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </div>
//       {borrowedBooks.length === 0 && (
//         <p className="text-center mt-4">No borrowed books found</p>
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

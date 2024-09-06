export interface ITransactionBase {
  memberId: bigint;
  bookId: bigint;
}

export interface ITransaction extends ITransactionBase {
  id: number;
  bookStatus: "issued" | "returned" | "pending" | "rejected";
  dateOfIssue: string;
}

"use client";

import { useState } from "react";
import {
  BookOpen,
  CheckCircle,
  Edit,
  Lectern,
  Trash2,
  TrashIcon,
  XCircle,
} from "lucide-react";
import { Button } from "./button";
import { IBook, IBookBase, IMember, IMemberBase } from "@/lib/definitions";
import { useActionState } from "react";
import {
  approveRequest,
  createBookRequest,
  deleteBook,
  deleteMember,
  deleteTransaction,
  rejectRequest,
  returnRequest,
} from "@/lib/actions";

import { AlertDialogFooter, AlertDialogHeader } from "./alert-dialog";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/components/hooks/use-toast";

export const DeleteButton = ({
  id,
  name,
  type,
}: {
  id: number;
  name: string;
  type: "book" | "member" | "transaction";
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async () => {
    if (type === "book") {
      await deleteBook(id);
    } else if (type === "member") {
      await deleteMember(id);
    } else if (type === "transaction") {
      await deleteTransaction(id);
    }

    setIsOpen(false);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" size="icon">
            <TrashIcon className="h-4 w-4 text-red-500" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete &quot;{name}&quot;? This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>

            <Button
              className="bg-red-500 text-white hover:bg-red-600"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
export function EditButton({ url }: { url: string }) {
  return (
    <Link href={url}>
      <Button size="sm" variant="outline">
        <Edit className="h-4 w-4 mr-2" />
        Edit
      </Button>
    </Link>
  );
}

export async function BorrowButton({ bookId }: { bookId: number }) {
  async function formAction() {
    const state = await createBookRequest(bookId);
    if (state.success) {
      toast({
        title: "Success",
        description: "Book requested successfully",
      });
    } else if (state.error || !state.success) {
      toast({
        title: "Error",
        description: state.error,
        variant: "destructive",
      });
    }
  }

  return (
    <form action={formAction}>
      <Button size="sm" variant="outline" type="submit">
        <BookOpen className="h-4 w-4 mr-2" />
        {"Borrow"}
      </Button>
    </form>
  );
}

export async function LargeBorrowButton({ bookId }: { bookId: number }) {
  async function formAction() {
    const state = await createBookRequest(bookId);
    if (state.success) {
      toast({
        title: "Success",
        description: "Book requested successfully",
      });
    } else if (state.error || !state.success) {
      toast({
        title: "Error",
        description: state.error,
        variant: "destructive",
      });
    }
  }

  return (
    <form action={formAction}>
      <Button className="mt-4 md:mt-6 lg:mt-8">Borrow</Button>
    </form>
  );
}

export async function ApproveButton({
  transactionId,
}: {
  transactionId: number;
}) {
  async function formAction() {
    const state = await approveRequest(transactionId);
    if (state.success) {
      toast({
        title: "Success",
        description: "Request approved successfully",
      });
    } else if (state.error || !state.success) {
      toast({
        title: "Error",
        description: state.error,
        variant: "destructive",
      });
    }
  }

  return (
    <form action={formAction}>
      <Button className="bg-green-500 hover:bg-green-600 text-white">
        <CheckCircle className="mr-2 h-4 w-4" />
        Approve
      </Button>
    </form>
  );
}

export async function RejectButton({
  transactionId,
}: {
  transactionId: number;
}) {
  async function formAction() {
    const state = await rejectRequest(transactionId);
    if (state.success) {
      toast({
        title: "Success",
        description: "Request Rejected successfully",
      });
    } else if (state.error || !state.success) {
      toast({
        title: "Error",
        description: state.error,
        variant: "destructive",
      });
    }
  }

  return (
    <form action={formAction}>
      <Button className="bg-red-500 hover:bg-red-600 text-white">
        <XCircle className="mr-2 h-4 w-4" />
        Reject
      </Button>
    </form>
  );
}

export async function ReturnButton({
  transactionId,
}: {
  transactionId: number;
}) {
  async function formAction() {
    const state = await returnRequest(transactionId);
    if (state.success) {
      toast({
        title: "Success",
        description: "Book returned successfully",
      });
    } else if (state.error || !state.success) {
      toast({
        title: "Error",
        description: state.error,
        variant: "destructive",
      });
    }
  }

  return (
    <form action={formAction}>
      <Button className="bg-primary hover:bg-primary/90 text-white">
        <BookOpen className="mr-2 h-4 w-4" />
        Return
      </Button>
    </form>
  );
}

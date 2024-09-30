"use client";

import { useState } from "react";
import {
  BookOpen,
  CheckCircle,
  Edit,
  Lectern,
  PencilIcon,
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
  removeProfessorFromOrganization,
  returnRequest,
  switchUserRoles,
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
  type: "book" | "member" | "transaction" | "professor";
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async () => {
    if (type === "book") {
      await deleteBook(id);
    } else if (type === "member") {
      await deleteMember(id);
    } else if (type === "transaction") {
      await deleteTransaction(id);
    } else if (type === "professor") {
      await removeProfessorFromOrganization(id);
    }

    setIsOpen(false);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" size="icon" className="hover:bg-red-500/20">
            <TrashIcon className="h-4 w-4 text-red-400" />
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-gray-800 text-gray-100 border border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-teal-400">
              Confirm Deletion
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Are you sure you want to delete &quot;{name}&quot;? This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="bg-gray-700 text-gray-200 hover:bg-gray-600"
            >
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
      <Button
        size="sm"
        variant="outline"
        className="bg-gray-700 text-teal-400 hover:bg-gray-600 border-teal-500"
      >
        <Edit className="h-4 w-4 mr-2" />
        Edit
      </Button>
    </Link>
  );
}

export function BorrowButton({ bookId }: { bookId: number }) {
  async function formAction() {
    const state = await createBookRequest(bookId);
    if (state.success) {
      toast({
        title: "Success",
        description: "Book requested successfully",
        className: "bg-teal-400 text-gray-900",
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
      <Button
        size="sm"
        variant="outline"
        type="submit"
        className="bg-gray-700 text-cyan-400 hover:bg-gray-600 border-cyan-500"
      >
        <BookOpen className="h-4 w-4 mr-2" />
        Borrow
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
      <Button className="mt-4 md:mt-6 lg:mt-8 w-full">Borrow</Button>
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
        className: "bg-teal-400 text-gray-900",
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
      <Button className="bg-gradient-to-r from-teal-400 to-cyan-300 hover:from-teal-500 hover:to-cyan-400 text-gray-900 font-bold transition-all duration-300 transform hover:scale-105 w-full sm:w-auto">
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
        className: "bg-teal-400 text-gray-900",
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
      <Button className="bg-red-500 hover:bg-red-600 text-white font-bold transition-all duration-300 transform hover:scale-105 w-full sm:w-auto">
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
        className: "bg-teal-400 text-gray-900",
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
      <Button className="bg-gradient-to-r from-teal-400 to-cyan-300 hover:from-teal-500 hover:to-cyan-400 text-gray-900 font-bold transition-all duration-300 transform hover:scale-105">
        <BookOpen className="mr-2 h-4 w-4" />
        Return
      </Button>
    </form>
  );
}

export function SwitchRoleButton({ id, role }: { id: number; role: string }) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleSwitchRole() {
    setIsLoading(true);
    const state = await switchUserRoles(id, role);
    setIsLoading(false);

    if (state.success) {
      toast({
        title: "Success",
        description: state.success,
        className: "bg-teal-400 text-gray-900",
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
    <Button
      onClick={handleSwitchRole}
      disabled={isLoading}
      className="bg-gradient-to-r from-teal-400 to-cyan-300 hover:from-teal-500 hover:to-cyan-400 text-gray-900 font-medium transition-all duration-300"
    >
      {isLoading
        ? "Switching..."
        : `Switch to ${role === "admin" ? "User" : "Admin"}`}
    </Button>
  );
}

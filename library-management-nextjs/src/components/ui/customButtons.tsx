"use client";

import { useState } from "react";
import { BookOpen, Edit, Lectern, Trash2, TrashIcon } from "lucide-react";
import { Button } from "./button";
import { IBook, IBookBase, IMember, IMemberBase } from "@/lib/definitions";
import { useActionState } from "react";
import { createBookRequest, deleteBook, deleteMember } from "@/lib/actions";

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
  type: "book" | "member";
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async () => {
    if (type === "book") {
      await deleteBook(id);
    } else if (type === "member") {
      await deleteMember(id);
    }

    setIsOpen(false);
  };
  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" size="icon">
            <TrashIcon className="h-4 w-4" />
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
            <Button onClick={handleDelete}>Delete</Button>
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

"use client";

import { useState } from "react";
import { Edit, Trash2, TrashIcon } from "lucide-react";
import { Button } from "./button";
import { IBook, IBookBase, IMember, IMemberBase } from "@/lib/definitions";
import { useActionState } from "react";
import { deleteBook } from "@/lib/actions";
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

export const DeleteButton = ({ id, name }: { id: number; name: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async () => {
    await deleteBook(id);
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
              Are you sure you want to delete the book &quot;{name}&quot;? This
              action cannot be undone.
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

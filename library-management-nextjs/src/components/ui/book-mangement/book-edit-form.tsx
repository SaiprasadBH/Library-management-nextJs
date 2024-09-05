"use client";

import { IBook } from "@/lib/definitions";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../card";
import { Label } from "../label";
import { Input } from "../input";
import { Button } from "../button";
import { SaveIcon, TrashIcon } from "lucide-react";
import { useActionState } from "react";
import { deleteBook, updateBook } from "@/lib/actions";

export default function BookEditForm({ book }: { book: IBook }) {
  const initialState = { success: false, error: "" };
  const UpdateBookWithId = updateBook.bind(null, book.id);

  const [updateState, updateFormAction] = useActionState(
    UpdateBookWithId,
    initialState
  );
  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">Book Details</CardTitle>
      </CardHeader>
      <form action={updateFormAction}>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" defaultValue={book.title} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="author">Author</Label>
              <Input id="author" name="author" defaultValue={book.author} />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="publisher">Publisher</Label>
              <Input
                id="publisher"
                name="publisher"
                defaultValue={book.publisher}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="genre">Genre</Label>
              <Input id="genre" name="genre" defaultValue={book.genre} />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="isbnNo">ISBN Number</Label>
              <Input id="isbnNo" name="isbnNo" defaultValue={book.isbnNo} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="numOfPages">Number of Pages</Label>
              <Input
                id="numOfPages"
                name="numOfPages"
                type="number"
                defaultValue={book.numOfPages}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="totalNumOfCopies">Total Copies</Label>
            <Input
              id="totalNumOfCopies"
              name="totalNumOfCopies"
              type="number"
              defaultValue={book.totalNumOfCopies}
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row justify-between gap-4">
          <Button type="submit" variant="outline" className="w-full sm:w-auto">
            <SaveIcon className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </CardFooter>
      </form>
      {updateState?.error && (
        <p className="text-sm text-red-500 mt-2 px-6">{updateState.error}</p>
      )}
    </Card>
  );
}

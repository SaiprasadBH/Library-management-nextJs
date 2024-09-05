"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useActionState } from "react";
import { createBook } from "@/lib/actions";

export default function BookCreateForm() {
  const initialState = { success: false, error: undefined };

  const [createState, createFormAction] = useActionState(
    createBook,
    initialState
  );

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">
          Create New Book
        </CardTitle>
      </CardHeader>
      <form action={createFormAction}>
        <CardContent className="grid gap-4 sm:gap-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" required className="w-full" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="author">Author</Label>
              <Input id="author" name="author" required className="w-full" />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="publisher">Publisher</Label>
              <Input
                id="publisher"
                name="publisher"
                required
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="genre">Genre</Label>
              <Input id="genre" name="genre" required className="w-full" />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="isbnNo">ISBN Number</Label>
              <Input id="isbnNo" name="isbnNo" required className="w-full" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="numOfPages">Number of Pages</Label>
              <Input
                id="numOfPages"
                name="numOfPages"
                type="number"
                required
                className="w-full"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="totalNumOfCopies">Total Copies</Label>
            <Input
              id="totalNumOfCopies"
              name="totalNumOfCopies"
              type="number"
              required
              className="w-full"
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button type="submit" className="w-full sm:w-auto sm:min-w-[200px]">
            <PlusIcon className="mr-2 h-4 w-4" />
            Create Book
          </Button>
          {createState?.error && (
            <p className="text-sm text-red-500 text-center w-full">
              {createState.error}
            </p>
          )}
          {createState?.success && (
            <p className="text-sm text-green-500 text-center w-full">
              Book created successfully!
            </p>
          )}
        </CardFooter>
      </form>
    </Card>
  );
}

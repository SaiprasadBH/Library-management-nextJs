"use client";

import { useState } from "react";
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
import { UploadButton } from "@/utils/uploadting";

export default function BookCreateForm() {
  const initialState = { success: false, error: undefined };
  const [createState, createFormAction] = useActionState(
    createBook,
    initialState
  );

  const [imageUrl, setImageUrl] = useState(""); // Track image URL

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

          {/* New Price Field */}
          <div className="space-y-2">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              name="price"
              type="number"
              step="0.01"
              min="0"
              required
              placeholder="Enter price in Rupees"
              className="w-full"
            />
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

          {/* Upload Image Section */}
          <div className="space-y-2">
            <Label htmlFor="bookImage">Upload an image</Label>
            <UploadButton
              className="w-full sm:w-auto bg-blue-600 text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-500 rounded-lg px-4 py-2 width-auto"
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                const uploadedUrl = res[0]?.url; // Assuming first file's URL is needed
                setImageUrl(uploadedUrl); // Set image URL in state
                alert("Upload Completed");
              }}
              onUploadError={(error: Error) => {
                alert(`ERROR! ${error.message}`);
              }}
            />
          </div>

          {/* Image URL Input (Read-only) */}
          <div className="space-y-2">
            <Label htmlFor="imageUrl">Image URL</Label>
            <Input
              id="imageUrl"
              name="imageUrl"
              value={imageUrl} // Set the input value from state
              readOnly
              className="w-full bg-gray-100 cursor-not-allowed"
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

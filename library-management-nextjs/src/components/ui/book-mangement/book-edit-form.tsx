"use client";

import { useState } from "react";
import { IBook } from "@/lib/definitions";
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
import { SaveIcon, TrashIcon } from "lucide-react";
import { useActionState } from "react";
import { deleteBook, updateBook } from "@/lib/actions";
import { UploadButton } from "@/utils/uploadting";

export default function BookEditForm({ book }: { book: IBook }) {
  const initialState = { success: false, error: "" };
  const UpdateBookWithId = updateBook.bind(null, book.id);

  const [updateState, updateFormAction] = useActionState(
    UpdateBookWithId,
    initialState
  );

  // Added state to retain values in case of errors
  const [formData, setFormData] = useState({
    title: book.title || "",
    author: book.author || "",
    publisher: book.publisher || "",
    genre: book.genre || "",
    isbnNo: book.isbnNo || "",
    numOfPages: book.numOfPages || "",
    price: Number(book.price),
    totalNumOfCopies: book.totalNumOfCopies || "",
  });

  const [imageUrl, setImageUrl] = useState(book.imageURL || "");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      price: Number(e.target.value),
    });
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">Edit Book</CardTitle>
      </CardHeader>
      <form action={updateFormAction}>
        <CardContent className="grid gap-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="author">Author</Label>
              <Input
                id="author"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                required
                className="w-full"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="publisher">Publisher</Label>
              <Input
                id="publisher"
                name="publisher"
                value={formData.publisher}
                onChange={handleInputChange}
                required
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="genre">Genre</Label>
              <Input
                id="genre"
                name="genre"
                value={formData.genre}
                onChange={handleInputChange}
                required
                className="w-full"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="isbnNo">ISBN Number</Label>
              <Input
                id="isbnNo"
                name="isbnNo"
                value={formData.isbnNo}
                onChange={handleInputChange}
                required
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="numOfPages">Number of Pages</Label>
              <Input
                id="numOfPages"
                name="numOfPages"
                type="number"
                value={formData.numOfPages}
                onChange={handleInputChange}
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
              value={formData.price}
              onChange={handleInputChange}
              required
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="totalNumOfCopies">Total Copies</Label>
            <Input
              id="totalNumOfCopies"
              name="totalNumOfCopies"
              type="number"
              value={formData.totalNumOfCopies}
              onChange={handleInputChange}
              required
              className="w-full"
            />
          </div>

          {/* Upload Image Section */}
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="space-y-2 w-full sm:w-auto">
              <Label htmlFor="bookImage">Upload an image</Label>
              <UploadButton
                className="w-full sm:w-auto bg-primary text-white hover:bg-primary-dark focus:ring-4 focus:ring-primary-light rounded-lg px-4 py-2"
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  const uploadedUrl = res[0]?.url;
                  setImageUrl(uploadedUrl);
                  alert("Upload Completed");
                }}
                onUploadError={(error: Error) => {
                  alert(`ERROR! ${error.message}`);
                }}
              />
            </div>

            {/* Image URL Input (Read-only) */}
            <div className="space-y-2 w-full sm:w-auto">
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input
                id="imageUrl"
                name="imageUrl"
                value={imageUrl}
                readOnly
                className="w-full sm:w-60 bg-gray-100 text-gray-600 cursor-not-allowed border-0"
              />
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col sm:flex-row justify-between gap-4 p-6">
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

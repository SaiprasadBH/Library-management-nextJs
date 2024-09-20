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

  const [imageUrl, setImageUrl] = useState("");

  // Added state for each input field to preserve data on errors
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    publisher: "",
    genre: "",
    isbnNo: "",
    numOfPages: "",
    price: "",
    totalNumOfCopies: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg rounded-xl">
      <CardHeader className="space-y-1 pb-0">
        <CardTitle className="text-2xl font-bold text-center">
          Create New Book
        </CardTitle>
      </CardHeader>
      <form action={createFormAction}>
        <CardContent className="grid gap-6 p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                required
                value={formData.title} // preserve value
                onChange={handleInputChange}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="author">Author</Label>
              <Input
                id="author"
                name="author"
                required
                value={formData.author} // preserve value
                onChange={handleInputChange}
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
                required
                value={formData.publisher} // preserve value
                onChange={handleInputChange}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="genre">Genre</Label>
              <Input
                id="genre"
                name="genre"
                required
                value={formData.genre} // preserve value
                onChange={handleInputChange}
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
                required
                value={formData.isbnNo} // preserve value
                onChange={handleInputChange}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="numOfPages">Number of Pages</Label>
              <Input
                id="numOfPages"
                name="numOfPages"
                type="number"
                required
                value={formData.numOfPages} // preserve value
                onChange={handleInputChange}
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
              value={formData.price} // preserve value
              onChange={handleInputChange}
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
              value={formData.totalNumOfCopies} // preserve value
              onChange={handleInputChange}
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

            {/* Image URL Input (No border, next to upload button) */}
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
        <CardFooter className="flex flex-col space-y-4 p-6">
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

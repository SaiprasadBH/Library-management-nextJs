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
import { SaveIcon, TrashIcon, Upload, BookOpen } from "lucide-react";
import { useActionState } from "react";
import { deleteBook, updateBook } from "@/lib/actions";
import { UploadButton } from "@/utils/uploadting";
import { motion } from "framer-motion";

export default function BookEditForm({ book }: { book: IBook }) {
  const initialState = { success: false, error: "" };
  const UpdateBookWithId = updateBook.bind(null, book.id);

  const [updateState, updateFormAction] = useActionState(
    UpdateBookWithId,
    initialState
  );

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
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-transparent border-none shadow-none">
      <CardHeader className="space-y-1 pb-8">
        <CardTitle className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-300">
          <BookOpen className="w-12 h-12 mx-auto mb-4" />
          Edit Book Details
        </CardTitle>
      </CardHeader>
      <form action={updateFormAction}>
        <CardContent className="grid gap-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-gray-300">
                Title
              </Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="w-full bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="author" className="text-gray-300">
                Author
              </Label>
              <Input
                id="author"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                required
                className="w-full bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300"
              />
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="publisher" className="text-gray-300">
                Publisher
              </Label>
              <Input
                id="publisher"
                name="publisher"
                value={formData.publisher}
                onChange={handleInputChange}
                required
                className="w-full bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="genre" className="text-gray-300">
                Genre
              </Label>
              <Input
                id="genre"
                name="genre"
                value={formData.genre}
                onChange={handleInputChange}
                required
                className="w-full bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300"
              />
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="isbnNo" className="text-gray-300">
                ISBN Number
              </Label>
              <Input
                id="isbnNo"
                name="isbnNo"
                value={formData.isbnNo}
                onChange={handleInputChange}
                required
                className="w-full bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="numOfPages" className="text-gray-300">
                Number of Pages
              </Label>
              <Input
                id="numOfPages"
                name="numOfPages"
                type="number"
                value={formData.numOfPages}
                onChange={handleInputChange}
                required
                className="w-full bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300"
              />
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="price" className="text-gray-300">
                Price
              </Label>
              <Input
                id="price"
                name="price"
                type="number"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={handleInputChange}
                required
                className="w-full bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="totalNumOfCopies" className="text-gray-300">
                Total Copies
              </Label>
              <Input
                id="totalNumOfCopies"
                name="totalNumOfCopies"
                type="number"
                value={formData.totalNumOfCopies}
                onChange={handleInputChange}
                required
                className="w-full bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bookImage" className="text-gray-300">
              Book Cover Image
            </Label>
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <UploadButton
                className="w-full sm:w-auto bg-gradient-to-r from-teal-400 to-cyan-300 hover:from-teal-500 hover:to-cyan-400 text-gray-900 font-bold transition-all duration-300 transform hover:scale-105 rounded-lg px-4 py-2 flex items-center justify-center"
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  const uploadedUrl = res[0]?.url;
                  setImageUrl(uploadedUrl);
                  alert("Upload Completed");
                }}
                onUploadError={(error: Error) => {
                  alert(`ERROR! ${error.message}`);
                }}
              ></UploadButton>
              <Input
                id="imageUrl"
                name="imageUrl"
                value={imageUrl}
                readOnly
                className="w-full sm:flex-1 bg-gray-700/50 text-gray-400 cursor-not-allowed border-0"
                placeholder="Image URL will appear here"
              />
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col space-y-4 p-6">
          <Button
            type="submit"
            className="w-full sm:w-auto sm:min-w-[200px] bg-gradient-to-r from-teal-400 to-cyan-300 hover:from-teal-500 hover:to-cyan-400 text-gray-900 font-bold transition-all duration-300 transform hover:scale-105 rounded-lg"
          >
            <SaveIcon className="mr-2 h-5 w-5" />
            Save Changes
          </Button>
          {updateState?.error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-red-500 text-center w-full bg-red-500/10 p-2 rounded-lg"
            >
              {updateState.error}
            </motion.p>
          )}
        </CardFooter>
      </form>
    </Card>
  );
}

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import React from "react";
import { getBookById } from "@/lib/actions";
import { IBook } from "@/lib/definitions";
import BookEditForm from "@/components/ui/book-mangement/book-edit-form";

const EditBook = async ({ params }: { params: { id: string } }) => {
  const book = await getBookById(Number(params.id));

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900">
      <Card className="w-full max-w-4xl mx-auto shadow-2xl rounded-2xl bg-gray-800/50 backdrop-blur-xl border border-teal-500/20">
        <CardHeader className="pb-8">
          <CardTitle className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-300">
            Edit Book
          </CardTitle>
        </CardHeader>
        <CardContent>
          {book ? (
            <BookEditForm book={book} />
          ) : (
            <p className="text-center text-red-400">No such book found</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EditBook;

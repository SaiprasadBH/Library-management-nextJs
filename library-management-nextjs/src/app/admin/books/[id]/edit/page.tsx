import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

import React from "react";
import { getBookById } from "@/lib/actions";
import { IBook } from "@/lib/definitions";
import BookEditForm from "@/components/ui/book-mangement/book-edit-form";

const EditBook = async ({ params }: { params: { id: string } }) => {
  const book = await getBookById(Number(params.id));

  return (
    <>
      <Card className="w-5/6 max-w-4xl mx-auto border-none shadow-none">
        <CardContent>
          {book ? (
            <BookEditForm book={book}></BookEditForm>
          ) : (
            <p>No such book found</p>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default EditBook;

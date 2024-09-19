"use client";
import React from "react";
import { Card, CardContent } from "../card";
import { Button } from "../button";
import { LargeBorrowButton } from "../customButtons";
import Image from "next/image";

interface BookCardProps {
  title: string;
  author: string;
  bookId: number;
  price?: number | null | undefined;
  availableNumOfCopies: number;
  totalNumOfCopies: number;
  imageUrl?: string; // Optional prop for image URL
}

export function BookCard(props: BookCardProps) {
  return (
    <Card className="h-full">
      <CardContent className="p-4 flex flex-col justify-between h-full">
        <div className="text-center">
          {" "}
          {/* Center-align text */}
          {/* Fixed-size Image Container */}
          <div className="w-[150px] h-[200px] mb-4 mx-auto flex items-center justify-center bg-gray-200">
            {props.imageUrl ? (
              <Image
                src={props.imageUrl}
                alt={props.title}
                width={150} // Fixed width
                height={200} // Fixed height
                className="object-cover"
              />
            ) : (
              <p className="text-gray-500">No image</p>
            )}
          </div>
          {/* Title and Author */}
          <h2 className="text-xl font-bold mb-2 md:text-2xl lg:text-3xl">
            {props.title}
          </h2>
          <p className="text-muted-foreground md:text-lg lg:text-xl">
            {props.author}
          </p>
          {/* Price */}
          <p className="mt-2 text-lg font-semibold text-green-600">
            ₹{props.price?.toFixed(2)}
          </p>
          {/* Copies Information */}
          <p className="mt-1 text-sm text-muted-foreground">
            {props.availableNumOfCopies} of {props.totalNumOfCopies} copies
            available
          </p>
        </div>

        {/* Centered Borrow Button with increased width */}
        <div className="mt-4 flex justify-center">
          <LargeBorrowButton bookId={props.bookId} />{" "}
          {/* Increase width as needed */}
        </div>
      </CardContent>
    </Card>
  );
}

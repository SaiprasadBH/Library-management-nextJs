import React from "react";
import Image from "next/image";
import { LargeBorrowButton } from "../customButtons";

interface BookCardProps {
  title: string;
  author: string;
  bookId: number;
  price?: number | null | undefined;
  availableNumOfCopies: number;
  totalNumOfCopies: number;
  imageUrl?: string;
}

export function BookCard(props: BookCardProps) {
  return (
    <div
      className={`flex flex-col bg-gray-800 bg-opacity-50 border border-gray-700 rounded-2xl shadow-2xl transition-transform duration-500 hover:scale-105 hover:shadow-3xl overflow-hidden`}
      style={{ width: "320px", height: "450px" }}
    >
      {/* Image Section */}
      <div className="relative w-full h-56">
        {props.imageUrl ? (
          <Image
            src={props.imageUrl}
            alt={props.title}
            fill
            className="object-cover object-center"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-700">
            <p className="text-gray-500">No Image</p>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent flex flex-col justify-end p-4">
          <h2 className="text-lg font-bold text-white line-clamp-2">
            {props.title}
          </h2>
          <p className="text-sm text-gray-300">{props.author}</p>
        </div>
      </div>

      {/* Book Info Section */}
      <div className="flex-grow flex flex-col justify-between p-6 space-y-3">
        {props.price ? (
          <p className="text-lg font-semibold text-teal-400">
            ₹{props.price.toFixed(2)}
          </p>
        ) : (
          <p className="text-gray-400">Price not available</p>
        )}
        <p className="text-xs text-gray-400">
          {props.availableNumOfCopies} of {props.totalNumOfCopies} copies
          available
        </p>

        {/* Borrow Button */}
        <div className="mt-4 flex space-x-3">
          <LargeBorrowButton bookId={props.bookId} />
        </div>
      </div>
    </div>
  );
}

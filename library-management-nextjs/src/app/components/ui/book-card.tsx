"use client";
import React from "react";
import { Card, CardContent } from "./card";
import { Button } from "./button";
interface BookCardProps {
  title: string;
  author: string;
}
export function BookCard(props: BookCardProps) {
  return (
    <Card className="h-full">
      <CardContent className="p-4 flex flex-col justify-between h-full">
        <div>
          <h2 className="text-xl font-bold mb-2 md:text-2xl lg:text-3xl">
            {props.title}
          </h2>
          <p className="text-muted-foreground md:text-lg lg:text-xl">
            {props.author}
          </p>
        </div>
        <Button className="mt-4 md:mt-6 lg:mt-8">Borrow</Button>
      </CardContent>
    </Card>
  );
}

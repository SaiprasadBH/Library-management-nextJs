"use client";
import React, { useActionState, useEffect, useState } from "react";
import { Card, CardContent, CardFooter } from "./card";
import { Label } from "./label";
import { Input } from "./input";
import { Textarea } from "./textarea";
import { Button } from "./button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { registerUser } from "@/lib/actions";
import { Alert, AlertDescription } from "./alert";
import { AlertCircle } from "lucide-react";

export default function RegisterForm() {
  const router = useRouter();
  const initialState = { success: undefined, error: "" };
  const [state, formAction] = useActionState(registerUser, initialState);

  useEffect(() => {
    if (state.success) {
      router.push("/login");
    }
  }, [state.success, router]);

  return (
    <div className="min-h-screen bg-muted flex items-center justify-center py-12 px-6 lg:px-8">
      <div className="max-w-lg w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Register</h1>
          <p className="mt-2 text-muted-foreground">
            Create a new account to get started.
          </p>
        </div>
        <Card className="rounded-lg">
          <form action={formAction} className="space-y-6">
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    required
                    className="mt-1 block w-full"
                  />
                </div>
                <div>
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    name="age"
                    type="number"
                    placeholder="30"
                    required
                    className="mt-1 block w-full"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  className="mt-1 block w-full"
                />
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  name="address"
                  placeholder="123 Main St, Anytown USA"
                  required
                  className="mt-1 block w-full"
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="mt-1 block w-full"
                />
              </div>
            </CardContent>
            <CardFooter className="px-6 py-4 flex items-center justify-end">
              <Button type="submit" className="ml-auto">
                Register
              </Button>
            </CardFooter>
            {/* Reserved space for error message */}
            <div className="px-6">
              <div
                className={`min-h-[40px] ${state.error ? "block" : "hidden"}`}
              >
                {state.error && (
                  <Alert variant="destructive" className="overflow-hidden">
                    <div className="flex items-start">
                      <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                      <AlertDescription className="ml-2 text-sm max-w-full break-words">
                        {state.error}
                      </AlertDescription>
                    </div>
                  </Alert>
                )}
              </div>
            </div>
          </form>
        </Card>
        <div className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="underline hover:text-primary">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

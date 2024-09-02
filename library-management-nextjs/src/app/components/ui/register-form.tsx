"use client";
import React, { useActionState, useEffect, useState } from "react";
import { Card, CardContent, CardFooter } from "./card";
import { Label } from "./label";
import { Input } from "./input";
import { Textarea } from "./textarea";
import { Select } from "./select";
import { Button } from "./button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IMemberBase } from "@/lib/definitions";
import { MemberBaseSchema } from "@/lib/database/zod/member.schema";
import { ZodError } from "zod";
import { CreateUser, registerUser } from "@/lib/actions";
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
    <div className="mx-auto max-w-[500px] space-y-6 py-12 px-4 md:px-6 lg:px-0">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Register</h1>
        <p className="text-muted-foreground">
          Create a new account to get started.
        </p>
      </div>
      <Card>
        <form action={formAction}>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" placeholder="John Doe" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  name="age"
                  type="number"
                  placeholder="30"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                name="address"
                placeholder="123 Main St, Anytown USA"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <select name="role">
                <option value="user">user</option>
                <option value="admin">admin</option>
              </select>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="ml-auto">
              {"Register"}
            </Button>
            {state.error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{state.error}</AlertDescription>
              </Alert>
            )}
          </CardFooter>
        </form>
      </Card>
      <div className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="#" className="underline" prefetch={false}>
          Login
        </Link>
      </div>
      <div className="text-red-600"></div>
    </div>
  );
}

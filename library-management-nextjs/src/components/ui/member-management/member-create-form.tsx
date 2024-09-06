"use client";

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
import { createMember } from "@/lib/actions";

export default function MemberCreateForm() {
  const initialState = { success: false, error: undefined };

  const [createState, createFormAction] = useActionState(
    createMember,
    initialState
  );

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">
          Create New Member
        </CardTitle>
      </CardHeader>
      <form action={createFormAction}>
        <CardContent className="grid gap-4 sm:gap-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" required className="w-full" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                name="age"
                type="number"
                required
                className="w-full"
              />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" required className="w-full" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input id="address" name="address" required className="w-full" />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <select
                id="role"
                name="role"
                required
                className="w-full px-3 py-2 border rounded-md text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button type="submit" className="w-full sm:w-auto sm:min-w-[200px]">
            <PlusIcon className="mr-2 h-4 w-4" />
            Create Member
          </Button>
          {createState?.error && (
            <p className="text-sm text-red-500 text-center w-full">
              {createState.error}
            </p>
          )}
          {createState?.success && (
            <p className="text-sm text-green-500 text-center w-full">
              Member created successfully!
            </p>
          )}
        </CardFooter>
      </form>
    </Card>
  );
}

import React from "react";
import { Card, CardContent, CardFooter } from "./card";
import { Label } from "./label";
import { Input } from "./input";
import { Textarea } from "./textarea";
import { Select } from "./select";
import { Button } from "./button";
import Link from "next/link";

export default function Component() {
  return (
    <div className="mx-auto max-w-[500px] space-y-6 py-12 px-4 md:px-6 lg:px-0">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Register</h1>
        <p className="text-muted-foreground">
          Create a new account to get started.
        </p>
      </div>
      <Card>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            // Add your form submission logic here
          }}
        >
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="John Doe" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input id="age" type="number" placeholder="30" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                placeholder="123 Main St, Anytown USA"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select>
                <option value="">Select a role</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </Select>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="ml-auto">
              Register
            </Button>
          </CardFooter>
        </form>
      </Card>
      <div className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="#" className="underline" prefetch={false}>
          Login
        </Link>
      </div>
    </div>
  );
}

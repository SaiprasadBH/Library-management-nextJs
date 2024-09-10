"use client";

import { IMember, IMemberBase } from "@/lib/definitions";
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
import { SaveIcon } from "lucide-react";
import { useActionState } from "react";
import { updateMember } from "@/lib/actions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function MemberEditForm({ member }: { member: IMember }) {
  const initialState = { success: false, error: "" };
  const UpdateMemberWithId = updateMember.bind(null, member.id);

  const [updateState, updateFormAction] = useActionState(
    UpdateMemberWithId,
    initialState
  );

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Member Details
        </CardTitle>
      </CardHeader>
      <form action={updateFormAction}>
        <CardContent className="grid gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                defaultValue={member.name}
                className="border-0 px-0 shadow-none focus-visible:ring-0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                name="age"
                type="number"
                defaultValue={member.age}
                className="border-0 px-0 shadow-none focus-visible:ring-0"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              defaultValue={member.email}
              className="border-0 px-0 shadow-none focus-visible:ring-0"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              name="address"
              defaultValue={member.address}
              className="border-0 px-0 shadow-none focus-visible:ring-0"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              defaultValue={member.password}
              className="border-0 px-0 shadow-none focus-visible:ring-0"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" variant="outline" className="w-full">
            <SaveIcon className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </CardFooter>
      </form>
      {updateState?.error && (
        <p className="text-sm text-red-500 mt-2 px-6">{updateState.error}</p>
      )}
    </Card>
  );
}

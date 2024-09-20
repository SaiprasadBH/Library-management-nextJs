"use client";

import { IMember } from "@/lib/definitions";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SaveIcon, EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";
import { useActionState } from "react";
import { updateMember } from "@/lib/actions";

export default function MemberEditForm({ member }: { member: IMember }) {
  const initialState = { success: false, error: "" };
  const UpdateMemberWithId = updateMember.bind(null, member.id);

  const [updateState, updateFormAction] = useActionState(
    UpdateMemberWithId,
    initialState
  );

  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const handlePasswordToggle = () => setPasswordVisible(!isPasswordVisible);

  return (
    <form action={updateFormAction} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-gray-300">
            Name
          </Label>
          <Input
            id="name"
            name="name"
            defaultValue={member.name}
            className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-teal-400 focus:ring-teal-400"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="age" className="text-gray-300">
            Age
          </Label>
          <Input
            id="age"
            name="age"
            type="number"
            defaultValue={member.age}
            className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-teal-400 focus:ring-teal-400"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="address" className="text-gray-300">
          Address
        </Label>
        <Input
          id="address"
          name="address"
          defaultValue={member.address}
          className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-teal-400 focus:ring-teal-400"
        />
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password" className="text-gray-300">
            Password
          </Label>
          <Button
            type="button"
            onClick={handlePasswordToggle}
            variant="outline"
            size="sm"
            className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
          >
            {isPasswordVisible ? (
              <>
                <EyeOffIcon className="mr-2 h-4 w-4" />
                Hide
              </>
            ) : (
              <>
                <EyeIcon className="mr-2 h-4 w-4" />
                Change
              </>
            )}
          </Button>
        </div>
        {isPasswordVisible && (
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Enter new password"
            className="mt-2 bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-teal-400 focus:ring-teal-400"
          />
        )}
      </div>
      <div className="flex justify-end">
        <Button
          type="submit"
          size="sm"
          className="bg-gradient-to-r from-teal-400 to-cyan-300 text-gray-900 hover:from-teal-300 hover:to-cyan-200"
        >
          <SaveIcon className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>
      {updateState?.error && (
        <p className="text-sm text-red-400 mt-2">{updateState.error}</p>
      )}
    </form>
  );
}

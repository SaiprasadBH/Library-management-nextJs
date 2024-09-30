"use client";

import { useState, useActionState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { IProfessor } from "@/lib/definitions";
import { updateProfessor } from "@/lib/actions";
import { toast } from "@/components/hooks/use-toast";

export function EditProfessorModal({
  isOpen,
  onClose,
  professor,
  onSuccess,
}: {
  isOpen: boolean;
  onClose: () => void;
  professor: IProfessor;
  onSuccess: () => void;
}) {
  const [formData, setFormData] = useState({
    name: professor.name,
    department: professor.department || "",
    bio: professor.bio || "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  let state = { success: false, error: "" };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    state = await updateProfessor({
      id: professor.id,
      ...formData,
    });
    if (state.success) {
      toast({
        title: "Success",
        description: "Professor Updated Successfully",
        className: "bg-teal-400 text-gray-900",
      });
    } else if (state.error || !state.success) {
      toast({
        title: "Error",
        description: state.error,
        variant: "destructive",
      });
    }
    if (state.success) {
      onSuccess();
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-gray-800 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Edit Professor
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="bg-gray-700 text-white border-gray-600"
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              value={professor.email}
              readOnly
              className="bg-gray-700 text-white border-gray-600 opacity-50"
            />
          </div>
          <div>
            <Label htmlFor="department">Department</Label>
            <Input
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="bg-gray-700 text-white border-gray-600"
            />
          </div>
          <div>
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="bg-gray-700 text-white border-gray-600"
            />
          </div>
          <div>
            <Label htmlFor="calendlyLink">Calendly Link</Label>
            <Input
              id="calendlyLink"
              name="calendlyLink"
              value={professor.calendlyLink || ""}
              readOnly
              className="bg-gray-700 text-white border-gray-600 opacity-50"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-teal-400 to-cyan-300 hover:from-teal-500 hover:to-cyan-400 text-gray-900"
          >
            Update Professor
          </Button>
          {state.error && (
            <p className={state.error ? "text-red-500" : "text-green-500"}>
              {state.error}
            </p>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}

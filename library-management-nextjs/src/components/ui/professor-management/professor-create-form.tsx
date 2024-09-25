"use client";

import { useState } from "react";
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
import { UserPlus } from "lucide-react";
import { useActionState } from "react";
import { createProfessor } from "@/lib/actions";
import { motion } from "framer-motion";
import { Textarea } from "@/components/ui/textarea";

export default function ProfessorCreateForm() {
  const initialState = { success: false, error: undefined };
  const [createState, createFormAction] = useActionState(
    createProfessor,
    initialState
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    bio: "",
    calendlyLink: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900"
    >
      <Card className="w-full max-w-2xl mx-auto shadow-2xl rounded-2xl bg-gray-800/50 backdrop-blur-xl border border-teal-500/20">
        <CardHeader className="space-y-1 pb-8">
          <CardTitle className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-300">
            <UserPlus className="w-12 h-12 mx-auto mb-4" />
            Create New Professor
          </CardTitle>
        </CardHeader>
        <form action={createFormAction}>
          <CardContent className="grid gap-6 p-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-300">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300"
                  placeholder="Enter professor's name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300"
                  placeholder="Enter professor's email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="department" className="text-gray-300">
                  Department
                </Label>
                <Input
                  id="department"
                  name="department"
                  required
                  value={formData.department}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300"
                  placeholder="Enter professor's department"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="calendlyLink" className="text-gray-300">
                  Calendly Link
                </Label>
                <Input
                  id="calendlyLink"
                  name="calendlyLink"
                  required
                  value={formData.calendlyLink}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300"
                  placeholder="Enter Calendly link"
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="bio" className="text-gray-300">
                  Bio
                </Label>
                <Textarea
                  id="bio"
                  name="bio"
                  required
                  value={formData.bio}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300"
                  placeholder="Enter professor's bio"
                  rows={4}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 p-6">
            <Button
              type="submit"
              className="w-full sm:w-auto sm:min-w-[200px] bg-gradient-to-r from-teal-400 to-cyan-300 hover:from-teal-500 hover:to-cyan-400 text-gray-900 font-bold transition-all duration-300 transform hover:scale-105 rounded-lg"
            >
              Create Professor
            </Button>
            {createState?.error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-red-500 text-center w-full bg-red-500/10 p-2 rounded-lg"
              >
                {createState.error}
              </motion.p>
            )}
            {createState?.success && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-teal-400 text-center w-full bg-teal-500/10 p-2 rounded-lg"
              >
                Professor created successfully!
              </motion.p>
            )}
          </CardFooter>
        </form>
      </Card>
    </motion.div>
  );
}

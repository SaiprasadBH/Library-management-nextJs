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
import { PlusIcon, UserPlus } from "lucide-react";
import { useActionState } from "react";
import { createMember } from "@/lib/actions";
import { motion } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function MemberCreateForm() {
  const initialState = { success: false, error: undefined };
  const [createState, createFormAction] = useActionState(
    createMember,
    initialState
  );

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    address: "",
    password: "",
    role: "user",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRoleChange = (value: string) => {
    setFormData({
      ...formData,
      role: value,
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
            Create New Member
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
                  placeholder="Enter member's name"
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
                  required
                  value={formData.age}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300"
                  placeholder="Enter member's age"
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
                  placeholder="Enter member's email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address" className="text-gray-300">
                  Address
                </Label>
                <Input
                  id="address"
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300"
                  placeholder="Enter member's address"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-300">
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300"
                  placeholder="Enter member's password"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role" className="text-gray-300">
                  Role
                </Label>
                <Select
                  onValueChange={handleRoleChange}
                  defaultValue={formData.role}
                >
                  <SelectTrigger className="w-full bg-gray-700/50 border-gray-600 text-white focus:ring-teal-500 focus:border-teal-500 transition-all duration-300">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem
                      value="user"
                      className="text-white hover:bg-gray-700"
                    >
                      User
                    </SelectItem>
                    <SelectItem
                      value="admin"
                      className="text-white hover:bg-gray-700"
                    >
                      Admin
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 p-6">
            <Button
              type="submit"
              className="w-full sm:w-auto sm:min-w-[200px] bg-gradient-to-r from-teal-400 to-cyan-300 hover:from-teal-500 hover:to-cyan-400 text-gray-900 font-bold transition-all duration-300 transform hover:scale-105 rounded-lg"
            >
              Create Member
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
                Member created successfully!
              </motion.p>
            )}
          </CardFooter>
        </form>
      </Card>
    </motion.div>
  );
}

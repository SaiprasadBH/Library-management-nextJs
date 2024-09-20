"use client";
import React, { useActionState, useEffect } from "react";
import { Card, CardContent, CardFooter } from "./card";
import { Label } from "./label";
import { Input } from "./input";
import { Textarea } from "./textarea";
import { Button } from "./button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { registerUser } from "@/lib/actions";
import { Alert, AlertDescription } from "./alert";
import { AlertCircle, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 flex items-center justify-center py-12 px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-lg w-full space-y-8"
      >
        <div className="text-center">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-300">
            Join Granthalaya
          </h1>
          <p className="mt-2 text-gray-400">
            Create your account and start managing your library today.
          </p>
        </div>
        <Card className="rounded-2xl bg-gray-800/50 backdrop-blur-xl shadow-2xl border border-teal-500/20">
          <form action={formAction} className="space-y-6">
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="name" className="text-gray-300">
                    Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    required
                    className="mt-1 block w-full bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>
                <div>
                  <Label htmlFor="age" className="text-gray-300">
                    Age
                  </Label>
                  <Input
                    id="age"
                    name="age"
                    type="number"
                    placeholder="30"
                    required
                    className="mt-1 block w-full bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="email" className="text-gray-300">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  className="mt-1 block w-full bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
              <div>
                <Label htmlFor="address" className="text-gray-300">
                  Address
                </Label>
                <Textarea
                  id="address"
                  name="address"
                  placeholder="123 Main St, Anytown USA"
                  required
                  className="mt-1 block w-full bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
              <div>
                <Label htmlFor="password" className="text-gray-300">
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="mt-1 block w-full bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
            </CardContent>
            <CardFooter className="px-6 py-4">
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-teal-400 to-cyan-300 hover:from-teal-500 hover:to-cyan-400 text-gray-900 font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center"
              >
                Register
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </CardFooter>
            {/* Reserved space for error message */}
            <div className="px-6">
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{
                  opacity: state.error ? 1 : 0,
                  height: state.error ? "auto" : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                {state.error && (
                  <Alert
                    variant="destructive"
                    className="bg-red-900/50 border border-red-500 text-white"
                  >
                    <div className="flex items-start">
                      <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                      <AlertDescription className="ml-2 text-sm max-w-full break-words">
                        {state.error}
                      </AlertDescription>
                    </div>
                  </Alert>
                )}
              </motion.div>
            </div>
          </form>
        </Card>
        <div className="text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-teal-400 hover:text-teal-300 transition-colors"
          >
            Login
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

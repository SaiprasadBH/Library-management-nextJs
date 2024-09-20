"use client";
import React from "react";
import { useActionState } from "react";
import { Input } from "./input";
import { Button } from "./button";
import { Label } from "./label";
import { authenticate } from "@/lib/actions";
import { motion } from "framer-motion";
import { EyeIcon, EyeOffIcon } from "lucide-react";

const LoginForm = () => {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <motion.form
      action={formAction}
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.5 }}
    >
      <div>
        <Label htmlFor="email" className="text-sm font-medium text-gray-300">
          Email
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          className="mt-1 bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-teal-500 focus:border-teal-500"
          placeholder="you@example.com"
        />
      </div>
      <div>
        <Label htmlFor="password" className="text-sm font-medium text-gray-300">
          Password
        </Label>
        <div className="relative mt-1">
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            required
            className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-teal-500 focus:border-teal-500 pr-10"
            placeholder="••••••••"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center pr-3"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOffIcon className="h-5 w-5 text-gray-400" />
            ) : (
              <EyeIcon className="h-5 w-5 text-gray-400" />
            )}
          </button>
        </div>
      </div>
      <Button
        className="w-full bg-gradient-to-r from-teal-400 to-cyan-300 hover:from-teal-500 hover:to-cyan-400 text-gray-900 font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
        disabled={isPending}
      >
        {isPending ? "Logging in..." : "Login"}
      </Button>
      {errorMessage && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-red-500 mt-2"
        >
          {errorMessage}
        </motion.p>
      )}
    </motion.form>
  );
};

export default LoginForm;

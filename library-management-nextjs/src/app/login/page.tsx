import React from "react";
import Link from "next/link";
import LoginForm from "@/components/ui/login-form";
import GoogleLoginButton from "@/components/ui/google-loginButton";
import AnimatedLoginCard from "@/components/ui/animated-login-card";

const Login = () => {
  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 px-4 py-12 sm:px-6 lg:px-8">
      <AnimatedLoginCard>
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-300">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            Enter your credentials to access your account
          </p>
        </div>
        <LoginForm />
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-700" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-gray-800 px-2 text-gray-400">
              Or continue with
            </span>
          </div>
        </div>
        <GoogleLoginButton />
        <p className="text-center text-sm text-gray-400">
          Don&apos;t have an account?{" "}
          <Link
            className="font-medium text-teal-400 hover:text-teal-300 transition-colors"
            href="/register"
          >
            Sign up
          </Link>
        </p>
      </AnimatedLoginCard>
    </div>
  );
};

export default Login;

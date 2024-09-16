import React from "react";
import { signIn } from "@/auth";
import { Button } from "./button";
import { ChromeIcon } from "lucide-react";

export default function GoogleLoginButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google", { redirectTo: "/admin/books" });
      }}
    >
      <Button type="submit" variant="outline" className="w-full">
        <ChromeIcon className="mr-2 h-4 w-4" />
        Signin with Google
      </Button>
    </form>
  );
}

import { LogOut } from "lucide-react";
import { Button } from "./button";
import { signOut } from "@/auth";

export function LogoutButton({ className = "" }: { className?: string }) {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/login" });
      }}
    >
      <Button
        variant="secondary"
        size="sm"
        type="submit"
        className={`bg-gradient-to-r from-teal-400 to-cyan-300 text-gray-900 hover:from-teal-300 hover:to-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-teal-400 border-none rounded-full px-6 py-2 transition-all duration-300 ${className}`}
      >
        <LogOut className="h-4 w-4 mr-2 text-gray-900" />
        Logout
      </Button>
    </form>
  );
}

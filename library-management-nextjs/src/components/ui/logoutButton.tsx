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
        className={`bg-primary-foreground text-primary hover:bg-primary-foreground/90 border-none rounded-md px-4 py-2 ${className}`}
      >
        <LogOut className="h-4 w-4 mr-1" />
        Logout
      </Button>
    </form>
  );
}

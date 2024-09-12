import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { LogoutButton } from "@/components/ui/logoutButton";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <nav className="bg-primary text-primary-foreground p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            Granthalaya
          </Link>
          <div className="hidden md:flex items-center space-x-4">
            <NavLinks />
            <LogoutButton />
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col space-y-4 mt-4">
                <span className="text-lg font-semibold mb-2">User Menu</span>
                <NavLinks />
                <LogoutButton className="mt-auto" />
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
      <main className="flex-1 overflow-auto p-8">{children}</main>
    </div>
  );
}

function NavLinks() {
  return (
    <>
      <Link href="/user/books" className="hover:underline">
        Books
      </Link>
      <Link href="/user/my-books" className="hover:underline">
        My Books
      </Link>
      <Link href="/user/profile" className="hover:underline">
        My Profile
      </Link>
      <Link href="/user/my-requests" className="hover:underline">
        My Transactions
      </Link>
    </>
  );
}

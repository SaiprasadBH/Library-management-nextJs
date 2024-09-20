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
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 text-gray-100">
      {/* Navbar */}
      <nav className="bg-gray-900/80 backdrop-blur-md shadow-lg h-20 z-50 fixed top-0 w-full">
        <div className="flex justify-between items-center w-full h-full px-6">
          {/* Logo */}
          <Link
            href="/"
            className="text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-300"
          >
            Granthalaya
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <NavLinks />
            <LogoutButton />
          </div>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="md:hidden border-none hover:bg-teal-400/20 transition-all"
              >
                <Menu className="h-6 w-6 text-teal-400" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-gray-900 text-gray-100 p-6"
            >
              <nav className="flex flex-col space-y-6 mt-4">
                <span className="text-lg font-semibold mb-4 text-center">
                  User Menu
                </span>
                <NavLinks />
                <LogoutButton className="mt-auto" />
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-8 mt-20">{children}</main>
    </div>
  );
}

function NavLinks() {
  return (
    <>
      <Link
        href="/user/books"
        className="text-sm font-medium text-gray-300 hover:text-teal-400 transition-all"
      >
        Books
      </Link>
      <Link
        href="/user/my-books"
        className="text-sm font-medium text-gray-300 hover:text-teal-400 transition-all"
      >
        My Books
      </Link>
      <Link
        href="/user/profile"
        className="text-sm font-medium text-gray-300 hover:text-teal-400 transition-all"
      >
        My Profile
      </Link>
<<<<<<< HEAD
      <Link
        href="/user/my-requests"
        className="text-sm font-medium text-gray-300 hover:text-teal-400 transition-all"
      >
        My Transactions
      </Link>
=======
>>>>>>> c755e45 (refactored UI for user role)
    </>
  );
}

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
      {/* Increase the navbar height */}
      <nav className="bg-primary text-primary-foreground h-20 shadow-md">
        <div className="flex justify-between items-center w-full h-full">
          {/* Align Granthalaya to the leftmost side */}
          <Link
            href="/"
            className="text-2xl font-bold hover:opacity-90 transition-opacity pl-4"
          >
            Granthalaya
          </Link>
          {/* Desktop Links (aligned to the rightmost side) */}
          <div className="hidden md:flex items-center space-x-6 pr-4">
            <NavLinks />
            <LogoutButton />
          </div>
          {/* Mobile Menu Button */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="md:hidden border-0 hover:bg-primary-light transition-all"
              >
                <Menu className="h-6 w-6 text-primary-foreground" />
              </Button>
            </SheetTrigger>
            {/* Mobile Menu Content */}
            <SheetContent
              side="right"
              className="bg-primary-foreground text-primary p-6"
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
      <main className="flex-1 overflow-auto p-8 bg-background">{children}</main>
    </div>
  );
}

function NavLinks() {
  return (
    <>
      <Link
        href="/user/books"
        className="hover:underline transition-colors hover:text-primary-accent"
      >
        Books
      </Link>
      <Link
        href="/user/my-books"
        className="hover:underline transition-colors hover:text-primary-accent"
      >
        My Books
      </Link>
      <Link
        href="/user/profile"
        className="hover:underline transition-colors hover:text-primary-accent"
      >
        My Profile
      </Link>
      <Link
        href="/user/my-requests"
        className="hover:underline transition-colors hover:text-primary-accent"
      >
        My Transactions
      </Link>
    </>
  );
}

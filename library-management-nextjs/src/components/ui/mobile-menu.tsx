"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { LogoutButton } from "@/components/ui/logoutButton";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function MobileMenu({
  children,
}: {
  children: React.ReactNode,
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden text-teal-400 hover:text-teal-300 transition-colors"
      >
        {children}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween" }}
            className="fixed inset-y-0 right-0 w-64 bg-gray-900 shadow-lg z-40 md:hidden"
          >
            <div className="flex justify-end p-4">
              <button
                onClick={() => setIsOpen(false)}
                className="text-teal-400 hover:text-teal-300 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            <nav className="flex flex-col space-y-6 p-6">
              <NavLink href="/user/books">Books</NavLink>
              <NavLink href="/user/my-books">My Books</NavLink>
              <NavLink href="/user/profile">My Profile</NavLink>
              <NavLink href="/user/my-requests">My Transactions</NavLink>
              <LogoutButton className="mt-auto" />
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function NavLink({
  href,
  children,
}: {
  href: string,
  children: React.ReactNode,
}) {
  return (
    <Link
      href={href}
      className="text-gray-300 hover:text-teal-400 transition-colors"
    >
      {children}
    </Link>
  );
}

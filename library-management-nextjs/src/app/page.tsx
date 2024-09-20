"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Book, Users, ChartBar, ArrowRight } from "lucide-react";

export default function Component() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 text-gray-100">
      {/* Header */}
      <header
        className={`fixed w-full px-6 h-20 flex items-center justify-between transition-all duration-300 z-50 ${
          scrolled
            ? "bg-gray-900/80 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }`}
      >
        <Link
          href="#"
          className="text-3xl font-light tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-300"
          prefetch={false}
        >
          Granthalaya
        </Link>
        <nav className="flex gap-6">
          <Link
            href="/login"
            className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
            prefetch={false}
          >
            Login
          </Link>
          <Link
            href="/register"
            className="text-sm font-medium px-4 py-2 bg-gradient-to-r from-teal-400 to-cyan-300 text-gray-900 rounded-full hover:from-teal-300 hover:to-cyan-200 transition-all duration-300"
            prefetch={false}
          >
            Register
          </Link>
        </nav>
      </header>

      {/* Main Section */}
      <main className="flex-1 flex flex-col">
        <section className="min-h-screen flex items-center justify-center bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center bg-no-repeat">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-slate-800/90 to-gray-900/90"></div>
          <div className="container max-w-5xl mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center space-y-8"
            >
              <h1 className="text-5xl md:text-7xl font-bold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-300">
                Elevate Your Library <br /> with Granthalaya
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-light">
                Experience the future of library management. Streamline
                operations, enhance user experiences, and unlock the full
                potential of your collection.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                <Link
                  href="/register"
                  className="inline-flex h-14 items-center justify-center rounded-full bg-gradient-to-r from-teal-400 to-cyan-300 px-8 text-lg font-medium text-gray-900 shadow-lg hover:from-teal-300 hover:to-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-teal-400 transition-all duration-300"
                  prefetch={false}
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  href="/login"
                  className="inline-flex h-14 items-center justify-center rounded-full border border-teal-400 px-8 text-lg font-medium text-teal-400 shadow-lg hover:bg-teal-400/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-teal-400 transition-all duration-300"
                  prefetch={false}
                >
                  Login
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 md:py-32 bg-gray-900">
          <div className="container max-w-6xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center space-y-12"
            >
              <h2 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-300">
                Powerful Features
              </h2>
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-light">
                Discover the tools that will revolutionize your library
                management experience.
              </p>
              <div className="grid md:grid-cols-3 gap-12 pt-12">
                {[
                  {
                    icon: Book,
                    title: "Smart Inventory",
                    description: "AI-powered book tracking and organization.",
                  },
                  {
                    icon: Users,
                    title: "User Management",
                    description: "Seamless borrower profiles and history.",
                  },
                  {
                    icon: ChartBar,
                    title: "Analytics Dashboard",
                    description: "Real-time insights and trend analysis.",
                  },
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="p-6 rounded-2xl bg-gradient-to-br from-slate-800 to-gray-900 shadow-xl border border-teal-400/20"
                  >
                    <feature.icon className="h-12 w-12 mb-4 text-teal-400" />
                    <h3 className="text-2xl font-semibold text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-300">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 bg-gradient-to-t from-gray-900 to-slate-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-300">
                Granthalaya
              </h3>
              <p className="text-gray-300">
                Empowering libraries, one book at a time.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/login"
                    className="text-gray-300 hover:text-teal-400 transition-colors"
                    prefetch={false}
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    href="/register"
                    className="text-gray-300 hover:text-teal-400 transition-colors"
                    prefetch={false}
                  >
                    Register
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-gray-300 hover:text-teal-400 transition-colors"
                    prefetch={false}
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-300 hover:text-teal-400 transition-colors"
                    prefetch={false}
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center">
            <p className="text-sm text-gray-400">
              &copy; 2024 Granthalaya. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

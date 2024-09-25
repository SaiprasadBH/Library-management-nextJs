"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Book, Users, ChartBar, ArrowRight } from "lucide-react";
import LocaleSwitcher from "@/components/ui/LocaleSwitcher";
import { useTranslations } from "next-intl";

export default function Component() {
  const t = useTranslations(); // useTranslation hook for localization
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
          {t("header.title")}
        </Link>
        <nav className="flex items-center gap-6">
          <LocaleSwitcher />
          <Link
            href="/login"
            className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
            prefetch={false}
          >
            {t("header.login")}
          </Link>
          <Link
            href="/register"
            className="text-sm font-medium px-4 py-2 bg-gradient-to-r from-teal-400 to-cyan-300 text-gray-900 rounded-full hover:from-teal-300 hover:to-cyan-200 transition-all duration-300"
            prefetch={false}
          >
            {t("header.register")}
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
              <h1 className="text-5xl md:text-7xl font-bold leading-relaxed text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-300">
                {t("main.hero.title")}
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-light">
                {t("main.hero.description")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                <Link
                  href="/register"
                  className="inline-flex h-14 items-center justify-center rounded-full bg-gradient-to-r from-teal-400 to-cyan-300 px-8 text-lg font-medium text-gray-900 shadow-lg hover:from-teal-300 hover:to-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-teal-400 transition-all duration-300"
                  prefetch={false}
                >
                  {t("main.hero.getStarted")}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  href="/login"
                  className="inline-flex h-14 items-center justify-center rounded-full border border-teal-400 px-8 text-lg font-medium text-teal-400 shadow-lg hover:bg-teal-400/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-teal-400 transition-all duration-300"
                  prefetch={false}
                >
                  {t("main.hero.login")}
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
                {t("main.features.title")}
              </h2>
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-light">
                {t("main.features.description")}
              </p>
              <div className="grid md:grid-cols-3 gap-12 pt-12">
                {[
                  {
                    icon: Book,
                    title: t("main.features.feature1.title"),
                    description: t("main.features.feature1.description"),
                  },
                  {
                    icon: Users,
                    title: t("main.features.feature2.title"),
                    description: t("main.features.feature2.description"),
                  },
                  {
                    icon: ChartBar,
                    title: t("main.features.feature3.title"),
                    description: t("main.features.feature3.description"),
                  },
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="bg-slate-800/70 shadow-md rounded-lg p-8 space-y-4"
                  >
                    <feature.icon className="h-12 w-12 text-teal-400" />
                    <h3 className="text-xl font-semibold text-gray-100">
                      {feature.title}
                    </h3>
                    <p className="text-gray-300">{feature.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 bg-gray-900">
        <div className="container max-w-6xl mx-auto px-4">
          <p className="text-gray-400 text-center text-sm">
            {t("footer.description")}
          </p>
        </div>
      </footer>
    </div>
  );
}

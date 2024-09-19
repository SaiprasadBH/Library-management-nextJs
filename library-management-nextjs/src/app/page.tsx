import Link from "next/link";

export default function Component() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <header className="px-4 lg:px-6 h-16 flex items-center justify-between bg-white shadow">
        <Link
          href="#"
          className="text-lg font-extrabold tracking-tight text-gray-900"
          prefetch={false}
        >
          Granthalaya
        </Link>
        <nav className="flex gap-4 sm:gap-6"></nav>
      </header>

      {/* Main Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center bg-gray-50">
        <section className="py-12 md:py-24 lg:py-32">
          <div className="container max-w-3xl mx-auto px-4">
            <div className="space-y-6">
              <h1 className="text-4xl font-extrabold leading-tight text-gray-900 sm:text-6xl">
                Manage Your Library with Granthalaya
              </h1>
              <p className="text-lg md:text-xl text-gray-600 max-w-xl mx-auto">
                Granthalaya is a powerful library management app designed to
                streamline your private library operations. Easily track book
                inventory, manage borrowers, and more.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row justify-center">
                <Link
                  href="/login"
                  className="inline-flex h-12 items-center justify-center rounded-md bg-indigo-600 px-8 text-sm font-medium text-white shadow hover:bg-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-600"
                  prefetch={false}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="inline-flex h-12 items-center justify-center rounded-md border border-gray-300 bg-white px-8 text-sm font-medium text-gray-700 shadow hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-300"
                  prefetch={false}
                >
                  Register
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="w-full py-12 md:py-24 bg-gray-100 flex items-center justify-center">
          <div className="container max-w-3xl mx-auto px-4">
            <div className="text-center space-y-6">
              <h2 className="text-3xl font-extrabold sm:text-5xl text-gray-900">
                About Granthalaya
              </h2>
              <p className="text-lg md:text-xl text-gray-600">
                Granthalaya is a comprehensive library management app designed
                to streamline the operations of private libraries. Our mission
                is to empower library owners with the tools they need to
                efficiently manage their collections, track borrowers, and
                generate insightful reports.
              </p>
              <ul className="grid gap-6 text-left max-w-xl mx-auto">
                <li>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-gray-900">
                      Inventory Management
                    </h3>
                    <p className="text-gray-600">
                      Easily track and manage your library&apos;s book
                      collection.
                    </p>
                  </div>
                </li>
                <li>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-gray-900">
                      Borrower Tracking
                    </h3>
                    <p className="text-gray-600">
                      Keep tabs on who has borrowed what and when.
                    </p>
                  </div>
                </li>
                <li>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-gray-900">
                      Reporting
                    </h3>
                    <p className="text-gray-600">
                      Generate detailed reports to gain insights into your
                      library&apos;s operations.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full items-center justify-center bg-white border-t">
        <p className="text-xs text-gray-500">
          &copy; 2024 Granthalaya. All rights reserved.
        </p>
        <nav className="flex gap-4 sm:gap-6">
          <Link
            href="#"
            className="text-xs text-gray-500 hover:underline"
            prefetch={false}
          >
            Terms of Service
          </Link>
          <Link
            href="#"
            className="text-xs text-gray-500 hover:underline"
            prefetch={false}
          >
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}

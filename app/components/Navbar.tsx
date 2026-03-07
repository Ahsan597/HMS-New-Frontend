"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-blue-600 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <Link href="/">
        <h1 className="text-xl font-bold cursor-pointer">
          MediTech+
        </h1>
      </Link>

      <div className="relative flex items-center space-x-6">
        <Link href="/" className="hover:underline">
          Home
        </Link>

        <Link href="/services" className="hover:underline">
          Services
        </Link>

        <div className="relative group">
          <Link
            href="/login"
            className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100 font-medium"
          >
            Login
          </Link>

          <div
            className="
              absolute right-0 mt-3 w-64
              bg-white text-gray-800 text-sm
              p-3 rounded-lg shadow-lg
              animate-pulse
            "
          >
            <p className="text-center font-medium">
              Login to patient dashboard for appointments and other services
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
}
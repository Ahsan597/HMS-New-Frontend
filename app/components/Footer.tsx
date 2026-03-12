"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Footer() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const user = localStorage.getItem('user');
    setIsLoggedIn(!!user);
  }, []);

  // During SSR or before client knows, show full footer
  const showFullFooter = !isClient || !isLoggedIn;

  return (
    <footer className="bg-blue-600 text-white mt-20">
      {/* Show this section only when NOT logged in */}
      {showFullFooter && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo & About */}
          <div>
            <h1 className="text-2xl font-bold mb-3">MediTech+</h1>
            <p className="text-gray-200 text-sm leading-relaxed">
              MediTech+ is a digital hospital management platform designed to simplify healthcare services, reduce waiting times, and improve patient experience.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Quick Links</h2>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:underline">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:underline">
                  Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Contact Us</h2>
            <p className="text-gray-200 text-sm">123 Health Street, City Name</p>
            <p className="text-gray-200 text-sm">Phone: +123 456 7890</p>
            <p className="text-gray-200 text-sm">Email: info@meditechplus.com</p>

            {/* Social Icons (Placeholders) */}
            <div className="flex space-x-4 mt-4">
              <a href="#" className="hover:text-gray-300">FB</a>
              <a href="#" className="hover:text-gray-300">TW</a>
              <a href="#" className="hover:text-gray-300">LI</a>
            </div>
          </div>
        </div>
      )}

      {/* Bottom bar - ALWAYS visible for everyone */}
      <div className="bg-blue-700 text-gray-300 text-sm text-center py-4">
        &copy; {new Date().getFullYear()} MediTech+. All rights reserved.
      </div>
    </footer>
  );
}
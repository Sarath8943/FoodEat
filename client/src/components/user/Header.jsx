import React, { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-800 shadow-xl border-b border-gray-700">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 sm:h-20 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tighter">
              <span className="text-amber-400">FOOD</span>
              <span className="text-white">EAT</span>
            </span>
          </Link>

          {/* Desktop Buttons */}
          <div className="hidden sm:flex items-center gap-4">
            <Link
              to="/login"
              className="rounded-md bg-gray-700 px-3 sm:px-4 py-2 text-sm md:text-base font-medium text-white hover:bg-gray-600 transition-all"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="rounded-md bg-amber-500 px-3 sm:px-4 py-2 text-sm md:text-base font-medium text-gray-900 hover:bg-amber-400 transition-all"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-300 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-all"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <XMarkIcon className="block w-6 h-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="block w-6 h-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="sm:hidden px-2 pb-3 pt-2 space-y-1 border-t border-gray-700">
          <Link
            to="/login"
            className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
            onClick={() => setMobileMenuOpen(false)}
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="block rounded-md px-3 py-2 text-base font-medium text-gray-900 bg-amber-500 hover:bg-amber-400"
            onClick={() => setMobileMenuOpen(false)}
          >
            Sign Up
          </Link>
        </div>
      )}
    </nav>
  );
}

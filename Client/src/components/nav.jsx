import React, { useState, useEffect } from "react";
import { Menu, X, Heart } from "lucide-react";

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("Home");
  const [scrolled, setScrolled] = useState(false);

  const handleAuthClick = (mode) => {
    console.log(`Navigate to auth with mode: ${mode}`);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = ["Home", "Products", "Categories", "About", "Contact"];

  return (
    <nav
      className={`fixed top-2 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white dark:bg-gray-900 shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 shadow">
              <Heart className="text-white w-6 h-6" />
            </div>
            <div>
              <span
                className={`text-xl font-bold ${
                  scrolled ? "text-gray-900 dark:text-white" : "text-white"
                }`}
              >
                MediCare
              </span>
              <div className="text-xs text-green-600 dark:text-green-400 font-medium">
                Health Solutions
              </div>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => setActiveItem(item)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition duration-200 ${
                  activeItem === item
                    ? "bg-green-500 text-white shadow"
                    : scrolled
                    ? "text-gray-700 dark:text-gray-300 hover:text-green-600"
                    : "text-white hover:text-green-400"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Auth + Menu */}
          <div className="flex items-center gap-2">
            {/* Auth Buttons */}
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={() => handleAuthClick("signin")}
                className="px-4 py-2 text-sm font-semibold border border-green-600 text-green-600 dark:text-green-400 bg-white dark:bg-gray-800 rounded-md hover:bg-green-50 dark:hover:bg-gray-700 transition"
              >
                Sign In
              </button>
              <button
                onClick={() => handleAuthClick("signup")}
                className="px-4 py-2 text-sm font-semibold bg-green-600 text-white rounded-md hover:bg-green-700 transition"
              >
                Sign Up
              </button>
            </div>

            {/* Mobile Toggle */}
            <button
              className={`md:hidden p-2 rounded-lg transition ${
                scrolled ? "text-gray-600 dark:text-gray-300" : "text-white"
              } hover:bg-green-50 dark:hover:bg-gray-800`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          isMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="mx-4 mt-2 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-green-100 dark:border-gray-700">
          <div className="p-4 space-y-3">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => {
                  setActiveItem(item);
                  setIsMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-2 rounded-md text-base font-medium transition ${
                  activeItem === item
                    ? "bg-green-600 text-white shadow"
                    : "text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-gray-800"
                }`}
              >
                {item}
              </button>
            ))}

            {/* Mobile Auth */}
            <div className="pt-4 border-t border-green-100 dark:border-gray-700 space-y-2">
              <button
                onClick={() => {
                  handleAuthClick("signin");
                  setIsMenuOpen(false);
                }}
                className="w-full px-4 py-2 text-base font-semibold border border-green-600 text-green-600 dark:text-green-400 bg-white dark:bg-gray-800 rounded-md hover:bg-green-50 dark:hover:bg-gray-700 transition"
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  handleAuthClick("signup");
                  setIsMenuOpen(false);
                }}
                className="w-full px-4 py-2 text-base font-semibold bg-green-600 text-white rounded-md hover:bg-green-700 transition"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;

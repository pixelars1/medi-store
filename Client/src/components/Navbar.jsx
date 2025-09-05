/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useContext, useRef } from "react";
import {
  Menu,
  X,
  Heart,
  User,
  LogOut,
  Settings,
  CircleUserRound,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/firebase";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { user, setUser } = useContext(AppContext);
  
  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser); // user stays even after refresh
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);
  const navItems = [
    "Home",
    "Products",
    "Categories",
    "About",
    "Contact",
    "Cart",
  ];

  // ✅ Navigate to Auth page
  const handleAuthClick = (mode) => {
    navigate(`/auth?mode=${mode}`);
  };
  // ✅ Set active nav item based on URL
  useEffect(() => {
    const path = location.pathname.split("/")[1] || "home";
    const capitalized = path.charAt(0).toUpperCase() + path.slice(1);
    if (navItems.includes(capitalized)) {
      setActiveItem(capitalized);
    }
  }, [location.pathname]);

  // ✅ Change navbar style on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  // ✅ Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle Logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  return (
    <nav
      className={`fixed ${
        isMenuOpen ? "pb-8" : "pb-0"
      } pb-2 pt-1 w-full z-50 transition-all duration-300 ${
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
                onClick={() => {
                  setActiveItem(item);
                  navigate(
                    `/${
                      item.toLowerCase() === "home" ? "" : item.toLowerCase()
                    }`
                  );
                }}
                className={`px-3 py-2 cursor-pointer rounded-md text-sm font-medium transition duration-200 ${
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

          {/* Auth + Profile + Menu */}
          <div className="flex items-center gap-3 relative">
            {/* If user is logged in */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1 rounded-lg cursor-pointer dark:hover:bg-gray-800 transition"
                >
                  <img
                    src={
                      user.photoURL ||
                      "data:image/jpeg;base64,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"
                    }
                    alt="profile"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span
                    className={`hidden sm:block font-medium ${
                      scrolled ? "text-gray-800 dark:text-white" : "text-white"
                    }`}
                  >
                    {user.displayName}
                  </span>
                </button>

                {/* Dropdown */}
                {dropdownOpen && (
                  <div
                    ref={dropdownRef}
                    className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
                  >
                    <button
                      onClick={() => {
                        navigate("/profile");
                        setDropdownOpen(false);
                      }}
                      className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-gray-800"
                    >
                      <User size={16} /> Your Profile
                    </button>
                    <button
                      onClick={() => {
                        navigate("/settings");
                        setDropdownOpen(false);
                      }}
                      className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-gray-800"
                    >
                      <Settings size={16} /> Settings
                    </button>
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-gray-800"
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              // If no user → Show Login/Register
              <div className="hidden sm:flex items-center gap-2">
                <button
                  onClick={() => handleAuthClick("signin")}
                  className="px-4 cursor-pointer py-2 text-sm font-semibold border border-green-600 text-green-600 dark:text-green-400 bg-white dark:bg-gray-800 rounded-4xl hover:bg-green-50 dark:hover:bg-gray-700 transition"
                >
                  Login / Register
                </button>
              </div>
            )}

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
          <div className="p-4 space-y-4">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => {
                  setActiveItem(item);
                  setIsMenuOpen(false);
                  navigate(
                    `/${
                      item.toLowerCase() === "home" ? "" : item.toLowerCase()
                    }`
                  );
                }}
                className={`w-full cursor-pointer text-left px-4 py-2 rounded-md text-base font-medium transition ${
                  activeItem === item
                    ? "bg-green-600 text-white shadow"
                    : "text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-gray-800"
                }`}
              >
                {item}
              </button>
            ))}

            {/* Mobile Auth / Profile */}
            <div className="pt-4 border-t border-green-100 dark:border-gray-700 space-y-2">
              {user ? (
                <div className="relative" ref={dropdownRef}>
                  {/* Profile button */}
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2 px-3 py-1 rounded-lg hover:bg-green-50 dark:hover:bg-gray-800 transition"
                  >
                    {user.profile ? (
                      <img
                        src={user.profile}
                        alt="profile"
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <User className="w-8 h-8 text-green-600 dark:text-green-400" />
                    )}

                    <span
                      className={`hidden sm:block font-medium truncate max-w-[120px] ${
                        scrolled
                          ? "text-gray-800 dark:text-white"
                          : "text-white"
                      }`}
                    >
                      {user.name || user.email}
                    </span>
                  </button>

                  {/* Dropdown */}
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                      <button
                        onClick={() => {
                          navigate("/profile");
                          setDropdownOpen(false);
                        }}
                        className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-gray-800"
                      >
                        <User size={16} /> Your Profile
                      </button>
                      <button
                        onClick={() => {
                          navigate("/settings");
                          setDropdownOpen(false);
                        }}
                        className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-gray-800"
                      >
                        <Settings size={16} /> Settings
                      </button>
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-gray-800"
                      >
                        <LogOut size={16} /> Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => {
                    handleAuthClick("signin");
                    setIsMenuOpen(false);
                  }}
                  className="w-full px-4 py-2 text-base cursor-pointer font-semibold border border-green-600 text-green-600 dark:text-green-400 bg-white dark:bg-gray-800 rounded-md hover:bg-green-50 dark:hover:bg-gray-700 transition"
                >
                  Login / Register
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

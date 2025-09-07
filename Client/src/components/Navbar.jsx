/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useContext, useRef } from "react";
import {
  Menu,
  X,
  Heart,
  User,
  LogOut,
  Settings,
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

  const { user, setUser, darkMode } = useContext(AppContext);

  // ✅ Listen to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) setUser(currentUser);
      else setUser(null);
    });
    return () => unsubscribe();
  }, []);

  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);
  const navItems = ["Home", "Products", "Categories", "About", "Contact", "Cart"];

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

  // ✅ Handle Logout
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
      className={`fixed ${isMenuOpen ? "pb-8" : "pb-0"} pb-2 pt-1 w-full z-50 transition-all duration-300 ${
        scrolled
          ? darkMode
            ? "bg-gray-900 text-white shadow-lg"
            : "bg-white text-gray-900 shadow-lg"
          : darkMode
          ? "bg-transparent text-white"
          : "bg-transparent text-gray-900"
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
                  scrolled ? (darkMode ? "text-white" : "text-gray-900") : "text-gray-900"
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
                  navigate(item.toLowerCase() === "home" ? "/" : `/${item.toLowerCase()}`);
                }}
                className={`px-3 py-2 cursor-pointer rounded-md text-sm font-medium transition duration-200 ${
                  activeItem === item
                    ? "bg-green-500 text-white shadow"
                    : scrolled
                    ? darkMode
                      ? "text-gray-300 hover:text-green-400"
                      : "text-gray-700 hover:text-green-600"
                    : "text-gray-900 hover:text-green-400"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Auth + Profile + Menu */}
          <div className="flex items-center gap-3 relative">
            {user ? (
              <div className="relative">
                {/* Profile button */} 
     <button
  onClick={() => setDropdownOpen(!dropdownOpen)}
  className={`flex items-center gap-2 px-3 py-1 rounded-lg transition-all duration-200
    ${scrolled 
      ? (darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900")
      : "bg-transparent text-gray-900"}
  `}
>
  {user.profile ? (
    <img
      src={user.profile}
      alt="profile"
      className="w-9 h-9 rounded-full object-cover border border-gray-300 dark:border-gray-600 shadow-sm"
    />
  ) : (
    <User className="w-9 h-9 text-green-600 dark:text-green-400" />
  )}

  <span
    className={`hidden sm:block font-semibold truncate max-w-[140px] ${
      scrolled
        ? (darkMode ? "text-white" : "text-gray-800")
        : "text-gray-900"
    }`}
  >
    {user.name || user.email}
  </span>
</button>



                {/* Dropdown */}
                {dropdownOpen && (
                  <div
                    ref={dropdownRef}
                    className={`absolute right-0 mt-2 w-44 rounded-lg shadow-lg border ${
                      darkMode
                        ? "bg-gray-900 border-gray-700"
                        : "bg-white border-gray-200"
                    }`}
                  >
                    <button
                      onClick={() => {
                        navigate("/profile");
                        setDropdownOpen(false);
                      }}
                      className="flex w-full items-center gap-2 px-4 py-2 text-sm hover:bg-green-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                    >
                      <User size={16} /> Your Profile
                    </button>
                    <button
                      onClick={() => {
                        navigate("/settings");
                        setDropdownOpen(false);
                      }}
                      className="flex w-full items-center gap-2 px-4 py-2 text-sm hover:bg-green-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
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
              <div className="hidden sm:flex items-center gap-2">
                <button
                  onClick={() => handleAuthClick("signin")}
                  className={`px-4 py-2 text-sm font-semibold border rounded-4xl transition ${
                    darkMode
                      ? "border-green-400 text-green-400 bg-gray-800 hover:bg-gray-700"
                      : "border-green-600 text-green-600 bg-white hover:bg-green-50"
                  }`}
                >
                  Login / Register
                </button>
              </div>
            )}

            {/* Mobile Toggle */}
            <button
              className={`md:hidden p-2 rounded-lg transition ${
                scrolled
                  ? darkMode
                    ? "text-gray-300"
                    : "text-gray-600"
                  : "text-white"
              } hover:bg-green-50 dark:hover:bg-gray-800`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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
        <div
          className={`mx-4 mt-2 rounded-lg shadow-lg border ${
            darkMode
              ? "bg-gray-900 border-gray-700"
              : "bg-white border-green-100"
          }`}
        >
          <div className="p-4 space-y-4">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => {
                  setActiveItem(item);
                  setIsMenuOpen(false);
                  navigate(item.toLowerCase() === "home" ? "/" : `/${item.toLowerCase()}`);
                }}
                className={`w-full cursor-pointer text-left px-4 py-2 rounded-md text-base font-medium transition ${
                  activeItem === item
                    ? "bg-green-600 text-white shadow"
                    : darkMode
                    ? "text-gray-300 hover:text-green-400 hover:bg-gray-800"
                    : "text-gray-700 hover:text-green-600 hover:bg-green-50"
                }`}
              >
                {item}
              </button>
            ))}

            {/* Mobile Auth/Profile */}
            <div className="pt-4 border-t border-green-100 dark:border-gray-700 space-y-2">
              {user ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2 px-3 py-1 rounded-lg hover:bg-green-50 dark:hover:bg-gray-800 transition"
                  >
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt="profile"
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <User className="w-8 h-8 text-green-600 dark:text-green-400" />
                    )}

                    <span
                      className={`hidden sm:block font-medium truncate max-w-[120px] ${
                        scrolled ? (darkMode ? "text-white" : "text-gray-800") : "text-white"
                      }`}
                    >
                      {user.displayName || user.email}
                    </span>
                  </button>

                  {dropdownOpen && (
                    <div
                      className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg border ${
                        darkMode
                          ? "bg-gray-900 border-gray-700"
                          : "bg-white border-gray-200"
                      }`}
                    >
                      <button
                        onClick={() => {
                          navigate("/profile");
                          setDropdownOpen(false);
                        }}
                        className="flex w-full items-center gap-2 px-4 py-2 text-sm hover:bg-green-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                      >
                        <User size={16} /> Your Profile
                      </button>
                      <button
                        onClick={() => {
                          navigate("/settings");
                          setDropdownOpen(false);
                        }}
                        className="flex w-full items-center gap-2 px-4 py-2 text-sm hover:bg-green-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
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
                  className={`w-full px-4 py-2 text-base font-semibold border rounded-md transition ${
                    darkMode
                      ? "border-green-400 text-green-400 bg-gray-800 hover:bg-gray-700"
                      : "border-green-600 text-green-600 bg-white hover:bg-green-50"
                  }`}
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

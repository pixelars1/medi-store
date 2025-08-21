import React, { useContext, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./Pages/Home.jsx";
import { Moon, Sun } from "lucide-react";
import Footer from "./components/Footer.jsx";
import ProductDetails from "./Pages/ProductDetails.jsx";
import { AppContext } from "./Context/AppContext.jsx";
import Auth from "./Pages/Auth.jsx";
import Products from "./Pages/Products.jsx";
import Categories from "./Pages/Categories.jsx";
import About from "./Pages/About.jsx";
import Contact from "./Pages/Contact.jsx";
import Navbar from "./components/Navbar.jsx";
import CartPage from "./Pages/CartPage.jsx";
import FloatingCartBtn from "./components/FloatingCartBtn.jsx";
import CheckoutPage from "./Pages/CheckoutPage.jsx";
import ProductDetailsPage from "./Pages/ProductDetailsPage.jsx";
import { startProgress, stopProgress } from "./progressBar.js";

function ProgressHandler() {
  const location = useLocation();

  useEffect(() => {
    startProgress();
    const timer = setTimeout(() => {
      stopProgress();
    }, 500); // small delay for smooth effect
    return () => clearTimeout(timer);
  }, [location]);

  return null;
}
function App() {
  const { darkMode, setDarkMode, setCartCount } = useContext(AppContext);
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
  };
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(storedCart.length);
  }, [setCartCount]);
  return (
    <div
      className={`min-h-screen w-full relative transition-colors duration-300 ${
        darkMode
          ? "bg-gray-900"
          : "bg-gradient-to-br from-green-50 via-white to-emerald-50"
      }`}
    >
      <ProgressHandler />
      {/* Dark Mode Toggle - Fixed positioning with higher z-index */}
      <div className="fixed bottom-4 right-4 z-[9999]">
        <button
          onClick={toggleDarkMode}
          className={`p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${
            darkMode
              ? "bg-gray-800 text-yellow-400 hover:bg-gray-700 border border-gray-600"
              : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
          }`}
        >
          {darkMode ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </button>
      </div>
      {/* Navigation - Pass dark mode props */}
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      {/* Routes */}
      <Routes>
        <Route
          path="/"
          element={
            <Home
              darkMode={darkMode}
              setDarkMode={setDarkMode}
              toggleDarkMode={toggleDarkMode}
            />
          }
        />
        {/* Add more routes as needed */}
        <Route path="/product-details" element={<ProductDetails />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/products" darkMode={darkMode} element={<Products />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/product/:productName" element={<ProductDetailsPage />} />

        {/* Add more routes as needed */}
      </Routes>
      <Footer />
      {/* Floating Cart Button */}
      <FloatingCartBtn />
    </div>
  );
}

export default App;

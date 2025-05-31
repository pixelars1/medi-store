import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home.jsx";
import Nav from "./components/Nav.jsx";
import { Moon, Sun } from "lucide-react";
import Footer from "./components/Footer.jsx";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div
      className={`min-h-screen w-full relative transition-colors duration-300 ${
        darkMode
          ? "bg-gray-900"
          : "bg-gradient-to-br from-green-50 via-white to-emerald-50"
      }`}
    >
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
      <Nav darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

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
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

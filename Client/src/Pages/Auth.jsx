import React, { useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

const Auth = () => {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode"); // 'signin' or 'signup'
  const { darkMode } = useContext(AppContext);
  const [isSignup, setIsSignup] = useState(mode === "signup");

  return (
    <div
      className={`min-h-screen flex items-center justify-center transition-colors ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <div className="flex flex-col md:flex-row w-full max-w-6xl shadow-2xl rounded-lg overflow-hidden">
        {/* Left - Auth Form */}
        <div
          className={`w-full md:w-1/2 px-10 py-14 ${
            darkMode ? "bg-gray-800" : "bg-gray-50"
          }`}
        >
          <h2 className="text-3xl font-bold text-center mb-8">
            {isSignup ? "Create Account" : "Welcome Back"}
          </h2>

          <form className="space-y-4">
            {isSignup && (
              <input
                type="text"
                placeholder="Full Name"
                className="w-full px-4 py-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            )}
            <input
              type="email"
              placeholder="Email address"
              className="w-full px-4 py-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            {isSignup && (
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full px-4 py-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            )}

            <button
              type="submit"
              className="w-full py-2 mt-4 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
              {isSignup ? "Sign Up" : "Sign In"}
            </button>
          </form>

          <div className="text-center text-sm mt-6">
            {isSignup ? "Already have an account?" : "Don't have an account?"}
            <button
              className="ml-1 text-green-500 hover:underline"
              onClick={() => setIsSignup((prev) => !prev)}
            >
              {isSignup ? "Sign In" : "Sign Up"}
            </button>
          </div>
        </div>

        {/* Right - Image Panel */}
        <div className="w-full md:w-1/2 relative hidden md:block">
          <img
            src="/mnt/data/Screenshot 2025-05-31 225633.png"
            alt="MediCare visual"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-30"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-6">
            <h1 className="text-2xl font-semibold mb-2">MediCare</h1>
            <p className="text-sm max-w-md">
              Discover the power of personalized health insights and seamless
              tracking with MediCare.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;

import React, { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

const Auth = () => {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode"); // 'signin' or 'signup'
  const { darkMode } = useContext(AppContext);
  const [isSignup, setIsSignup] = useState(mode === "signup");
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <div
      className={`min-h-screen flex items-center justify-center transition-colors bg-[url('/public/auth-banner.jpg')]`}
    >
      {/* Left - Auth Form */}
      <div
        className={`w-[22rem] md:w-[25rem] px-4 py-8 rounded-md ${
          darkMode ? "bg-gray-800 text-white" : "bg-gray-50 text-black"
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
    </div>
  );
};

export default Auth;

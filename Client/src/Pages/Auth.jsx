import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

// ✅ Firebase
import { auth, googleProvider } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";

// Icons
import { Mail, Lock, User } from "lucide-react";

const Auth = () => {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode"); // 'signin' or 'signup'
  const { darkMode } = useContext(AppContext);
  const [isSignup, setIsSignup] = useState(mode === "signup");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const {setUser}=useContext(AppContext)

  // 🔹 Signup
  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (password !== confirmPassword) {
      setError("Passwords do not match ❌");
      return;
    }
    setLoading(true);
    try {
     const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await updateProfile(user, { displayName: name });
      navigate("/");
      // Save user to DB
      await fetch("medi-store-cpl1.vercel.app/api/users/save-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: user.displayName,
          profile: user.photoURL,
          email: user.email,
        }),
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
     const result = await signInWithEmailAndPassword(auth, email, password);
      // Save user to DB
      await fetch("medi-store-cpl1.vercel.app/api/users/save-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: result.user.displayName,
          profile: result.user.photoURL,
          email: result.user.email,
        }),
      });
      setSuccess("✅ Login successful!");
      navigate(-1);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Google Login
  const handleGoogleLogin = async () => {
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setSuccess(`✅ Welcome, ${result.user.displayName}`);
      setUser(result.user);
      navigate(-1);
      // Save user to DB
      await fetch("medi-store-cpl1.vercel.app/api/users/save-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: result.user.displayName,
          profile: result.user.photoURL,
          email: result.user.email,
        }),
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: "url('/auth-banner.jpg')" }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

      {/* Auth Card */}
      <div
        className={`relative w-[22rem] md:w-[26rem] px-6 py-8 rounded-2xl shadow-xl border
        ${darkMode ? "bg-gray-900/85 text-white" : "bg-white/95 text-black"}`}
      >
        <h2 className="text-3xl font-bold text-center mb-6">
          {isSignup ? "Create Account" : "Welcome Back"}
        </h2>

        {/* Error / Success */}
        {error && <p className="text-red-500 text-center text-sm mb-3">{error}</p>}
        {success && (
          <p className="text-green-500 text-center text-sm mb-3">{success}</p>
        )}

        {/* Auth Form */}
        <form
          className="space-y-4"
          onSubmit={isSignup ? handleSignup : handleLogin}
        >
          {isSignup && (
            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Full Name"
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 dark:bg-gray-800 dark:border-gray-700"
              />
            </div>
          )}

          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 dark:bg-gray-800 dark:border-gray-700"
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 dark:bg-gray-800 dark:border-gray-700"
              required
            />
          </div>

          {isSignup && (
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 dark:bg-gray-800 dark:border-gray-700"
                required
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 mt-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold shadow hover:scale-[1.02] transition disabled:opacity-60"
          >
            {loading ? "Processing..." : isSignup ? "Sign Up" : "Sign In"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-5">
          <hr className="flex-1 border-gray-400" />
          <span className="px-3 text-gray-400 text-sm">OR</span>
          <hr className="flex-1 border-gray-400" />
        </div>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full py-2 flex items-center justify-center gap-2 border rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition disabled:opacity-60"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          <span>{loading ? "Please wait..." : "Continue with Google"}</span>
        </button>

        {/* Toggle Mode */}
        <div className="text-center text-sm mt-6">
          {isSignup ? "Already have an account?" : "Don't have an account?"}
          <button
            className="ml-1 text-green-500 font-medium hover:underline"
            onClick={() => {
              setIsSignup((prev) => !prev);
              setError("");
              setSuccess("");
            }}
          >
            {isSignup ? "Sign In" : "Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;

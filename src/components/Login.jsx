import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const formIsValid = email && password;

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const token = await userCredential.user.getIdToken();
      localStorage.setItem("authToken", token);
      setError("");
      navigate("/mailbox");
    } catch (err) {
      if (err.code === "auth/user-not-found") {
        setError("Email does not exist. Please create an account.");
      } else if (err.code === "auth/wrong-password") {
        setError("Incorrect password. Try again.");
      } else {
        setError("Something went wrong. Try again later.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col items-center justify-center px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-gray-800 p-8 rounded-xl shadow-xl"
      >
        <h2 className="text-2xl font-semibold text-white mb-6 text-center">
          Login to Your Account
        </h2>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-300 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
        </div>

        <div className="mb-4 relative">
          <label htmlFor="password" className="block text-gray-300 mb-1">
            Password
          </label>
          <input
            type={showPassword ? "password" : "text"}
            id="password"
            value={password}
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 pr-10 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-[50%] -translate-y-1/2 text-gray-300 hover:text-white cursor-pointer"
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </span>
        </div>

        {error && (
          <p className="text-red-500 text-sm text-center font-medium mb-2">
            {error}
          </p>
        )}

        {error === "Email does not exist. Please create an account." && (
          <p className="text-center mb-2">
            <button
              type="button"
              onClick={() => navigate("/signup")}
              className="text-cyan-400 hover:underline text-sm"
            >
              Create an Account
            </button>
          </p>
        )}

        <button
          type="submit"
          disabled={!formIsValid}
          className={`w-full py-2 mt-2 rounded text-white font-semibold transition duration-200 ${
            formIsValid
              ? "bg-cyan-500 hover:bg-cyan-600"
              : "bg-gray-600 cursor-not-allowed"
          }`}
        >
          Login
        </button>

        {/* Don't have an account */}
        {!error && (
          <p className="text-center mt-4 text-sm text-gray-300">
            Don’t have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/signup")}
              className="text-cyan-400 hover:underline"
            >
              Create one
            </button>
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;

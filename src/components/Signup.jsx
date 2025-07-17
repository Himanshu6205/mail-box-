import React, { useState } from "react";

import { FaEye, FaEyeSlash } from "react-icons/fa";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");
    console.log("Sign up successful");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const formIsValid = email && password && confirmPassword;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-gray-800 p-8 rounded-xl shadow-xl"
      >
        <h2 className="text-2xl font-semibold text-white mb-6 text-center">
          Create an Account
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
            Create Password
          </label>
          <input
            type={showPassword ? "password" : "text"}
            id="password"
            value={password}
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 pr-10"
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-[70%] -translate-y-1/2 text-gray-300 hover:text-white cursor-pointer"
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </span>
        </div>

        <div className="mb-4">
          <label htmlFor="confirmpassword" className="block text-gray-300 mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmpassword"
            value={confirmPassword}
            placeholder="Confirm your password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
        </div>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center font-medium">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={!formIsValid}
          className={`w-full py-2 rounded text-white font-semibold transition duration-200 ${
            formIsValid
              ? "bg-cyan-500 hover:bg-cyan-600"
              : "bg-gray-600 cursor-not-allowed"
          }`}
        >
          Create Account
        </button>
      </form>
    </div>
  );
};

export default Signup;

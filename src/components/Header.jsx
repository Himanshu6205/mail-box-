// src/components/Header.jsx
import React, { useState } from "react";
import { auth } from "../firebase/firebase";
import { FaUserCircle } from "react-icons/fa";
import Logout from "./Logout";

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const user = auth.currentUser;

  return (
    <header className="w-full bg-gray-800 text-white p-4 flex justify-between items-center shadow">
      <h1 className="text-xl font-semibold">Mail Champ 📬</h1>

      <div className="relative">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="flex items-center gap-2 focus:outline-none"
        >
          <FaUserCircle size={24} />
        </button>

        {showDropdown && (
          <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded shadow-lg py-2 z-10">
            <div className="px-4 py-2 text-sm border-b border-gray-200">
              {user?.email || "No email"}
            </div>
            <div className="px-4 py-2">
              <Logout />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

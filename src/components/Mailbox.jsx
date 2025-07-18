// src/pages/Mailbox.jsx
import React from "react";

const Mailbox = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-3xl bg-gray-800 p-8 rounded-xl shadow-xl">
        <p className="text-gray-300">
          Welcome to your inbox. Your emails will appear here.
        </p>
      </div>
    </div>
  );
};

export default Mailbox;

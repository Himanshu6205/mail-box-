// src/pages/Mailbox.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const Mailbox = () => {
  const navigate = useNavigate();

  const goToCompose = () => {
    navigate("/composemail");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-start px-4 py-6">
      <div className="w-full max-w-3xl bg-gray-800 p-8 rounded-xl shadow-xl mb-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Your Inbox</h1>
          <button
            onClick={goToCompose}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            + Create Mail
          </button>
        </div>
        <p className="text-gray-300">
          Welcome to your inbox. Your emails will appear here.
        </p>
      </div>
    </div>
  );
};

export default Mailbox;

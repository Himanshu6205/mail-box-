// src/components/ProtectedLayout.jsx
import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const ProtectedLayout = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <Outlet />
    </div>
  );
};

export default ProtectedLayout;

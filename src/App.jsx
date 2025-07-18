import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Mailbox from "./components/Mailbox";
import ProtectedLayout from "./components/ProtectedLayout";

const App = () => {
  const isAuthenticated = !!localStorage.getItem("authToken");

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes with Layout */}
        {isAuthenticated && (
          <Route path="/" element={<ProtectedLayout />}>
            <Route path="mailbox" element={<Mailbox />} />
            {/* You can add more protected routes here */}
          </Route>
        )}

        {/* Redirect if not authenticated */}
        {!isAuthenticated && (
          <Route path="/mailbox" element={<Navigate to="/" replace />} />
        )}
      </Routes>
    </Router>
  );
};

export default App;

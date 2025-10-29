import React from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const logout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("role");
    window.location.href = "/";
  };

  return (
    <div className="page">
      <h1>📊 Dashboard</h1>
      <p>Welcome to your dashboard.</p>
      <nav>
        <Link to="/profile">Profile</Link> | <Link to="/admin">Admin Panel</Link>
      </nav>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

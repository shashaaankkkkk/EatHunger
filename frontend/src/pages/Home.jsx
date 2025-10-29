import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="page">
      <h1>🏠 Home Page</h1>
      <p>Welcome to the React Router demo app.</p>
      <Link to="/login">Go to Login</Link>
    </div>
  );
}

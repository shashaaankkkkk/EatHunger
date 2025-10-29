import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="page">
      <h1>I m really soryy my baby</h1>
      <p>i love u always</p>
      <Link to="/login">Go to Login</Link>
    </div>
  );
}

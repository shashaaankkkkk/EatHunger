import React, { useEffect, useState } from "react";
import api from "../api/api";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    api.get("/profile/")
      .then((res) => setUser(res.data))
      .catch((err) => console.error("Error:", err));
  }, []);

  return (
    <div className="page">
      <h1>👤 Profile</h1>
      {user ? (
        <pre>{JSON.stringify(user, null, 2)}</pre>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

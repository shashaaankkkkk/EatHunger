import React, { Suspense } from "react";
import AppRouter from "./router/AppRouter"; // adjust path if needed

export default function App() {
  return (
    <Suspense fallback={<div>Loading App…</div>}>
      <AppRouter />
    </Suspense>
  );
}

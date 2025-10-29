import React, { lazy, Suspense } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import {jwtDecode} from "jwt-decode";

/* -------------------------
   Lazy-loaded pages
   ------------------------- */
const Home = lazy(() => import("../pages/Home"));
const Login = lazy(() => import("../pages/Login"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Profile = lazy(() => import("../pages/Profile"));
const AdminPanel = lazy(() => import("../pages/admin/AdminPanel"));
const NotFound = lazy(() => import("../pages/NotFound"));

/* -------------------------
   Auth Service (JWT-based)
   ------------------------- */
export const authService = {
  isAuthenticated: () => {
    const token = localStorage.getItem("access_token");
    if (!token) return false;

    try {
      const { exp } = jwtDecode(token);
      return Date.now() < exp * 1000; // validate expiry
    } catch {
      return false;
    }
  },
  getUserRole: () => localStorage.getItem("role"),
};

/* -------------------------
   Protected Route Wrapper
   ------------------------- */
function ProtectedRoute({ children, redirectTo = "/login" }) {
  const location = useLocation();
  return authService.isAuthenticated() ? (
    children
  ) : (
    <Navigate to={redirectTo} replace state={{ from: location }} />
  );
}

/* -------------------------
   Role-based Route Wrapper
   ------------------------- */
function RoleRoute({ children, allowed = [], redirectTo = "/" }) {
  const role = authService.getUserRole();
  if (!authService.isAuthenticated()) return <Navigate to="/login" replace />;
  return allowed.includes(role) ? children : <Navigate to={redirectTo} replace />;
}

/* -------------------------
   Main Router Component
   ------------------------- */
export default function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading…</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <RoleRoute allowed={["admin"]} redirectTo="/dashboard">
                <AdminPanel />
              </RoleRoute>
            }
          />

          {/* catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

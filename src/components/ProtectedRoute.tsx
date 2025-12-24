import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const PUBLIC_PATHS = [
  "/",
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/inside/invite",
];

export function ProtectedRoute({ children }: { children: JSX.Element }) {
  const auth = useAuth() as any;
  const location = useLocation();

  // Dev-Bypass (optional)
  if (import.meta.env.VITE_DEV_BYPASS_AUTH === "true") {
    return children;
  }

  // Falls dein AuthContext ein Loading kennt
  if (auth?.loading) {
    return null;
  }

  // Öffentliche Routen erlauben
  const isPublic = PUBLIC_PATHS.some((path) =>
    location.pathname.startsWith(path)
  );

  if (isPublic) {
    return children;
  }

  // Kein Login → redirect
  if (!auth || !auth.user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

import { Navigate, useLocation } from "react-router-dom";

export function ProtectedRoute({ children }: { children: JSX.Element }) {
  const location = useLocation();

  // ✅ INVITE-LINKS SIND ÖFFENTLICH (kein Login nötig)
  if (location.pathname.startsWith("/inside/invite")) {
    return children;
  }

  // 🔥 DEV-BYPASS: IMMER REIN AUF LOCALHOST
  if (import.meta.env.VITE_DEV_BYPASS_AUTH === "true") {
    return children;
  }

  // ❌ Produktion / ohne Login → Login-Seite
  return <Navigate to="/login" replace />;
}

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";

export default function DashboardRedirect() {
  const { profile, loading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;

    if (!profile) {
      navigate("/login");
      return;
    }

    // 🔥 Routing-Logik
    if (profile.plan_business_active && profile.plan_inside_active) {
      navigate("/dashboard/overview");
      return;
    }

    if (profile.plan_business_active) {
      navigate("/dashboard/business");
      return;
    }

    if (profile.plan_inside_active) {
      navigate("/dashboard/inside");
      return;
    }

    // Fallback
    navigate("/dashboard/account");
  }, [loading, profile, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center text-lg">
      Dashboard wird geladen…
    </div>
  );
}

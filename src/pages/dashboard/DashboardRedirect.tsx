import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";

export default function DashboardRedirect() {
  const { profile, loading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!profile) return;

    // 🔥 Priorität: Business → Inside → Partner
    if (profile.plan_business_active) {
      navigate("/dashboard/business", { replace: true });
      return;
    }

    if (profile.plan_inside_active) {
      navigate("/dashboard/inside", { replace: true });
      return;
    }

    if (profile.plan_partner_active) {
      navigate("/dashboard/partner", { replace: true });
      return;
    }

if (profile.plan_affiliate_active) {
  navigate("/dashboard/affiliate", { replace: true });
  return;
}

    // Fallback
    navigate("/dashboard/account", { replace: true });
  }, [loading, profile, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center text-lg">
      Dashboard wird geladen…
    </div>
  );
}

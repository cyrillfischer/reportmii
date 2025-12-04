// src/pages/NewAnalysis.tsx
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { supabase } from "../supabase/supabaseClient";
import { useAuth } from "../contexts/AuthContext";

export function NewAnalysis() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [params] = useSearchParams();

  useEffect(() => {
    const createAnalysis = async () => {
      if (!user) {
        console.warn("❌ Kein User vorhanden – Abbruch");
        return;
      }

      console.log("🟣 START CREATE ANALYSIS");
      console.log("USER FROM AUTH:", user);

      const type = params.get("type") || "business";

      const payload = {
        user_id: user.id,      // ← WICHTIG!
        type,
        status: "draft",
        company_name: null,
        industry: null,
        country: null,
      };

      console.log("INSERT PAYLOAD:", payload);

      const { data, error } = await supabase
        .from("analyses")
        .insert([payload])
        .select()
        .single();

      if (error || !data) {
        console.error("❌ INSERT-FEHLER:", error);
        alert("Analyse konnte nicht erstellt werden");
        return;
      }

      console.log("✅ ANALYSE ERSTELLT:", data);

      navigate(`/analysis/configure?type=${type}&id=${data.id}`, {
        replace: true,
      });
    };

    createAnalysis();
  }, [navigate, params, user]);

  return (
    <DashboardLayout>
      <div className="text-white p-10 text-lg">Analyse wird erstellt…</div>
    </DashboardLayout>
  );
}

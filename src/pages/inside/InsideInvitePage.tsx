// src/pages/inside/InsideInvitePage.tsx
import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

const PARTICIPANT_KEY = "reportmii_inside_participant_id";

type Status = "loading" | "error" | "ok" | "limit";

export default function InsideInvitePage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const token = params.get("token");

  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      return;
    }

    const handleInvite = async () => {
      try {
        // 🔁 Bereits teilgenommen? → direkt weiterleiten
        const existingParticipant = localStorage.getItem(PARTICIPANT_KEY);
        if (existingParticipant) {
          navigate(`/analysis/questionnaire/${existingParticipant}`);
          return;
        }

        // 1️⃣ Analyse holen
        const { data: analysis, error } = await supabase
          .from("inside_analyses")
          .select("id, max_participants")
          .eq("invite_token", token)
          .single();

        if (error || !analysis) {
          setStatus("error");
          return;
        }

        // 2️⃣ Teilnehmer zählen
        const { count } = await supabase
          .from("inside_participants")
          .select("*", { count: "exact", head: true })
          .eq("analysis_id", analysis.id);

        if ((count ?? 0) >= analysis.max_participants) {
          setStatus("limit");
          return;
        }

        // 3️⃣ Teilnehmer anlegen (anonym)
        const { data: participant, error: insertError } = await supabase
          .from("inside_participants")
          .insert({
            analysis_id: analysis.id,
          })
          .select("id")
          .single();

        if (insertError || !participant) {
          setStatus("error");
          return;
        }

        // 4️⃣ Teilnahme lokal speichern (Mehrfachteilnahme verhindern)
        localStorage.setItem(PARTICIPANT_KEY, participant.id);

        // 5️⃣ Weiterleitung zum Fragebogen
        navigate(`/analysis/questionnaire/${participant.id}`);
      } catch {
        setStatus("error");
      }
    };

    handleInvite();
  }, [token, navigate]);

  // ================= UI =================

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Einladung wird geprüft…
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Ungültiger oder abgelaufener Einladungslink
      </div>
    );
  }

  if (status === "limit") {
    return (
      <div className="min-h-screen flex items-center justify-center text-orange-500">
        Teilnehmerlimit bereits erreicht
      </div>
    );
  }

  return null;
}

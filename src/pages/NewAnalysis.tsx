import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase/supabaseClient";

export default function NewAnalysis() {
  const navigate = useNavigate();

  useEffect(() => {
    const run = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        navigate("/login", { replace: true });
        return;
      }

      const { data, error } = await supabase
        .from("analyses")
        .insert({})
        .select("id")
        .single();

      if (error || !data) {
        console.error(error);
        return;
      }

      navigate(`/analysis/${data.id}/step/1`, { replace: true });
    };

    run();
  }, [navigate]);

  return null;
}

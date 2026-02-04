import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export default function CheckoutAnalysis() {
  const [params] = useSearchParams();
  const addons = Number(params.get("addons") || 0);

  useEffect(() => {
    const startCheckout = async () => {
      const res = await fetch(
        "https://bthbjcnsdllmpyowfupg.supabase.co/functions/v1/quick-handler",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({
            analysisId: "test-123",
            addons,
          }),
        }
      );

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error("Keine Stripe-URL erhalten", data);
      }
    };

    if (addons > 0) {
      startCheckout();
    }
  }, [addons]);

  return (
    <div style={{ padding: 40 }}>
      <h1>Weiterleitung zu Stripe…</h1>
      <p>Bitte einen Moment Geduld.</p>
    </div>
  );
}

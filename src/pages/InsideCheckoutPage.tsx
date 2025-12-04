// src/pages/InsideCheckoutPage.tsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { detectRegion } from "../constants/detectRegion";
import { Header } from "../components/Header";

const PRICE_MAP = {
  "25": { EU: 1297, CH: 1297, INT: 1497 },
  "50": { EU: 1997, CH: 1997, INT: 2197 },
  "100": { EU: 2997, CH: 2997, INT: 3297 },
};

export default function InsideCheckoutPage() {
  const region = detectRegion();
  const [email, setEmail] = useState("");
  const [teamSize, setTeamSize] = useState("50");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // URL Parameter lesen
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const param = params.get("teamSize");

    if (param && ["25", "50", "100"].includes(param)) {
      setTeamSize(param);
    }
  }, []);

  const price = PRICE_MAP[teamSize][region];
  const currency = region === "INT" ? "$" : "€";

  // CHECKOUT
  const handleCheckout = async () => {
    try {
      setLoading(true);
      setErrorMsg("");

      const res = await fetch(
        "https://bthbjcnsdllmpyowfupg.supabase.co/functions/v1/stripe-checkout",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            product: "inside",
            teamSize,   // ⭐ WICHTIG: neuer Parameter!
            email,
            region,
          }),
        }
      );

      const data = await res.json();

      if (!data?.url) {
        setErrorMsg("Fehler beim Starten des Bezahlvorgangs.");
        setLoading(false);
        return;
      }

      window.location.href = data.url;
    } catch (err) {
      console.error(err);
      setErrorMsg("Unerwarteter Fehler. Bitte versuche es erneut.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">

      {/* ================================ */}
      {/* 🖤 HEADER + HERO SECTION */}
      {/* ================================ */}
      <div className="bg-[#1b1f23] text-white">
        <Header />

        <section className="pt-40 pb-24 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-semibold mb-6 text-white"
          >
            Inside.mii Analyse
          </motion.h1>

          <p className="text-white/80 mt-4 max-w-2xl mx-auto leading-relaxed text-lg">
            Wähle die Teamgröße und starte deine anonyme Mitarbeitendenanalyse.
          </p>
        </section>
      </div>

      {/* ================================ */}
      {/* ⭐ CHECKOUT CONTENT */}
      {/* ================================ */}
      <section className="py-28">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 px-6 items-start">

          {/* ================= LEFT CONTENT ================= */}
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold mb-10 text-gray-900">
              Das erhältst du mit Inside.mii
            </h2>

            <div className="space-y-5 text-lg text-gray-700">
              {[
                "Anonyme Mitarbeitendenbefragung",
                "Auswertung mit priorisierten Handlungsempfehlungen",
                "PDF-Report mit klaren Visualisierungen",
                "Preisabhängig nach Teamgröße",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle className="text-[#7eb6b8] w-6 h-6 mt-1" />
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ================= RIGHT CHECKOUT CARD ================= */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white border border-gray-200 rounded-3xl p-10 text-center shadow-xl"
          >
            <p className="text-gray-500 mb-1">Inside.mii Analyse</p>

            <h2 className="text-6xl font-bold text-gray-900 mb-8">
              {price}.– {currency}
            </h2>

            {/* ================= TEAM SIZE SELECTOR ================= */}
            <div className="space-y-3 mb-8">
              {["25", "50", "100"].map((size) => (
                <div
                  key={size}
                  onClick={() => setTeamSize(size)}
                  className={`
                    border px-5 py-4 rounded-xl cursor-pointer transition-all text-left
                    ${
                      teamSize === size
                        ? "border-[#7eb6b8] bg-[#dff7f5]"
                        : "border-gray-300 hover:bg-gray-100"
                    }
                  `}
                >
                  <p className="font-semibold">{size} Mitarbeitende</p>
                  <p className="text-gray-500 text-sm">Teamgröße auswählen</p>
                </div>
              ))}
            </div>

            {/* ================= EMAIL ================= */}
            <input
              type="email"
              placeholder="E-Mail-Adresse"
              className="
                w-full px-5 py-3 mb-6 rounded-xl border border-gray-300 
                focus:ring-2 focus:ring-[#7eb6b8] outline-none
              "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {/* FEHLER */}
            {errorMsg && <p className="text-red-500 mb-4">{errorMsg}</p>}

            {/* ================= BUTTON ================= */}
            <button
              onClick={handleCheckout}
              disabled={loading}
              className="
                w-full bg-[#7eb6b8] text-black font-semibold py-4 rounded-full text-lg
                hover:bg-black hover:text-white transition-all disabled:opacity-50
              "
            >
              {loading ? "Wird verarbeitet…" : "Jetzt starten →"}
            </button>

            <p className="text-gray-500 text-sm mt-4">
              Sicherer Bezahlvorgang (Stripe)
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

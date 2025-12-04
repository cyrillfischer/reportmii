// src/pages/PartnerCheckoutPage.tsx
import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { detectRegion } from "../constants/detectRegion";
import { Header } from "../components/Header";

const PARTNER_PRICES = {
  EU: 1164,
  CH: 1164,
  INT: 1264,
};

export default function PartnerCheckoutPage() {
  const region = detectRegion();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const price = PARTNER_PRICES[region];
  const currency = region === "INT" ? "$" : "€";

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
            product: "partner",
            priceId: `partner_${region}`,
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

      {/* =============================== */}
      {/* 🖤 SCHWARZER HERO-BEREICH */}
      {/* =============================== */}
      <div className="bg-[#1b1f23] text-white">
        <Header />

        <section className="pt-40 pb-24 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-semibold mb-6 text-white"
          >
            Partner.mii Jahreslizenz
          </motion.h1>

          <p className="text-white/80 mt-4 max-w-2xl mx-auto leading-relaxed text-lg">
            Starte dein eigenes Analyse-Branding mit Reportmii – vollautomatisch,
            skalierbar und mit extrem hoher Marge.
          </p>
        </section>
      </div>

      {/* =============================== */}
      {/* ⭐ CHECKOUT CONTENT */}
      {/* =============================== */}
      <section className="py-28">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 px-6 items-start">

          {/* ================= LEFT CONTENT ================= */}
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold mb-10 text-gray-900">
              Das ist in der Partner-Lizenz enthalten
            </h2>

            <div className="space-y-5 text-lg text-gray-700">
              {[
                "Unbegrenzte Business.mii Analysen für deine Kunden",
                "White-Label Branding (Logo, Farben, Name)",
                "Zugang zu deinem Partner-Dashboard",
                "Eigene Templates & PDF-Reports",
                "Inside.mii Add-ons optional aktivierbar",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle className="text-[#7eb6b8] w-6 h-6 mt-1" />
                  <p>{item}</p>
                </div>
              ))}
            </div>

            <p className="mt-8 text-gray-600 text-sm">
              Jahreslizenz · sofortige Freischaltung nach Zahlung
            </p>
          </div>

          {/* ================= RIGHT CHECKOUT CARD ================= */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white border border-gray-200 rounded-3xl p-10 text-center shadow-xl"
          >
            <p className="text-gray-500 mb-1">Partner.mii Jahreslizenz</p>

            <h2 className="text-6xl font-bold text-gray-900 mb-3">
              {price}.– {currency}
            </h2>

            <p className="text-gray-600 mb-8 text-sm">
              {region === "INT"
                ? "≈ $105 pro Monat"
                : "≈ 97 € pro Monat"}
            </p>

            {/* EMAIL */}
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

            {/* ERROR */}
            {errorMsg && <p className="text-red-500 mb-4">{errorMsg}</p>}

            {/* BUTTON */}
            <button
              onClick={handleCheckout}
              disabled={loading}
              className="
                w-full bg-[#7eb6b8] text-black font-semibold py-4 rounded-full text-lg
                hover:bg-black hover:text-white transition-all disabled:opacity-50
              "
            >
              {loading ? "Wird verarbeitet…" : "Jetzt Partnerzugang starten →"}
            </button>

            <p className="text-gray-500 text-sm mt-4">
              Sicherer Bezahlvorgang (Stripe)
            </p>
          </motion.div>
        </div>
      </section>

      {/* =============================== */}
      {/* 📊 STATS SECTION */}
      {/* =============================== */}
      <section className="py-20 bg-[#dff7f5] text-center border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">

          <div>
            <p className="text-5xl font-bold text-[#1b1f23] mb-2">120+</p>
            <p className="text-gray-700 text-lg">Aktive Partner</p>
          </div>

          <div>
            <p className="text-5xl font-bold text-[#1b1f23] mb-2">3’500+</p>
            <p className="text-gray-700 text-lg">Erstellte Analysen</p>
          </div>

          <div>
            <p className="text-5xl font-bold text-[#1b1f23] mb-2">97%</p>
            <p className="text-gray-700 text-lg">Zufriedenheit</p>
          </div>

        </div>
      </section>
    </div>
  );
}

// src/pages/BusinessCheckoutPage.tsx

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { detectRegion } from "../constants/detectRegion";
import { Header } from "../components/Header";

const BUSINESS_PRICES = {
  EU: 497,
  CH: 497,
  INT: 547,
};

export default function BusinessCheckoutPage() {
  const region = detectRegion();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const price = BUSINESS_PRICES[region];
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
            product: "business",
            region,
            email,
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">

      {/* ============================ */}
      {/* 🖤 HEADER + Black Hero */}
      {/* ============================ */}
      <div className="bg-[#1b1f23] text-white">
        <Header />

        <section className="pt-40 pb-24 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl md:text-6xl font-semibold mb-6 text-white"
          >
            Business.mii Analyse
          </motion.h1>

          <p className="text-white/80 max-w-2xl mx-auto leading-relaxed text-lg">
            Starte deine Analyse – sofort nach der Zahlung erhältst du deinen Zugang
            und alle Unterlagen.
          </p>
        </section>
      </div>

      {/* ============================ */}
      {/* ⭐ CHECKOUT CONTENT */}
      {/* ============================ */}
      <section className="py-28">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 px-6 items-center">

          {/* LEFT COLUMN */}
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold mb-10 text-gray-900">
              Das erhältst du mit Business.mii
            </h2>

            {/* FEATURE LIST */}
            <div className="space-y-5 text-lg text-gray-700">

              <div className="flex items-start gap-3">
                <CheckCircle className="text-[#7eb6b8] w-6 h-6 mt-1" />
                <p>Detaillierte Analyse deiner aktuellen Unternehmenssituation</p>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="text-[#7eb6b8] w-6 h-6 mt-1" />
                <p>Klare Handlungsempfehlungen & priorisierte Verbesserungsfelder</p>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="text-[#7eb6b8] w-6 h-6 mt-1" />
                <p>Ausführlicher PDF-Report inklusive aller Grafiken & Insights</p>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="text-[#7eb6b8] w-6 h-6 mt-1" />
                <p>Sofortiger Zugang nach erfolgreicher Bezahlung</p>
              </div>

            </div>
          </div>

          {/* RIGHT COLUMN — Checkout Card */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white border border-gray-200 rounded-3xl p-10 text-center shadow-xl"
          >
            <p className="text-gray-500 mb-1">Business.mii Analyse</p>

            <h2 className="text-6xl font-bold text-gray-900 mb-8">
              {price}.– {currency}
            </h2>

            {/* EMAIL */}
            <input
              type="email"
              placeholder="E-Mail-Adresse"
              className="
                w-full px-5 py-3 mb-4 rounded-xl border border-gray-300 
                focus:ring-2 focus:ring-[#7eb6b8] outline-none
              "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {errorMsg && (
              <p className="text-red-500 mb-4">{errorMsg}</p>
            )}

            {/* PAY BUTTON */}
            <button
              onClick={handleCheckout}
              disabled={loading}
              className="
                w-full bg-[#7eb6b8] text-black font-semibold py-4 rounded-full text-lg
                hover:bg-black hover:text-white transition-all
                disabled:opacity-50
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

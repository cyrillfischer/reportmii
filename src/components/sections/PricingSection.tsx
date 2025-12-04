// src/components/sections/PricingSection.tsx
import { motion } from "framer-motion";
import { PricingCard } from "../PricingCard";

export function PricingSection() {
  return (
    <section className="w-full py-32 bg-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 text-center relative z-10">

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="
            text-4xl md:text-5xl font-semibold tracking-tight 
            text-gray-900 mb-6
          "
        >
          Wähle deine Analyse.
        </motion.h2>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-lg text-gray-700 max-w-3xl mx-auto mb-16"
        >
          Zwei Perspektiven – ein Ziel: Klarheit für bessere Entscheidungen.
        </motion.p>

        {/* Cards */}
        <div className="grid gap-10 md:grid-cols-2 mt-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <PricingCard
              name="Business.mii"
              subtitle="Analyse aus Unternehmenssicht"
              price="€ 49"
              description="Erhalte einen klaren Überblick über Strategie, Struktur, Führung, Finanzen und Mitarbeiterperspektiven."
              ctaText="Jetzt starten"
              featured={false}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <PricingCard
              name="Inside.mii"
              subtitle="Analyse aus Mitarbeitersicht"
              price="€ 49"
              description="Entdecke, wie dein Team denkt, fühlt und arbeitet. Zeigt Chancen, Risiken und Potenziale auf."
              ctaText="Jetzt starten"
              featured={true}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

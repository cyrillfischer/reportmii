// src/components/sections/HeroSection.tsx
import { motion } from "framer-motion";
import { Button } from "../Button";

export function HeroSection() {
  return (
    <section className="relative w-full pt-44 pb-32 overflow-hidden bg-white">

      {/* Background Animation can be optionally injected via MainLayout */}

      <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">
        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="
            text-5xl md:text-6xl font-semibold tracking-tight 
            text-gray-900 mb-6
          "
        >
          Analyse dein Unternehmen<br />
          <span className="text-violet-600">in Minuten, nicht Monaten.</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-10 leading-relaxed"
        >
          Reportmii erstellt eine klare, verständliche Analyse deines Unternehmens 
          – automatisch, datenbasiert und 100% objektiv. 
          Perfekt für Strategien, Kennzahlen, Team und Entscheidungen.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-4"
        >
          <Button variant="primary" className="px-8 py-3 text-lg">
            Jetzt starten
          </Button>

          <Button variant="ghost" className="px-8 py-3 text-lg">
            Beispiel-Report ansehen
          </Button>
        </motion.div>
      </div>

      {/* Optional subtle gradient overlay (top) */}
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-white to-transparent pointer-events-none" />
    </section>
  );
}

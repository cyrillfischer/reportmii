// src/components/sections/HowItWorksSection.tsx
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

export function HowItWorksSection() {
  const steps = [
    {
      title: "1. Kurze Fragen beantworten",
      text: "Du oder dein Team beantworten einfache, klare Fragen – ohne lange Vorbereitung, ohne Fachwissen.",
    },
    {
      title: "2. Analyse wird automatisch erstellt",
      text: "Reportmii fasst alles intelligent zusammen: Strategien, Strukturen, Teamstimmung und Potenziale.",
    },
    {
      title: "3. Klare Insights & Empfehlungen",
      text: "Du erhältst sofort einen übersichtlichen Report – ideal für Entscheidungen, Meetings und Planung.",
    },
  ];

  return (
    <section className="w-full py-32 bg-white relative">
      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="
            text-4xl md:text-5xl font-semibold tracking-tight 
            text-gray-900 mb-6 text-center
          "
        >
          So funktioniert’s.
        </motion.h2>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-lg text-gray-700 max-w-3xl mx-auto mb-20 text-center"
        >
          In wenigen Minuten zur fertigen Unternehmensanalyse.
        </motion.p>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-14">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="text-center"
            >
              <div className="flex justify-center mb-5">
                <CheckCircle className="text-violet-600" size={40} />
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {step.title}
              </h3>

              <p className="text-gray-700 leading-relaxed">
                {step.text}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

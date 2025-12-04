// src/components/sections/PricingIntroSection.tsx
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export function PricingIntroSection() {
  const navigate = useNavigate();

  const products = [
    {
      name: "Business.mii",
      description:
        "Die Perspektive des Unternehmens. Strategie, Führung, Struktur, Prozesse und Potenziale klar auf den Punkt gebracht.",
      link: "/business",
    },
    {
      name: "Inside.mii",
      description:
        "Die Sicht deiner Mitarbeitenden. Stimmung, Kultur, Motivation und Chancen – anonym, ehrlich und wertvoll.",
      link: "/inside",
    },
  ];

  return (
    <section className="w-full py-28 bg-white relative">
      <div className="max-w-5xl mx-auto px-6 text-center">

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 mb-10"
        >
          Zwei Analysen. Zwei Blickwinkel.
        </motion.h2>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-20 leading-relaxed"
        >
          Jede Analyse zeigt dir einen anderen Teil deines Unternehmens. 
          Gemeinsam ergeben sie ein vollständiges Bild.
        </motion.p>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-12">
          {products.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              onClick={() => navigate(p.link)}
              className="
                cursor-pointer group bg-white border border-gray-200 
                rounded-3xl p-10 shadow-soft hover:shadow-md 
                transition-all duration-300 text-left
              "
            >
              <h3 className="text-2xl font-semibold text-gray-900 mb-4 group-hover:text-violet-600 transition-colors">
                {p.name}
              </h3>

              <p className="text-gray-700 leading-relaxed group-hover:text-gray-900">
                {p.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

import { motion } from "framer-motion";
import { useLanguage } from "../../contexts/LanguageContext";

export function VisionSection() {
  const { t } = useLanguage();

  return (
    <section className="w-full py-32 bg-white relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 text-center relative z-10">

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 mb-8"
        >
          {t.vision.title}
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto"
        >
          {t.vision.description}
        </motion.p>

        {/* Soft concept tags */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.2 }}
          className="mt-14 flex flex-wrap justify-center gap-6"
        >
          {["Technologie", "Psychologie", "Klarheit"].map((word, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.06 }}
              className="
                px-8 py-4 bg-gray-100 
                rounded-2xl shadow-soft
                text-gray-900 font-medium text-lg
              "
            >
              {word}
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}

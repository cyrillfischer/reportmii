import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import { Laptop, Smartphone } from "lucide-react";

export function WhatIsSection() {
  const { t } = useLanguage();
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section ref={ref} className="w-full py-32 bg-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 mb-6">
            {t.whatIs.title}
          </h2>

          <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
            {t.whatIs.description}
          </p>
        </motion.div>

        {/* Visual */}
        <motion.div style={{ y }} className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative bg-white rounded-3xl p-10 shadow-soft border border-gray-200"
          >
            {/* Icons */}
            <div className="flex items-center justify-center space-x-10 mb-10">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-6 bg-gray-100 rounded-2xl shadow-soft"
              >
                <Laptop className="text-gray-700" size={52} />
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-6 bg-gray-100 rounded-2xl shadow-soft"
              >
                <Smartphone className="text-gray-700" size={52} />
              </motion.div>
            </div>

            {/* Fake lines */}
            <div className="space-y-3">
              <div className="h-3 w-full rounded-full bg-gray-200" />
              <div className="h-3 w-3/4 rounded-full bg-gray-200" />
              <div className="h-3 w-5/6 rounded-full bg-gray-200" />
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}

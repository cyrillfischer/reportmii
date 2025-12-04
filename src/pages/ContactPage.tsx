// src/pages/ContactPage.tsx
import { motion } from "framer-motion";
import { Button } from "../components/Button";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    topic: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Nachricht gesendet! (Backend später)");
  };

  return (
    <>
      {/* ============================================ */}
      {/* HERO – DARK CHARCOAL                         */}
      {/* ============================================ */}
      <section className="w-full pt-48 pb-32 bg-[#1b1f23] text-white relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">

          <motion.img
            src="/illustrations/coreicon/21_contact.mii_chat_mail_combo.png"
            alt="Contact Icon"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="max-w-[250px] sm:max-w-[280px] md:max-w-[280px] mb-10 drop-shadow-[0_30px_80px_rgba(15,23,42,0.25)] mx-auto"
          />

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-5xl md:text-6xl font-semibold mb-6 text-white"
          >
            Kontakt aufnehmen
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed"
          >
            Wir melden uns innerhalb von 24 Stunden.  
            Egal ob Business.mii, Inside.mii, Partner.mii oder Affiliate – wir sind für dich da.
          </motion.p>

        </div>
      </section>

      {/* ============================================ */}
      {/* KONTAKT-FORMULAR                             */}
      {/* ============================================ */}
      <section className="py-32 bg-white">
        <div className="max-w-3xl mx-auto px-6">

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-semibold text-center text-gray-900 mb-12"
          >
            Schreib uns eine Nachricht
          </motion.h2>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white border border-gray-200 rounded-3xl shadow-soft p-10 md:p-14 space-y-10"
          >

            {/* NAME GRID */}
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <label className="text-gray-900 font-medium">Vorname *</label>
                <input
                  type="text"
                  name="firstName"
                  required
                  onChange={handleChange}
                  className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-[#7eb6b8] outline-none"
                />
              </div>

              <div>
                <label className="text-gray-900 font-medium">Nachname *</label>
                <input
                  type="text"
                  name="lastName"
                  required
                  onChange={handleChange}
                  className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-[#7eb6b8] outline-none"
                />
              </div>
            </div>

            {/* EMAIL */}
            <div>
              <label className="text-gray-900 font-medium">E-Mail *</label>
              <input
                type="email"
                name="email"
                required
                onChange={handleChange}
                className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-[#7eb6b8] outline-none"
              />
            </div>

            {/* COMPANY OPTIONAL */}
            <div>
              <label className="text-gray-900 font-medium">Firma (optional)</label>
              <input
                type="text"
                name="company"
                onChange={handleChange}
                className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-[#7eb6b8] outline-none"
              />
            </div>

            {/* TOPIC */}
            <div>
              <label className="text-gray-900 font-medium">Thema *</label>
              <select
                name="topic"
                required
                onChange={handleChange}
                className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 bg-white focus:ring-2 focus:ring-[#7eb6b8] outline-none"
              >
                <option value="">Bitte auswählen…</option>
                <option value="business">Business.mii</option>
                <option value="inside">Inside.mii</option>
                <option value="partner">Partner.mii</option>
                <option value="affiliate">Affiliate</option>
                <option value="other">Allgemeines Anliegen</option>
              </select>
            </div>

            {/* MESSAGE */}
            <div>
              <label className="text-gray-900 font-medium">Nachricht *</label>
              <textarea
                name="message"
                required
                rows={5}
                onChange={handleChange}
                className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-[#7eb6b8] outline-none"
              ></textarea>
            </div>

            {/* SUBMIT */}
            <Button type="submit" className="w-full py-4 text-lg">
              Nachricht senden
            </Button>

          </motion.form>
        </div>
      </section>

      {/* ============================================ */}
      {/* FINAL CTA                                    */}
      {/* ============================================ */}
      <section className="py-28 bg-[#1b1f23] text-center text-white">
        <motion.h3
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-semibold mb-4 text-white"
        >
          Bereit für klare Einblicke?
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Egal welches Thema – wir helfen dir schnell, kompetent und persönlich weiter.
        </motion.p>

        <div className="flex flex-col items-center gap-6">
          <Button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="px-10 py-4 text-lg"
          >
            Nach oben
          </Button>
          <img
            src="/illustrations/coreicon/1_core_icon_growth.png"
            alt="Growth"
            className="w-44 h-44"
          />
        </div>
      </section>
    </>
  );
}

// src/pages/AffiliatePage.tsx
import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import { Button } from "../components/Button";
import { AnimatedShapesInside } from "../components/AnimatedShapesInside";
import { Footer } from "../components/Footer";

export default function AffiliatePage() {
  const navigate = useNavigate();

  const [businessSales, setBusinessSales] = useState(10);
  const [insideSales, setInsideSales] = useState(5);
  const [partnerSales, setPartnerSales] = useState(1);

  const [displayBusinessSales, setDisplayBusinessSales] = useState(0);
  const [displayInsideSales, setDisplayInsideSales] = useState(0);
  const [displayPartnerSales, setDisplayPartnerSales] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  const calculatorRef = useRef(null);
  const isInView = useInView(calculatorRef, { once: true });

  useEffect(() => {
    if (isInView && !hasAnimated) {
      const duration = 1000;
      const steps = 60;
      const interval = duration / steps;

      let step = 0;
      const timer = setInterval(() => {
        step++;
        const progress = step / steps;
        setDisplayBusinessSales(Math.round(businessSales * progress));
        setDisplayInsideSales(Math.round(insideSales * progress));
        setDisplayPartnerSales(Math.round(partnerSales * progress));

        if (step >= steps) {
          clearInterval(timer);
          setDisplayBusinessSales(businessSales);
          setDisplayInsideSales(insideSales);
          setDisplayPartnerSales(partnerSales);
          setHasAnimated(true);
        }
      }, interval);

      return () => clearInterval(timer);
    }
  }, [isInView, hasAnimated, businessSales, insideSales, partnerSales]);

  useEffect(() => {
    if (hasAnimated) {
      setDisplayBusinessSales(businessSales);
      setDisplayInsideSales(insideSales);
      setDisplayPartnerSales(partnerSales);
    }
  }, [hasAnimated, businessSales, insideSales, partnerSales]);

  const businessEarnings = businessSales * 497 * 0.5;
  const insideEarnings = insideSales * 1997 * 0.2;
  const partnerEarnings = partnerSales * 1164 * 0.2;
  const totalEarnings =
    businessEarnings + insideEarnings + partnerEarnings;

  const formatNumber = (num: number) =>
    num.toLocaleString("de-DE", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });

  return (
    <MainLayout background={<AnimatedShapesInside />} hideFooter={true}>

      {/* ========================================================= */}
      {/* 1) HERO – Icon left, Text right                          */}
      {/* ========================================================= */}

      <section className="w-full py-32 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">

          {/* LEFT – HERO ICON */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center lg:justify-start"
          >
            <img
              src="/illustrations/affiliate/1_affiliate_program.png"
              alt="Affiliate.mii Program"
              className="w-[320px] md:w-[380px] drop-shadow-[0_20px_60px_rgba(0,0,0,0.25)]"
            />
          </motion.div>

          {/* RIGHT – TITLE + TEXT + CTA */}
          <div className="text-center lg:text-left mx-auto lg:mx-0">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="text-5xl md:text-6xl font-semibold tracking-tight text-gray-900 mb-6"
            >
              <span className="text-[#7eb6b8]">Affiliate.mii</span> Programm
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="text-lg md:text-xl text-gray-900 max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              Verdiene <strong>Lifetime-Provisionen</strong> auf alle Reportmii Produkte –
              komplett automatisiert über Stripe. Keine Vorkenntnisse nötig.
            </motion.p>

            {/* CTA BUTTONS */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.15 }}
              className="flex flex-col sm:flex-row gap-4 mt-10 justify-center lg:justify-start"
            >
              <button
                onClick={() => navigate("/affiliate-register")}
                className="
                  px-10 py-4 rounded-full
                  bg-[#7eb6b8] text-black font-semibold text-lg
                  shadow-[0_0_25px_rgba(126,182,184,0.35)]
                  hover:bg-[#1b1f23] hover:text-white transition
                "
              >
                Jetzt kostenlos starten →
              </button>
            </motion.div>

            <p className="text-gray-500 text-sm mt-6">
              Automatische Auszahlungen über Stripe · Keine Risiken
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2) VORTEILE – DARK CHARCOAL                               */}
      {/* ========================================================= */}

      <section className="py-32 bg-[#1b1f23] text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-semibold text-center text-white"
          >
            Deine Vorteile als Affiliate
          </motion.h2>

          <div className="mt-20 grid md:grid-cols-2 lg:grid-cols-4 gap-14">

            {[
              {
                title: "Hohe Provisionen",
                text: "Bis zu 50 % Lifetime-Provision auf Business.mii und 20 % auf Inside & Partner.",
                icon: "/illustrations/affiliate/2_affiliate_high_commission.png"
              },
              {
                title: "Automatische Auszahlungen",
                text: "Stripe kümmert sich um alles – du musst nichts manuell auszahlen.",
                icon: "/illustrations/affiliate/3_affiliate_auto_payout.png"
              },
              {
                title: "Kein Setup nötig",
                text: "Du brauchst keine Website, kein Marketing-Know-how und keine Technik.",
                icon: "/illustrations/affiliate/4_affiliate_no_setup.png"
              },
              {
                title: "Wachsende Produktpalette",
                text: "Profitiere von allen jetzigen und zukünftigen Reportmii Produkten.",
                icon: "/illustrations/affiliate/5_affiliate_product_portfolio.png"
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="
                  bg-[#262b2f] rounded-3xl p-10 text-center shadow-xl
                  hover:-translate-y-2 hover:shadow-2xl transition-all duration-300
                "
              >
                <img
                  src={item.icon}
                  alt={item.title}
                  className="w-[95px] h-[95px] mx-auto mb-6"
                />
                <h3 className="text-xl font-semibold mb-2 text-white">{item.title}</h3>
                <p className="text-white leading-relaxed text-[17px]">
                  {item.text}
                </p>
              </motion.div>
            ))}

          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3) FÜR WEN – MINT HELL                                    */}
      {/* ========================================================= */}

      <section className="py-32 bg-[#dff7f5] text-[#1b1f23]">
        <div className="max-w-7xl mx-auto px-6">

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-semibold text-center"
          >
            Für wen ist Affiliate.mii?
          </motion.h2>

          <p className="text-lg max-w-2xl mx-auto text-center mt-4 leading-relaxed text-[#1b1f23]/80">
            Perfekt für alle, die digitales Einkommen aufbauen wollen – egal ob Anfänger oder Profi.
          </p>

          <div className="mt-20 grid grid-cols-2 md:grid-cols-2 gap-8 md:gap-12">
            {[
              { label: "Side-Hustler", icon: "/illustrations/affiliate/6_affiliate_side_hustler.png" },
              { label: "Content Creator", icon: "/illustrations/affiliate/7_affiliate_content_creator.png" },
              { label: "Berater:innen & Coaches", icon: "/illustrations/affiliate/8_affiliate_consultants.png" },
              { label: "HR & Leadership Trainer", icon: "/illustrations/affiliate/9_affiliate_hr_leadership.png" }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="
                  bg-white rounded-2xl shadow-soft border border-gray-200
                  p-6 md:p-8 text-center hover:-translate-y-1 transition-all duration-300
                "
              >
                <img
                  src={item.icon}
                  alt={item.label}
                  className="w-[70px] h-[70px] md:w-[95px] md:h-[95px] mx-auto mb-3 md:mb-4"
                />
                <h3 className="text-sm md:text-lg font-semibold">{item.label}</h3>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 4) WIE ES FUNKTIONIERT – MINT DUNKEL                      */}
      {/* ========================================================= */}

      <section className="py-32 bg-[#7eb6b8] text-[#1b1f23] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-semibold text-center"
          >
            Wie Affiliate.mii funktioniert
          </motion.h2>

          <p className="text-lg max-w-2xl mx-auto text-center mt-4 leading-relaxed text-[#1b1f23]/90">
            Der einfachste Weg, langfristige Provisionen aufzubauen.
          </p>

          <div className="mt-20 grid md:grid-cols-4 gap-12">

            {[
              { title: "Kostenlos anmelden", text: "Joinen, bestätigen – fertig.", icon: "/illustrations/affiliate/10_affiliate_join_free.png" },
              { title: "Partnerlink erhalten", text: "Pro Produkt ein eigener Affiliate-Link.", icon: "/illustrations/affiliate/11_affiliate_link_received.png" },
              { title: "Empfehlen & teilen", text: "Social Media, Website oder direkt per DM.", icon: "/illustrations/affiliate/12_affiliate_share.png" },
              { title: "Provision kassieren", text: "Automatische Stripe-Auszahlung – für immer.", icon: "/illustrations/affiliate/13_affiliate_earnings.png" }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="
                  bg-[#1b1f23] rounded-3xl p-10 text-center text-white
                  shadow-xl hover:-translate-y-2 transition-all duration-300
                "
              >
                <motion.img
                  src={item.icon}
                  alt={item.title}
                  className="w-[95px] h-[95px] mx-auto mb-6"
                  initial={{ rotateY: 0 }}
                  whileInView={{ rotateY: 360 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                />
                <h3 className="text-xl font-bold mb-2 text-white">{item.title}</h3>
                <p className="text-white leading-relaxed">{item.text}</p>
              </motion.div>
            ))}

          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex justify-center mt-16"
          >
            <button
              onClick={() => navigate("/affiliate-register")}
              className="
                px-10 py-4 rounded-full
                bg-white text-[#1b1f23] font-semibold text-lg
                shadow-lg
                hover:bg-[#1b1f23] hover:text-white
                transition-all duration-300
              "
            >
              Jetzt Affiliate werden
            </button>
          </motion.div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 5) VERDIENSTMODELLE – WEISS                             */}
      {/* ========================================================= */}

      <section className="py-32 bg-white text-[#1b1f23]">
        <div className="max-w-7xl mx-auto px-6">

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="text-4xl md:text-5xl font-semibold text-center text-[#1b1f23]"
          >
            Wie du als Affiliate verdienst
          </motion.h2>

          <p className="text-lg max-w-2xl mx-auto text-center mt-4 leading-relaxed text-[#1b1f23]/70">
            Du erhältst Lifetime-Provisionen für jedes Produkt, das über deinen Link gekauft wird.
          </p>

          <div className="mt-20 grid md:grid-cols-3 gap-14">

            {[
              {
                title: "Business.mii",
                icon: "/illustrations/affiliate/14_affiliate_business_mii.png",
                text: "50 % Lifetime-Provision pro Analyse (497 €).",
              },
              {
                title: "Inside.mii",
                icon: "/illustrations/affiliate/15_affiliate_inside_mii.png",
                text: "20 % Lifetime-Provision pro Team-Analyse (1’997 €).",
              },
              {
                title: "Partner.mii",
                icon: "/illustrations/affiliate/16_affiliate_partner_mii.png",
                text: "20 % Provision pro Partner.mii Jahreslizenz (1'164 €).",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className="
                  bg-white border border-gray-200 rounded-3xl
                  p-10 shadow-soft text-center hover:-translate-y-2
                  hover:shadow-md transition-all duration-300
                "
              >
                <img
                  src={item.icon}
                  alt={item.title}
                  className="w-[95px] h-[95px] mx-auto mb-6"
                />
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-[#1b1f23]/70 leading-relaxed text-[17px]">
                  {item.text}
                </p>
              </motion.div>
            ))}

          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 6) VERDIENST-RECHNER – WEISS                            */}
      {/* ========================================================= */}

      <section className="py-32 bg-[#f7faf9] text-[#1b1f23]">
        <div className="max-w-5xl mx-auto px-6 text-center">

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="text-4xl md:text-5xl font-semibold text-center"
          >
            Berechne dein Verdienstpotenzial
          </motion.h2>

          <p className="text-lg text-[#1b1f23]/70 max-w-2xl mx-auto mt-4 leading-relaxed">
            Ein einfacher Rechner, der dir zeigt, wie viel du monatlich verdienen kannst.
          </p>

          <div
            ref={calculatorRef}
            className="
              bg-white rounded-3xl border-2 border-[#7eb6b8]
              shadow-xl p-12 mt-16 text-left
            "
          >

            {/* BUSINESS RANGE */}
            <div className="mb-12">
              <label className="font-medium text-[#1b1f23] text-lg">
                Business.mii Verkäufe / Monat
              </label>
              <input
                type="range"
                min="0"
                max="50"
                step="5"
                value={hasAnimated ? businessSales : displayBusinessSales}
                onChange={(e) => setBusinessSales(Number(e.target.value))}
                className="w-full accent-[#7eb6b8] mt-4 cursor-pointer"
              />
              <p className="mt-3 text-[#1b1f23] text-xl">
                {businessSales} Verkäufe →
                <strong className="text-[#1b1f23] ml-2">
                  {formatNumber(businessEarnings)} €
                </strong>
              </p>
            </div>

            {/* INSIDE RANGE */}
            <div className="mb-12">
              <label className="font-medium text-[#1b1f23] text-lg">
                Inside.mii Analysen / Monat
              </label>
              <input
                type="range"
                min="0"
                max="20"
                step="1"
                value={hasAnimated ? insideSales : displayInsideSales}
                onChange={(e) => setInsideSales(Number(e.target.value))}
                className="w-full accent-[#7eb6b8] mt-4 cursor-pointer"
              />
              <p className="mt-3 text-[#1b1f23] text-xl">
                {insideSales} Verkäufe →
                <strong className="text-[#1b1f23] ml-2">
                  {formatNumber(insideEarnings)} €
                </strong>
              </p>
            </div>

            {/* PARTNER RANGE */}
            <div className="mb-12">
              <label className="font-medium text-[#1b1f23] text-lg">
                Partner.mii Lizenzen / Monat
              </label>
              <input
                type="range"
                min="0"
                max="20"
                step="1"
                value={hasAnimated ? partnerSales : displayPartnerSales}
                onChange={(e) => setPartnerSales(Number(e.target.value))}
                className="w-full accent-[#7eb6b8] mt-4 cursor-pointer"
              />
              <p className="mt-3 text-[#1b1f23] text-xl">
                {partnerSales} Verkäufe →
                <strong className="text-[#1b1f23] ml-2">
                  {formatNumber(partnerEarnings)} €
                </strong>
              </p>
            </div>

            {/* TOTAL */}
            <div className="border-t border-gray-200 pt-10 mt-10">
              <p className="text-3xl font-bold text-[#1b1f23]">
                Gesamtpotenzial:{" "}
                <span className="text-[#7eb6b8]">
                  {formatNumber(totalEarnings)} €
                </span>
              </p>
            </div>

          </div>
        </div>
      </section>
      {/* ========================================================= */}
      {/* 7) TESTIMONIALS – DARK CHARCOAL                         */}
      {/* ========================================================= */}

      <section className="py-32 bg-[#1b1f23] text-white relative">
        <div className="relative z-10 max-w-7xl mx-auto px-6">

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-semibold text-center text-white mb-16"
          >
            Stimmen unserer Affiliates
          </motion.h2>

          {/* MOBILE STACK VERSION */}
          <div className="md:hidden relative">
            <div
              id="affiliate-testimonial-mobile-track"
              className="flex flex-col gap-8 overflow-y-auto max-h-[600px] pr-2"
              style={{ scrollbarWidth: "none" }}
            >

              {[
                {
                  name: "Daniel K.",
                  role: "Business Coach",
                  gender: "m",
                  text: "Ich hätte nie gedacht, dass Analyse-Software so gut verkaufen kann. Die Lifetime-Provisionen sind wirklich stark."
                },
                {
                  name: "Sabrina L.",
                  role: "Beraterin",
                  gender: "f",
                  text: "Ich teile die Links in meiner Community – und jeden Monat kommt automatisch etwas rein. Genial simpel."
                },
                {
                  name: "Marco R.",
                  role: "Agenturinhaber",
                  gender: "m",
                  text: "Ich nutze Reportmii als Bonus für meine Kund:innen – und verdiene gleichzeitig an jedem Abschluss mit."
                },
                {
                  name: "Markus G.",
                  role: "Content Creator",
                  gender: "m",
                  text: "Reportmii ist der perfekte Side-Hustle – ich empfehle die Tools und verdiene dabei richtig gut."
                },
                {
                  name: "Sabrina N.",
                  role: "HR Beraterin",
                  gender: "f",
                  text: "Die Provisionen sind fair und die Auszahlungen kommen pünktlich – besser geht's nicht."
                },
                {
                  name: "Thomas E.",
                  role: "Unternehmensberater",
                  gender: "m",
                  text: "Ich empfehle Reportmii meinen Klienten und verdiene passiv mit – eine Win-Win-Situation."
                }
              ].map((t, i) => (
                <div
                  key={i}
                  className="p-6 bg-white/5 backdrop-blur-sm rounded-3xl
                             border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.35)] min-h-[220px] flex flex-col"
                >
                  {/* TOP ROW: ICON + NAME */}
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={
                        t.gender === "m"
                          ? "/illustrations/coreicon/18_core_icon_male.png"
                          : "/illustrations/coreicon/19_core_icon_female.png"
                      }
                      className="w-14 h-14"
                    />
                    <div>
                      <p className="font-semibold text-white">{t.name}</p>
                      <p className="text-xs text-gray-400">{t.role}</p>
                    </div>
                  </div>

                  {/* STARS */}
                  <div className="flex gap-1 mb-3">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <span key={s} className="text-yellow-300 text-xl">★</span>
                    ))}
                  </div>

                  {/* TEXT */}
                  <p className="text-white text-base leading-relaxed">
                    {t.text}
                  </p>
                </div>
              ))}

            </div>

            {/* SCROLL DOWN ARROW */}
            <div className="flex justify-center mt-6">
              <button
                onClick={() => {
                  const track = document.getElementById("affiliate-testimonial-mobile-track");
                  if (track) {
                    track.scrollBy({ top: 300, behavior: "smooth" });
                  }
                }}
                className="w-12 h-12 flex items-center justify-center
                           bg-[#7eb6b8] text-black rounded-full shadow-xl
                           hover:brightness-110 transition animate-bounce"
              >
                ↓
              </button>
            </div>
          </div>

          {/* DESKTOP SLIDER */}
          <div className="hidden md:block relative">

            {/* LEFT ARROW */}
            <button
              id="affiliate-testimonial-left"
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20
                         w-12 h-12 flex items-center justify-center
                         bg-[#7eb6b8] text-black rounded-full shadow-xl
                         hover:brightness-110 transition opacity-0 pointer-events-none"
              onClick={() => {
                const sc = document.getElementById("affiliate-testimonial-track");
                if (sc) {
                  const width = sc.scrollWidth / 6;
                  sc.scrollBy({ left: -width, behavior: "smooth" });
                }
              }}
            >
              ←
            </button>

            {/* RIGHT ARROW */}
            <button
              id="affiliate-testimonial-right"
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20
                         w-12 h-12 flex items-center justify-center
                         bg-[#7eb6b8] text-black rounded-full shadow-xl
                         hover:brightness-110 transition"
              onClick={() => {
                const sc = document.getElementById("affiliate-testimonial-track");
                if (sc) {
                  const width = sc.scrollWidth / 6;
                  sc.scrollBy({ left: width, behavior: "smooth" });
                }
              }}
            >
              →
            </button>

            {/* TRACK */}
            <div
              id="affiliate-testimonial-track"
              className="flex gap-8 overflow-x-hidden scroll-smooth px-2"
              style={{ scrollSnapType: "x mandatory", scrollbarWidth: "none" }}
              onScroll={() => {
                const sc = document.getElementById("affiliate-testimonial-track");
                const left = document.getElementById("affiliate-testimonial-left");
                const right = document.getElementById("affiliate-testimonial-right");
                if (!sc || !left || !right) return;

                const max = sc.scrollWidth - sc.clientWidth;

                left.style.opacity = sc.scrollLeft > 10 ? "1" : "0";
                left.style.pointerEvents = sc.scrollLeft > 10 ? "auto" : "none";

                right.style.opacity = sc.scrollLeft >= max - 20 ? "0" : "1";
                right.style.pointerEvents = sc.scrollLeft >= max - 20 ? "none" : "auto";
              }}
            >

              {[
                {
                  name: "Daniel K.",
                  role: "Business Coach",
                  gender: "m",
                  text: "Ich hätte nie gedacht, dass Analyse-Software so gut verkaufen kann. Die Lifetime-Provisionen sind wirklich stark."
                },
                {
                  name: "Sabrina L.",
                  role: "Beraterin",
                  gender: "f",
                  text: "Ich teile die Links in meiner Community – und jeden Monat kommt automatisch etwas rein. Genial simpel."
                },
                {
                  name: "Marco R.",
                  role: "Agenturinhaber",
                  gender: "m",
                  text: "Ich nutze Reportmii als Bonus für meine Kund:innen – und verdiene gleichzeitig an jedem Abschluss mit."
                },
                {
                  name: "Markus G.",
                  role: "Content Creator",
                  gender: "m",
                  text: "Reportmii ist der perfekte Side-Hustle – ich empfehle die Tools und verdiene dabei richtig gut."
                },
                {
                  name: "Sabrina N.",
                  role: "HR Beraterin",
                  gender: "f",
                  text: "Die Provisionen sind fair und die Auszahlungen kommen pünktlich – besser geht's nicht."
                },
                {
                  name: "Thomas E.",
                  role: "Unternehmensberater",
                  gender: "m",
                  text: "Ich empfehle Reportmii meinen Klienten und verdiene passiv mit – eine Win-Win-Situation."
                }
              ].map((t, i) => (
                <div
                  key={i}
                  className="w-[calc(33.333%-1.33rem)] snap-start flex-shrink-0
                             p-6 bg-white/5 backdrop-blur-sm rounded-3xl
                             border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.35)] min-h-[220px] flex flex-col"
                >

                  {/* TOP ROW: ICON + NAME */}
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={
                        t.gender === "m"
                          ? "/illustrations/coreicon/18_core_icon_male.png"
                          : "/illustrations/coreicon/19_core_icon_female.png"
                      }
                      className="w-14 h-14"
                    />
                    <div>
                      <p className="font-semibold text-white">{t.name}</p>
                      <p className="text-xs text-gray-400">{t.role}</p>
                    </div>
                  </div>

                  {/* STARS */}
                  <div className="flex gap-1 mb-3">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <span key={s} className="text-yellow-300 text-xl">★</span>
                    ))}
                  </div>

                  {/* TEXT */}
                  <p className="text-white text-base leading-relaxed">
                    {t.text}
                  </p>
                </div>
              ))}

            </div>
          </div>

        </div>
      </section>


      {/* ========================================================= */}
      {/* 8) FAQ – WEISS                                          */}
      {/* ========================================================= */}

      <section className="py-32 bg-white text-[#1b1f23]">
        <div className="max-w-5xl mx-auto px-6">

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="text-4xl md:text-5xl font-semibold text-center"
          >
            Häufige Fragen
          </motion.h2>

          <div className="mt-16 space-y-6">

            {[
              {
                q: "Wie erhalte ich meine Provision?",
                a: "Automatisch über Stripe. Du erhältst deine Auszahlungen ohne Verzögerung direkt auf dein Konto.",
              },
              {
                q: "Gibt es eine Mindestmenge an Verkäufen?",
                a: "Nein. Du kannst bereits ab dem ersten Verkauf verdienen.",
              },
              {
                q: "Wie lange gilt die Provision?",
                a: "Lifetime. Jeder Kunde, den du bringst, wird dir dauerhaft zugeordnet.",
              },
              {
                q: "Kann ich alle drei Produkte bewerben?",
                a: "Ja. Du erhältst Provisionen auf Business.mii, Inside.mii und Partner.mii.",
              },
              {
                q: "Wie bekomme ich meinen Affiliate-Link?",
                a: "Nach deiner Registrierung im Affiliate-Dashboard.",
              },
              {
                q: "Brauche ich technisches Wissen?",
                a: "Nein. Kopiere deinen Link und teile ihn – fertig.",
              },
            ].map((f, i) => (
              <motion.details
                key={i}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="
                  group border border-gray-200 bg-white 
                  rounded-2xl p-6 shadow-sm cursor-pointer
                "
              >
                <summary
                  className="
                    flex justify-between items-center 
                    text-xl font-semibold text-[#1b1f23]
                  "
                >
                  {f.q}
                  <span className="text-gray-400 group-open:rotate-180 transition-transform">
                    ⌄
                  </span>
                </summary>

                <p className="mt-4 text-[#1b1f23]/70 leading-relaxed">
                  {f.a}
                </p>
              </motion.details>
            ))}
          </div>
        </div>
      </section>


      {/* ========================================================= */}
      {/* 9) FINAL CTA – DARK CHARCOAL                            */}
      {/* ========================================================= */}

      <section className="py-32 bg-[#1b1f23] text-white text-center">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-semibold mb-6 text-white"
        >
          Bereit, deine Affiliate-Einnahmen zu starten?
        </motion.h3>

        <p className="max-w-3xl mx-auto text-white/80 text-lg mb-12 leading-relaxed">
          Starte jetzt kostenlos und verdiene mit jedem Verkauf lebenslang mit.
        </p>

        <button
          onClick={() => (window.location.href = "/affiliate-register")}
          className="
            px-10 py-4 rounded-full
            bg-[#7eb6b8] text-black font-semibold text-lg
            shadow-[0_0_25px_rgba(126,182,184,0.35)]
            hover:bg-white hover:text-black
            transition
          "
        >
          Jetzt Affiliate werden →
        </button>
      </section>


    </MainLayout>
  );
}

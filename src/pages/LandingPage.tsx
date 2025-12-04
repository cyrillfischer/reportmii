// src/pages/LandingPage.tsx
import { Link } from "react-router-dom";
import { ParallaxProvider } from "react-scroll-parallax";
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { useTypewriter } from "../utils/useTypewriter";


// =========================================================
// FINAL CTA TYPEWRITER HOOK
// =========================================================
function useFinalCTATyper(active: boolean, text: string, speed = 35) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!active) return;
    if (index === text.length) return;

    const timeout = setTimeout(() => {
      setIndex((i) => i + 1);
    }, speed);

    return () => clearTimeout(timeout);
  }, [active, index, text, speed]);

  return text.substring(0, index);
}



// =========================================================
// LANDING PAGE COMPONENT
// =========================================================
export function LandingPage() {

  // Sticky CTA Sichtbarkeit
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowSticky(window.scrollY > 300);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);


  // FINAL CTA Sichtbarkeit (Scroll Trigger)
  const ctaRef = useRef<HTMLDivElement | null>(null);
  const [ctaVisible, setCtaVisible] = useState(false);

  useEffect(() => {
    if (!ctaRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setCtaVisible(true);
      },
      { threshold: 0.4 }
    );

    observer.observe(ctaRef.current);
    return () => observer.disconnect();
  }, []);

  const ctaText = useFinalCTATyper(
    ctaVisible,
    "Bereit, dein Unternehmen klarer zu sehen?"
  );



  // =========================================================
  // HERO TYPEWRITER
  // =========================================================
  const sentences = [
    "bessere Entscheidungen.",
    "klare Prioritäten.",
    "schnellere Fortschritte."
  ];

  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const blinkInterval = setInterval(() => setBlink((b) => !b), 500);
    return () => clearInterval(blinkInterval);
  }, []);

  useEffect(() => {
    const current = sentences[index];
    const speed = deleting ? 40 : 70;

    const timeout = setTimeout(() => {
      if (!deleting) {
        if (subIndex < current.length) {
          setSubIndex(subIndex + 1);
        } else {
          setTimeout(() => setDeleting(true), 1000);
        }
      } else {
        if (subIndex > 0) {
          setSubIndex(subIndex - 1);
        } else {
          setDeleting(false);
          setIndex((prev) => (prev + 1) % sentences.length);
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [subIndex, deleting, index]);



  // =========================================================
  // RETURN TREE
  // =========================================================
  return (
    <ParallaxProvider>
      <div>


{/* ========================================================= */}
{/* HERO SECTION – CENTERED MOBILE / CLEAN TWO-COLUMN DESKTOP */}
{/* ========================================================= */}
<section className="w-full py-32 bg-gradient-to-b from-[#f0f7f7] via-[#f7fbfb] to-white relative overflow-hidden">

  {/* Background Glow */}
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute top-12 md:top-24 left-1/2 md:left-20 -translate-x-1/2 md:translate-x-0 w-[320px] h-[320px] md:w-[420px] md:h-[420px] bg-[#7eb6b8] opacity-[0.12] blur-[120px] rounded-full" />
    <div className="absolute bottom-12 md:bottom-24 right-1/2 md:right-20 translate-x-1/2 md:translate-x-0 w-[300px] h-[300px] md:w-[420px] md:h-[420px] bg-[#7eb6b8] opacity-[0.10] blur-[140px] rounded-full" />
  </div>

  <div
    className="
      max-w-7xl mx-auto px-4 sm:px-6 
      grid grid-cols-1 lg:grid-cols-2 gap-20 
      items-center relative z-10
    "
  >

    {/* LEFT TEXT BLOCK */}
    <div className="max-w-xl mx-auto lg:mx-0 text-center lg:text-left">

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="
          text-4xl sm:text-5xl md:text-6xl lg:text-7xl 
          font-semibold tracking-tight text-gray-900 
          leading-[1.15]
        "
      >
        Die schnellste<br />
        <span className="text-[#50969a]">Unternehmensanalyse</span><br />

        <span className="inline-block h-[1.2em] whitespace-nowrap overflow-hidden">
          für&nbsp;
          {sentences[index].substring(0, subIndex)}
          <span className="inline-block w-1">{blink ? "|" : " "}</span>
        </span>
      </motion.h1>

     <motion.p
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  className="
    mt-6 sm:mt-8
    text-lg sm:text-xl
    leading-relaxed text-gray-600 font-light
    max-w-xl mx-auto lg:mx-0
  "
>
  Erkenne in weniger als <strong className="text-gray-800">30 Minuten</strong>,
  wo dein Unternehmen wirklich steht – klar visualisiert, datenbasiert
  und ohne Berater.
</motion.p>

      {/* KPIs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="
          mt-10 sm:mt-12 
          grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 
          gap-8 text-sm text-gray-700 
          max-w-lg mx-auto lg:mx-0
        "
      >
        <div className="text-center lg:text-left">
          <div className="font-semibold text-gray-900">20–30 Minuten Analyse</div>
          <div className="text-gray-500">Schnell. Klar. Präzise.</div>
        </div>

        <div className="text-center lg:text-left">
          <div className="font-semibold text-gray-900">2 Blickwinkel</div>
          <div className="text-gray-500">Unternehmen & Team kombiniert.</div>
        </div>

        <div className="text-center lg:text-left">
          <div className="font-semibold text-gray-900">1 klares Bild</div>
          <div className="text-gray-500">Für echte Entscheidungen.</div>
        </div>
      </motion.div>

    </div>

    {/* RIGHT IMAGE */}
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9 }}
      className="flex justify-center lg:justify-end"
    >
      <img
        src="/illustrations/coreicon/13_core_icon_insights_dashboard.png"
        className="
          w-[70%] 
          max-w-[280px] sm:max-w-[320px] md:max-w-[380px]
          drop-shadow-[0_30px_80px_rgba(15,23,42,0.25)]
        "
        alt="Dashboard"
      />
    </motion.div>

  </div>
</section>



        
{/* ========================================================= */}
{/* SECTION: DATENPUNKTE – PREMIUM VERSION (CENTERED MOBILE) */}
{/* ========================================================= */}
<section className="py-32 bg-[#1b1f23] text-white relative overflow-hidden">

  {/* Glow */}
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 1.2 }}
    className="absolute inset-0 pointer-events-none"
  >
    <motion.div
      initial={{ y: 40 }}
      whileInView={{ y: 0 }}
      transition={{ duration: 2 }}
      className="absolute left-1/2 lg:left-10 bottom-0 -translate-x-1/2 lg:translate-x-0 
                 w-[420px] h-[420px] bg-[#7eb6b8] opacity-[0.12] blur-[140px]"
    />
  </motion.div>

  <div className="max-w-7xl mx-auto px-6 relative z-10">

    {/* GRID SPLIT */}
    <div className="
      lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] 
      gap-20 items-center
    ">

      {/* LEFT PANEL */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="flex justify-center lg:justify-start"
      >
        <div className="
          w-full max-w-sm 
          rounded-3xl bg-[#22272c] p-10 
          shadow-[0_25px_70px_rgba(0,0,0,0.45)] 
          flex flex-col gap-10
        ">
          {[
            {
              icon: "1_core_icon_growth",
              label: "Ziel",
              text: "Entscheidungen leichter machen.",
            },
            {
              icon: "2_core_icon_target",
              label: "Fokus",
              text: "Stärken sichtbar. Risiken erkannt. Prioritäten klar.",
            },
            {
              icon: "4_core_icon_pie",
              label: "Output",
              text: "Eine Analyse, die sofort verständlich ist – statt Bauchgefühl.",
            },
          ].map(({ icon, label, text }, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 + idx * 0.1 }}
              className="flex items-center gap-5"
            >
              <img
                src={`/illustrations/coreicon/${icon}.png`}
                className="w-[105px] h-[105px]"
                alt={label}
              />
              <div>
                <div className="text-sm text-gray-400">{label}</div>
                <div className="font-semibold text-white text-lg leading-snug">
                  {text}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* RIGHT TEXT – CENTERED MOBILE / LEFT DESKTOP */}
<motion.div
  initial={{ opacity: 0, y: 25 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.65 }}
  className="mt-16 sm:mt-20 text-center lg:text-left max-w-2xl mx-auto lg:mx-0"
>
  <h2 className="text-4xl md:text-5xl font-semibold leading-tight text-white tracking-tight">
    Tausende Datenpunkte.
    <span className="block text-[#8ad1d1]">Maximale Klarheit.</span>
    <span className="block">Keine Rätsel.</span>
  </h2>

  <p className="
    mt-6 text-lg text-gray-300 font-light 
    leading-relaxed max-w-xl mx-auto lg:mx-0
  ">
    Reportmii fasst Antworten, Muster und Signale zu einem klaren Bild zusammen.
    Verständlich, objektiv und sofort umsetzbar – ohne Berater, ohne komplizierte Reports.
  </p>
</motion.div>


    </div>

    {/* STAT GRID */}
    <div className="
      mt-20 grid gap-8 
      text-center 
      sm:grid-cols-2 xl:grid-cols-4
    ">
      {[
        ["+300 Analysen", "Erprobt in Unternehmen jeder Grösse."],
        ["90% gewinnen Klarheit", "Direkt nach ihrer ersten Analyse."],
        ["20–30 Minuten", "Für Business.mii – ohne Vorbereitung."],
        ["100% anonym", "Inside.mii ermöglicht ehrliches Team-Feedback."],
      ].map(([title, text], i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 + i * 0.08 }}
          className="
            p-6 bg-white/5 backdrop-blur rounded-2xl 
            border border-white/10 
            shadow-[0_12px_35px_rgba(0,0,0,0.25)]
          "
        >
          <div className="text-xl font-semibold text-white">{title}</div>
          <div className="text-gray-300 text-sm mt-1 leading-relaxed">
            {text}
          </div>
        </motion.div>
      ))}
    </div>

  </div>
</section>






{/* ========================================================= */}
{/* SECTION: WAS IST REPORTMII – PREMIUM VERSION              */}
{/* ========================================================= */}
<section className="py-32 bg-white relative overflow-hidden">

  {/* TITLE */}
  <motion.h2
    initial={{ opacity: 0, y: 15 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="text-4xl md:text-5xl font-semibold text-center text-gray-900"
  >
    Was ist Reportmii?
  </motion.h2>

  <motion.p
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  transition={{ duration: 0.6 }}
  className="mt-4 text-gray-600 text-lg max-w-xl mx-auto text-center leading-relaxed"
>
  Reportmii zeigt dir in wenigen Minuten, <br /> wo dein Unternehmen steht –
  <br />
  klar visualisiert, strukturiert und sofort verständlich.
</motion.p>


 {/* FEATURE CARDS */}
<div className="mt-20 grid md:grid-cols-3 gap-12 max-w-7xl mx-auto px-6">

  {[
    {
      icon: "6_core_icon_document",
      title: "Ganzheitlicher Blick",
      text: "Strategie, Struktur, Prozesse, Team und Umsetzung – übersichtlich zusammengefasst.",
    },
    {
      icon: "8_core_icon_compass",
      title: "Klarheit statt Datenrauschen",
      text: "Keine unklaren Zahlen. Klare Kategorien, Scores und Prioritäten.",
    },
    {
      icon: "9_core_icon_dataflow",
      title: "Von Analyse zu Handlung",
      text: "Reportmii zeigt dir, wo du stehst – und was du sofort tun solltest.",
    },
  ].map(({ icon, title, text }, i) => (

    <motion.div
      key={i}
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55 + i * 0.1 }}
      className="
        p-10 rounded-3xl 
        bg-[#f5fbfb] 
        border border-gray-100 
        shadow-[0_12px_28px_rgba(0,0,0,0.06)]
        text-center
        flex flex-col items-center
      "
    >
      <img
        src={`/illustrations/coreicon/${icon}.png`}
        className="w-[105px] h-[105px]"
        alt={title}
      />

      <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">
        {title}
      </h3>

      <p className="text-gray-600 font-light leading-relaxed text-center">
        {text}
      </p>
    </motion.div>

  ))}
</div>


</section>


        
{/* ========================================================= */}
{/* SECTION: PAIN POINTS – EMOTIONAL, KLAR, PREMIUM          */}
{/* ========================================================= */}
<section className="py-32 bg-[#8ccfd0] text-black relative overflow-hidden">

  {/* Soft Glow */}
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute right-10 top-24 w-[360px] h-[360px] bg-white opacity-[0.12] blur-[160px] rounded-full" />
  </div>

  <div className="max-w-7xl mx-auto px-6 relative z-10">

    {/* TITLE */}
    <motion.h2
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-4xl md:text-5xl font-semibold text-center text-black leading-tight"
    >
      Ohne Klarheit steckst du fest.<br />
      <span className="text-[#0f1418]">Mit Klarheit wächst du.</span>
    </motion.h2>

    <div className="grid md:grid-cols-2 gap-20 mt-20 items-start">

      {/* LEFT – PAIN BOXES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-xl w-full">

        {[
          "Prioritäten wechseln täglich – du arbeitest viel, aber wenig bewegt sich.",
          "Das Team versteht die Strategie anders als du – und alle ziehen in unterschiedliche Richtungen.",
          "Meetings drehen sich im Kreis – Entscheidungen dauern zu lange.",
          "Du entscheidest nach Bauchgefühl – weil echte Signale fehlen.",
          "Probleme bleiben unsichtbar, bis sie teuer werden.",
          "Du spürst, dass mehr möglich wäre – aber nicht, wo du ansetzen sollst.",
        ].map((txt, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 + i * 0.05 }}
            className="p-6 bg-[#0f1418] rounded-3xl border border-white/10 shadow-[0_18px_45px_rgba(0,0,0,0.45)] min-h-[130px] flex items-center"
          >
            <p className="text-white text-lg leading-relaxed">{txt}</p>
          </motion.div>
        ))}

      </div>

      {/* RIGHT – EXPLANATION */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center text-center max-w-xl"
      >
        <img
          src="/illustrations/coreicon/20_core_icon_breakthrough_clarity.png"
          className="w-48 h-48 mb-10 drop-shadow-[0_15px_35px_rgba(0,0,0,0.35)]"
        />

        <div className="space-y-3 max-w-sm">

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="text-black text-2xl font-semibold leading-snug"
          >
            Reportmii macht sichtbar,
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.25 }}
            className="text-black text-2xl font-semibold leading-snug"
          >
            was du bisher nur gespürt hast.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.4 }}
            className="text-black/80 text-base leading-relaxed"
          >
            Du erkennst klar, wo du stark bist, wo du blockiert wirst
            und was du sofort tun solltest.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.55 }}
            className="text-black/80 text-base leading-relaxed"
          >
            Klar. Ehrlich. Ohne Interpretationsspielraum.
          </motion.p>

        </div>

        <motion.img
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          src="/illustrations/coreicon/7_core_icon_brain.png"
          className="w-48 h-48 mt-10 drop-shadow-[0_15px_35px_rgba(0,0,0,0.35)]"
          alt="Breakthrough Clarity"
        />
      </motion.div>

    </div>
  </div>
</section>





{/* ========================================================= */}
{/* SECTION: HOW IT WORKS – ICON POP ANIMATION               */}
{/* ========================================================= */}
<section className="py-32 bg-[#f0f7f7] relative overflow-hidden">

  {/* FX Background */}
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute left-10 top-20 w-[420px] h-[420px] bg-[#7eb6b8] opacity-[0.12] blur-[140px]" />
    <div className="absolute right-10 bottom-20 w-[420px] h-[420px] bg-[#7eb6b8] opacity-[0.10] blur-[140px]" />
  </div>

  <div className="max-w-7xl mx-auto px-6 text-center relative z-10">

    {/* TITLE */}
    <motion.h2
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-4xl md:text-5xl font-semibold text-gray-900"
    >
      So funktioniert Reportmii.
    </motion.h2>

    {/* STEPS */}
    <div className="grid md:grid-cols-3 gap-16 mt-20">

      {[
        {
          img: "/illustrations/coreicon/3_core_icon_check.png",
          title: "Fragen beantworten",
          text: "Einfache Fragen – klar strukturiert und ohne Fachbegriffe."
        },
        {
          img: "/illustrations/coreicon/12_core_icon_alert.png",
          title: "Analyse läuft automatisch",
          text: "Reportmii erkennt Muster und berechnet Prioritäten."
        },
        {
          img: "/illustrations/coreicon/15_core_icon_report.png",
          title: "Erhalte klare Resultate",
          text: "Übersichtliche Scores, klare Kategorien und konkrete Empfehlungen."
        }
      ].map((s, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 + i * 0.1 }}
          className="
            p-12 bg-white rounded-3xl border border-gray-200
            shadow-[0_12px_40px_rgba(0,0,0,0.08)] hover:shadow-[0_16px_55px_rgba(0,0,0,0.12)]
            transition flex flex-col items-center
          "
        >

          {/* ICON POP-UP */}
          <motion.img
            src={s.img}
            className="w-[105px] h-[105px] mb-8 drop-shadow-[0_10px_20px_rgba(0,0,0,0.12)]"
            initial={{ scale: 0.85, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 0.9,
              delay: 0.25 + i * 0.15,
              ease: "easeOut"
            }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.08 }}
          />

          <h3 className="text-xl font-semibold text-gray-900">
            {s.title}
          </h3>

          <p className="text-gray-600 mt-4 text-sm md:text-base max-w-[260px] leading-relaxed">
            {s.text}
          </p>

        </motion.div>
      ))}

    </div>
  </div>
</section>
{/* ========================================================= */}
{/* SECTION: 2 ANALYSEN – PREMIUM-CARDS                      */}
{/* ========================================================= */}

<section className="py-32 bg-white relative">
  <div className="max-w-7xl mx-auto px-6 text-center">

    <motion.h2
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-4xl md:text-5xl font-semibold text-gray-900"
    >
      Zwei Analysen. Ein Ziel: Klarheit.
    </motion.h2>

    <motion.p
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="text-gray-600 mt-4 text-lg max-w-2xl mx-auto leading-relaxed"
    >
      Deine Sicht kombiniert mit der anonymen Perspektive deines Teams –  
      zwei Blickwinkel, ein ehrliches Gesamtbild.
    </motion.p>

    <div className="grid md:grid-cols-2 gap-14 mt-20">

      {/* ========================================================= */}
      {/* BUSINESS.MII CARD                                         */}
      {/* ========================================================= */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        whileHover={{
          scale: 1.03,
          rotateX: 4,
          rotateY: -4,
          boxShadow: "0 25px 60px rgba(0,0,0,0.15), 0 0 40px rgba(126,182,184,0.4)"
        }}
        className="relative p-12 bg-[#f7ffff] rounded-3xl border border-[#d9eeee] shadow-xl transition-transform cursor-pointer"
      >

        {/* BADGES */}
        <div className="absolute top-6 left-6 flex gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#e8f4f4] text-[#1b1f23]">
            Für Führungskräfte
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#e8f4f4] text-[#1b1f23]">
            20–30 Min
          </span>
        </div>

        {/* ICON */}
        <div className="flex justify-center mb-10">
          <img
            src="/illustrations/coreicon/16_core_icon_business_mii.png"
            className="w-[68%] drop-shadow-[0_18px_45px_rgba(15,23,42,0.22)]"
          />
        </div>

        {/* TITLE */}
        <h3 className="text-2xl font-semibold text-gray-900">Business.mii</h3>

        <p className="text-gray-600 mt-3 leading-relaxed">
          Deine Perspektive auf Strategie, Struktur, Markt & Umsetzung – klar, strukturiert und fundiert.
        </p>

        {/* MINI-SCORES */}
        <div className="mt-8 space-y-3 text-left">
          {[
            ["Strategie", 80],
            ["Struktur", 70],
            ["Fokus", 75],
          ].map(([label, value], idx) => (
            <div key={idx}>
              <div className="flex justify-between text-sm text-gray-700 mb-1">
                <span>{label}</span>
                <span>{value}%</span>
              </div>

              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${value}%` }}
                transition={{ duration: 0.8, delay: idx * 0.15 }}
                className="h-2 rounded-full bg-[#7eb6b8]"
              />
            </div>
          ))}
        </div>

        {/* CTA */}
        <Link
          to="/business"
          className="mt-10 inline-block w-full py-4 rounded-full bg-[#7eb6b8] text-black text-center font-medium hover:bg-[#1b1f23] hover:text-white transition shadow-[0_0_25px_rgba(126,182,184,0.35)]"
        >
          Mehr zu Business.mii
        </Link>
      </motion.div>



      {/* ========================================================= */}
      {/* INSIDE.MII CARD                                           */}
      {/* ========================================================= */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        whileHover={{
          scale: 1.03,
          rotateX: 4,
          rotateY: 4,
          boxShadow: "0 25px 60px rgba(0,0,0,0.15), 0 0 40px rgba(126,182,184,0.4)"
        }}
        className="relative p-12 bg-[#101417] rounded-3xl border border-[#222c33] shadow-xl transition-transform cursor-pointer"
      >

        {/* BADGES */}
        <div className="absolute top-6 left-6 flex gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#1f2a30] text-[#7eb6b8]">
            100% anonym
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#1f2a30] text-[#7eb6b8]">
            Ab 3 Personen
          </span>
        </div>

        {/* ICON */}
        <div className="flex justify-center mb-10">
          <img
            src="/illustrations/coreicon/17_core_icon_inside_mii.png"
            className="w-[68%] drop-shadow-[0_18px_45px_rgba(0,0,0,0.45)]"
          />
        </div>

        {/* TITLE */}
        <h3 className="text-2xl font-semibold text-white">Inside.mii</h3>

        <p className="text-gray-300 mt-3 leading-relaxed">
          Ehrliche Sicht deines Teams auf Zusammenarbeit, Kultur & Vertrauen – vollständig anonym.
        </p>

        {/* MINI-SCORES */}
        <div className="mt-8 space-y-3 text-left">
          {[
            ["Teamgefühl", 85],
            ["Kommunikation", 75],
            ["Vertrauen", 90],
          ].map(([label, value], idx) => (
            <div key={idx}>
              <div className="flex justify-between text-sm text-gray-400 mb-1">
                <span>{label}</span>
                <span>{value}%</span>
              </div>

              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${value}%` }}
                transition={{ duration: 0.8, delay: idx * 0.15 }}
                className="h-2 rounded-full bg-[#7eb6b8]"
              />
            </div>
          ))}
        </div>

        {/* CTA */}
        <Link
          to="/inside"
          className="mt-10 inline-block w-full py-4 rounded-full bg-[#7eb6b8] text-black text-center font-medium hover:bg-[#1b1f23] hover:text-white transition shadow-[0_0_25px_rgba(126,182,184,0.35)]"
        >
          Mehr zu Inside.mii
        </Link>
      </motion.div>

    </div>
  </div>
</section>




{/* ========================================================= */}
{/* SECTION: TESTIMONIALS – FULL DESKTOP SLIDER + MOBILE STACK */}
{/* ========================================================= */}
<section className="py-32 bg-[#0f1418] text-white relative overflow-hidden">

  {/* Background Glow */}
  <div className="absolute inset-0">
    <div className="absolute left-20 top-32 w-[380px] h-[380px] bg-[#7eb6b8] opacity-[0.12] blur-[180px] rounded-full" />
    <div className="absolute right-20 bottom-20 w-[320px] h-[320px] bg-[#7eb6b8] opacity-[0.08] blur-[160px] rounded-full" />
  </div>

  <div className="relative z-10 max-w-7xl mx-auto px-6">

    {/* TITLE */}
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-4xl md:text-5xl font-semibold text-center text-white mb-16"
    >
      Was andere über Reportmii sagen
    </motion.h2>


    {/* ======================================================= */}
    {/* MOBILE STACK VERSION                                    */}
    {/* ======================================================= */}
    <div className="md:hidden flex flex-col gap-8">

      {[
        { name: "Anna R.", role: "HR-Leiterin", gender: "f",
          text: "„Die Analyse hat uns gezeigt, wo wir wirklich stehen. Wir konnten danach sofort klar entscheiden.“" },

        { name: "Thomas W.", role: "CEO & Gründer", gender: "m",
          text: "„Endlich klare Prioritäten statt Bauchgefühl – Reportmii ist ein Gamechanger.“" },

        { name: "Julia M.", role: "Teamleiterin Marketing", gender: "f",
          text: "„Unsere blinden Flecken wurden sichtbar – wir wussten sofort, was die nächsten Schritte sind.“" },
      ].map((t, i) => (
        <div
          key={i}
          className="p-8 bg-white/5 backdrop-blur-sm rounded-3xl 
                     border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.35)]"
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



    {/* ======================================================= */}
    {/* DESKTOP SLIDER                                          */}
    {/* ======================================================= */}
    <div className="hidden md:block relative">

      {/* LEFT ARROW */}
      <button
        id="testimonial-left"
        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 
                   w-12 h-12 flex items-center justify-center 
                   bg-[#7eb6b8] text-black rounded-full shadow-xl 
                   hover:brightness-110 transition opacity-0 pointer-events-none"
        onClick={() => {
          const sc = document.getElementById("testimonial-track");
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
        id="testimonial-right"
        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 
                   w-12 h-12 flex items-center justify-center 
                   bg-[#7eb6b8] text-black rounded-full shadow-xl 
                   hover:brightness-110 transition"
        onClick={() => {
          const sc = document.getElementById("testimonial-track");
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
        id="testimonial-track"
        className="flex gap-8 overflow-x-hidden scroll-smooth px-2"
        style={{ scrollSnapType: "x mandatory", scrollbarWidth: "none" }}
        onScroll={() => {
          const sc = document.getElementById("testimonial-track");
          const left = document.getElementById("testimonial-left");
          const right = document.getElementById("testimonial-right");
          if (!sc || !left || !right) return;

          const max = sc.scrollWidth - sc.clientWidth;

          left.style.opacity = sc.scrollLeft > 10 ? "1" : "0";
          left.style.pointerEvents = sc.scrollLeft > 10 ? "auto" : "none";

          right.style.opacity = sc.scrollLeft >= max - 20 ? "0" : "1";
          right.style.pointerEvents = sc.scrollLeft >= max - 20 ? "none" : "auto";
        }}
      >

        {[
          { name: "Anna R.", role: "HR-Leiterin", gender: "f",
            text: "„Die Analyse hat uns gezeigt, wo wir wirklich stehen. Wir konnten danach sofort klar entscheiden.“" },
          { name: "Thomas W.", role: "CEO & Gründer", gender: "m",
            text: "„Endlich klare Prioritäten statt Bauchgefühl – Reportmii ist ein Gamechanger.“" },
          { name: "Julia M.", role: "Teamleiterin Marketing", gender: "f",
            text: "„Unsere blinden Flecken wurden sichtbar – wir wussten sofort, was die nächsten Schritte sind.“" },
          { name: "Christian F.", role: "Head of Operations", gender: "m",
            text: "„Transparenz wie nie zuvor. Wir konnten Ressourcen neu verteilen und sofort handeln.“" },
          { name: "Laura S.", role: "People & Culture Lead", gender: "f",
            text: "„Ein Tool, das das Team ernst nimmt und echten Dialog auslöst.“" },
          { name: "Marco T.", role: "CTO", gender: "m",
            text: "„Reportmii hat strukturelle Probleme sichtbar gemacht, die wir sonst nie erkannt hätten.“" },
        ].map((t, i) => (
          <div
            key={i}
            className="w-[calc(33.333%-1.33rem)] snap-start flex-shrink-0
                       p-6 bg-white/5 backdrop-blur-sm rounded-3xl
                       border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.35)]"
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
{/* SECTION: FAQ – clean, crisp, premium                      */}
{/* ========================================================= */}
<section className="py-32 bg-[#f7fafa] relative">

  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute left-10 top-24 w-[360px] h-[360px] bg-[#7eb6b8] blur-[140px] opacity-[0.10]" />
  </div>

  <div className="max-w-4xl mx-auto px-6 relative z-10">

    <motion.h2
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="text-3xl md:text-4xl font-semibold text-gray-900 text-center"
    >
      Häufige Fragen
    </motion.h2>

    <div className="mt-14 space-y-4">
      {/* FAQ MAP START */}
      {[
        {
          q: "Wie zuverlässig ist die Analyse?",
          a: "Reportmii kombiniert qualitative Einschätzungen mit strukturierten Kategorien."
        },
        {
          q: "Wie lange dauert Business.mii?",
          a: "Unter 30 Minuten – ohne Vorbereitung."
        },
        {
          q: "Ist Inside.mii wirklich anonym?",
          a: "Ja. 100% anonym."
        },
        {
          q: "Kann ich die Analyse exportieren?",
          a: "Ja – als PDF."
        },
        {
          q: "Brauche ich ein Onboarding?",
          a: "Nein. Direkt startklar."
        }
      ].map((item, i) => (
        <motion.details
          key={i}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 + i * 0.1 }}
          className="group border border-gray-200 rounded-2xl bg-white px-6 py-5 shadow-[0_8px_25px_rgba(0,0,0,0.04)]"
        >
          <summary className="flex items-center justify-between cursor-pointer">
            <span className="font-medium text-gray-900 text-sm md:text-base">{item.q}</span>
            <span className="ml-4 text-gray-500 group-open:rotate-180 transition-transform">▼</span>
          </summary>
          <div className="mt-3 text-gray-600 text-sm md:text-base leading-relaxed">
            {item.a}
          </div>
        </motion.details>
      ))}
      {/* FAQ MAP END */}
    </div>
  </div>
</section>



{/* ========================================================= */}
{/* FINAL CTA – DARK CHARCOAL PREMIUM SECTION                */}
{/* ========================================================= */}

<section
  ref={ctaRef}
  id="final-cta"
 className="py-32 bg-[#1b1f23] text-white text-center relative overflow-hidden"
>

  {/* BACKGROUND GLOWS */}
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute left-1/2 top-16 w-[420px] h-[420px] bg-[#7eb6b8] opacity-[0.10] blur-[180px] -translate-x-1/2" />
    <div className="absolute right-20 bottom-0 w-[320px] h-[320px] bg-[#7eb6b8] opacity-[0.08] blur-[160px]" />
  </div>

  <div className="relative z-10 max-w-5xl mx-auto px-6">

    {/* TITLE */}
    <motion.h2
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      viewport={{ once: true }}
      className="text-4xl md:text-5xl font-semibold leading-tight text-white"
    >
      {ctaText}
      <span className="inline-block w-1 animate-pulse">|</span>
    </motion.h2>

    {/* SUBHEAD */}
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.1, ease: "easeOut" }}
      viewport={{ once: true }}
      className="mt-6 text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
    >
      Starte deine Analyse – ohne Setup, ohne Beratung, ohne komplizierte Tools.  
      Nur ehrliche, klare Erkenntnisse.
    </motion.p>

    {/* BUTTONS */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.2, ease: "easeOut" }}
      viewport={{ once: true }}
      className="mt-14 flex flex-wrap justify-center gap-6"
    >

      {/* BUSINESS BUTTON */}
      <motion.div
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.2 }}
        className="px-12 py-4 rounded-full bg-[#7eb6b8] text-black font-semibold text-lg shadow-[0_0_25px_rgba(126,182,184,0.35)] hover:brightness-110 cursor-pointer"
      >
        <Link to="/business">
          Business.mii starten
        </Link>
      </motion.div>

      {/* INSIDE BUTTON */}
      <motion.div
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.2 }}
        className="px-12 py-4 rounded-full bg-white text-black font-medium text-lg hover:bg-gray-200 cursor-pointer shadow-[0_0_25px_rgba(255,255,255,0.15)]"
      >
        <Link to="/inside">
          Inside.mii entdecken
        </Link>
      </motion.div>

    </motion.div>

    {/* ICON */}
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, delay: 0.25, ease: "easeOut" }}
      viewport={{ once: true }}
      className="mt-16 flex justify-center"
    >
      <motion.img
        src="/illustrations/coreicon/1_core_icon_growth.png"
        alt="Growth Icon"
        className="w-44 h-44 drop-shadow-[0_25px_60px_rgba(0,0,0,0.45)]"
        animate={{ scale: [1, 1.03, 1], opacity: [1, 0.9, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>

  </div>
</section>





</div> 
</ParallaxProvider>
);

}

export default LandingPage;

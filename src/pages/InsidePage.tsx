// src/pages/InsidePage.tsx
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { Button } from "../components/Button";
import { VideoModal } from "../components/VideoModal";
import { AnimatedShapesInside } from "../components/AnimatedShapesInside";

function IconRotateCard({ item, index }: { item: any; index: number }) {
  const [hasRotated, setHasRotated] = useState(false);
  const hasTriggered = useRef(false);

  useEffect(() => {
    let scrollAmount = 0;

    const handleScroll = () => {
      if (hasTriggered.current) return;

      scrollAmount = window.scrollY;

      if (scrollAmount < 50) return;

      hasTriggered.current = true;
      setTimeout(() => {
        setHasRotated(true);
      }, index * 120);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [index]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55 + index * 0.12 }}
      className="
        p-10 rounded-3xl
        bg-white/5 backdrop-blur-xl
        border border-white/10
        shadow-[0_12px_28px_rgba(0,0,0,0.35)]
        hover:shadow-[0_18px_40px_rgba(0,0,0,0.55)]
        hover:-translate-y-1.5
        transition-all
      "
    >
      <motion.img
        src={item.img}
        className="w-[105px] h-[105px] mx-auto mb-6 drop-shadow-[0_12px_30px_rgba(0,0,0,0.35)]"
        alt={item.title}
        animate={{ rotateY: hasRotated ? 360 : 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      />

      <h3 className="text-xl font-semibold text-white mb-3">
        {item.title}
      </h3>

      <p className="text-gray-300 leading-relaxed">
        {item.text}
      </p>
    </motion.div>
  );
}

export default function InsidePage() {
  const navigate = useNavigate();
  const [showDemo, setShowDemo] = useState(false);

  return (
    <MainLayout background={<AnimatedShapesInside />}>

      {/* ========================================================= */}
      {/* HERO – Icon left, Text right                             */}
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
              src="/illustrations/inside/2_inside.mii_team_alignment.png"
              alt="Inside.mii Team Alignment"
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
              Inside.mii
              <span className="block text-mint-600">die Stimme deines Teams.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="text-lg md:text-xl text-gray-900 max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              Die schnellste, ehrlichste und anonymste Art herauszufinden,
              wie sich dein Team fühlt, wo es hakt – und was dein Unternehmen
              wirklich stärkt. Präzise Insights, klare Muster, echte Wirkung.
            </motion.p>

            {/* CTA BUTTONS */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.15 }}
              className="flex flex-col sm:flex-row gap-4 mt-10 justify-center lg:justify-start"
            >
              <motion.button
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.10, 1] }}
                transition={{ duration: 1.8, repeat: Infinity }}
                className="px-9 py-4 rounded-full text-lg font-semibold bg-[#7eb6b8] text-black shadow-[0_0_25px_rgba(126,182,184,0.35)] hover:bg-[#1b1f23] hover:text-white transition"
                onClick={() => navigate("/inside-checkout")}
              >
                Team-Analyse starten – ab 1'297 €
              </motion.button>

            </motion.div>
          </div>
        </div>
      </section>

      {/* VIDEO MODAL */}
      <VideoModal
        isOpen={showDemo}
        onClose={() => setShowDemo(false)}
        videoSrc="/videos/inside-demo.mp4"
      />


{/* ========================================================= */}
      {/* SIX INSIDE AREAS – GLASS-MORPH FLOATING CARDS            */}
      {/* ========================================================= */}
      <section className="py-32 bg-[#1b1f23] text-white relative overflow-hidden">

        {/* BG FX */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-10 top-20 w-[380px] h-[380px] bg-mint-500 opacity-[0.12] blur-[160px]" />
          <div className="absolute right-10 bottom-20 w-[380px] h-[380px] bg-mint-500 opacity-[0.10] blur-[200px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">

          {/* TITLE */}
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-semibold text-center text-white"
          >
            Die sechs Kernbereiche deiner Teamwahrheit
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="mt-4 text-gray-300 text-lg max-w-2xl mx-auto text-center leading-relaxed"
          >
            Jeder Bereich zeigt dir ein neues Stück der Wahrheit –  
            klar, anonym und schonungslos ehrlich.
          </motion.p>

          {/* GRID */}
          <div className="mt-20 grid md:grid-cols-3 gap-14">

            {[
              {
                img: "/illustrations/inside/1_inside.mii_team_communication.png",
                title: "Team Alignment & Zusammenarbeit",
                text: "Wie gut Teams wirklich zusammenarbeiten – und wo Silos oder Missverständnisse entstehen."
              },
              {
                img: "/illustrations/inside/3_inside.mii_trust_leadership.png",
                title: "Leadership Quality & Vertrauen",
                text: "Wie Führung erlebt wird, ob Vertrauen besteht – und wie motivierend die Kommunikation ist."
              },
              {
                img: "/illustrations/inside/7_inside.mii_conflict_tension_detection.png",
                title: "Communication Clarity & Informationsfluss",
                text: "Wie offen, klar und schnell Informationen fließen – oder ob Reibung entsteht."
              },
              {
                img: "/illustrations/inside/15_inside.mii_overall_team_health.png",
                title: "Role Clarity & Verantwortlichkeiten",
                text: "Wie sicher sich Mitarbeitende in ihrer Rolle fühlen – und ob Aufgaben klar verteilt sind."
              },
              {
                img: "/illustrations/inside/9_inside.mii_team_innovation.png",
                title: "Innovation Culture & Veränderungsbereitschaft",
                text: "Wie offen dein Unternehmen für Neues ist – und wie viele Ideen ungenutzt bleiben."
              },
              {
                img: "/illustrations/inside/14_inside.mii_team_emotional_climate.png",
                title: "Workload Pressure & Stress Balance",
                text: "Ob Deadlines realistisch sind, Teams überlastet sind – oder Gefahr besteht auszubrennen."
              }
            ].map((item, i) => (

              <IconRotateCard key={i} item={item} index={i} />
            ))}

          </div>
        </div>
      </section>      


      
      
      


{/* ========================================================= */}
{/* WHY NOW – Timing Section (Inside.mii Style)                */}
{/* ========================================================= */}

<section className="py-32 bg-white relative overflow-hidden">

  {/* Background Glow */}
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute left-0 top-32 w-[380px] h-[380px] bg-mint-500 opacity-[0.12] blur-[180px]" />
    <div className="absolute right-0 bottom-20 w-[320px] h-[320px] bg-mint-500 opacity-[0.08] blur-[160px]" />
  </div>

  <div className="relative z-10 max-w-6xl mx-auto px-6">

    {/* Title */}
    <motion.h2
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55 }}
      className="text-4xl md:text-5xl font-semibold text-center text-gray-900"
    >
      Warum jetzt der richtige Zeitpunkt für Inside.mii ist
    </motion.h2>

    {/* Subtext */}
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: 0.1 }}
      className="mt-4 text-lg md:text-xl text-gray-700 max-w-3xl mx-auto text-center leading-relaxed"
    >
      Unternehmen, die ihre Teamwahrheit ignorieren, verlieren Geschwindigkeit —  
      Unternehmen, die sie verstehen, sind unschlagbar.
    </motion.p>

    {/* 3 Reasons – Landingpage Style Box */}
    <div className="mt-20 grid md:grid-cols-3 gap-10">
      {[
        {
          img: "/illustrations/inside/4_inside.mii_roles_responsibilities.png",
          title: "Unsichtbare Probleme sichtbar machen",
          text: "Inside.mii zeigt Muster, die sonst jahrelang verborgen bleiben — bevor sie teuer werden."
        },
        {
          img: "/illustrations/inside/10_inside.mii_feedback_culture.png",
          title: "Bessere Entscheidungen treffen",
          text: "Teams sprechen anonym aus, was Führungskräfte wissen müssen, um mutige Schritte zu gehen."
        },
        {
          img: "/illustrations/inside/11_inside.mii_workload_pressure.png",
          title: "Risiken früh erkennen",
          text: "Überlastung, Frust, Misalignment — Inside.mii zeigt Warnsignale, bevor sie eskalieren."
        },
      ].map((reason, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 + i * 0.1 }}
          className="
            p-10 bg-white rounded-3xl shadow-soft border border-gray-200
            hover:-translate-y-2 hover:shadow-md transition-all 
            text-center
          "
        >
          <img
            src={reason.img}
            className="w-[105px] h-[105px] mx-auto mb-4 drop-shadow-[0_10px_25px_rgba(0,0,0,0.25)]"
            alt={reason.title}
          />

          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            {reason.title}
          </h3>

          <p className="text-gray-600 leading-relaxed">
            {reason.text}
          </p>
        </motion.div>
      ))}
    </div>

    {/* CTA Button */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: 0.3 }}
      className="mt-16 flex justify-center"
    >
      <motion.button
        onClick={() => navigate("/inside-checkout")}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        className="
          px-12 py-4 rounded-full bg-[#7eb6b8] text-black font-semibold text-lg
          shadow-[0_8px_20px_rgba(126,182,184,0.3)]
          hover:bg-[#1b1f23] hover:text-white hover:shadow-[0_12px_28px_rgba(0,0,0,0.4)]
          transition-all
        "
      >
        Jetzt Inside.mii starten – ab 1'297 €
      </motion.button>
    </motion.div>

  </div>
</section>



{/* ========================================================= */}
{/* SECTION: WAS DU MIT INSIDE.MII BEKOMMST – MINT SECTION    */}
{/* ========================================================= */}

<section className="py-32 bg-[#8ccfd0] text-black relative overflow-hidden">

  {/* BG FX */}
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute left-10 top-20 w-[420px] h-[420px] 
         bg-[#7eb6b8] opacity-[0.18] blur-[160px]" />
    <div className="absolute right-10 bottom-20 w-[380px] h-[380px] 
         bg-[#7eb6b8] opacity-[0.14] blur-[180px]" />
  </div>

  <div className="relative z-10 max-w-7xl mx-auto px-6">

    {/* TITLE */}
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-4xl md:text-5xl font-semibold text-center text-black"
    >
      Was du mit Inside.mii bekommst
    </motion.h2>

    {/* GRID */}
    <div className="mt-20 grid md:grid-cols-2 gap-14">

      {[
        {
          icon: "/illustrations/inside/16_inside.mii_ehrliches_teamfeedback.png",
          title: "Ehrliches Teamfeedback",
          text: "Du erhältst unverfälschte Sichtweisen zu Führung, Kultur, Zusammenarbeit und Vertrauen.",
        },
        {
          icon: "/illustrations/inside/17_inside.mii_patterns_bottlenecks.png",
          title: "Klare Muster & Engpässe",
          text: "Inside.mii zeigt dir sofort, wo Kommunikation stockt, wo Konflikte entstehen und was Teams belastet.",
        },
        {
          icon: "/illustrations/inside/8_inside.mii_strengths_potential.png",
          title: "Einblicke in Stimmung & Fokus",
          text: "Erkenne, wie das Team Entscheidungen wahrnimmt, ob Prioritäten klar sind und wie sicher sich Mitarbeitende fühlen.",
        },
        {
          icon: "/illustrations/inside/18_inside.mii_patterns_bottlenecks.png",
          title: "Konkrete Handlungsschritte",
          text: "Du bekommst klare Empfehlungen, wie du Kultur, Vertrauen und Zusammenarbeit nachhaltig stärkst.",
        }
      ].map((item, i) => (
        
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 + i * 0.1 }}
          className="
            bg-[#1b1f23]
            p-10 
            rounded-3xl 
            border border-white/10 
            shadow-[0_12px_28px_rgba(0,0,0,0.35)] 
            hover:-translate-y-1 
            transition-all
          "
        >
          {/* ICON */}
          <img
            src={item.icon}
            className="w-[105px] h-[105px] mb-6 drop-shadow-[0_10px_20px_rgba(0,0,0,0.3)]"
            alt={item.title}
          />

          {/* TITLE */}
          <h3 className="text-xl font-semibold text-white mb-3">
            {item.title}
          </h3>

          {/* TEXT */}
          <p className="text-gray-300 leading-relaxed">
            {item.text}
          </p>
        </motion.div>

      ))}

    </div>

  </div>
</section>


{/* ========================================================= */}
{/* SECTION: INSIDE FACTS — MINT SOCIAL PROOF                */}
{/* ========================================================= */}

<section className="py-32 bg-[#e9f4f4] relative overflow-hidden">

  {/* FX */}
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute left-20 top-16 w-[360px] h-[360px] bg-[#7eb6b8] opacity-[0.12] blur-[160px]" />
    <div className="absolute right-16 bottom-10 w-[300px] h-[300px] bg-[#7eb6b8] opacity-[0.10] blur-[120px]" />
  </div>

  <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">

    {/* TITLE */}
    <motion.h2
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-4xl md:text-5xl font-semibold text-gray-900"
    >
      Zahlen, die dein Team wirklich zeigen
    </motion.h2>

    {/* SUBTEXT */}
    <motion.p
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="text-gray-600 text-lg max-w-2xl mx-auto mt-4 leading-relaxed"
    >
      Inside.mii liefert klare, ehrliche und anonymisierte Insights  
      – damit du verstehst, was in deinem Team wirklich passiert.
    </motion.p>

    {/* GRID */}
    <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-10 mt-20">

      {[
        ["92% echte Ehrlichkeit", "Teams fühlen sich sicher genug, offen zu sprechen."],
        ["85% Kultur-Relevanz", "Fragen decken die wichtigsten Verhaltensmuster ab."],
        ["100% anonym", "Kein Tracking, keine Identifikation – volle Sicherheit."],
        ["80% Klarheitsgewinn", "Führungskräfte erkennen Probleme schneller & präziser."]
      ].map(([title, text], i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 + i * 0.1 }}
          className="p-8 bg-white rounded-3xl border border-gray-200 shadow-[0_12px_28px_rgba(0,0,0,0.05)]"
        >
          <div className="text-3xl font-semibold text-gray-900">{title}</div>
          <p className="text-gray-600 mt-2 leading-relaxed">{text}</p>
        </motion.div>
      ))}

    </div>
  </div>
</section>

      

{/* ========================================================= */}
{/* SECTION: WAS INSIDE.MII EINZIGARTIG MACHT — OPTIMIERT     */}
{/* ========================================================= */}

<section className="py-32 bg-white relative overflow-hidden">

  {/* BG FX */}
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute left-0 top-20 w-[300px] h-[300px] bg-[#7eb6b8] opacity-[0.08] blur-[160px]" />
  </div>

  <div className="relative z-10 max-w-7xl mx-auto px-6">

    <div className="grid lg:grid-cols-2 gap-20 items-center">

      {/* ============================= */}
      {/* LEFT TEXT BLOCK (BOLDER)     */}
      {/* ============================= */}
      <div className="max-w-xl lg:text-left text-center mx-auto lg:mx-0">

        {/* HERO ICON LEFT — BIGGER */}
        <motion.img
          src="/illustrations/inside/19_inside.mii_hero_team_dynamics.png"
          alt="Inside Icon"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="w-28 mb-7 drop-shadow-[0_8px_18px_rgba(0,0,0,0.25)] mx-auto lg:mx-0"
        />

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6"
        >
          Was Inside.mii
          <span className="text-[#50969a] block">einzigartig macht</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="text-lg text-gray-700 leading-relaxed"
        >
          Inside.mii zeigt, was im Verborgenen bleibt: ehrliche Teamwahrnehmung,
          Klarheit über Kultur, Vertrauen, Führung und Zusammenarbeit.
          <br /><br />
          Keine Politik. Keine Verzerrung.
          Nur echte Insights, die du sofort nutzen kannst.
        </motion.p>

      </div>

      
      {/* ============================= */}
      {/* RIGHT INSIDE CARD — COMPACT   */}
      {/* ============================= */}
      <motion.div
        initial={{ opacity: 0, y: 25, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="relative p-8 bg-[#101417] rounded-3xl border border-[#222c33]
                   shadow-xl w-[80%] mx-auto"
      >

        {/* ICON */}
        <div className="flex justify-center mb-6">
          <img
            src="/illustrations/coreicon/17_core_icon_inside_mii.png"
            className="w-[48%] drop-shadow-[0_14px_35px_rgba(0,0,0,0.45)]"
            alt="Inside.mii Icon"
          />
        </div>

        {/* TITLE */}
        <h3 className="text-xl font-semibold text-white">Inside.mii</h3>

        <p className="text-gray-300 mt-2 leading-relaxed text-sm">
          Ehrliche Sicht deines Teams auf Zusammenarbeit, Kultur & Vertrauen –
          vollständig anonym.
        </p>

        {/* MINI SCORES */}
        <div className="mt-6 space-y-3 text-left">
          {[
            ["Teamgefühl", 85],
            ["Kommunikation", 75],
            ["Vertrauen", 90],
          ].map(([label, value], idx) => (
            <div key={idx}>
              <div className="flex justify-between text-xs text-gray-400 mb-1">
                <span>{label}</span>
                <span>{value}%</span>
              </div>

              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${value}%` }}
                transition={{ duration: 0.8, delay: idx * 0.15 }}
                className="h-1.5 rounded-full bg-[#7eb6b8]"
              />
            </div>
          ))}
        </div>

      </motion.div>

    </div>
  </div>
</section>

      

{/* ========================================================= */}
{/* PRICING SECTION – Inside.mii Staffelung                   */}
{/* ========================================================= */}

<section className="py-32 bg-[#e9f4f4] relative overflow-hidden">
  <div className="max-w-6xl mx-auto px-6">

    <motion.h2
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55 }}
      className="text-4xl md:text-5xl font-semibold text-center text-gray-900 mb-16"
    >
      Preisstaffelung für Teams jeder Größe
    </motion.h2>

    <div className="grid md:grid-cols-3 gap-14">

      {[
        {
          title: "Bis 25 Mitarbeitende",
          price: "1'297 €",
          text: "Ideal für kleine Teams, die ehrliches Feedback möchten.",
          key: 25,
          icon: "/illustrations/partner/21_partner.mii_group_25.png",
          popular: false
        },
        {
          title: "Bis 50 Mitarbeitende",
          price: "1'997 €",
          text: "Für wachsende Unternehmen, die Führung & Kultur stärken wollen.",
          key: 50,
          icon: "/illustrations/partner/22_partner.mii_group_50.png",
          popular: true
        },
        {
          title: "Bis 100 Mitarbeitende",
          price: "2'997 €",
          text: "Perfekt für größere Organisationen mit komplexeren Strukturen.",
          key: 100,
          icon: "/illustrations/partner/23_partner.mii_group_100.png",
          popular: false
        }
      ].map((p, i) => (
        <div key={i} className="relative flex flex-col">
          {/* Badge für beliebteste Option */}
          {p.popular && (
            <div className="absolute -top-4 left-0 right-0 flex justify-center z-10">
              <div className="bg-black px-6 py-2 rounded-full shadow-md">
                <span className="text-white font-semibold text-sm">Am häufigsten gekauft!</span>
              </div>
            </div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 + i * 0.1 }}
            viewport={{ once: true }}
            className={`
              p-10 bg-[#50969a] rounded-3xl border border-[#50969a] shadow-soft
              hover:shadow-md hover:-translate-y-1.5 transition-all
              flex flex-col h-full
              ${p.popular ? 'ring-4 ring-black' : ''}
            `}
          >

            {/* ICON */}
            <img
              src={p.icon}
              alt={p.title}
              className="w-[95px] h-[95px] mx-auto mb-6"
            />

            <h3 className="text-xl font-semibold text-black mb-2">
              {p.title}
            </h3>

            <p className="text-4xl font-bold text-white mb-4">
              {p.price}
            </p>

            <p className="text-black leading-relaxed mb-8 flex-grow">
              {p.text}
            </p>

            <button
              onClick={() => navigate(`/inside-checkout?teamSize=${p.key}`)}
              className="
                w-full bg-white text-black py-3 rounded-full font-semibold
                hover:bg-black hover:text-white transition mt-auto
              "
            >
              Jetzt starten
            </button>
          </motion.div>
        </div>
      ))}

    </div>
  </div>
</section>




{/* ========================================================= */}
{/* TESTIMONIALS – Inside.mii (Team & Culture Focus)          */}
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
      Was Teams über Inside.mii sagen
    </motion.h2>

    {/* MOBILE STACK VERSION */}
    <div className="md:hidden relative">
      <div
        id="inside-testimonial-mobile-track"
        className="flex flex-col gap-8 overflow-y-auto max-h-[600px] pr-2"
        style={{ scrollbarWidth: "none" }}
      >

        {[
          {
            name: "Sarah L.",
            role: "Teamleiterin Marketing",
            gender: "f",
            text: "Wir haben zum ersten Mal verstanden, was die Stimmung im Team wirklich bewegt. Die Offenheit war beeindruckend."
          },
          {
            name: "Stefan R.",
            role: "COO",
            gender: "m",
            text: "Die Klarheit hat uns geholfen, Konflikte nicht nur zu erkennen, sondern endlich wirksam zu lösen."
          },
          {
            name: "Nadine W.",
            role: "HR Business Partner",
            gender: "f",
            text: "Endlich ein Tool, bei dem sich niemand bewertet fühlt – und trotzdem ehrliche Antworten gibt."
          },
          {
            name: "Rebecca S.",
            role: "Team Lead, Product",
            gender: "f",
            text: "Endlich konnten wir aussprechen, was lange im Raum stand – Inside.mii hat uns den Raum dafür gegeben."
          },
          {
            name: "Tobias M.",
            role: "Projektleiter",
            gender: "m",
            text: "Die anonymen Antworten waren schonungslos ehrlich – genau das, was wir gebraucht haben."
          },
          {
            name: "Daniela F.",
            role: "HR-Managerin",
            gender: "f",
            text: "Inside.mii zeigt uns, wo Vertrauen fehlt und wo wir als Team wachsen können."
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
            const track = document.getElementById("inside-testimonial-mobile-track");
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
        id="inside-testimonial-left"
        className="absolute left-0 top-1/2 -translate-y-1/2 z-20
                   w-12 h-12 flex items-center justify-center
                   bg-[#7eb6b8] text-black rounded-full shadow-xl
                   hover:brightness-110 transition opacity-0 pointer-events-none"
        onClick={() => {
          const sc = document.getElementById("inside-testimonial-track");
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
        id="inside-testimonial-right"
        className="absolute right-0 top-1/2 -translate-y-1/2 z-20
                   w-12 h-12 flex items-center justify-center
                   bg-[#7eb6b8] text-black rounded-full shadow-xl
                   hover:brightness-110 transition"
        onClick={() => {
          const sc = document.getElementById("inside-testimonial-track");
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
        id="inside-testimonial-track"
        className="flex gap-8 overflow-x-hidden scroll-smooth px-2"
        style={{ scrollSnapType: "x mandatory", scrollbarWidth: "none" }}
        onScroll={() => {
          const sc = document.getElementById("inside-testimonial-track");
          const left = document.getElementById("inside-testimonial-left");
          const right = document.getElementById("inside-testimonial-right");
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
            name: "Sarah L.",
            role: "Teamleiterin Marketing",
            gender: "f",
            text: "Wir haben zum ersten Mal verstanden, was die Stimmung im Team wirklich bewegt. Die Offenheit war beeindruckend."
          },
          {
            name: "Stefan R.",
            role: "COO",
            gender: "m",
            text: "Die Klarheit hat uns geholfen, Konflikte nicht nur zu erkennen, sondern endlich wirksam zu lösen."
          },
          {
            name: "Nadine W.",
            role: "HR Business Partner",
            gender: "f",
            text: "Endlich ein Tool, bei dem sich niemand bewertet fühlt – und trotzdem ehrliche Antworten gibt."
          },
          {
            name: "Rebecca S.",
            role: "Team Lead, Product",
            gender: "f",
            text: "Endlich konnten wir aussprechen, was lange im Raum stand – Inside.mii hat uns den Raum dafür gegeben."
          },
          {
            name: "Tobias M.",
            role: "Projektleiter",
            gender: "m",
            text: "Die anonymen Antworten waren schonungslos ehrlich – genau das, was wir gebraucht haben."
          },
          {
            name: "Daniela F.",
            role: "HR-Managerin",
            gender: "f",
            text: "Inside.mii zeigt uns, wo Vertrauen fehlt und wo wir als Team wachsen können."
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
{/* FAQ SECTION – Inside.mii                                  */}
{/* ========================================================= */}

<section className="py-32 bg-[#f7fafa] relative overflow-hidden">

  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute right-10 top-24 w-[360px] h-[360px] bg-mint-500 blur-[160px] opacity-[0.10]" />
  </div>

  <div className="relative z-10 max-w-4xl mx-auto px-6">

    <motion.h2
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-3xl md:text-4xl font-semibold text-gray-900 text-center"
    >
      Häufige Fragen zu Inside.mii
    </motion.h2>

    <div className="mt-14 space-y-4">

      {[
        ["Wie funktioniert Inside.mii genau?", 
         "Inside.mii ist ein vollständig anonymes Team-Assessment, das über strukturierte Fragen klare Muster sichtbar macht."],

        ["Wie wird die Anonymität garantiert?", 
         "Alle Antworten werden automatisch aggregiert. Es ist technisch unmöglich, einzelne Personen zuzuordnen."],

        ["Wie lange dauert das Team-Assessment?", 
         "Zwischen 8 und 12 Minuten pro Person – ohne Vorbereitung."],

        ["Welche Teams profitieren am meisten?", 
         "Führungsteams, Abteilungen, Projektgruppen, schnell wachsende Unternehmen und KMU."],

        ["Kann ich die Ergebnisse exportieren?", 
         "Ja – als PDF mit Insights, Mustererkennung, Benchmarks und Handlungsempfehlungen."],

        ["Wie oft sollte man Inside.mii einsetzen?", 
         "Empfohlen ist alle 6–12 Monate, um Fortschritte sichtbar zu machen."],

        ["Sind die Daten DSGVO-konform?", 
         "Ja – vollständig. Alle Daten werden sicher gespeichert und verschlüsselt verarbeitet."],

        ["Gibt es Support oder Hilfe?", 
         "Ja. Du kannst jederzeit Support per E-Mail anfragen."]
      ].map(([q, a], i) => (
        <motion.details
          key={i}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 + i * 0.1 }}
          className="
            group border border-gray-200 rounded-2xl bg-white
            px-6 py-5 shadow-[0_8px_25px_rgba(0,0,0,0.04)]
          "
        >
          <summary className="flex items-center justify-between cursor-pointer">
            <span className="font-medium text-gray-900 text-base">{q}</span>
            <span className="ml-4 text-gray-500 group-open:rotate-180 transition-transform">
              ▼
            </span>
          </summary>
          <div className="mt-3 text-gray-600 text-sm md:text-base leading-relaxed">
            {a}
          </div>
        </motion.details>
      ))}

    </div>
  </div>
</section>

{/* ========================================================= */}
{/* FINAL CTA – INSIDE.MII                                   */}
{/* ========================================================= */}

<section className="py-32 bg-[#1b1f23] text-white text-center relative overflow-hidden">

  {/* BG FX */}
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute left-1/2 top-16 w-[420px] h-[420px] bg-[#7eb6b8] opacity-[0.10] blur-[180px] -translate-x-1/2" />
    <div className="absolute right-20 bottom-0 w-[320px] h-[320px] bg-[#7eb6b8] opacity-[0.08] blur-[160px]" />
  </div>

  <div className="relative z-10 max-w-5xl mx-auto px-6">

    <motion.h2
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="text-4xl md:text-5xl font-semibold leading-tight text-white"
    >
      Bereit, dein Team klarer zu verstehen als je zuvor?
    </motion.h2>

    <motion.p
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.1 }}
      className="mt-6 text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
    >
      Inside.mii liefert dir ehrliche Teamwahrheiten, klare Muster
      und Insights, die du sofort nutzen kannst – anonym, schnell und präzise.
    </motion.p>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.2 }}
      className="mt-14 flex justify-center"
    >
      <motion.button
        onClick={() => navigate("/inside-checkout")}
        whileHover={{ scale: 1.04 }}
        animate={{ scale: [1, 1.05, 1], opacity: [1, 0.9, 1] }}
        transition={{ duration: 1.8, repeat: Infinity }}
        className="px-12 py-4 rounded-full bg-[#7eb6b8] text-black font-semibold text-lg
                   shadow-[0_0_25px_rgba(126,182,184,0.35)]
                   hover:bg-[#1b1f23] hover:text-white transition"
      >
        Jetzt Inside.mii starten – ab 1'297 €
      </motion.button>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, delay: 0.25 }}
      className="mt-16 flex justify-center"
    >
      <motion.img
        src="/illustrations/coreicon/1_core_icon_growth.png"
        alt="Growth Icon"
        className="w-44 h-44 drop-shadow-[0_25px_60px_rgba(0,0,0,0.45)]"
        animate={{ scale: [1, 1.03, 1], opacity: [1, 0.92, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>

  </div>
</section>

</MainLayout>
  );
}
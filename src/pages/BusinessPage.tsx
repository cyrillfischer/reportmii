// src/pages/BusinessPage.tsx
import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import VideoModal from "../components/VideoModal";
import { AnimatedShapesBusiness } from "../components/AnimatedShapesBusiness";

function ScrollRotateIcon({ iconSrc, className = "" }: { iconSrc: string; className?: string }) {
  const iconRef = useRef<HTMLDivElement>(null);
  const [hasRotated, setHasRotated] = useState(false);
  const hasRotatedRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!iconRef.current || hasRotatedRef.current) return;

      const rect = iconRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const triggerPoint = windowHeight * 0.7;

      if (rect.top < triggerPoint && rect.bottom > 0) {
        hasRotatedRef.current = true;
        setHasRotated(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div ref={iconRef} className={`flex justify-center ${className}`}>
      <motion.img
        src={iconSrc}
        alt="Value Icon"
        className="w-[70%] max-w-[330px] sm:max-w-[380px] md:max-w-[440px] drop-shadow-[0_30px_80px_rgba(15,23,42,0.25)]"
        animate={hasRotated ? { rotateY: 360 } : {}}
        transition={{ duration: 1, ease: "easeInOut" }}
      />
    </div>
  );
}

function ScrollFlipCard({ item, index }: { item: any; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const hasFlipped = useRef(false);

  useEffect(() => {
    let scrollAmount = 0;

    const handleScroll = () => {
      if (!cardRef.current || hasFlipped.current) return;

      scrollAmount = window.scrollY;

      if (scrollAmount < 50) return;

      const rect = cardRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const triggerPoint = windowHeight * 0.7;

      if (rect.top < triggerPoint) {
        hasFlipped.current = true;
        setTimeout(() => {
          setIsFlipped(true);
        }, index * 100);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [index]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55 + index * 0.1 }}
     className="relative w-full h-[340px] sm:h-[300px] md:h-[240px]"
style={{ perspective: "1200px", WebkitPerspective: "1200px" }}
      style={{ perspective: '1000px' }}
    >
      <div
  className="relative w-full h-full transition-transform duration-700 ease-out"
  style={{
    transformStyle: "preserve-3d",
    WebkitTransformStyle: "preserve-3d",
    transform: `rotateY(${isFlipped ? 180 : 0}deg) translateZ(0)`,
    WebkitTransform: `rotateY(${isFlipped ? 180 : 0}deg) translateZ(0)`,
  }}
>
        {/* Front Side - Dark with Icon */}
        <div
          className="absolute inset-0 rounded-3xl bg-[#121619] border border-[#7eb6b8]/30 shadow-[0_12px_28px_rgba(0,0,0,0.35)] flex flex-col items-center justify-center"
         style={{
  backfaceVisibility: "hidden",
  WebkitBackfaceVisibility: "hidden",
  transform: "rotateY(0deg)",
  WebkitTransform: "rotateY(0deg)",

}}
        >
          <img
            src={item.img}
            className="w-40 h-40 drop-shadow-[0_12px_22px_rgba(0,0,0,0.55)] relative z-10"
            alt={item.title}
          />
        </div>

        {/* Back Side - Mint with Text */}
        <div
          className="absolute inset-0 rounded-3xl p-6 md:p-8 bg-[#7eb6b8] text-black border border-white/10 shadow-[0_12px_28px_rgba(0,0,0,0.35)] flex flex-col items-center md:items-start justify-center md:justify-start text-center md:text-left"
          style={{
   backfaceVisibility: "hidden",
  WebkitBackfaceVisibility: "hidden",
  transform: "rotateY(180deg) translateZ(0)",
  WebkitTransform: "rotateY(180deg) translateZ(0)",
}}
        >
         <img
  src={item.img}
  className="w-[80px] h-[80px] md:w-[105px] md:h-[105px] mb-3 md:mb-0 md:absolute md:bottom-4 md:right-4 z-10"
  alt={item.title}
/>
          <h3 className="text-xl md:text-2xl font-semibold mb-2">{item.title}</h3>
          <p className="text-black/80 leading-relaxed text-sm md:text-base">{item.text}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function BusinessPage() {
  const navigate = useNavigate();
  const [showDemo, setShowDemo] = useState(false);

  return (
    <MainLayout background={<AnimatedShapesBusiness />}>


      {/* ========================================================= */}
{/* HERO SECTION – PREMIUM VERSION WIE LANDINGPAGE            */}
{/* ========================================================= */}

<section className="w-full py-32 bg-gradient-to-b from-[#f0f7f7] via-[#f7fbfb] to-white relative overflow-hidden">

  {/* Background Glow */}
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute top-16 left-20 w-[420px] h-[420px] bg-[#7eb6b8] opacity-[0.14] blur-[140px] rounded-full" />
    <div className="absolute bottom-16 right-20 w-[420px] h-[420px] bg-[#7eb6b8] opacity-[0.12] blur-[160px] rounded-full" />
  </div>

  <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center relative z-10">

    {/* LEFT TEXT BLOCK */}
    <div className="max-w-2xl text-center lg:text-left mx-auto lg:mx-0">

      <motion.h1
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        viewport={{ once: true }}
        className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-gray-900 leading-[1.15]"
      >
        Business.mii Analyse
        <br />
        <span className="text-[#50969a]">für sofortige Klarheit</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: "easeOut", delay: 0.1 }}
        viewport={{ once: true }}
        className="mt-6 text-lg sm:text-xl leading-relaxed text-gray-600 font-light"
      >
        Erhalte in weniger als <strong className="text-gray-900">60 Minuten </strong>
        eine klare, datenbasierte Bewertung deines Unternehmens —
        visualisiert, objektiv und ohne Berater.
      </motion.p>

      {/* CTA BUTTON */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
        viewport={{ once: true }}
        className="mt-10 flex justify-center lg:justify-start"
      >
        <button
          onClick={() => navigate("/business-checkout")}
          className="
            px-10 py-4 rounded-full
            bg-[#7eb6b8] text-black font-semibold text-lg
            shadow-[0_0_25px_rgba(126,182,184,0.35)]
            hover:bg-[#1b1f23] hover:text-white transition
          "
        >
          Jetzt Analyse starten – 497 €
        </button>
      </motion.div>

    </div>


    {/* RIGHT ICON VISUAL */}
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      viewport={{ once: true }}
      className="flex justify-center lg:justify-end"
    >
      <img
        src="/illustrations/business/12_business.mii_sales_performance.png"
        alt="Business.mii Icon"
        className="
          w-[70%]
          max-w-[330px] sm:max-w-[380px] md:max-w-[440px]
          drop-shadow-[0_30px_80px_rgba(15,23,42,0.25)]
        "
      />
    </motion.div>

  </div>
</section>



{/* ========================================================= */}
{/* SECTION: DEINE 6 ERFOLGSBEREICHE — FLIP VERSION  */}
{/* ========================================================= */}

<section className="py-32 bg-[#1b1f23] text-white relative overflow-hidden">
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute left-10 top-24 w-[420px] h-[420px] bg-[#7eb6b8] opacity-[0.12] blur-[160px]" />
    <div className="absolute right-10 bottom-24 w-[420px] h-[420px] bg-[#7eb6b8] opacity-[0.10] blur-[200px]" />
  </div>

  <div className="relative z-10 max-w-7xl mx-auto px-6">
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-4xl md:text-5xl font-semibold text-center text-white"
    >
      Deine sechs Erfolgsbereiche
    </motion.h2>

    <motion.p
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="mt-4 text-gray-300 text-lg max-w-2xl mx-auto text-center leading-relaxed"
    >
      Die klar strukturierte Analyse entlang der wichtigsten Faktoren,
      die bestimmen, wie stark dein Unternehmen heute ist –
      und wie gut es in Zukunft performen wird.
    </motion.p>

    <div className="mt-20 grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
      {[
        {
          img: "/illustrations/business/1_business.mii_strategie_kompasspng.png",
          title: "Strategische Klarheit",
          text: "Wie klar und zukunftsfähig ist deine Ausrichtung? Erkennst du Chancen früh genug?"
        },
        {
          img: "/illustrations/business/2_business.mii_marktanalyse_radar.png",
          title: "Marktposition & Wettbewerb",
          text: "Wo stehst du im Vergleich? Welche Risiken & Potenziale zeigen die Daten?"
        },
        {
          img: "/illustrations/business/8_business.mii_team_alignment.png",
          title: "Führung & Team-Ausrichtung",
          text: "Ziehen alle an einem Strang – oder arbeiten alle im eigenen Tunnel?"
        },
        {
          img: "/illustrations/business/4_business.mii_finanzgesundheit_chart.png",
          title: "Innovation & Offenheit",
          text: "Wie schnell reagierst du auf Veränderungen – und nutzt neue Technologien?"
        },
        {
          img: "/illustrations/business/5_business.mii_process_optimization.png",
          title: "Struktur & Prozesse",
          text: "Wie stabil, klar und effizient laufen deine Abläufe wirklich?"
        },
        {
          img: "/illustrations/business/6_business.mii_cost_control.png",
          title: "Kosten, Fokus & Umsetzung",
          text: "Welche Prioritäten werden gesetzt – und wie konsequent wird geliefert?"
        }
      ].map((item, i) => (
        <ScrollFlipCard key={i} item={item} index={i} />
      ))}
    </div>
  </div>
</section>



{/* ========================================================= */}
{/* SECTION: WARUM 497€ – VALUE BLOCK                        */}
{/* ========================================================= */}

<section className="py-32 bg-[#f7fafa] relative overflow-hidden">

  {/* BACKGROUND */}
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute right-10 top-24 w-[360px] h-[360px] bg-[#7eb6b8] opacity-[0.10] blur-[160px]" />
  </div>

  <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">

    <motion.h2
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-4xl md:text-5xl font-semibold text-gray-900"
    >
      Warum 497 € eine der klügsten Entscheidungen ist
    </motion.h2>

    <motion.p
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="mt-4 text-gray-600 max-w-2xl mx-auto leading-relaxed text-lg"
    >
      Eine externe Beratung kostet 4.000–25.000 €.
      Business.mii liefert dir dieselbe Klarheit – aber **schneller, präziser und günstiger**.
    </motion.p>

    {/* VALUE GRID */}
    <div className="mt-20 grid md:grid-cols-3 gap-14 text-center">

      {[
        {
          title: "Fakten, keine Gefühle",
          text: "Eine datenbasierte Analyse, die dir zeigt, wo du stehst – ohne Schönreden.",
          icon: "/illustrations/business/17_business.mii_facts_over_feelings.png"
        },
        {
          title: "Visualisierte Ergebnisse",
          text: "Du erhältst klare Diagramme, Muster und Prioritäten – sofort verständlich.",
          icon: "/illustrations/business/18_business.mii_visual_insights.png"
        },
        {
          title: "Sofort umsetzbar",
          text: "Du bekommst konkrete Empfehlungen, die du noch am selben Tag anwenden kannst.",
          icon: "/illustrations/business/19_business.mii_actionable_now.png"
        }
      ].map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 + i * 0.1 }}
          viewport={{ once: true }}
          className="bg-white p-8 border border-gray-200 rounded-3xl
                     shadow-[0_12px_28px_rgba(0,0,0,0.06)] flex flex-col items-center"
        >
          <div className="flex justify-center mb-3">
            <img
              src={item.icon}
              alt={item.title}
              className="w-[75px] h-[75px]"
            />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
          <p className="text-gray-600 leading-relaxed text-sm">{item.text}</p>
        </motion.div>
      ))}

    </div>

    

    <motion.button
      initial={{ scale: 1 }}
      animate={{ scale: [1, 1.10, 1] }}
      transition={{ duration: 1.8, repeat: Infinity }}
      className="mt-14 px-12 py-4 rounded-full text-lg font-semibold bg-[#7eb6b8] text-black shadow-[0_0_25px_rgba(126,182,184,0.35)] hover:bg-[#1b1f23] hover:text-white transition"
      onClick={() => navigate("/business-checkout")}
    >
      Jetzt Analyse starten – 497 €
    </motion.button>

  </div>
</section>


{/* ========================================================= */}
{/* SECTION: WAS DU BEKOMMST – PREMIUM MINT SECTION          */}
{/* ========================================================= */}

<section className="py-32 bg-[#8ccfd0] text-black relative overflow-hidden">

  {/* FX MINT GLOWS – wie Landingpage */}
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute left-10 top-20 w-[420px] h-[420px] bg-[#7eb6b8] opacity-[0.18] blur-[160px]" />
    <div className="absolute right-10 bottom-20 w-[380px] h-[380px] bg-[#7eb6b8] opacity-[0.14] blur-[180px]" />
  </div>

  <div className="relative z-10 max-w-7xl mx-auto px-6">

    {/* TITLE */}
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-4xl md:text-5xl font-semibold text-center text-black"
    >
      Was du mit Business.mii bekommst
    </motion.h2>

    {/* GRID */}
    <div className="mt-20 grid md:grid-cols-2 gap-14">

      {[
        {
          icon: "/illustrations/business/13_business.mii_operational_efficiency.png",
          title: "Eine klare Auswertung",
          text: "Deine Analyse zeigt dir visuell, wo du stark bist und wo du blockiert wirst."
        },
        {
          icon: "/illustrations/business/7_business.mii_resource_allocation.png",
          title: "Konkrete Maßnahmen",
          text: "Erhalte klare Empfehlungen – sortiert nach Wirkung, Dringlichkeit und Machbarkeit."
        },
        {
          icon: "/illustrations/business/15_business.mii_decision_support.png",
          title: "Benchmarking",
          text: "Vergleiche dein Ergebnis mit hunderten anderen Unternehmen & Teams."
        },
        {
          icon: "/illustrations/business/11_business.mii_customer_insights.png",
          title: "Fokusindex",
          text: "Ein Score, der dir zeigt, wie zielgerichtet du aktuell arbeitest."
        }
      ].map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 + i * 0.1 }}
          className="
            bg-[#1b1f23]
            p-8
            rounded-3xl
            border border-white/10
            shadow-[0_12px_28px_rgba(0,0,0,0.35)]
            hover:-translate-y-1
            transition-all
            relative
          "
        >
          <img src={item.icon} className="absolute top-6 right-6 w-[105px] h-[105px]" />

          <h3 className="text-xl font-semibold text-white mb-2 pr-28">
            {item.title}
          </h3>

          <p className="text-gray-300 leading-relaxed text-sm pr-28">
            {item.text}
          </p>
        </motion.div>
      ))}

    </div>

  </div>
</section>


{/* ========================================================= */}
{/* SECTION: ZAHLEN & FAKTEN – SOCIAL PROOF                  */}
{/* ========================================================= */}

<section className="py-32 bg-[#f0f7f7] relative overflow-hidden">

  {/* FX */}
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute left-20 top-16 w-[360px] h-[360px] bg-[#7eb6b8] opacity-[0.12] blur-[160px]" />
  </div>

  <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">

    <motion.h2
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-4xl md:text-5xl font-semibold text-gray-900"
    >
      Zahlen, die für sich sprechen
    </motion.h2>

    <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-10 mt-20">

      {[
        ["300+ Analysen", "Erstellt von Führungskräften, Coaches und Teams."],
        ["94% empfehlen weiter", "Die meisten Unternehmen nutzen Business.mii wieder."],
        ["20–30 Minuten", "So schnell erhältst du echte Klarheit – ohne Vorbereitung."],
        ["100% objektiv", "Daten statt Bauchgefühl – für bessere Entscheidungen."]
      ].map(([title, text], i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 + i * 0.1 }}
          className="p-8 bg-[#f5fbfb] rounded-3xl border border-gray-200 shadow-[0_12px_28px_rgba(0,0,0,0.06)]"
        >
          <div className="text-3xl font-semibold text-gray-900">{title}</div>
          <p className="text-gray-600 mt-2 leading-relaxed">{text}</p>
        </motion.div>
      ))}

    </div>
  </div>
</section>
      

{/* ========================================================= */}
{/* SECTION: WARUM JETZT – DRINGLICHKEIT (PREMIUM WHITE)      */}
{/* ========================================================= */}

<section className="py-32 bg-white relative overflow-hidden">

  {/* BACKGROUND FX */}
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute left-10 top-20 w-[420px] h-[420px] bg-[#7eb6b8] opacity-[0.10] blur-[160px]" />
  </div>

  <div className="relative z-10 max-w-7xl mx-auto px-6">

    {/* TITLE */}
    <motion.h2
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-4xl md:text-5xl font-semibold text-center text-gray-900"
    >
      Warum jetzt der richtige Zeitpunkt ist
    </motion.h2>

    {/* GRID */}
    <div className="mt-20 grid lg:grid-cols-2 gap-16">

      {/* LEFT COLUMN */}
      <div className="flex flex-col gap-10 h-full">

        {[
          {
            title: "Veränderungen kommen schneller",
            text: "Märkte drehen sich schneller als jemals zuvor. Wer wartet, verliert Boden."
          },
          {
            title: "Transparenz schützt vor falschen Entscheidungen",
            text: "Ein falscher Fokus kostet oft tausende Euro – pro Monat."
          },
          {
            title: "Einmalige Investition statt Beraterkosten",
            text: "Du brauchst keinen 10.000 € Berater. Du brauchst klare Signale."
          }
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 + i * 0.1 }}
            className="bg-[#1b1f23] p-10 rounded-3xl border border-white/10
                       shadow-[0_18px_40px_rgba(0,0,0,0.45)]"
          >
            <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
            <p className="text-gray-300 leading-relaxed">{item.text}</p>
          </motion.div>
        ))}

      </div>

      {/* RIGHT COLUMN – ANALYSE CARD */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-[#f0f7f7] rounded-3xl p-10 shadow-[0_25px_60px_rgba(0,0,0,0.10)]
                   border border-gray-200 flex flex-col items-center h-full"
      >
        {/* ICON – vergrößert */}
        <img
          src="/illustrations/coreicon/16_core_icon_business_mii.png"
          alt="Business.mii Icon"
          className="w-52 h-52 mb-4 drop-shadow-[0_18px_45px_rgba(15,23,42,0.22)]"
        />

        {/* TITLE */}
        <h3 className="text-2xl font-semibold text-gray-900 mb-2">
          Business.mii
        </h3>

        <p className="text-gray-600 text-center leading-relaxed mb-8 max-w-md">
          Deine Perspektive auf Strategie, Struktur, Markt & Umsetzung –
          klar, strukturiert und fundiert.
        </p>

        {/* BARS */}
        <div className="space-y-5 w-full mt-auto">

          <div>
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Strategie</span><span>80%</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "80%" }}
                transition={{ duration: 1 }}
                className="h-full bg-[#7eb6b8]"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Struktur</span><span>70%</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "70%" }}
                transition={{ duration: 1 }}
                className="h-full bg-[#7eb6b8]"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Fokus</span><span>75%</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "75%" }}
                transition={{ duration: 1 }}
                className="h-full bg-[#7eb6b8]"
              />
            </div>
          </div>

        </div>
      </motion.div>

    </div>

       {/* CTA BUTTON – zentriert unter der Sektion */}
    <div className="mt-16 flex justify-center">
      <motion.button
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.10, 1] }}
        transition={{ duration: 1.8, repeat: Infinity }}
        className="px-16 py-4 rounded-full text-lg font-semibold
                   bg-[#7eb6b8] text-black shadow-[0_0_25px_rgba(126,182,184,0.35)]
                   transition-all duration-300
                   hover:bg-[#1b1f23] hover:text-white"
        onClick={() => navigate('/business-checkout')}
      >
        Jetzt Analyse starten – 497 €
      </motion.button>
    </div>

  </div>
</section>



{/* ========================================================= */}
{/* SECTION: TESTIMONIALS – BUSINESS VERSION                 */}
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
      Was Führungskräfte über Business.mii sagen
    </motion.h2>

    {/* MOBILE STACK VERSION */}
    <div className="md:hidden relative">
      <div
        id="business-testimonial-mobile-track"
        className="flex flex-col gap-8 overflow-y-auto max-h-[600px] pr-2"
        style={{ scrollbarWidth: "none" }}
      >

        {[
          {
            name: "Thomas W.",
            role: "CEO & Gründer",
            gender: "m",
            text: "Die Analyse war der Augenöffner, den wir gebraucht haben. Klare Prioritäten, keine Diskussionen mehr."
          },
          {
            name: "Julia M.",
            role: "Leiterin Marketing",
            gender: "f",
            text: "Die Visualisierungen haben uns geholfen, Entscheidungen in Minuten statt Tagen zu treffen."
          },
          {
            name: "Christian F.",
            role: "Head of Operations",
            gender: "m",
            text: "Wir haben Ressourcen komplett neu verteilt – alleine durch die Erkenntnisse aus Business.mii."
          },
          {
            name: "Stefan K.",
            role: "CEO, Tech-Startup",
            gender: "m",
            text: "Business.mii hat mir in 30 Minuten gezeigt, was ich monatelang nicht greifen konnte – absolute Klarheit."
          },
          {
            name: "Maria L.",
            role: "Geschäftsführerin, Beratung",
            gender: "f",
            text: "Endlich eine Analyse, die ehrlich ist und direkt auf den Punkt kommt. Keine leeren Versprechen."
          },
          {
            name: "Oliver H.",
            role: "Managing Partner",
            gender: "m",
            text: "Die Struktur der Analyse ist brilliant – ich konnte sofort Prioritäten setzen."
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
            const track = document.getElementById("business-testimonial-mobile-track");
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
        id="business-testimonial-left"
        className="absolute left-0 top-1/2 -translate-y-1/2 z-20
                   w-12 h-12 flex items-center justify-center
                   bg-[#7eb6b8] text-black rounded-full shadow-xl
                   hover:brightness-110 transition opacity-0 pointer-events-none"
        onClick={() => {
          const sc = document.getElementById("business-testimonial-track");
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
        id="business-testimonial-right"
        className="absolute right-0 top-1/2 -translate-y-1/2 z-20
                   w-12 h-12 flex items-center justify-center
                   bg-[#7eb6b8] text-black rounded-full shadow-xl
                   hover:brightness-110 transition"
        onClick={() => {
          const sc = document.getElementById("business-testimonial-track");
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
        id="business-testimonial-track"
        className="flex gap-8 overflow-x-hidden scroll-smooth px-2"
        style={{ scrollSnapType: "x mandatory", scrollbarWidth: "none" }}
        onScroll={() => {
          const sc = document.getElementById("business-testimonial-track");
          const left = document.getElementById("business-testimonial-left");
          const right = document.getElementById("business-testimonial-right");
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
            name: "Thomas W.",
            role: "CEO & Gründer",
            gender: "m",
            text: "Die Analyse war der Augenöffner, den wir gebraucht haben. Klare Prioritäten, keine Diskussionen mehr."
          },
          {
            name: "Julia M.",
            role: "Leiterin Marketing",
            gender: "f",
            text: "Die Visualisierungen haben uns geholfen, Entscheidungen in Minuten statt Tagen zu treffen."
          },
          {
            name: "Christian F.",
            role: "Head of Operations",
            gender: "m",
            text: "Wir haben Ressourcen komplett neu verteilt – alleine durch die Erkenntnisse aus Business.mii."
          },
          {
            name: "Stefan K.",
            role: "CEO, Tech-Startup",
            gender: "m",
            text: "Business.mii hat mir in 30 Minuten gezeigt, was ich monatelang nicht greifen konnte – absolute Klarheit."
          },
          {
            name: "Maria L.",
            role: "Geschäftsführerin, Beratung",
            gender: "f",
            text: "Endlich eine Analyse, die ehrlich ist und direkt auf den Punkt kommt. Keine leeren Versprechen."
          },
          {
            name: "Oliver H.",
            role: "Managing Partner",
            gender: "m",
            text: "Die Struktur der Analyse ist brilliant – ich konnte sofort Prioritäten setzen."
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
{/* SECTION: FAQ – 8 FRAGEN                                  */}
{/* ========================================================= */}

<section className="py-32 bg-[#f7fafa] relative overflow-hidden">

  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute right-10 top-24 w-[360px] h-[360px] bg-[#7eb6b8] blur-[160px] opacity-[0.10]" />
  </div>

  <div className="relative z-10 max-w-4xl mx-auto px-6">

    <motion.h2
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="text-3xl md:text-4xl font-semibold text-gray-900 text-center"
    >
      Häufige Fragen zu Business.mii
    </motion.h2>

    <div className="mt-14 space-y-4">

      {[
        ["Wie lange dauert die Business.mii Analyse?", "Nur 20–30 Minuten – ohne Vorbereitung."],
        ["Für wen ist Business.mii ideal?", "Für Führungskräfte, Gründer, Teamleiter und KMU."],
        ["Wie objektiv sind die Ergebnisse?", "Alle Daten werden strukturiert ausgewertet – ohne subjektive Verzerrung."],
        ["Brauche ich ein Onboarding?", "Nein. Du kannst sofort starten."],
        ["Kann ich die Ergebnisse exportieren?", "Ja, als PDF."],
        ["Kann ich die Analyse mehrmals machen?", "Ja – jederzeit, um Fortschritte zu messen."],
        ["Sind meine Daten sicher?", "Ja. Alles ist DSGVO-konform und verschlüsselt."],
        ["Gibt es Support?", "Ja – du kannst jederzeit Support per E-Mail erhalten."]
      ].map(([q, a], i) => (
        <motion.details
          key={i}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 + i * 0.1 }}
          className="group border border-gray-200 rounded-2xl bg-white px-6 py-5 shadow-[0_8px_25px_rgba(0,0,0,0.04)]"
        >
          <summary className="flex items-center justify-between cursor-pointer">
            <span className="font-medium text-gray-900 text-sm md:text-base">{q}</span>
            <span className="ml-4 text-gray-500 group-open:rotate-180 transition-transform">▼</span>
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
{/* FINAL CTA – BUSINESS.MII                                 */}
{/* ========================================================= */}

<section className="py-32 bg-[#1b1f23] text-white text-center relative overflow-hidden">

  {/* BG FX */}
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute left-1/2 top-16 w-[420px] h-[420px] bg-[#7eb6b8] opacity-[0.10] blur-[180px] -translate-x-1/2" />
    <div className="absolute right-20 bottom-0 w-[320px] h-[320px] bg-[#7eb6b8] opacity-[0.08] blur-[160px]" />
  </div>

  <div className="relative z-10 max-w-5xl mx-auto px-6">

    {/* TITLE – jetzt weiß */}
    <motion.h2
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="text-4xl md:text-5xl font-semibold leading-tight text-white"
    >
      Bereit, dein Unternehmen auf den Punkt zu verstehen?
    </motion.h2>

    {/* SUBTEXT – leicht angepasst */}
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.1 }}
      className="mt-6 text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
    >
      Business.mii zeigt dir in wenigen Minuten, wo du wirklich stehst –  
      klar, ehrlich und ohne Umwege. Perfekt, wenn du fundierte Entscheidungen treffen willst.
    </motion.p>

    {/* CTA BUTTON */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.2 }}
      className="mt-14 flex justify-center"
    >
      <motion.button
        onClick={() => navigate("/business-checkout")}
        whileHover={{ scale: 1.04 }}
        animate={{ scale: [1, 1.05, 1], opacity: [1, 0.9, 1] }}
        transition={{ duration: 1.8, repeat: Infinity }}
        className="px-12 py-4 rounded-full bg-[#7eb6b8] text-black font-semibold text-lg 
                   shadow-[0_0_25px_rgba(126,182,184,0.35)]
                   hover:bg-[#1b1f23] hover:text-white transition"
      >
        Jetzt Business.mii starten – 497 €
      </motion.button>
    </motion.div>

    {/* ICON */}
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
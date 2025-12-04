// src/pages/PartnerPage.tsx

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { Button } from "../components/Button";
import { AnimatedShapesPartner } from "../components/AnimatedShapesPartner";

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
      className="relative w-full h-[240px] perspective-1000"
      style={{ perspective: '1000px' }}
    >
      <div
        className="relative w-full h-full transition-transform duration-700 ease-out"
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateY(${isFlipped ? 180 : 0}deg)`
        }}
      >
        <div
          className="absolute inset-0 rounded-3xl bg-[#1b1f23] border border-gray-200/30 shadow-soft flex flex-col items-center justify-center"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <img
            src={item.icon}
            className="w-[95px] h-[95px] drop-shadow-lg"
            alt={item.title}
          />
        </div>

        <div
          className="absolute inset-0 rounded-3xl p-10 bg-[#7eb6b8] border border-white/10 shadow-soft flex flex-col items-center justify-center text-center"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          <img
            src={item.icon}
            className="w-[95px] h-[95px] mx-auto mb-6"
            alt={item.title}
          />
          <h3 className="text-xl font-semibold mb-2 text-black">{item.title}</h3>
          <p className="text-black/80 leading-relaxed">{item.text}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function PartnerPage() {
  const navigate = useNavigate();
  const [showDemo, setShowDemo] = useState(false);

  return (
    <MainLayout background={<AnimatedShapesPartner />} hideFooter={true}>



{/* ========================================================= */}
{/* 1) HERO – WEISS                                           */}
{/* ========================================================= */}

<section className="w-full py-32 bg-white relative overflow-hidden">
  <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">

    {/* TEXT LEFT */}
    <div className="text-center lg:text-left mx-auto lg:mx-0">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-5xl md:text-6xl font-semibold tracking-tight text-gray-900 leading-tight"
      >
        <span className="text-[#7eb6b8]">Partner.mii</span> Programm
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.1 }}
        className="text-lg md:text-xl text-gray-900 max-w-xl mx-auto lg:mx-0 mt-6 leading-relaxed"
      >
        Werde offizieller Reportmii Partner und nutze unsere White-Label-Analysen,
        um deinen Kund:innen professionelle, messbare Ergebnisse zu liefern –
        komplett in deinem eigenen Branding.
      </motion.p>

     {/* CTA BUTTON */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
  className="mt-10 flex justify-center lg:justify-start"
>
  <button
    onClick={() => navigate("/partner-checkout")}
    className="
      px-10 py-4 rounded-full
      bg-[#7eb6b8] text-black font-semibold text-lg
      shadow-[0_0_25px_rgba(126,182,184,0.35)]
      hover:bg-[#1b1f23] hover:text-white transition
    "
  >
    Jetzt Partner werden
  </button>
</motion.div>
    </div>

    {/* ICON RIGHT */}
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.1 }}
      className="flex justify-center lg:justify-end"
    >
      <img
  src="/illustrations/partner/1_partner.mii_program.png"
  alt="Partner Icon"
  className="w-[320px] md:w-[380px] drop-shadow-[0_20px_60px_rgba(0,0,0,0.25)]"
/>
    </motion.div>

  </div>
</section>




      {/* ========================================================= */}
      {/* 2) VORTEILE – DARK CHARCOAL                              */}
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
            Deine Vorteile als Partner
          </motion.h2>

          <div className="mt-20 grid md:grid-cols-2 lg:grid-cols-4 gap-14">

            {/* CARD TEMPLATE */}
            {[
              {
                img: "/illustrations/partner/2_partner.mii_white_label_reports.png",
                title: "White-Label Reports",
                text: "Reports komplett mit deinem Logo, deinen Farben & deiner Marke."
              },
              {
                img: "/illustrations/partner/3_partner.mii_ready_to_start.png",
                title: "Sofort startklar",
                text: "Dashboard & Reports ohne Technik oder Setup sofort einsatzbereit."
              },
              {
                img: "/illustrations/partner/4_partner.mii_new_revenue.png",
                title: "Skalierbar für viele Kunden",
                text: "Erstelle Analysen automatisch und spare wertvolle Zeit."
              },
              {
                img: "/illustrations/partner/5_partner.mii_year_license.png",
                title: "Neue Einnahmequelle",
                text: "Verkaufe Analysen weiter – mit extrem hoher Marge."
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="
                  bg-[#262b2f] 
                  rounded-3xl 
                  p-10 
                  flex flex-col 
                  text-center
                  shadow-xl
                  hover:-translate-y-2 
                  hover:shadow-2xl 
                  transition-all 
                  duration-300
                "
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-[95px] h-[95px] mx-auto mb-6"
                />
                <h3 className="text-xl font-semibold mb-2 text-white">{item.title}</h3>
                <p className="text-white/80 leading-relaxed text-[17px]">{item.text}</p>
              </motion.div>
            ))}

          </div>
        </div>
      </section>
{/* ========================================================= */}
{/* 3) WAS DU ALS PARTNER BEKOMMST – WEISS                    */}
{/* ========================================================= */}

<section className="py-32 bg-white text-gray-900">
  <div className="max-w-7xl mx-auto px-6">

    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-4xl md:text-5xl font-semibold text-center"
    >
      Was du als Partner bekommst
    </motion.h2>

    <p className="text-lg text-gray-700 max-w-2xl mx-auto text-center mt-4 leading-relaxed">
      Alles, was du brauchst, um professionelle Analysen unter deiner eigenen Marke anzubieten.
    </p>

    <div className="mt-16 grid md:grid-cols-3 gap-14">
      {[
        {
          img: "/illustrations/partner/7_partner.mii_dashboard.png",
          title: "Partner Dashboard",
          text: "Verwalte Kunden, Analysen & Add-ons – alles in einem übersichtlichen Interface."
        },
        {
          img: "/illustrations/partner/8_partner.mii_business_analysen.png",
          title: "Alle Business.mii Analysen",
          text: "Unbegrenzte Business-Analysen mit vollen Funktionen & allen sechs Erfolgsbereichen."
        },
        {
          img: "/illustrations/partner/9_partner.mii_inside_addons.png",
          title: "Inside.mii Add-ons",
          text: "Greife auf alle Team-Befragungs-Add-ons zu und verkaufe sie weiter."
        }
      ].map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="
            bg-white border border-gray-200 
            rounded-3xl p-10 shadow-soft 
            hover:shadow-md hover:-translate-y-1 
            transition-all duration-300 
            text-center
          "
        >
          <motion.img
            src={item.img}
            alt={item.title}
            className="w-[95px] h-[95px] mx-auto mb-6"
            initial={{ rotateY: 0 }}
            whileInView={{ rotateY: 360 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeInOut", delay: i * 0.1 + 0.2 }}
          />
          <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
          <p className="text-gray-600 leading-relaxed">{item.text}</p>
        </motion.div>
      ))}
    </div>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
      className="mt-16 flex justify-center"
    >
      <button
        onClick={() => navigate("/partner-checkout")}
        className="
          px-10 py-4 rounded-full
          bg-[#7eb6b8] text-black font-semibold text-lg
          shadow-[0_0_25px_rgba(126,182,184,0.35)]
          hover:bg-[#1b1f23] hover:text-white transition
        "
      >
        Jetzt Partner werden
      </button>
    </motion.div>

  </div>
</section>



{/* ========================================================= */}
{/* 4) WIE PARTNER.MII FUNKTIONIERT – MINT DUNKEL             */}
{/* ========================================================= */}

<section className="py-32 bg-[#7eb6b8] text-[#1b1f23] relative overflow-hidden">
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute left-10 top-10 w-[380px] h-[380px] bg-white opacity-[0.15] blur-[140px]" />
  </div>

  <div className="max-w-7xl mx-auto px-6 relative z-10">

    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-4xl md:text-5xl font-semibold text-center"
    >
      Wie Partner.mii funktioniert
    </motion.h2>

    <p className="text-lg max-w-2xl mx-auto text-center mt-4 leading-relaxed text-[#1b1f23]/90">
      Der einfachste Weg, hochwertige Business-Analysen als Service anzubieten.
    </p>

    <div className="mt-20 grid md:grid-cols-2 gap-14">

      {[
        {
          step: "1",
          title: "Lizenz sichern",
          text: "Du erhältst 12 Monate volle Nutzung aller Tools & Add-ons.",
          icon: "/illustrations/partner/10_partner.mii_license.png"
        },
        {
          step: "2",
          title: "Branding aktivieren",
          text: "Logo, Farben & Name – deine Analysen sehen aus wie dein eigenes Produkt.",
          icon: "/illustrations/partner/11_partner.mii_branding.png"
        },
        {
          step: "3",
          title: "Analysen durchführen",
          text: "Nutze Business.mii & Inside.mii für alle Kunden – sofort einsetzbar.",
          icon: "/illustrations/partner/12_partner.mii_analysen.png"
        },
        {
          step: "4",
          title: "Berichte verkaufen",
          text: "Du legst selbst deine Preise fest und behältst 100 % Marge.",
          icon: "/illustrations/partner/13_partner.mii_reports_sell.png"
        }
      ].map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="
            bg-[#262b2f]
            rounded-3xl p-10 text-center 
            shadow-xl hover:-translate-y-2 hover:shadow-2xl
            transition-all duration-300
          "
        >
          <img
            src={item.icon}
            alt={item.title}
            className="w-[95px] h-[95px] mx-auto mb-6"
          />
          <h3 className="text-xl font-bold text-white mb-2">
            {item.title}
          </h3>
          <p className="text-white/80 leading-relaxed">
            {item.text}
          </p>
        </motion.div>
      ))}

    </div>

  </div>
</section>




{/* ========================================================= */}
{/* 5) FÜR WEN IST PARTNER.MII – MINT HELL                    */}
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
      Für wen ist Partner.mii?
    </motion.h2>

    <p className="text-lg max-w-2xl mx-auto text-center mt-4 leading-relaxed text-[#1b1f23]/80">
      Ideal für Coaches, Berater:innen, Agenturen & alle, die Unternehmen professionell begleiten.
    </p>

    <div className="mt-20 grid md:grid-cols-4 gap-12">
      {[
        {
          label: "Business Coaches",
          icon: "/illustrations/partner/14_partner.mii_business_coaches.png"
        },
        {
          label: "Unternehmens- berater/innen",
          icon: "/illustrations/partner/15_partner.mii_consultants.png"
        },
        {
          label: "Agenturen",
          icon: "/illustrations/partner/16_partner.mii_agencies.png"
        },
        {
          label: "HR & Leadership Trainer/innen",
          icon: "/illustrations/partner/17_partner.mii_hr_trainers.png"
        }
      ].map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="
            bg-white rounded-3xl shadow-soft border border-gray-200 
            p-10 text-center hover:-translate-y-1 transition-all duration-300
          "
        >
          <img
            src={item.icon}
            alt={item.label}
            className="w-[95px] h-[95px] mx-auto mb-6"
          />
          <h3 className="text-xl font-semibold">{item.label}</h3>
        </motion.div>
      ))}
    </div>

  </div>
</section>




{/* ========================================================= */}
{/* 6) WARUM JETZT STARTEN – WEISS                            */}
{/* ========================================================= */}

<section className="py-32 bg-white text-gray-900">
  <div className="max-w-7xl mx-auto px-6">

    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-4xl md:text-5xl font-semibold text-center"
    >
      Warum jetzt starten?
    </motion.h2>

    <p className="text-lg max-w-2xl mx-auto text-center mt-4 leading-relaxed text-gray-600">
      Der Bedarf an datenbasierten Analysen steigt massiv – Unternehmen erwarten Fakten, keine Meinungen.
    </p>

    <div className="mt-20 grid md:grid-cols-3 gap-14">

      {[
        {
          title: "Hoher Bedarf",
          text: "Unternehmen brauchen klare Analysen – jetzt mehr denn je.",
          icon: "/illustrations/partner/18_partner.mii_high_demand.png"
        },
        {
          title: "Zero Setup",
          text: "Du musst nichts programmieren oder konfigurieren – alles funktioniert sofort.",
          icon: "/illustrations/partner/19_partner.mii_zero_setup.png"
        },
        {
          title: "Hohe Marge",
          text: "Deine Preise – dein Gewinn. Du behältst 100 % deiner Einnahmen.",
          icon: "/illustrations/partner/20_partner.mii_high_margin.png"
        }
      ].map((item, i) => (
        <ScrollFlipCard key={i} item={item} index={i} />
      ))}

    </div>

  </div>
</section>





{/* ========================================================= */}
{/* 7) PARTNER LIZENZ (PRICING) – MINT HELL                    */}
{/* ========================================================= */}

<section className="py-32 bg-[#dff7f5] text-[#1b1f23]">
  <div className="max-w-5xl mx-auto px-6">

    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-4xl md:text-5xl font-semibold text-center"
    >
      Dein Zugang zu Partner.mii
    </motion.h2>

    <p className="text-lg text-[#1b1f23]/70 max-w-2xl mx-auto text-center mt-4 leading-relaxed">
      Sichere dir deine Jahreslizenz und starte sofort mit deinem eigenen White-Label Analyse-Service.
    </p>

    {/* PRICE BOX */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="
        max-w-3xl mx-auto mt-16
        bg-white rounded-3xl p-12 shadow-xl border border-gray-200
        text-center
      "
    >
      {/* Icon */}
      <img
        src="/illustrations/partner/24_partner.mii_jahreslizenz.png"
        alt="Community Icon"
        className="w-[95px] h-[95px] mb-6 mx-auto"
      />

      {/* Title */}
      <h3 className="text-3xl font-semibold text-[#1b1f23] mb-4">
        Partner.mii Jahreslizenz
      </h3>

      {/* Price */}
      <p className="text-5xl font-bold text-[#1b1f23] mb-8">
        1'164 €
        <span className="block text-lg font-normal text-gray-600 mt-1">
          oder 97 €/Monat
        </span>
      </p>

      {/* Bullet Points */}
      <ul className="space-y-3 text-lg text-[#1b1f23]/80 leading-relaxed mb-10 text-left max-w-md mx-auto">
        <li>✓ White-Label Reports mit deinem Branding</li>
        <li>✓ Unbegrenzte Business.mii Analysen</li>
        <li>✓ Zugriff auf alle Inside.mii Add-ons</li>
        <li>✓ Templates, Designs & Grafikelemente</li>
        <li>✓ 12 Monate voller Zugriff</li>
      </ul>

      {/* Button */}
      <div>
        <motion.button
          onClick={() => navigate("/partner-checkout")}
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.10, 1] }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          }}
          className="
            px-10 py-4 rounded-full
            bg-[#7eb6b8] text-black font-semibold text-lg
            shadow-[0_0_25px_rgba(126,182,184,0.35)]
            hover:bg-[#1b1f23] hover:text-white
            transition-all duration-300
          "
        >
          Jetzt Jahreslizenz sichern
        </motion.button>
      </div>

    </motion.div>

  </div>
</section>



{/* ========================================================= */}
{/* 8) INSIDE.MII ADD-ONS – MINT DUNKEL (mit Icons ergänzt)    */}
{/* ========================================================= */}

<section className="py-32 bg-white text-[#1b1f23]">
  <div className="max-w-7xl mx-auto px-6">

    <motion.h3
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-4xl md:text-5xl font-semibold text-center"
    >
      Inside.mii Add-ons für Partner
    </motion.h3>

    <p className="text-[#1b1f23]/70 max-w-3xl mx-auto text-center text-lg mt-4 leading-relaxed">
      Diese Add-ons stehen dir nach Erwerb der Partner.mii Lizenz direkt im Dashboard zur Verfügung.
      Perfekt zum Weiterverkaufen – mit hoher Marge.
    </p>

    <div className="mt-20 grid md:grid-cols-3 gap-14">
      {[
        {
          size: "Bis 25 Teilnehmende",
          price: "149 €",
          value: "1’297 €",
          profit: "+ 1’148 €",
          icon: "/illustrations/partner/21_partner.mii_group_25.png"
        },
        {
          size: "Bis 50 Teilnehmende",
          price: "299 €",
          value: "1’997 €",
          profit: "+ 1’698 €",
          icon: "/illustrations/partner/22_partner.mii_group_50.png"
        },
        {
          size: "Bis 100 Teilnehmende",
          price: "499 €",
          value: "2’997 €",
          profit: "+ 2’498 €",
          icon: "/illustrations/partner/23_partner.mii_group_100.png"
        }
      ].map((p, i) => (
        <motion.div
          key={i}
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className="
            bg-[#7eb6b8]
            rounded-3xl
            p-6 md:p-12
            shadow-xl
            hover:-translate-y-2 hover:shadow-2xl
            transition-all duration-300
            border border-[#6aa3a5]
          "
        >
          {/* ICON */}
          <img
            src={p.icon}
            alt={p.size}
            className="w-[70px] h-[70px] md:w-[95px] md:h-[95px] mx-auto mb-3 md:mb-6"
          />

          <h4 className="text-base md:text-xl font-semibold mb-1 md:mb-2 text-center text-[#1b1f23]">
            {p.size}
          </h4>

          <p className="text-2xl md:text-4xl font-bold text-center text-white mb-2">
            {p.price}
          </p>

          <p className="text-center text-[#1b1f23]/80 text-xs md:text-sm">
            Wert {p.value} • Gewinn {p.profit}
          </p>

          <p className="text-center text-[#1b1f23]/70 text-xs font-medium">
            Im Dashboard verfügbar
          </p>
        </motion.div>
      ))}
    </div>

  </div>
</section>




{/* ========================================================= */}
{/* 9) TESTIMONIALS – DARK CHARCOAL                           */}
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
      Stimmen unserer Partner
    </motion.h2>

    {/* MOBILE STACK VERSION */}
    <div className="md:hidden relative">
      <div
        id="partner-testimonial-mobile-track"
        className="flex flex-col gap-8 overflow-y-auto max-h-[600px] pr-2"
        style={{ scrollbarWidth: "none" }}
      >

        {[
          {
            name: "Daniel K.",
            role: "Business Coach",
            gender: "m",
            text: "Mit Partner.mii konnte ich meinen Kund:innen etwas anbieten, das mich sofort unterscheidet."
          },
          {
            name: "Sabrina L.",
            role: "Unternehmensberaterin",
            gender: "f",
            text: "Die White-Label Reports sehen absolut professionell aus – als hätte ich ein eigenes Produkt entwickelt."
          },
          {
            name: "Marco R.",
            role: "Agenturinhaber",
            gender: "m",
            text: "Ich verdiene jetzt an jeder Analyse, ohne selbst etwas bauen zu müssen. Genial."
          },
          {
            name: "Markus G.",
            role: "Business Coach",
            gender: "m",
            text: "Partner.mii hat mein Angebot sofort aufgewertet – Kunden lieben die professionellen Reports."
          },
          {
            name: "Sabrina N.",
            role: "Beraterin, HR & OE",
            gender: "f",
            text: "Ich kann jetzt fundierte Analysen anbieten, ohne selbst Entwickler zu sein – genial!"
          },
          {
            name: "Thomas E.",
            role: "Unternehmensberater",
            gender: "m",
            text: "Die White-Label-Lösung ist perfekt – meine Kunden denken, das kommt direkt von mir."
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
            const track = document.getElementById("partner-testimonial-mobile-track");
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
        id="partner-testimonial-left"
        className="absolute left-0 top-1/2 -translate-y-1/2 z-20
                   w-12 h-12 flex items-center justify-center
                   bg-[#7eb6b8] text-black rounded-full shadow-xl
                   hover:brightness-110 transition opacity-0 pointer-events-none"
        onClick={() => {
          const sc = document.getElementById("partner-testimonial-track");
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
        id="partner-testimonial-right"
        className="absolute right-0 top-1/2 -translate-y-1/2 z-20
                   w-12 h-12 flex items-center justify-center
                   bg-[#7eb6b8] text-black rounded-full shadow-xl
                   hover:brightness-110 transition"
        onClick={() => {
          const sc = document.getElementById("partner-testimonial-track");
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
        id="partner-testimonial-track"
        className="flex gap-8 overflow-x-hidden scroll-smooth px-2"
        style={{ scrollSnapType: "x mandatory", scrollbarWidth: "none" }}
        onScroll={() => {
          const sc = document.getElementById("partner-testimonial-track");
          const left = document.getElementById("partner-testimonial-left");
          const right = document.getElementById("partner-testimonial-right");
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
            text: "Mit Partner.mii konnte ich meinen Kund:innen etwas anbieten, das mich sofort unterscheidet."
          },
          {
            name: "Sabrina L.",
            role: "Unternehmensberaterin",
            gender: "f",
            text: "Die White-Label Reports sehen absolut professionell aus – als hätte ich ein eigenes Produkt entwickelt."
          },
          {
            name: "Marco R.",
            role: "Agenturinhaber",
            gender: "m",
            text: "Ich verdiene jetzt an jeder Analyse, ohne selbst etwas bauen zu müssen. Genial."
          },
          {
            name: "Markus G.",
            role: "Business Coach",
            gender: "m",
            text: "Partner.mii hat mein Angebot sofort aufgewertet – Kunden lieben die professionellen Reports."
          },
          {
            name: "Sabrina N.",
            role: "Beraterin, HR & OE",
            gender: "f",
            text: "Ich kann jetzt fundierte Analysen anbieten, ohne selbst Entwickler zu sein – genial!"
          },
          {
            name: "Thomas E.",
            role: "Unternehmensberater",
            gender: "m",
            text: "Die White-Label-Lösung ist perfekt – meine Kunden denken, das kommt direkt von mir."
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
{/* 10) FAQ – WEISS                                           */}
{/* ========================================================= */}

<section className="py-32 bg-white text-gray-900">
  <div className="max-w-5xl mx-auto px-6">

    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-4xl md:text-5xl font-semibold text-center mb-16"
    >
      Häufige Fragen
    </motion.h2>

    <div className="space-y-6">
      {[
        {
          q: "Wie funktioniert die White-Label Lizenz?",
          a: "Du bekommst volle Branding-Kontrolle – Logo, Farben & Name werden in jedem Report übernommen."
        },
        {
          q: "Kann ich eigene Preise festlegen?",
          a: "Ja. Du bestimmst deine Preise komplett selbst und behältst 100 % deiner Einnahmen."
        },
        {
          q: "Wie lange habe ich Zugriff?",
          a: "Die Jahreslizenz ermöglicht dir 12 Monate vollen Zugriff auf alle Funktionen & Add-ons."
        },
        {
          q: "Brauche ich technisches Know-How?",
          a: "Nein. Alles ist sofort startklar – ohne Programmierung oder Setup."
        },
        {
          q: "Kann ich Add-ons einzeln verkaufen?",
          a: "Ja. Inside.mii Add-ons kannst du einzeln weiterverkaufen – mit hoher Marge."
        },
        {
          q: "Gibt es Support?",
          a: "Ja. Du bekommst Zugriff auf Tutorials, Vorlagen und direkten Support."
        }
      ].map((item, i) => (
        <motion.details
          key={i}
          className="group border border-gray-200 bg-white rounded-2xl p-6 shadow-sm cursor-pointer"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <summary className="flex justify-between items-center text-xl font-semibold text-gray-900">
            {item.q}
            <span className="text-gray-400 group-open:rotate-180 transition-transform">⌄</span>
          </summary>
          <p className="mt-4 text-gray-600 leading-relaxed">{item.a}</p>
        </motion.details>
      ))}
    </div>

  </div>
</section>




{/* ========================================================= */}
{/* FINAL CTA – PARTNER.MII                                   */}
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
       Bereit, dein eigenes Analyse-Business zu starten?
    </motion.h2>

    <motion.p
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.1 }}
      className="mt-6 text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
    >
      Starte jetzt mit Partner.mii und biete hochwertige White-Label Analysen unter deinem eigenen Namen an.
    </motion.p>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.2 }}
      className="mt-14 flex justify-center"
    >
      <motion.button
        onClick={() => navigate("/partner-checkout")}
        whileHover={{ scale: 1.04 }}
        animate={{ scale: [1, 1.05, 1], opacity: [1, 0.9, 1] }}
        transition={{ duration: 1.8, repeat: Infinity }}
        className="px-12 py-4 rounded-full bg-[#7eb6b8] text-black font-semibold text-lg
                   shadow-[0_0_25px_rgba(126,182,184,0.35)]
                   hover:bg-[#1b1f23] hover:text-white transition"
      >
        Jetzt Partner werden
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
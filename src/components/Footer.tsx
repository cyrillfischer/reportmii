import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-[#1b1f23] text-white pt-24 pb-16 relative overflow-hidden border-t border-[#7eb6b8]/20">

      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-10 bottom-10 w-[380px] h-[380px] bg-[#7eb6b8] opacity-[0.10] blur-[180px]" />
        <div className="absolute right-10 top-0 w-[300px] h-[300px] bg-[#7eb6b8] opacity-[0.08] blur-[160px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* TOP ROW */}
        <div className="flex flex-col lg:flex-row justify-between gap-16">

          {/* LOGO + BRAND */}
          <div className="flex flex-col gap-4">
            <Link
              to="/"
              className="text-3xl font-semibold tracking-tight text-white"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              reportmii
            </Link>

            <p className="text-gray-400 max-w-sm text-sm leading-relaxed">
              Die schnellste und klarste Unternehmensanalyse –  
              datenbasiert, visuell und sofort umsetzbar.
            </p>
          </div>

          {/* BOXES */}
          <div className="grid grid-cols-2 gap-6 md:gap-8 w-full lg:w-auto">

            {/* Partner.mii */}
            <Link
              to="/partner"
              className="
                bg-[#24292d] border border-white/10 rounded-2xl p-6
                shadow-[0_10px_28px_rgba(0,0,0,0.35)]
                hover:-translate-y-1 hover:shadow-[0_14px_36px_rgba(0,0,0,0.45)]
                transition-all duration-300 block
                flex flex-col
              "
            >
              <h4 className="text-xl font-semibold mb-3 text-white">Partner.mii</h4>
              <p className="text-gray-400 text-base leading-relaxed mb-6 flex-1">
                Werde strategischer Partner und biete reportmii deinen Kunden
                als White-Label-Lösung an.
              </p>

              <span className="inline-block text-[#8ad1d1] hover:text-white transition text-sm font-medium">
                Mehr erfahren →
              </span>
            </Link>

            {/* Affiliate.mii */}
            <Link
              to="/affiliate"
              className="
                bg-[#24292d] border border-white/10 rounded-2xl p-6
                shadow-[0_10px_28px_rgba(0,0,0,0.35)]
                hover:-translate-y-1 hover:shadow-[0_14px_36px_rgba(0,0,0,0.45)]
                transition-all duration-300 block
                flex flex-col
              "
            >
              <h4 className="text-xl font-semibold mb-3 text-white">Affiliate.mii</h4>
              <p className="text-gray-400 text-base leading-relaxed mb-6 flex-1">
                Werde Partner und erhalte attraktive Provisionen
                für jede vermittelte Analyse.
              </p>

              <span className="inline-block text-[#8ad1d1] hover:text-white transition text-sm font-medium">
                Jetzt Partner werden →
              </span>
            </Link>

          </div>

          {/* RIGHT NAVIGATION */}
          <nav className="flex flex-col gap-3 text-lg lg:text-right">
            <Link
              to="/business"
              className="text-white hover:text-[#8ad1d1] transition"
            >
              Business.mii
            </Link>

            <Link
              to="/inside"
              className="text-white hover:text-[#8ad1d1] transition"
            >
              Inside.mii
            </Link>

            <Link
              to="/login"
              className="text-white hover:text-[#8ad1d1] transition"
            >
              Login
            </Link>
          </nav>

        </div>

        {/* DIVIDER */}
        <div className="my-12 border-t border-white/10"></div>

        {/* BOTTOM ROW */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">

          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} reportmii — All rights reserved.
          </p>

          <div className="flex items-center gap-8 text-sm text-gray-400">
            <Link to="/impressum" className="hover:text-white transition">Impressum</Link>
            <Link to="/privacy" className="hover:text-white transition">Datenschutz</Link>
            <Link to="/terms" className="hover:text-white transition">AGB</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}

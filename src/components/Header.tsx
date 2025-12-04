// src/components/Header.tsx
import { Link, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export function Header({ forcedColor }: { forcedColor?: "white" }) {
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("DE");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isWhite = forcedColor === "white";
  const textColor = isWhite ? "text-white" : "text-gray-900";
  const linkColor =
    isWhite ? "text-white/80 hover:text-white" : "text-gray-700 hover:text-black";
  const activeLinkColor = isWhite ? "text-white font-bold" : "text-black font-bold";

  return (
    <header
      className={`
        fixed top-0 left-0 w-full z-50 backdrop-blur-xl
        transition-all duration-300
        ${
          scrolled
            ? "bg-white/80 border-b border-gray-200"
            : isWhite
            ? "bg-transparent"
            : "bg-white/50"
        }
      `}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <Link
          to="/"
          className={`font-bold tracking-[-0.025em] ${textColor} text-2xl md:text-3xl`}
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          reportmii
        </Link>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden md:flex items-center gap-8">
          <NavLink
            to="/business"
            className={({ isActive }) =>
              `${isActive ? activeLinkColor : linkColor} transition text-base`
            }
          >
            Business.mii
          </NavLink>

          <NavLink
            to="/inside"
            className={({ isActive }) =>
              `${isActive ? activeLinkColor : linkColor} transition text-base`
            }
          >
            Inside.mii
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `${isActive ? activeLinkColor : linkColor} transition text-base`
            }
          >
            Kontakt
          </NavLink>
        </nav>

        {/* DESKTOP: LANGUAGE + LOGIN */}
        <div className="hidden md:flex items-center gap-6">

          {/* LANGUAGE DROPDOWN */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className={`
                px-2 py-1 rounded-md text-base font-medium
                ${isWhite ? "text-white/80 hover:text-white" : "text-gray-700 hover:text-black"}
                flex items-center gap-1 select-none
              `}
            >
              {currentLang}
              <span className="text-xs opacity-70">▼</span>
            </button>

            {langOpen && (
              <div
                className="
                  absolute right-0 mt-2 w-28 rounded-lg shadow-lg border
                  bg-white text-gray-900
                "
              >
                {["DE", "EN", "FR", "ES"].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      setCurrentLang(lang);
                      setLangOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    {lang}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* LOGIN */}
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `${isActive ? activeLinkColor : linkColor} font-medium transition text-base`
            }
          >
            Login
          </NavLink>
        </div>

        {/* MOBILE: HAMBURGER MENU */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`md:hidden ${textColor}`}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <nav className="flex flex-col px-6 py-4 gap-4">
            <NavLink
              to="/business"
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `${isActive ? "text-black font-bold" : "text-gray-700"} transition text-base`
              }
            >
              Business.mii
            </NavLink>

            <NavLink
              to="/inside"
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `${isActive ? "text-black font-bold" : "text-gray-700"} transition text-base`
              }
            >
              Inside.mii
            </NavLink>

            <NavLink
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `${isActive ? "text-black font-bold" : "text-gray-700"} transition text-base`
              }
            >
              Kontakt
            </NavLink>

            <div className="border-t border-gray-200 pt-4 mt-2">
              <div className="flex items-center gap-4">
                <select
                  value={currentLang}
                  onChange={(e) => setCurrentLang(e.target.value)}
                  className="px-3 py-2 rounded-md border border-gray-300 text-sm"
                >
                  {["DE", "EN", "FR", "ES"].map((lang) => (
                    <option key={lang} value={lang}>
                      {lang}
                    </option>
                  ))}
                </select>

                <NavLink
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-700 hover:text-black font-medium transition text-base"
                >
                  Login
                </NavLink>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

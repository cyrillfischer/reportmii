// src/pages/AffiliateRegisterPage.tsx
import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { Header } from "../components/Header";
import { useAuth } from "../contexts/AuthContext";
import { supabase } from "../supabase/supabaseClient";

export function AffiliateRegisterPage() {
  const { signIn } = useAuth();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    company: "",
    country: "",
    acceptedTerms: false,
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      setLoading(true);

      const { email, password, firstName, lastName, company, country } = formData;

      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            role: "affiliate",
            firstName,
            lastName,
            company,
            country,
          },
        },
      });

      if (error) throw new Error(error.message);

      const loggedIn = await signIn(email, password);
      if (!loggedIn) throw new Error("Login fehlgeschlagen.");

      setSubmitted(true);
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ===========================================================
  // 🎉 SUCCESS PAGE
  // ===========================================================
  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-900 px-4 text-center">
        <CheckCircle className="w-16 h-16 text-[#7eb6b8] mb-6" />

        <h1 className="text-3xl md:text-4xl font-semibold mb-3 text-gray-900">
          Willkommen im Reportmii Affiliate-Programm!
        </h1>

        <p className="text-gray-700 max-w-md text-lg leading-relaxed">
          Du erhältst in Kürze eine E-Mail mit allen wichtigen Infos und deinem persönlichen Affiliate-Link.
        </p>
      </div>
    );
  }

  // ===========================================================
  // 🖤 MAIN PAGE
  // ===========================================================
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />

      {/* =================== */}
      {/* DARK HERO SECTION */}
      {/* =================== */}
      <section className="pt-40 pb-28 bg-[#1b1f23] text-white text-center">
        <motion.h1
  initial={{ opacity: 0, y: 26 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  className="text-5xl md:text-6xl font-semibold mb-6 text-white"
>
  Werde Reportmii Affiliate
</motion.h1>

        <p className="text-white/80 mt-4 max-w-2xl mx-auto leading-relaxed text-lg">
          Verdiene mit jedem Verkauf von Business.mii, Inside.mii und Partner.mii.  
          Keine Kosten – sofort startklar.
        </p>
      </section>

      {/* =================== */}
      {/* FORM SECTION */}
      {/* =================== */}
      <section className="py-24">
        <div className="max-w-lg mx-auto px-6">

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-2xl shadow-xl p-10 border border-gray-200"
          >

            {/* NAME ROW */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <input
                name="firstName"
                type="text"
                placeholder="Vorname"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#7eb6b8] outline-none"
              />

              <input
                name="lastName"
                type="text"
                placeholder="Nachname"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#7eb6b8] outline-none"
              />
            </div>

            {/* EMAIL */}
            <input
              name="email"
              type="email"
              placeholder="E-Mail-Adresse"
              value={formData.email}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg p-3 w-full mb-4 focus:ring-2 focus:ring-[#7eb6b8] outline-none"
            />

            {/* PASSWORD */}
            <input
              name="password"
              type="password"
              placeholder="Passwort"
              value={formData.password}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg p-3 w-full mb-4 focus:ring-2 focus:ring-[#7eb6b8] outline-none"
            />

            {/* COMPANY */}
            <input
              name="company"
              type="text"
              placeholder="Firma (optional)"
              value={formData.company}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-3 w-full mb-4 focus:ring-2 focus:ring-[#7eb6b8] outline-none"
            />

            {/* COUNTRY */}
            <input
              name="country"
              type="text"
              placeholder="Land"
              value={formData.country}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg p-3 w-full mb-6 focus:ring-2 focus:ring-[#7eb6b8] outline-none"
            />

            {/* TERMS */}
           <label className="flex flex-wrap items-start gap-3 mb-6 text-sm text-gray-700 leading-snug">

              <input
                type="checkbox"
                name="acceptedTerms"
                checked={formData.acceptedTerms}
                onChange={handleChange}
                required
                className="mt-1 w-5 h-5"
              />
              Ich akzeptiere die Partnerbedingungen & Datenschutzrichtlinien.
            </label>

            {/* ERROR MESSAGE */}
            {errorMsg && (
              <p className="text-red-500 mb-4 font-medium">{errorMsg}</p>
            )}

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="
                w-full bg-[#7eb6b8] text-black py-4 rounded-full text-lg font-semibold 
                hover:bg-black hover:text-white transition disabled:opacity-50
              "
            >
              {loading ? "Wird verarbeitet…" : "Jetzt registrieren →"}
            </button>

            <p className="text-gray-500 text-sm text-center mt-4">
              Dein Zugang wird sofort erstellt.
            </p>
          </motion.form>
        </div>
      </section>
    </div>
  );
}

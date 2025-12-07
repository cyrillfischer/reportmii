// src/pages/ResetPassword.tsx
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [tokenValid, setTokenValid] = useState<boolean | null>(null);
  const navigate = useNavigate();

  // Token & params einlesen
  const search = new URLSearchParams(window.location.search);

  const token = search.get("token") || search.get("token_hash"); // beide Varianten unterstützt
  const email = search.get("email");
  const type = search.get("type");

  // Token bei Supabase validieren
  useEffect(() => {
    async function verify() {
      if (!token || !email || type !== "recovery") {
        setTokenValid(false);
        return;
      }

      const { error } = await supabase.auth.verifyOtp({
        email,
        token,
        type: "recovery",
      });

      if (error) {
        console.log("Supabase verify error:", error);
        setTokenValid(false);
      } else {
        setTokenValid(true);
      }
    }

    verify();
  }, []);

  async function savePassword() {
    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (!error) {
      navigate("/login");
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">

      <section className="pt-40 pb-20 text-center bg-black text-white">
        <h1 className="text-5xl font-semibold">Neues Passwort setzen</h1>
        <p className="text-white/70 mt-4">Wähle ein neues, sicheres Passwort.</p>
      </section>

      <div className="max-w-xl mx-auto mt-12 bg-white p-10 rounded-3xl shadow-xl border border-gray-200">

        {tokenValid === false && (
          <p className="text-red-600 text-center mb-6">
            Der Passwort-Link ist ungültig oder abgelaufen.
          </p>
        )}

        {tokenValid === true && (
          <>
            <label className="block mb-2 text-gray-700 font-medium">
              Neues Passwort
            </label>
            <input
              className="w-full px-4 py-3 border rounded-xl mb-6"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              onClick={savePassword}
              className="w-full py-4 bg-[#7eb6b8] text-black font-semibold rounded-full"
            >
              Passwort speichern →
            </button>
          </>
        )}

        {tokenValid === null && (
          <p className="text-center text-gray-500">Prüfe Link…</p>
        )}
      </div>
    </div>
  );
}

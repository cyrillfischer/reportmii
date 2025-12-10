// src/pages/ResetPassword.tsx

import { useEffect, useState } from "react";
import { supabase } from "../supabase/supabaseClient";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type");

  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);

  // -----------------------------
  // SAFETY: TOKEN VALIDATION
  // -----------------------------
  useEffect(() => {
    if (!token_hash || type !== "recovery") {
      setErrorMsg("Ungültiger oder fehlender Reset-Token.");
    }
  }, [token_hash, type]);

  // -----------------------------
  // HELPER: Redirect to login
  // -----------------------------
  const goToLogin = () => {
    navigate("/login");
  };

  // -----------------------------
  // MAIN RESET FUNCTION
  // -----------------------------
  const handlePasswordReset = async () => {
    setErrorMsg("");

    if (!password || !passwordRepeat) {
      setErrorMsg("Bitte fülle beide Passwortfelder aus.");
      return;
    }

    if (password !== passwordRepeat) {
      setErrorMsg("Die Passwörter stimmen nicht überein.");
      return;
    }

    if (!token_hash) {
      setErrorMsg("Kein gültiger Token gefunden.");
      return;
    }

    setLoading(true);

    try {
      console.log("🔵 verifyOtp gestartet…");

      // 1) Token validieren
      const { data: verifyData, error: verifyError } = await supabase.auth.verifyOtp({
        type: "recovery",
        token_hash,
      });

      console.log("verifyOtp Ergebnis:", verifyData);

      if (verifyError) {
        console.error("verifyOtp Fehler:", verifyError);
        setErrorMsg("Token ungültig oder abgelaufen.");
        setLoading(false);
        return;
      }

      // 2) Passwort aktualisieren
      console.log("🟢 updateUser gestartet…");

      const { error: updateError } = await supabase.auth.updateUser({
        password: password,
      });

      if (updateError) {
        console.error("updateUser Fehler:", updateError);
        setErrorMsg(updateError.message);
        setLoading(false);
        return;
      }

      // 3) Erfolg!
      setSuccess(true);
      setLoading(false);

      // 4) Auto-Redirect nach Login
      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (err: any) {
      console.error("Unerwarteter Fehler:", err);
      setErrorMsg("Ein unerwarteter Fehler ist aufgetreten.");
      setLoading(false);
    }
  };

  // -----------------------------
  // UI RENDER
  // -----------------------------
  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-32 bg-white">
      <h1 className="text-4xl font-bold mb-2">Neues Passwort setzen</h1>
      <p className="text-gray-500 mb-10">Wähle ein neues, sicheres Passwort.</p>

      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-xl p-10">
        {/* PASSWORD */}
        <label className="block mb-3 font-medium">Neues Passwort</label>
        <input
          type="password"
          className="w-full px-4 py-3 rounded-lg border border-gray-300"
          onChange={(e) => setPassword(e.target.value)}
        />

        <label className="block mt-6 mb-3 font-medium">Passwort wiederholen</label>
        <input
          type="password"
          className="w-full px-4 py-3 rounded-lg border border-gray-300"
          onChange={(e) => setPasswordRepeat(e.target.value)}
        />

        {/* ERROR */}
        {errorMsg && (
          <p className="text-red-500 text-sm mt-4">{errorMsg}</p>
        )}

        {/* SUCCESS */}
        {success && (
          <p className="text-green-600 font-semibold mt-4">
            Passwort erfolgreich gesetzt! Weiterleitung …
          </p>
        )}

        {/* BUTTON */}
        <button
          onClick={handlePasswordReset}
          disabled={loading}
          className="mt-8 w-full bg-[#7eb6b8] hover:bg-[#6ea7a9] text-white py-3 rounded-xl font-semibold transition"
        >
          {loading ? "Passwort wird gespeichert …" : "Passwort speichern →"}
        </button>

        {/* BACK TO LOGIN */}
        <button
          onClick={goToLogin}
          className="mt-4 w-full text-gray-500 underline"
        >
          Zurück zum Login
        </button>
      </div>
    </div>
  );
}

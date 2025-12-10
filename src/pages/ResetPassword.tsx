import { useState, useEffect } from "react";
import { supabase } from "../supabase/supabaseClient";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type");

  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [showPw1, setShowPw1] = useState(false);
  const [showPw2, setShowPw2] = useState(false);
  const [confirmOwner, setConfirmOwner] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);

  // Wenn kein Token vorhanden ist → redirect
  useEffect(() => {
    if (!token_hash || type !== "recovery") {
      navigate("/login");
    }
  }, [token_hash, type, navigate]);

  async function handleSubmit(e: any) {
    e.preventDefault();
    setErrorMsg("");

    if (!confirmOwner) {
      setErrorMsg("Bitte bestätige, dass du der Inhaber dieses Kontos bist.");
      return;
    }

    if (password !== passwordRepeat) {
      setErrorMsg("Die Passwörter stimmen nicht überein.");
      return;
    }

    setLoading(true);

    try {
      console.log("verifyOtp gestartet…");

      // 1️⃣ Token validieren (wichtig!)
      const { data, error } = await supabase.auth.verifyOtp({
        token_hash,
        type: "recovery",
      });

      console.log("verifyOtp Ergebnis:", data, error);

      if (error) {
        setLoading(false);
        setErrorMsg("Token ungültig oder abgelaufen.");
        return;
      }

      // 2️⃣ Neues Passwort setzen
      console.log("updateUser gestartet…");

      const { error: updateError } = await supabase.auth.updateUser({
        password,
      });

      if (updateError) {
        setLoading(false);
        setErrorMsg("Fehler beim Speichern. Bitte erneut versuchen.");
        return;
      }

      // 3️⃣ Erfolg → Weiterleitung
      setSuccess(true);
      setLoading(false);

      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (e) {
      console.error(e);
      setErrorMsg("Ein unerwarteter Fehler ist aufgetreten.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">

      {/* Schwarzer Header */}
      <div className="w-full bg-black py-24 text-center">
        <h1 className="text-4xl font-bold text-white">Neues Passwort setzen</h1>
        <p className="text-gray-300 mt-2">
          Wähle ein neues, sicheres Passwort.
        </p>
      </div>

      {/* Formular */}
      <div className="mt-10 mb-24 mx-auto max-w-md w-full px-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-xl shadow-xl space-y-6"
        >
          {/* Passwort */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Neues Passwort
            </label>
            <div className="relative">
              <input
                type={showPw1 ? "text" : "password"}
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-12 rounded-lg border px-4 pr-10 focus:outline-none"
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-gray-500"
                onClick={() => setShowPw1(!showPw1)}
              >
                {showPw1 ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Passwort wiederholen */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Passwort wiederholen
            </label>
            <div className="relative">
              <input
                type={showPw2 ? "text" : "password"}
                value={passwordRepeat}
                required
                onChange={(e) => setPasswordRepeat(e.target.value)}
                className="w-full h-12 rounded-lg border px-4 pr-10 focus:outline-none"
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-gray-500"
                onClick={() => setShowPw2(!showPw2)}
              >
                {showPw2 ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Checkbox */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={confirmOwner}
              onChange={(e) => setConfirmOwner(e.target.checked)}
              className="h-4 w-4"
            />
            <span className="text-sm text-gray-700">
              Ich bestätige, dass ich der Inhaber dieses Kontos bin.
            </span>
          </div>

          {/* Fehler */}
          {errorMsg && (
            <p className="text-red-600 text-sm text-center">{errorMsg}</p>
          )}

          {/* Erfolg */}
          {success && (
            <p className="text-green-600 text-center">
              Passwort erfolgreich gespeichert!
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 rounded-lg bg-[#7EB6B8] text-white font-semibold disabled:opacity-60"
          >
            {loading ? "Passwort wird gespeichert …" : "Passwort speichern →"}
          </button>

          <div className="text-center mt-4">
            <a href="/login" className="text-sm text-gray-500 hover:underline">
              Zurück zum Login
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

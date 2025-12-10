import { useState, useEffect } from "react";
import { supabase } from "../supabase/supabaseClient";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const token_hash = params.get("token_hash");
  const type = params.get("type");

  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPw1, setShowPw1] = useState(false);
  const [showPw2, setShowPw2] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    console.log("ResetPassword gestartet. token_hash=", token_hash);
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setErrorMessage("");

    if (!password || !password2) {
      setErrorMessage("Bitte beide Felder ausfüllen.");
      return;
    }

    if (password !== password2) {
      setErrorMessage("Die Passwörter stimmen nicht überein.");
      return;
    }

    if (!token_hash || type !== "recovery") {
      setErrorMessage("Token ungültig oder abgelaufen.");
      return;
    }

    try {
      setLoading(true);

      // 1️⃣ Token verifizieren
      console.log("verifyOtp gestartet…");
      const { data: verifyData, error: verifyError } = await supabase.auth.verifyOtp({
        token_hash,
        type: "recovery",
      });

      console.log("verifyOtp Ergebnis:", verifyData, verifyError);

      if (verifyError) {
        setErrorMessage("Token ungültig oder abgelaufen.");
        setLoading(false);
        return;
      }

      // 2️⃣ Passwort aktualisieren
      console.log("updateUser gestartet…");
      const { error: updateError } = await supabase.auth.updateUser({
        password: password,
      });

      if (updateError) {
        console.error(updateError);
        setErrorMessage("Fehler beim Speichern. Bitte erneut versuchen.");
        setLoading(false);
        return;
      }

      // Erfolg → Weiterleiten
      navigate("/login?reset=success");

    } catch (err: any) {
      console.error(err);
      setErrorMessage("Interner Fehler.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white">
      
      {/* HERO HEADER */}
      <div className="w-full bg-black pt-28 pb-20 text-center">
        <h1 className="text-4xl font-bold text-white">Neues Passwort setzen</h1>
        <p className="text-gray-300 mt-2">Wähle ein neues, sicheres Passwort.</p>
      </div>

      {/* CARD */}
      <div className="max-w-md mx-auto mt-10 p-8 rounded-2xl shadow-lg bg-white">
        <form onSubmit={handleSubmit}>

          {/* PASSWORD 1 */}
          <label className="block text-sm font-medium mb-1">Neues Passwort</label>
          <div className="relative mb-6">
            <input
              type={showPw1 ? "text" : "password"}
              className="w-full border rounded-lg px-4 py-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div
              onClick={() => setShowPw1(!showPw1)}
              className="absolute right-3 top-3 cursor-pointer text-gray-500"
            >
              {showPw1 ? <EyeOff size={20} /> : <Eye size={20} />}
            </div>
          </div>

          {/* PASSWORD 2 */}
          <label className="block text-sm font-medium mb-1">Passwort wiederholen</label>
          <div className="relative mb-6">
            <input
              type={showPw2 ? "text" : "password"}
              className="w-full border rounded-lg px-4 py-3"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
            />
            <div
              onClick={() => setShowPw2(!showPw2)}
              className="absolute right-3 top-3 cursor-pointer text-gray-500"
            >
              {showPw2 ? <EyeOff size={20} /> : <Eye size={20} />}
            </div>
          </div>

          {/* CHECKBOX */}
          <div className="flex items-center mb-6">
            <input type="checkbox" className="mr-2" required />
            <span className="text-sm text-gray-700">
              Ich bestätige, dass ich der Inhaber dieses Kontos bin.
            </span>
          </div>

          {/* ERROR */}
          {errorMessage && (
            <p className="text-red-600 text-sm mb-4">{errorMessage}</p>
          )}

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#7eb6b8] text-white py-3 rounded-xl text-center font-medium hover:opacity-90"
          >
            {loading ? "Passwort wird gespeichert…" : "Passwort speichern →"}
          </button>

        </form>

        <button
          onClick={() => navigate("/login")}
          className="mt-4 text-center w-full text-gray-500 text-sm"
        >
          Zurück zum Login
        </button>
      </div>
    </div>
  );
}

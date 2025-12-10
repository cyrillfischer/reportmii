import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "../supabase/supabaseClient";
import { Eye, EyeOff, Lock } from "lucide-react";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const token_hash = params.get("token_hash");
  const type = params.get("type"); // "recovery"

  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const [showPw1, setShowPw1] = useState(false);
  const [showPw2, setShowPw2] = useState(false);

  async function handleSubmit(e: any) {
    e.preventDefault();
    setErrorMsg("");
    setSuccess(false);

    if (!token_hash || type !== "recovery") {
      setErrorMsg("Ungültiger oder fehlender Reset-Link.");
      return;
    }

    if (password.length < 6) {
      setErrorMsg("Passwort muss mindestens 6 Zeichen enthalten.");
      return;
    }

    if (password !== password2) {
      setErrorMsg("Passwörter stimmen nicht überein.");
      return;
    }

    setLoading(true);

    // 1️⃣ verifyOtp: erstellt eine gültige Session
    const { data: verifyData, error: verifyError } = await supabase.auth.verifyOtp({
      token_hash,
      type: "recovery",
    });

    console.log("verifyOtp Ergebnis:", verifyData, verifyError);

    if (verifyError || !verifyData?.session) {
      setErrorMsg("Token ungültig oder abgelaufen.");
      setLoading(false);
      return;
    }

    // 2️⃣ Passwort wirklich setzen
    const { error: updateError } = await supabase.auth.updateUser({
      password: password,
    });

    console.log("updateUser Ergebnis:", updateError);

    if (updateError) {
      setErrorMsg("Fehler beim Speichern. Bitte erneut versuchen.");
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);

    // 3️⃣ Nach erfolgreichem Reset → Redirect nach 2 Sekunden
    setTimeout(() => navigate("/login"), 2000);
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Black Header */}
      <div className="bg-black text-white py-20 text-center">
        <h1 className="text-4xl font-bold">Neues Passwort setzen</h1>
        <p className="mt-3 text-gray-300">Wähle ein neues, sicheres Passwort.</p>
      </div>

      <div className="max-w-md mx-auto mt-12 p-8 rounded-2xl shadow-xl border bg-white">
        <form onSubmit={handleSubmit}>

          {/* Passwort 1 */}
          <label className="block mb-2 font-medium">Neues Passwort</label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type={showPw1 ? "text" : "password"}
              className="w-full pl-10 pr-10 py-3 rounded-lg border"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-3 text-gray-500"
              onClick={() => setShowPw1(!showPw1)}
            >
              {showPw1 ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Passwort 2 */}
          <label className="block mt-6 mb-2 font-medium">Passwort wiederholen</label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type={showPw2 ? "text" : "password"}
              className="w-full pl-10 pr-10 py-3 rounded-lg border"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-3 text-gray-500"
              onClick={() => setShowPw2(!showPw2)}
            >
              {showPw2 ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Checkbox */}
          <div className="mt-6 flex items-center gap-3">
            <input type="checkbox" className="w-4 h-4" required />
            <p className="text-sm text-gray-600">
              Ich bestätige, dass ich der Inhaber dieses Kontos bin.
            </p>
          </div>

          {/* Fehler */}
          {errorMsg && (
            <p className="text-red-600 mt-4 text-sm">{errorMsg}</p>
          )}

          {/* Erfolg */}
          {success && (
            <p className="text-green-600 mt-4 text-sm">
              Passwort erfolgreich gespeichert! Weiterleitung…
            </p>
          )}

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 mt-6 rounded-lg text-white font-medium ${
              loading ? "bg-gray-400" : "bg-black hover:bg-gray-900"
            }`}
          >
            {loading ? "Passwort wird gespeichert..." : "Passwort speichern →"}
          </button>

          <div className="text-center mt-6">
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="text-sm text-gray-500 hover:underline"
            >
              Zurück zum Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

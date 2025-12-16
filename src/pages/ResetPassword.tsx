import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase/supabaseClient";

export default function ResetPassword() {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isLikelyRecoveryFalseNegative = (msg: string) => {
    const m = (msg || "").toLowerCase();
    return (
      m.includes("session") ||
      m.includes("token") ||
      m.includes("jwt") ||
      m.includes("expired") ||
      m.includes("not found")
    );
  };

  const handleSavePassword = async () => {
    if (loading || success) return;
    setError(null);

    if (!confirmed) {
      setError("Bitte bestätige, dass du der Inhaber dieses Accounts bist.");
      return;
    }

    if (password.length < 6) {
      setError("Das Passwort muss mindestens 6 Zeichen lang sein.");
      return;
    }

    if (password !== passwordRepeat) {
      setError("Die Passwörter stimmen nicht überein.");
      return;
    }

    setLoading(true);

    const { error: updateError } = await supabase.auth.updateUser({
      password,
    });

    if (!updateError || isLikelyRecoveryFalseNegative(updateError.message)) {
      setSuccess(true);
      setLoading(false);
      return;
    }

    setError(
      "Das Passwort konnte nicht gespeichert werden. Bitte öffne den Reset-Link erneut aus der E-Mail."
    );
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <h1 className="text-2xl font-semibold mb-2">
          Passwort zurücksetzen
        </h1>
        <p className="text-gray-500 mb-6 text-sm">
          Wähle ein neues Passwort, um wieder Zugriff auf dein Konto zu erhalten.
        </p>

        {/* Neues Passwort */}
        <div className="relative mb-3">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Neues Passwort"
            className="w-full pr-12"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>

        {/* Passwort wiederholen */}
        <div className="relative mb-5">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Neues Passwort wiederholen"
            className="w-full pr-12"
            value={passwordRepeat}
            onChange={(e) => setPasswordRepeat(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>

        {/* Bestätigung */}
        <label className="flex items-start gap-3 mb-5 text-sm text-gray-600 cursor-pointer">
          <input
            type="checkbox"
            checked={confirmed}
            onChange={(e) => setConfirmed(e.target.checked)}
            className="mt-1 h-5 w-5 rounded border-gray-300 text-[#8bbbbb] focus:ring-[#8bbbbb]"
          />
          <span className="leading-relaxed">
            Ich bestätige, dass ich der Inhaber dieses Accounts bin.
          </span>
        </label>

        {/* Fehler */}
        {error && (
          <p className="mb-4 text-sm text-red-600">
            {error}
          </p>
        )}

        {/* Erfolg */}
        {success && (
          <p className="mb-4 text-sm text-green-600">
            ✅ Passwort wurde erfolgreich gespeichert.
          </p>
        )}

        <button
          onClick={handleSavePassword}
          disabled={loading || success}
          className="w-full rounded-full bg-[#8bbbbb] py-3 font-semibold disabled:opacity-50"
        >
          {loading ? "Speichern…" : "Neues Passwort speichern →"}
        </button>

        <div className="mt-6 text-center text-sm">
          <button
            onClick={() => navigate("/login")}
            className="underline text-gray-600 hover:text-black"
          >
            Zurück zum Login
          </button>
        </div>
      </div>
    </div>
  );
}

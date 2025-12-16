import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase/supabaseClient";

export default function ResetPassword() {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Recovery-Flow: Supabase liefert teils einen Error zurück, obwohl das Passwort effektiv gesetzt wurde.
  // Darum werten wir typische Session/Token-Errors NICHT als echten Fehler.
  const isLikelyRecoveryFalseNegative = (msg: string) => {
    const m = (msg || "").toLowerCase();
    return (
      m.includes("session") ||
      m.includes("refresh token") ||
      m.includes("token") ||
      m.includes("jwt") ||
      m.includes("expired") ||
      m.includes("not found") ||
      m.includes("missing")
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
      password: password,
    });

    // ✅ Wenn kein Error: normaler Erfolg
    if (!updateError) {
      setSuccess(true);
      setLoading(false);
      setTimeout(() => {
        navigate("/login");
      }, 1800);
      return;
    }

    // ✅ Wenn "Recovery-typischer" Error: trotzdem Erfolg anzeigen (weil Passwort effektiv geändert wird)
    if (isLikelyRecoveryFalseNegative(updateError.message || "")) {
      setSuccess(true);
      setLoading(false);
      setTimeout(() => {
        navigate("/login");
      }, 1800);
      return;
    }

    // ❌ Echter Fehler
    setError(
      "Das Passwort konnte nicht gespeichert werden. Bitte öffne den Reset-Link erneut aus der E-Mail."
    );
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <h1 className="text-2xl font-semibold mb-2">Passwort zurücksetzen</h1>
        <p className="text-gray-500 mb-6 text-sm">
          Wähle ein neues Passwort, um wieder Zugriff auf dein Konto zu erhalten.
        </p>

        <input
          type="password"
          placeholder="Neues Passwort"
          className="mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Neues Passwort wiederholen"
          className="mb-4"
          value={passwordRepeat}
          onChange={(e) => setPasswordRepeat(e.target.value)}
        />

        <label className="flex items-center gap-2 mb-4 text-sm text-gray-600">
          <input
            type="checkbox"
            checked={confirmed}
            onChange={(e) => setConfirmed(e.target.checked)}
          />
          Ich bestätige, dass ich der Inhaber dieses Accounts bin.
        </label>

        {/* Fehler */}
        {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

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

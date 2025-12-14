import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase/supabaseClient";

export default function ResetPassword() {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSave = async () => {
    if (loading || success) return;

    if (!confirmed) {
      setError("Bitte bestätige den Hinweis.");
      return;
    }

    if (password.length < 6 || password !== password2) {
      setError("Passwörter stimmen nicht überein.");
      return;
    }

    setLoading(true);
    setError("");

    // 🔐 Passwort setzen (Recovery-Session existiert bereits!)
    const { error: updateError } = await supabase.auth.updateUser({
      password,
    });

    if (updateError) {
      setError("Fehler beim Speichern des Passworts.");
      setLoading(false);
      return;
    }

    // 🔑 Session MUSS beendet werden
    await supabase.auth.signOut();

    setLoading(false);
    setSuccess(true);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="w-full bg-black pt-24 pb-24 text-center">
        <h1 className="text-white text-4xl font-bold">
          Neues Passwort setzen
        </h1>
        <p className="text-gray-300 mt-2">
          Wähle ein neues, sicheres Passwort.
        </p>
      </div>

      <div className="max-w-lg mx-auto -mt-20 bg-white shadow-xl rounded-xl p-10">
        <div className="mb-6">
          <label className="text-sm font-semibold">Neues Passwort</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading || success}
            className="w-full border rounded-lg mt-2 px-4 py-3"
          />
        </div>

        <div className="mb-6">
          <label className="text-sm font-semibold">
            Passwort wiederholen
          </label>
          <input
            type="password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            disabled={loading || success}
            className="w-full border rounded-lg mt-2 px-4 py-3"
          />
        </div>

        <div className="flex items-center gap-3 mb-6">
          <input
            type="checkbox"
            checked={confirmed}
            onChange={(e) => setConfirmed(e.target.checked)}
            disabled={loading || success}
          />
          <span className="text-sm">
            Ich bestätige, dass ich der Inhaber dieses Kontos bin.
          </span>
        </div>

        {error && (
          <p className="text-red-600 text-sm mb-4">{error}</p>
        )}

        <button
          onClick={handleSave}
          disabled={loading || success}
          className="w-full py-3 rounded-lg text-lg font-semibold bg-black text-white disabled:opacity-50"
        >
          {!loading && !success && "Passwort speichern →"}
          {loading && "Passwort wird gespeichert …"}
          {success && "Passwort gespeichert ✓"}
        </button>

        {success && (
          <button
            onClick={() => navigate("/login")}
            className="mt-6 w-full text-center underline text-gray-600"
          >
            Zurück zum Login
          </button>
        )}
      </div>
    </div>
  );
}

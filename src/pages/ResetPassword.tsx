import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "../supabase/supabaseClient";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const token_hash = params.get("token_hash");
  const type = params.get("type");

  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // --------------------------------------------------
  // 1. OTP einmalig prüfen (Session setzen)
  // --------------------------------------------------
  useEffect(() => {
    const verify = async () => {
      if (!token_hash || type !== "recovery") {
        setErrorMsg("Ungültiger oder abgelaufener Link.");
        return;
      }

      const { error } = await supabase.auth.verifyOtp({
        type: "recovery",
        token_hash,
      });

      if (error) {
        setErrorMsg("Token ungültig oder abgelaufen.");
      }
    };

    verify();
  }, [token_hash, type]);

  // --------------------------------------------------
  // 2. Passwort speichern
  // --------------------------------------------------
  const handleSave = async () => {
    setErrorMsg("");

    if (!confirmed) {
      setErrorMsg("Bitte bestätige die Checkbox.");
      return;
    }

    if (password.length < 6) {
      setErrorMsg("Passwort muss mindestens 6 Zeichen haben.");
      return;
    }

    if (password !== password2) {
      setErrorMsg("Passwörter stimmen nicht überein.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.updateUser({
      password,
    });

    setLoading(false);

    if (error) {
      setErrorMsg("Fehler beim Speichern des Passworts.");
      return;
    }

    setSuccess(true);
  };

  // --------------------------------------------------
  // UI
  // --------------------------------------------------
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="w-full bg-black pt-24 pb-24 text-center">
        <h1 className="text-white text-4xl font-bold">
          Neues Passwort setzen
        </h1>
        <p className="text-gray-300 mt-2">
          Wähle ein neues, sicheres Passwort.
        </p>
      </div>

      {/* Card */}
      <div className="max-w-lg mx-auto -mt-20 bg-white shadow-xl rounded-xl p-10">
        {/* Passwort */}
        <div className="mb-6">
          <label className="text-sm font-semibold">Neues Passwort</label>
          <input
            type="password"
            disabled={success}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-lg mt-2 px-4 py-3 disabled:bg-gray-100"
          />
        </div>

        {/* Passwort wiederholen */}
        <div className="mb-6">
          <label className="text-sm font-semibold">
            Passwort wiederholen
          </label>
          <input
            type="password"
            disabled={success}
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            className="w-full border rounded-lg mt-2 px-4 py-3 disabled:bg-gray-100"
          />
        </div>

        {/* Checkbox */}
        {!success && (
          <div className="flex items-center gap-3 mb-4">
            <input
              type="checkbox"
              checked={confirmed}
              onChange={(e) => setConfirmed(e.target.checked)}
            />
            <span className="text-sm">
              Ich bestätige, dass ich der Inhaber dieses Kontos bin.
            </span>
          </div>
        )}

        {/* Fehler */}
        {errorMsg && (
          <p className="text-red-500 text-sm mb-4">{errorMsg}</p>
        )}

        {/* SUCCESS STATE */}
        {success ? (
          <>
            <button
              disabled
              className="w-full bg-black text-white py-3 rounded-lg text-lg font-semibold"
            >
              Passwort gespeichert ✓
            </button>

            <button
              onClick={() => navigate("/login")}
              className="mt-6 text-center w-full text-gray-600 underline"
            >
              Zurück zum Login
            </button>
          </>
        ) : (
          <button
            onClick={handleSave}
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-lg text-lg font-semibold disabled:opacity-50"
          >
            {loading
              ? "Passwort wird gespeichert …"
              : "Passwort speichern →"}
          </button>
        )}
      </div>
    </div>
  );
}

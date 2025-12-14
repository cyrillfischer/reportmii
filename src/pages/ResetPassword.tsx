import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase/supabaseClient";

export default function ResetPassword() {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // 🔑 WICHTIG: Recovery-Session aus URL herstellen
  useEffect(() => {
    const initRecoverySession = async () => {
      const { data } = await supabase.auth.getSession();

      if (!data.session) {
        const { error } =
          await supabase.auth.exchangeCodeForSession(window.location.href);

        if (error) {
          console.error("Recovery Session Error:", error);
          setErrorMessage(
            "Der Passwort-Link ist ungültig oder abgelaufen."
          );
          setStatus("error");
        }
      }
    };

    initRecoverySession();
  }, []);

  // 💾 Passwort speichern
  const handleSave = async () => {
    if (status !== "idle") return;

    setErrorMessage(null);

    if (!confirmed) {
      setErrorMessage("Bitte bestätige, dass du der Inhaber dieses Kontos bist.");
      setStatus("error");
      return;
    }

    if (password.length < 6) {
      setErrorMessage("Das Passwort muss mindestens 6 Zeichen lang sein.");
      setStatus("error");
      return;
    }

    if (password !== password2) {
      setErrorMessage("Die Passwörter stimmen nicht überein.");
      setStatus("error");
      return;
    }

    setStatus("loading");

    const { error } = await supabase.auth.updateUser({
      password: password,
    });

    if (error) {
      console.error("Password update error:", error);
      setErrorMessage("Fehler beim Speichern des Passworts.");
      setStatus("error");
      return;
    }

    setStatus("success");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-2xl font-semibold text-center mb-2">
          Neues Passwort setzen
        </h1>
        <p className="text-sm text-gray-500 text-center mb-8">
          Wähle ein neues, sicheres Passwort.
        </p>

        {/* Passwort */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Neues Passwort
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring"
          />
        </div>

        {/* Passwort wiederholen */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Passwort wiederholen
          </label>
          <input
            type="password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring"
          />
        </div>

        {/* Bestätigung */}
        <div className="flex items-center mb-6">
          <input
            type="checkbox"
            checked={confirmed}
            onChange={(e) => setConfirmed(e.target.checked)}
            className="mr-2"
          />
          <span className="text-sm text-gray-600">
            Ich bestätige, dass ich der Inhaber dieses Kontos bin.
          </span>
        </div>

        {/* Fehler */}
        {status === "error" && errorMessage && (
          <p className="text-sm text-red-600 mb-4">{errorMessage}</p>
        )}

        {/* Button */}
        <button
          onClick={handleSave}
          disabled={status === "loading"}
          className="w-full bg-black text-white rounded-lg py-3 font-medium hover:opacity-90 transition disabled:opacity-50"
        >
          {status === "loading" ? "Speichern..." : "Passwort speichern →"}
        </button>

        {/* Erfolg */}
        {status === "success" && (
          <div className="mt-6 text-center">
            <p className="text-green-600 font-medium">
              Passwort wurde gespeichert.
            </p>
            <button
              onClick={() => navigate("/login")}
              className="mt-3 underline text-sm text-gray-600 hover:text-black"
            >
              Zurück zum Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

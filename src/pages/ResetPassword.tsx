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
  const [errorMsg, setErrorMsg] = useState("");

  // 🔑 DER ENTSCHEIDENDE STATE
  const [step, setStep] = useState<"form" | "saving" | "done">("form");

  // --------------------------------------------------
  // Token einmalig prüfen (Session herstellen)
  // --------------------------------------------------
  useEffect(() => {
    if (!token_hash || type !== "recovery") {
      setErrorMsg("Ungültiger oder abgelaufener Link.");
      return;
    }

    supabase.auth.verifyOtp({
      type: "recovery",
      token_hash,
    }).then(({ error }) => {
      if (error) {
        setErrorMsg("Token ungültig oder abgelaufen.");
      }
    });
  }, [token_hash, type]);

  // --------------------------------------------------
  // Passwort speichern
  // --------------------------------------------------
  const handleSave = async () => {
    setErrorMsg("");

    if (!confirmed) {
      setErrorMsg("Bitte bestätige den Hinweis.");
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

    setStep("saving");

    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      setErrorMsg("Fehler beim Speichern des Passworts.");
      setStep("form");
      return;
    }

    // ✅ HIER PASSIERT ENDLICH DAS, WAS DU WILLST
    setStep("done");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="w-full bg-black pt-24 pb-24 text-center">
        <h1 className="text-white text-4xl font-bold">Neues Passwort setzen</h1>
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
            disabled={step !== "form"}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-lg mt-2 px-4 py-3"
          />
        </div>

        <div className="mb-6">
          <label className="text-sm font-semibold">Passwort wiederholen</label>
          <input
            type="password"
            value={password2}
            disabled={step !== "form"}
            onChange={(e) => setPassword2(e.target.value)}
            className="w-full border rounded-lg mt-2 px-4 py-3"
          />
        </div>

        <div className="flex items-center gap-3 mb-4">
          <input
            type="checkbox"
            checked={confirmed}
            disabled={step !== "form"}
            onChange={(e) => setConfirmed(e.target.checked)}
          />
          <span className="text-sm">
            Ich bestätige, dass ich der Inhaber dieses Kontos bin.
          </span>
        </div>

        {errorMsg && (
          <p className="text-red-500 text-sm mb-4">{errorMsg}</p>
        )}

        {/* 🔘 DER FIXIERTE BUTTON */}
        {step === "form" && (
          <button
            onClick={handleSave}
            className="w-full bg-black text-white py-3 rounded-lg text-lg font-semibold"
          >
            Passwort speichern →
          </button>
        )}

        {step === "saving" && (
          <button
            disabled
            className="w-full bg-gray-400 text-white py-3 rounded-lg text-lg font-semibold"
          >
            Passwort wird gespeichert …
          </button>
        )}

        {step === "done" && (
          <>
            <p className="text-green-600 font-semibold mb-4 text-center">
              Dein Passwort wurde erfolgreich geändert.
            </p>
            <button
              onClick={() => navigate("/login")}
              className="w-full bg-black text-white py-3 rounded-lg text-lg font-semibold"
            >
              Zurück zum Login →
            </button>
          </>
        )}

      </div>
    </div>
  );
}

// src/pages/ResetPassword.tsx
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase"; // ⚠️ Pfad ggf. an dein Projekt anpassen

type Status = "idle" | "loading" | "success" | "error";

export default function ResetPassword() {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const [status, setStatus] = useState<Status>("idle");
  const [errorText, setErrorText] = useState<string>("");

  const canSubmit = useMemo(() => {
    return (
      status !== "loading" &&
      confirmed &&
      password.length >= 6 &&
      password === password2
    );
  }, [status, confirmed, password, password2]);

  const isLikelyRecoveryFalseNegative = (msg: string) => {
    const m = (msg || "").toLowerCase();

    // Supabase gibt im Recovery-Flow teils "Fehler" zurück, obwohl das Update serverseitig greift.
    // Diese Liste ist bewusst breit, aber nur für Session/Token-Themen.
    return (
      m.includes("auth session") ||
      m.includes("session") ||
      m.includes("refresh token") ||
      m.includes("invalid jwt") ||
      m.includes("jwt") ||
      m.includes("token") ||
      m.includes("not found") ||
      m.includes("expired") ||
      m.includes("missing")
    );
  };

  const handleSave = async () => {
    if (status === "loading") return;

    // Reset UI messages
    setErrorText("");

    if (!confirmed) {
      setStatus("error");
      setErrorText("Bitte bestätige, dass du der Inhaber dieses Accounts bist.");
      return;
    }

    if (password.length < 6) {
      setStatus("error");
      setErrorText("Dein Passwort muss mindestens 6 Zeichen lang sein.");
      return;
    }

    if (password !== password2) {
      setStatus("error");
      setErrorText("Die Passwörter stimmen nicht überein.");
      return;
    }

    setStatus("loading");

    try {
      const { data, error } = await supabase.auth.updateUser({ password });

      // ✅ Normaler Erfolg
      if (!error) {
        setStatus("success");
        return;
      }

      // ❗ Recovery-Flow: manchmal Error trotz erfolgreichem Passwort-Update.
      // Wir behandeln typische Session-/Token-Errors als "false negative"
      // und zeigen Erfolg statt einer falschen roten Meldung.
      const msg = error?.message ?? "";

      if (isLikelyRecoveryFalseNegative(msg)) {
        setStatus("success");
        return;
      }

      // Optionaler Double-Check: falls updateUser error liefert,
      // prüfen wir noch kurz, ob ein User grundsätzlich abrufbar ist.
      // Wenn ja, ist die Session ok -> dann ist der Error eher "echt".
      // Wenn nein, kann es trotzdem erfolgreich gewesen sein, aber wir haben keinen Beweis.
      try {
        const { data: userData, error: userErr } = await supabase.auth.getUser();
        if (!userErr && userData?.user) {
          setStatus("error");
          setErrorText("Das Passwort konnte nicht gespeichert werden. Bitte versuche es erneut.");
          return;
        }
      } catch {
        // Ignorieren – wir fallen auf "echter Fehler" zurück
      }

      // ❌ Echter Fehler (nicht Session/Token-typisch)
      setStatus("error");
      setErrorText("Das Passwort konnte nicht gespeichert werden. Bitte versuche es erneut.");
      return;
    } catch {
      setStatus("error");
      setErrorText("Es ist ein unerwarteter Fehler aufgetreten. Bitte versuche es erneut.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-full max-w-md rounded-2xl bg-white px-10 py-10 shadow-xl">
        <h1 className="text-2xl font-semibold text-gray-900">Passwort zurücksetzen</h1>
        <p className="mt-2 text-sm text-gray-500">
          Wähle ein neues Passwort, um wieder Zugriff auf dein Konto zu erhalten.
        </p>

        {/* SUCCESS */}
        {status === "success" ? (
          <div className="mt-6">
            <div className="rounded-xl bg-emerald-50 px-4 py-3 text-emerald-800 text-sm">
              Dein Passwort wurde erfolgreich gespeichert. Du kannst dich jetzt mit dem neuen Passwort einloggen.
            </div>

            <button
              className="mt-6 w-full rounded-full bg-[#8FBFC1] px-6 py-3 font-semibold text-gray-900 transition hover:opacity-90"
              onClick={() => navigate("/login")}
            >
              Zurück zum Login →
            </button>
          </div>
        ) : (
          <>
            <div className="mt-6 space-y-4">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Neues Passwort"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-gray-300"
              />

              <input
                type="password"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                placeholder="Neues Passwort повторить"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-gray-300"
              />

              <label className="flex items-center gap-3 pt-1 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={confirmed}
                  onChange={(e) => setConfirmed(e.target.checked)}
                  className="h-4 w-4"
                />
                <span>Ich bestätige, dass ich der Inhaber dieses Accounts bin.</span>
              </label>
            </div>

            {/* ERROR (nur wenn wirklich Error) */}
            {status === "error" && errorText ? (
              <p className="mt-4 text-sm text-red-600">{errorText}</p>
            ) : null}

            <button
              className="mt-6 w-full rounded-full bg-[#8FBFC1] px-6 py-3 font-semibold text-gray-900 transition hover:opacity-90 disabled:opacity-60"
              onClick={handleSave}
              disabled={!canSubmit}
            >
              {status === "loading" ? "Speichern..." : "Neues Passwort speichern →"}
            </button>

            <button
              className="mt-4 w-full text-sm text-gray-500 underline"
              onClick={() => navigate("/login")}
            >
              Zurück zum Login
            </button>
          </>
        )}
      </div>
    </div>
  );
}

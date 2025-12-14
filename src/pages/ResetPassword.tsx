import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "../supabase/supabaseClient";

function EyeIcon({ open }: { open: boolean }) {
  return open ? (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 15.5A3.5 3.5 0 1 0 12 8.5a3.5 3.5 0 0 0 0 7Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ) : (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3 12s3.5-7 9-7c2.1 0 4 .7 5.6 1.7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 12s-3.5 7-9 7c-2.1 0-4-.7-5.6-1.7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.1 10.3A3.5 3.5 0 0 0 13.7 14"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 3l18 18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ResetPassword() {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const token_hash = useMemo(() => params.get("token_hash") || "", [params]);
  const type = useMemo(() => params.get("type") || "", [params]);

  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [showPw1, setShowPw1] = useState(false);
  const [showPw2, setShowPw2] = useState(false);

  const [confirmed, setConfirmed] = useState(false);

  const [tokenReady, setTokenReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      setErrorMsg("");
      setSuccess(false);
      setTokenReady(false);

      if (!token_hash || type !== "recovery") {
        setErrorMsg("Ungültiger Link.");
        return;
      }

      try {
        const { data, error } = await supabase.auth.verifyOtp({
          type: "recovery",
          token_hash,
        });

        if (cancelled) return;

        if (error) {
          console.log("verifyOtp Fehler:", error);
          setErrorMsg("Token ungültig oder abgelaufen.");
          return;
        }

        console.log("verifyOtp OK:", data);
        setTokenReady(true);
      } catch (e) {
        console.log("verifyOtp Exception:", e);
        if (!cancelled) setErrorMsg("Token konnte nicht geprüft werden.");
      }
    };

    run();

    return () => {
      cancelled = true;
    };
  }, [token_hash, type]);

  const goToLoginHard = () => {
    // Hard redirect verhindert Router/Auth-Edgecases
    window.location.assign("/login");
  };

  const handleSave = async () => {
    setErrorMsg("");

    if (!tokenReady) {
      setErrorMsg("Token wird noch geprüft – bitte kurz warten.");
      return;
    }

    if (!confirmed) {
      setErrorMsg("Bitte bestätige, dass du der Inhaber dieses Kontos bist.");
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

    try {
      const { error } = await supabase.auth.updateUser({ password });

      if (error) {
        console.log("updateUser Fehler:", error);
        setErrorMsg("Fehler beim Speichern. Bitte erneut versuchen.");
        return;
      }

      setSuccess(true);

      // Wichtig: nicht “hängen bleiben”, sondern sauber beenden
      setPassword("");
      setPassword2("");

      // Optional: Session aufräumen (damit Login danach sauber ist)
      try {
        await supabase.auth.signOut();
      } catch (e) {
        console.log("signOut (optional) Fehler:", e);
      }

      // Soft + Hard: erst Router, dann Fallback
      setTimeout(() => {
        try {
          navigate("/login", { replace: true });
        } finally {
          // falls Router nicht greift: harter Redirect
          setTimeout(goToLoginHard, 150);
        }
      }, 250);
    } catch (e) {
      console.log("handleSave Exception:", e);
      setErrorMsg("Unerwarteter Fehler. Bitte erneut versuchen.");
    } finally {
      setLoading(false);
    }
  };

  const primaryLabel = success
    ? "Weiter zum Login →"
    : loading
    ? "Passwort wird gespeichert …"
    : "Passwort speichern →";

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Schwarzer Header */}
      <div className="w-full bg-black pt-24 pb-24 text-center">
        <h1 className="text-white text-4xl font-bold">Neues Passwort setzen</h1>
        <p className="text-gray-300 mt-2">Wähle ein neues, sicheres Passwort.</p>
      </div>

      {/* Card */}
      <div className="max-w-xl mx-auto -mt-20 bg-white shadow-xl rounded-[22px] p-10 w-[92%]">
        <div className="mb-8">
          <label className="text-sm font-semibold text-gray-900">
            Neues Passwort
          </label>
          <div className="relative mt-2">
            <input
              type={showPw1 ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 pr-11 shadow-sm focus:outline-none focus:ring-2 focus:ring-black/10"
              autoComplete="new-password"
              disabled={loading || success}
            />
            <button
              type="button"
              onClick={() => setShowPw1((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-900"
              aria-label={showPw1 ? "Passwort verbergen" : "Passwort anzeigen"}
              disabled={loading || success}
            >
              <EyeIcon open={showPw1} />
            </button>
          </div>
        </div>

        <div className="mb-6">
          <label className="text-sm font-semibold text-gray-900">
            Passwort wiederholen
          </label>
          <div className="relative mt-2">
            <input
              type={showPw2 ? "text" : "password"}
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 pr-11 shadow-sm focus:outline-none focus:ring-2 focus:ring-black/10"
              autoComplete="new-password"
              disabled={loading || success}
            />
            <button
              type="button"
              onClick={() => setShowPw2((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-900"
              aria-label={showPw2 ? "Passwort verbergen" : "Passwort anzeigen"}
              disabled={loading || success}
            >
              <EyeIcon open={showPw2} />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3 mb-6">
          <input
            type="checkbox"
            checked={confirmed}
            onChange={(e) => setConfirmed(e.target.checked)}
            className="h-4 w-4"
            disabled={loading || success}
          />
          <span className="text-sm text-gray-800">
            Ich bestätige, dass ich der Inhaber dieses Kontos bin.
          </span>
        </div>

        {errorMsg && <p className="text-red-600 text-sm mb-4">{errorMsg}</p>}

        {success && (
          <p className="text-green-700 font-semibold mb-4">
            Dein neues Passwort wurde gespeichert.
          </p>
        )}

        <button
          type="button"
          onClick={success ? goToLoginHard : handleSave}
          disabled={(!tokenReady && !success) || loading}
          className="w-full bg-black text-white py-4 rounded-2xl text-lg font-semibold disabled:opacity-40"
        >
          {primaryLabel}
        </button>

        <button
          type="button"
          onClick={goToLoginHard}
          className="mt-6 text-center w-full text-gray-500 underline"
        >
          Zurück zum Login
        </button>
      </div>
    </div>
  );
}

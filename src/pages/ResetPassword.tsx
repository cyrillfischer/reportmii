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
        d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
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
        d="M3 3l18 18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M10.6 10.6a2.9 2.9 0 0 0 3.9 3.9"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M9.9 5.3A10.7 10.7 0 0 1 12 5c6.5 0 10 7 10 7a18 18 0 0 1-4 5.2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.1 6.1C3.7 8 2 12 2 12s3.5 7 10 7c1 0 2-.2 2.9-.5"
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

  const token_hash = params.get("token_hash");
  const type = params.get("type");

  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const [showPw1, setShowPw1] = useState(false);
  const [showPw2, setShowPw2] = useState(false);

  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(true);
  const [tokenOk, setTokenOk] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const isRecoveryLink = useMemo(
    () => Boolean(token_hash) && type === "recovery",
    [token_hash, type]
  );

  // 1) verifyOtp nur einmal, sauberer State
  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      setErrorMsg("");
      setSuccessMsg("");

      if (!isRecoveryLink) {
        setVerifying(false);
        setTokenOk(false);
        setErrorMsg("Ungültiger oder unvollständiger Reset-Link.");
        return;
      }

      try {
        setVerifying(true);

        const { data, error } = await supabase.auth.verifyOtp({
          type: "recovery",
          token_hash: token_hash as string,
        });

        if (cancelled) return;

        if (error) {
          setTokenOk(false);
          setErrorMsg("Token ungültig oder abgelaufen. Bitte fordere einen neuen Link an.");
          return;
        }

        // verifyOtp setzt normalerweise eine Session
        if (data?.session) {
          setTokenOk(true);
        } else {
          // Falls Supabase mal kein session-Objekt zurückgibt, prüfen wir zusätzlich:
          const { data: s } = await supabase.auth.getSession();
          setTokenOk(Boolean(s?.session));
          if (!s?.session) {
            setErrorMsg("Session konnte nicht erstellt werden. Bitte neuen Link anfordern.");
          }
        }
      } catch {
        if (cancelled) return;
        setTokenOk(false);
        setErrorMsg("Fehler beim Prüfen des Links. Bitte später erneut versuchen.");
      } finally {
        if (cancelled) return;
        setVerifying(false);
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, [isRecoveryLink, token_hash]);

  // 2) Passwort setzen + danach hard-stabil auf /login
  const handleSave = async () => {
    setErrorMsg("");
    setSuccessMsg("");

    if (verifying) return;

    if (!tokenOk) {
      setErrorMsg("Der Reset-Link ist ungültig oder abgelaufen.");
      return;
    }

    if (!confirmed) {
      setErrorMsg("Bitte bestätige, dass du der Inhaber dieses Kontos bist.");
      return;
    }

    if (password.length < 8) {
      setErrorMsg("Passwort muss mindestens 8 Zeichen haben.");
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
        setErrorMsg("Fehler beim Speichern. Bitte erneut versuchen.");
        return;
      }

      setSuccessMsg("Passwort gespeichert. Du wirst zum Login weitergeleitet…");

      // WICHTIG: Recovery-Session beenden, damit Routing/Login nicht spinnt
      await supabase.auth.signOut();

      // stabiler Redirect
      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 600);
    } catch {
      setErrorMsg("Unerwarteter Fehler beim Speichern. Bitte erneut versuchen.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Schwarzer Header */}
      <div className="w-full bg-black pt-24 pb-24 text-center">
        <h1 className="text-white text-4xl font-bold">Neues Passwort setzen</h1>
        <p className="text-gray-300 mt-2">
          Wähle ein neues, sicheres Passwort.
        </p>
      </div>

      {/* Card */}
      <div className="max-w-lg w-full mx-auto -mt-20 bg-white shadow-xl rounded-xl p-10">
        {/* Passwort 1 */}
        <div className="mb-6">
          <label className="text-sm font-semibold">Neues Passwort</label>
          <div className="relative mt-2">
            <input
              type={showPw1 ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-lg px-4 py-3 pr-11"
              autoComplete="new-password"
              disabled={verifying || !tokenOk}
            />
            <button
              type="button"
              onClick={() => setShowPw1((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              aria-label={showPw1 ? "Passwort verbergen" : "Passwort anzeigen"}
              disabled={verifying || !tokenOk}
            >
              <EyeIcon open={showPw1} />
            </button>
          </div>
        </div>

        {/* Passwort 2 */}
        <div className="mb-6">
          <label className="text-sm font-semibold">Passwort wiederholen</label>
          <div className="relative mt-2">
            <input
              type={showPw2 ? "text" : "password"}
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              className="w-full border rounded-lg px-4 py-3 pr-11"
              autoComplete="new-password"
              disabled={verifying || !tokenOk}
            />
            <button
              type="button"
              onClick={() => setShowPw2((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              aria-label={showPw2 ? "Passwort verbergen" : "Passwort anzeigen"}
              disabled={verifying || !tokenOk}
            >
              <EyeIcon open={showPw2} />
            </button>
          </div>
        </div>

        {/* Checkbox */}
        <div className="flex items-center gap-3 mb-4">
          <input
            type="checkbox"
            checked={confirmed}
            onChange={(e) => setConfirmed(e.target.checked)}
            disabled={verifying || !tokenOk}
          />
          <span className="text-sm">
            Ich bestätige, dass ich der Inhaber dieses Kontos bin.
          </span>
        </div>

        {/* Messages */}
        {verifying && (
          <p className="text-gray-500 text-sm mb-4">Link wird geprüft…</p>
        )}

        {errorMsg && (
          <p className="text-red-500 text-sm mb-4">{errorMsg}</p>
        )}

        {successMsg && (
          <p className="text-green-600 font-semibold mb-4">{successMsg}</p>
        )}

        {/* Save */}
        <button
          type="button"
          onClick={handleSave}
          disabled={loading || verifying || !tokenOk}
          className="w-full bg-black text-white py-3 rounded-lg text-lg font-semibold disabled:opacity-40"
        >
          {loading ? "Passwort wird gespeichert …" : "Passwort speichern →"}
        </button>

        {/* Back */}
        <button
          type="button"
          onClick={async () => {
            try {
              await supabase.auth.signOut();
            } catch {}
            navigate("/login", { replace: true });
          }}
          className="mt-6 text-center w-full text-gray-500 underline"
        >
          Zurück zum Login
        </button>
      </div>
    </div>
  );
}

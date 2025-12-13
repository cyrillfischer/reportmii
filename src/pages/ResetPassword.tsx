import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "../supabase/supabaseClient";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const token_hash = useMemo(() => params.get("token_hash"), [params]);
  const type = useMemo(() => params.get("type"), [params]);

  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [showPw1, setShowPw1] = useState(false);
  const [showPw2, setShowPw2] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const [tokenVerified, setTokenVerified] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      setErrorMsg("");
      setSuccessMsg("");
      setTokenVerified(false);

      if (!token_hash || type !== "recovery") {
        setErrorMsg("Ungültiger Link.");
        return;
      }

      const { error } = await supabase.auth.verifyOtp({
        type: "recovery",
        token_hash,
      });

      if (cancelled) return;

      if (error) {
        setErrorMsg("Token ungültig oder abgelaufen. Bitte fordere einen neuen Link an.");
        setTokenVerified(false);
        return;
      }

      setTokenVerified(true);
    };

    run();

    return () => {
      cancelled = true;
    };
  }, [token_hash, type]);

  const EyeIcon = ({ open }: { open: boolean }) => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      className="opacity-70"
      xmlns="http://www.w3.org/2000/svg"
    >
      {open ? (
        <>
          <path
            d="M2 12C3.8 7.6 7.5 5 12 5C16.5 5 20.2 7.6 22 12C20.2 16.4 16.5 19 12 19C7.5 19 3.8 16.4 2 12Z"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <path
            d="M12 15.2C13.7673 15.2 15.2 13.7673 15.2 12C15.2 10.2327 13.7673 8.8 12 8.8C10.2327 8.8 8.8 10.2327 8.8 12C8.8 13.7673 10.2327 15.2 12 15.2Z"
            stroke="currentColor"
            strokeWidth="1.8"
          />
        </>
      ) : (
        <>
          <path
            d="M3 12C4.8 7.6 8.5 5 13 5C17.5 5 21.2 7.6 23 12C22.3 13.7 21.3 15.1 20.1 16.2"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M10.7 6.1C11.4 5.9 12.2 5.8 13 5.8"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M6.4 8.4C5.1 9.5 4.1 10.7 3.5 12"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M9 14.2C9.6 15.2 10.7 15.8 12 15.8C13.9 15.8 15.4 14.3 15.4 12.4"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M4 20L20 4"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </>
      )}
    </svg>
  );

  const handleSave = async () => {
    setErrorMsg("");
    setSuccessMsg("");

    if (!tokenVerified) {
      setErrorMsg("Token ist ungültig oder abgelaufen. Bitte fordere einen neuen Link an.");
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

      // Wichtig: Recovery-Session wieder beenden, dann sauber zum Login
      await supabase.auth.signOut();

      navigate("/login?reset=1", { replace: true });
    } catch {
      setErrorMsg("Unerwarteter Fehler. Bitte erneut versuchen.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Schwarzer Header */}
      <div className="w-full bg-black pt-24 pb-24 text-center">
        <h1 className="text-white text-5xl md:text-6xl font-extrabold tracking-tight">
          Neues Passwort setzen
        </h1>
        <p className="text-gray-300 mt-4 text-base md:text-lg">
          Wähle ein neues, sicheres Passwort.
        </p>
      </div>

      {/* Card */}
      <div className="max-w-2xl w-full mx-auto -mt-20 px-6 pb-16">
        <div className="bg-white shadow-xl rounded-2xl p-8 md:p-10">
          {/* Passwort 1 */}
          <div className="mb-6">
            <label className="text-sm font-semibold text-gray-800">Neues Passwort</label>

            <div className="mt-2 relative">
              <input
                type={showPw1 ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-black/20"
                autoComplete="new-password"
              />
              <button
                type="button"
                aria-label="Passwort anzeigen/ausblenden"
                onClick={() => setShowPw1((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-700 hover:text-black"
              >
                <EyeIcon open={showPw1} />
              </button>
            </div>
          </div>

          {/* Passwort 2 */}
          <div className="mb-6">
            <label className="text-sm font-semibold text-gray-800">Passwort wiederholen</label>

            <div className="mt-2 relative">
              <input
                type={showPw2 ? "text" : "password"}
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-black/20"
                autoComplete="new-password"
              />
              <button
                type="button"
                aria-label="Passwort anzeigen/ausblenden"
                onClick={() => setShowPw2((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-700 hover:text-black"
              >
                <EyeIcon open={showPw2} />
              </button>
            </div>
          </div>

          {/* Checkbox */}
          <div className="flex items-start gap-3 mb-5">
            <input
              type="checkbox"
              checked={confirmed}
              onChange={(e) => setConfirmed(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-gray-300"
            />
            <span className="text-sm text-gray-700">
              Ich bestätige, dass ich der Inhaber dieses Kontos bin.
            </span>
          </div>

          {/* Messages */}
          {errorMsg && <p className="text-red-600 text-sm mb-4">{errorMsg}</p>}
          {successMsg && <p className="text-green-700 text-sm font-semibold mb-4">{successMsg}</p>}

          {/* Save */}
          <button
            type="button"
            onClick={handleSave}
            disabled={loading}
            className="w-full bg-black text-white py-4 rounded-2xl text-base md:text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Passwort wird gespeichert …" : "Passwort speichern →"}
          </button>

          {/* Back */}
          <button
            type="button"
            onClick={() => navigate("/login", { replace: true })}
            className="mt-6 text-center w-full text-gray-500 hover:text-gray-700 underline underline-offset-4"
          >
            Zurück zum Login
          </button>
        </div>
      </div>
    </div>
  );
}

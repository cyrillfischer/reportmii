// src/pages/ResetPassword.tsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase/supabaseClient";

export default function ResetPassword() {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);

  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ✅ wichtig: bei Recovery gibt es KEIN exchangeCodeForSession.
  // Wir prüfen nur, ob eine Session existiert.
  useEffect(() => {
    const check = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error || !data.session) {
        setError("Auth session missing! Please open a fresh reset link from the email.");
      }
    };
    check();
  }, []);

  const savePassword = async () => {
    if (loading || saved) return;

    setError(null);

    if (!confirmed) {
      setError("Please confirm that you are the owner of this account.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== password2) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setError(error.message || "Failed to update password.");
      setLoading(false);
      return;
    }

    setSaved(true);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-black py-24 text-center">
        <h1 className="text-3xl font-semibold text-white">Reset your password</h1>
        <p className="mt-2 text-white/70">
          Choose a new password to securely regain access to your account.
        </p>
      </div>

      <div className="-mt-24 flex justify-center px-6">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
          {/* Password 1 */}
          <div className="mb-4 relative">
            <input
              type={show1 ? "text" : "password"}
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border px-4 py-3 pr-12 text-sm focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setShow1(!show1)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm"
            >
              {show1 ? "Hide" : "Show"}
            </button>
          </div>

          {/* Password 2 */}
          <div className="mb-4 relative">
            <input
              type={show2 ? "text" : "password"}
              placeholder="Repeat new password"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              className="w-full rounded-xl border px-4 py-3 pr-12 text-sm focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setShow2(!show2)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm"
            >
              {show2 ? "Hide" : "Show"}
            </button>
          </div>

          <div className="mb-6 flex items-center gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              checked={confirmed}
              onChange={(e) => setConfirmed(e.target.checked)}
            />
            <span>I confirm that I am the owner of this account.</span>
          </div>

          {error && <p className="mb-4 text-center text-sm text-red-600">{error}</p>}

          <button
            onClick={savePassword}
            disabled={loading || saved}
            className="w-full rounded-full bg-[#8bbbbb] py-3 text-sm font-semibold text-black disabled:opacity-50"
          >
            {loading ? "Saving…" : saved ? "Password successfully saved" : "Save new password →"}
          </button>

          <div className="mt-6 text-center text-sm text-gray-600">
            <button onClick={() => navigate("/login")} className="underline hover:text-black">
              Back to login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

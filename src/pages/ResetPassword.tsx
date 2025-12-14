import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "../supabase/supabaseClient";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 👁 visibility
  const [showPw1, setShowPw1] = useState(false);
  const [showPw2, setShowPw2] = useState(false);

  // 🔑 establish recovery session ONCE
  useEffect(() => {
    const tokenHash = searchParams.get("token_hash");
    const type = searchParams.get("type");

    if (!tokenHash || type !== "recovery") {
      setError("Invalid or expired reset link.");
      return;
    }

    supabase.auth
      .verifyOtp({
        type: "recovery",
        token_hash: tokenHash,
      })
      .then(({ error }) => {
        if (error) {
          setError("Invalid or expired reset link.");
        }
      });
  }, [searchParams]);

  const handleSave = async () => {
    if (loading || saved) return;

    setError(null);

    if (!confirmed) {
      setError("Please confirm that you are the account owner.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (password !== passwordRepeat) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password,
      });

      if (error) throw error;

      setSaved(true);
    } catch {
      setError("Failed to save the new password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <h1 className="mb-2 text-center text-2xl font-semibold">
          Set new password
        </h1>
        <p className="mb-6 text-center text-sm text-gray-500">
          Choose a new, secure password.
        </p>

        {/* Password */}
        <div className="mb-4 relative">
          <input
            type={showPw1 ? "text" : "password"}
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 pr-10 text-sm focus:outline-none"
          />
          <button
            type="button"
            onClick={() => setShowPw1(!showPw1)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500"
          >
            {showPw1 ? "Hide" : "Show"}
          </button>
        </div>

        {/* Repeat */}
        <div className="mb-4 relative">
          <input
            type={showPw2 ? "text" : "password"}
            placeholder="Repeat new password"
            value={passwordRepeat}
            onChange={(e) => setPasswordRepeat(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 pr-10 text-sm focus:outline-none"
          />
          <button
            type="button"
            onClick={() => setShowPw2(!showPw2)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500"
          >
            {showPw2 ? "Hide" : "Show"}
          </button>
        </div>

        {/* Human confirmation */}
        <div className="mb-6 flex items-center gap-2 text-sm text-gray-600">
          <input
            type="checkbox"
            checked={confirmed}
            onChange={(e) => setConfirmed(e.target.checked)}
          />
          <span>I confirm that I am the account owner.</span>
        </div>

        {/* Error */}
        {error && (
          <p className="mb-4 text-center text-sm text-red-600">{error}</p>
        )}

        {/* Button */}
        <button
          onClick={handleSave}
          disabled={loading || saved}
          className="w-full rounded-lg bg-black py-3 text-sm font-medium text-white disabled:opacity-50"
        >
          {loading
            ? "Saving…"
            : saved
            ? "Password saved"
            : "Save password →"}
        </button>

        {/* Back */}
        {saved && (
          <div className="mt-4 text-center">
            <button
              onClick={() => navigate("/dashboard")}
              className="text-sm underline text-gray-600"
            >
              Back to dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

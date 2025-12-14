import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "../supabase/supabaseClient";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);

  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 🔐 verify recovery session
  useEffect(() => {
    const tokenHash = params.get("token_hash");
    const type = params.get("type");

    if (!tokenHash || type !== "recovery") {
      setError("Invalid or expired reset link.");
      return;
    }

    supabase.auth
      .verifyOtp({ type: "recovery", token_hash: tokenHash })
      .then(({ error }) => {
        if (error) setError("Invalid or expired reset link.");
      });
  }, [params]);

  const savePassword = async () => {
    if (loading || saved) return;

    setError(null);

    if (!confirmed) {
      setError("Please confirm that you are the account owner.");
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

    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      setSaved(true);
    } catch {
      setError("Failed to save password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 🔥 BLACK HEADER (like login page) */}
      <div className="bg-black py-24 text-center text-white">
        <div className="flex justify-center mb-4">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#7eb6b8]/20 text-[#7eb6b8]">
            →
          </span>
        </div>
        <h1 className="text-3xl font-semibold">Set new password</h1>
        <p className="mt-2 text-white/70">
          Choose a new, secure password to access your account.
        </p>
      </div>

      {/* CARD */}
      <div className="-mt-24 flex justify-center px-6">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
          {/* Password */}
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

          {/* Repeat */}
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

          {/* Checkbox */}
          <div className="mb-6 flex items-center gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              checked={confirmed}
              onChange={(e) => setConfirmed(e.target.checked)}
            />
            <span>I confirm that I am the account owner.</span>
          </div>

          {error && (
            <p className="mb-4 text-center text-sm text-red-600">{error}</p>
          )}

          {/* Button */}
          <button
            onClick={savePassword}
            disabled={loading || saved}
            className="w-full rounded-full bg-[#8bbbbb] py-3 text-sm font-semibold text-black disabled:opacity-50"
          >
            {loading
              ? "Saving…"
              : saved
              ? "Password saved"
              : "Save password →"}
          </button>

          {/* Back to login */}
          <div className="mt-6 text-center text-sm text-gray-600">
            <button
              onClick={() => navigate("/login")}
              className="underline hover:text-black"
            >
              Back to login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// src/server/sendReportReadyMail.ts

const SUPABASE_FUNCTION_URL =
  "https://bthbjcnsdllmpyowfupg.supabase.co/functions/v1/report-ready-mail";

const SUPABASE_SERVICE_ROLE_KEY =
  import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY;

/**
 * Triggers the "report-ready-mail" Supabase Edge Function
 * which assigns the user to a MailerLite group
 * and sends the report-ready email via automation.
 */
export async function sendReportReadyMail(params: {
  email: string;
  name?: string;
  analysis_id: string;
  report_url?: string;
}) {
  const { email, name, analysis_id, report_url } = params;

  if (!email || !analysis_id) {
    throw new Error("email and analysis_id are required");
  }

  const res = await fetch(SUPABASE_FUNCTION_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
    },
    body: JSON.stringify({
      email,
      name,
      analysis_id,
      report_url,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    console.error("Report ready mail failed:", data);
    throw new Error("Failed to send report ready mail");
  }

  return data;
}


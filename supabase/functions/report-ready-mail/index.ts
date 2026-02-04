// supabase/functions/send-report-ready-mail/index.ts
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function jsonResponse(status: number, payload: unknown) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

serve(async (req) => {
  // CORS Preflight
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  if (req.method !== "POST") {
    return jsonResponse(405, { error: "Method not allowed. Use POST." });
  }

  const MAILERLITE_API_KEY = Deno.env.get("MAILERLITE_API_KEY");
  const GROUP_ID = Deno.env.get("MAILERLITE_REPORT_READY_GROUP_ID");

  if (!MAILERLITE_API_KEY) return jsonResponse(500, { error: "Missing secret: MAILERLITE_API_KEY" });
  if (!GROUP_ID) return jsonResponse(500, { error: "Missing secret: MAILERLITE_REPORT_READY_GROUP_ID" });

  try {
    const body = await req.json().catch(() => null);
    const email = (body?.email ?? "").toString().trim().toLowerCase();
    const name = (body?.name ?? "").toString().trim();
    const analysis_id = (body?.analysis_id ?? "").toString().trim();
    const report_url = (body?.report_url ?? "").toString().trim();

    if (!email) return jsonResponse(400, { error: "Missing: email" });
    if (!analysis_id) return jsonResponse(400, { error: "Missing: analysis_id" });

    // 1) Upsert subscriber
    // MailerLite: POST https://connect.mailerlite.com/api/subscribers :contentReference[oaicite:2]{index=2}
    const upsertRes = await fetch("https://connect.mailerlite.com/api/subscribers", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${MAILERLITE_API_KEY}`,
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        email,
        fields: {
          ...(name ? { name } : {}),
          analysis_id,
          ...(report_url ? { report_url } : {}),
        },
      }),
    });

    const upsertJson = await upsertRes.json().catch(() => ({}));

    if (!upsertRes.ok) {
      return jsonResponse(upsertRes.status, {
        error: "MailerLite upsert failed",
        details: upsertJson,
      });
    }

    const subscriberId = upsertJson?.data?.id;
    if (!subscriberId) {
      return jsonResponse(500, {
        error: "MailerLite returned no subscriber id",
        details: upsertJson,
      });
    }

    // 2) Assign subscriber to group (triggers automation)
    // POST https://connect.mailerlite.com/api/subscribers/{subscriber_id}/groups/{group_id} :contentReference[oaicite:3]{index=3}
    const assignRes = await fetch(
      `https://connect.mailerlite.com/api/subscribers/${encodeURIComponent(subscriberId)}/groups/${encodeURIComponent(GROUP_ID)}`,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${MAILERLITE_API_KEY}`,
          "Accept": "application/json",
        },
      }
    );

    const assignJson = await assignRes.json().catch(() => ({}));

    if (!assignRes.ok) {
      return jsonResponse(assignRes.status, {
        error: "MailerLite group assign failed",
        subscriber_id: subscriberId,
        group_id: GROUP_ID,
        details: assignJson,
      });
    }

    return jsonResponse(200, {
      ok: true,
      subscriber_id: subscriberId,
      group_id: GROUP_ID,
      note: "Subscriber assigned to group. Mail is sent by MailerLite automation.",
    });
  } catch (err) {
    return jsonResponse(500, {
      error: "Unexpected server error",
      message: err instanceof Error ? err.message : String(err),
    });
  }
});

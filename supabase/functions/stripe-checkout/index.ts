// supabase/functions/stripe-checkout/index.ts
import Stripe from "https://esm.sh/stripe@12.0.0?target=deno";
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY"), {
  apiVersion: "2023-10-16"
});
// 🧾 Alle Stripe Price IDs
const PRICE_MAP = {
  business_EU: "price_1SU7KMK5ePGKWu0KPcp4IOam",
  business_CH: "price_1SU7KjK5ePGKWu0K2LioAuAT",
  business_INT: "price_1SU7LUK5ePGKWu0KbfZ3x1sW",
  inside_25_EU: "price_1SU7MnK5ePGKWu0KH1xhKaJ6",
  inside_25_CH: "price_1SU7N0K5ePGKWu0KvdhvJP9J",
  inside_25_INT: "price_1SU7NGK5ePGKWu0K3J2n91rJ",
  inside_50_EU: "price_1SU7NZK5ePGKWu0KLgbMwqC2",
  inside_50_CH: "price_1SU7NkK5ePGKWu0K5I3xmrgW",
  inside_50_INT: "price_1SU7NzK5ePGKWu0KNnaMOVmM",
  inside_100_EU: "price_1SU7OLK5ePGKWu0KmCKcbMIq",
  inside_100_CH: "price_1SU7OXK5ePGKWu0KTzofwjrp",
  inside_100_INT: "price_1SU7OkK5ePGKWu0KBUCIbFRn",
  partner_EU: "price_1SU7PnK5ePGKWu0KdyYISYFI",
  partner_CH: "price_1SU7PyK5ePGKWu0K6hK8nhNE",
  partner_INT: "price_1SU7QCK5ePGKWu0KlAT9CKHU"
};
// Erfolg-URLs
const SUCCESS_URLS = {
  business: "https://reportmii.com/success-business",
  inside: "https://reportmii.com/success-inside",
  partner: "https://reportmii.com/success-partner"
};
// 🌐 CORS Headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS"
};
serve(async (req)=>{
  // OPTIONS Request abfangen (CORS Preflight)
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: corsHeaders
    });
  }
  try {
    const body = await req.json();
    const { product, email, region, priceId, teamSize } = body;
    if (!product || !email || !region || !priceId) {
      return new Response(JSON.stringify({
        error: "Missing required parameters"
      }), {
        status: 400,
        headers: corsHeaders
      });
    }
    const finalPriceId = PRICE_MAP[priceId];
    if (!finalPriceId) {
      return new Response(JSON.stringify({
        error: "Invalid priceId mapping"
      }), {
        status: 400,
        headers: corsHeaders
      });
    }
    // Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: email,
      line_items: [
        {
          price: finalPriceId,
          quantity: 1
        }
      ],
      success_url: SUCCESS_URLS[product],
      cancel_url: "https://reportmii.com",
      metadata: {
        product,
        region,
        email,
        teamSize: teamSize || "n/a"
      }
    });
    return new Response(JSON.stringify({
      url: session.url
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders
      }
    });
  } catch (err) {
    return new Response(JSON.stringify({
      error: err.message
    }), {
      status: 500,
      headers: corsHeaders
    });
  }
});

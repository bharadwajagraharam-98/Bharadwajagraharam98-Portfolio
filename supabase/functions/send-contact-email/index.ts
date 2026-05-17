import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const { name, email, message } = await req.json();

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return new Response(
        JSON.stringify({ error: "All fields are required." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Always persist to DB so no message is ever lost
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { error: dbError } = await supabase
      .from("contact_messages")
      .insert({ name: name.trim(), email: email.trim(), message: message.trim() });

    if (dbError) {
      console.error("DB insert error:", dbError);
      return new Response(
        JSON.stringify({ error: "Failed to save message. Please try again." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Attempt email via Resend if API key is present
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (RESEND_API_KEY) {
      const emailRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Portfolio Contact <onboarding@resend.dev>",
          to: ["bharadwajagraharam98@gmail.com"],
          reply_to: email.trim(),
          subject: `Portfolio message from ${name.trim()}`,
          html: `
            <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#0f172a;color:#e2e8f0;border-radius:12px;">
              <h2 style="color:#38bdf8;margin-bottom:8px;">New Portfolio Message</h2>
              <p style="color:#94a3b8;font-size:14px;margin-bottom:24px;">Someone reached out via your portfolio contact form.</p>
              <table style="width:100%;border-collapse:collapse;">
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #1e293b;color:#94a3b8;font-size:13px;width:80px;">From</td>
                  <td style="padding:10px 0;border-bottom:1px solid #1e293b;font-weight:600;">${name.trim()}</td>
                </tr>
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #1e293b;color:#94a3b8;font-size:13px;">Email</td>
                  <td style="padding:10px 0;border-bottom:1px solid #1e293b;">
                    <a href="mailto:${email.trim()}" style="color:#38bdf8;">${email.trim()}</a>
                  </td>
                </tr>
              </table>
              <div style="margin-top:24px;">
                <p style="color:#94a3b8;font-size:13px;margin-bottom:8px;">Message</p>
                <div style="background:#1e293b;padding:16px;border-radius:8px;border-left:3px solid #38bdf8;line-height:1.6;">
                  ${message.trim().replace(/\n/g, "<br/>")}
                </div>
              </div>
              <p style="margin-top:24px;color:#475569;font-size:12px;">Sent from bharadwaj.portfolio</p>
            </div>
          `,
        }),
      });

      if (emailRes.ok) {
        await supabase
          .from("contact_messages")
          .update({ emailed: true })
          .eq("email", email.trim())
          .order("created_at", { ascending: false })
          .limit(1);
      } else {
        console.error("Resend error:", await emailRes.text());
      }
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Unhandled error:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

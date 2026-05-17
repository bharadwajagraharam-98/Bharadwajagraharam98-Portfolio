import "jsr:@supabase/functions-js/edge-runtime.d.ts";

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

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

    if (!RESEND_API_KEY) {
      // Fallback: log and return success so the portfolio still works during demo
      console.log(`Contact form submission — Name: ${name}, Email: ${email}, Message: ${message}`);
      return new Response(
        JSON.stringify({ success: true, message: "Message received." }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: ["bharadwajagraharam98@gmail.com"],
        reply_to: email,
        subject: `Portfolio message from ${name}`,
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#0f172a;color:#e2e8f0;border-radius:12px;">
            <h2 style="color:#38bdf8;margin-bottom:8px;">New Portfolio Message</h2>
            <p style="color:#94a3b8;font-size:14px;margin-bottom:24px;">Someone reached out via your portfolio contact form.</p>
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="padding:10px 0;border-bottom:1px solid #1e293b;color:#94a3b8;font-size:13px;width:80px;">From</td><td style="padding:10px 0;border-bottom:1px solid #1e293b;font-weight:600;">${name}</td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid #1e293b;color:#94a3b8;font-size:13px;">Email</td><td style="padding:10px 0;border-bottom:1px solid #1e293b;"><a href="mailto:${email}" style="color:#38bdf8;">${email}</a></td></tr>
            </table>
            <div style="margin-top:24px;">
              <p style="color:#94a3b8;font-size:13px;margin-bottom:8px;">Message</p>
              <div style="background:#1e293b;padding:16px;border-radius:8px;border-left:3px solid #38bdf8;line-height:1.6;">${message.replace(/\n/g, "<br/>")}</div>
            </div>
            <p style="margin-top:24px;color:#475569;font-size:12px;">Sent from bharadwaj.portfolio</p>
          </div>
        `,
      }),
    });

    if (!res.ok) {
      const errBody = await res.text();
      console.error("Resend error:", errBody);
      return new Response(
        JSON.stringify({ error: "Failed to send email. Try contacting directly." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

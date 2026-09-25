import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function verifyRecaptcha(token: string): Promise<boolean> {
  const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
  });
  const data = await res.json();
  return data.success === true;
}

async function logToSheet(data: {
  source?: string; name: string; email: string;
  service?: string; budget?: string; message: string;
}) {
  const url = process.env.GOOGLE_SHEET_URL;
  if (!url) return;
  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  } catch (err) {
    console.error("[contact] sheet log failed:", err);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, service, budgetMin, budgetMax, message, source, recaptchaToken } = body;

    // Server-side validation
    if (!name?.trim() || name.trim().length < 2 || name.trim().length > 100)
      return NextResponse.json({ error: "Invalid name." }, { status: 400 });
    if (!email?.trim() || !EMAIL_RE.test(email))
      return NextResponse.json({ error: "Invalid email." }, { status: 400 });
    if (!message?.trim() || message.trim().length < 10 || message.trim().length > 2000)
      return NextResponse.json({ error: "Message must be 10–2000 characters." }, { status: 400 });

    // reCAPTCHA verification (skipped in development)
    if (process.env.NODE_ENV !== "development") {
      if (!recaptchaToken) return NextResponse.json({ error: "reCAPTCHA required." }, { status: 400 });
      const ok = await verifyRecaptcha(recaptchaToken);
      if (!ok) return NextResponse.json({ error: "reCAPTCHA failed." }, { status: 400 });
    }

    const budget = budgetMin != null
      ? `$${Number(budgetMin).toLocaleString()} – $${Number(budgetMax).toLocaleString()}`
      : "";

    // Log to Google Sheet (non-blocking — never fails the request)
    await logToSheet({ source, name, email, service, budget, message });

    const user = process.env.GMAIL_USER;
    const pass = process.env.GMAIL_APP_PASSWORD;
    if (!user || !pass) return NextResponse.json({ error: "Server misconfigured." }, { status: 500 });

    const transporter = nodemailer.createTransport({ service: "gmail", auth: { user, pass } });

    // DEMO MODE — remove this line to re-enable actual email sending
    return NextResponse.json({ success: true });

    // eslint-disable-next-line no-unreachable
    await transporter.sendMail({
      from: `"Markition Website" <${user}>`,
      to: user,
      replyTo: email,
      subject: `New Contact: ${name}${service ? ` — ${service}` : ""}${source ? ` [${source}]` : ""}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px">
          <h2 style="color:#080b3f">New Contact Form Submission</h2>
          <table style="width:100%;border-collapse:collapse">
            ${source ? `<tr><td style="padding:8px 0;color:#555;width:120px"><strong>Source</strong></td><td style="padding:8px 0;color:#1a6aff;font-weight:600">${source}</td></tr>` : ""}
            <tr><td style="padding:8px 0;color:#555;width:120px"><strong>Name</strong></td><td style="padding:8px 0">${name}</td></tr>
            <tr><td style="padding:8px 0;color:#555"><strong>Email</strong></td><td style="padding:8px 0"><a href="mailto:${email}">${email}</a></td></tr>
            ${service ? `<tr><td style="padding:8px 0;color:#555"><strong>Service</strong></td><td style="padding:8px 0">${service}</td></tr>` : ""}
            ${budget ? `<tr><td style="padding:8px 0;color:#555"><strong>Budget</strong></td><td style="padding:8px 0">${budget}</td></tr>` : ""}
          </table>
          <hr style="margin:16px 0;border:none;border-top:1px solid #eee"/>
          <p style="color:#555"><strong>Message:</strong></p>
          <p style="white-space:pre-wrap;color:#333">${message}</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[contact] error:", err);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

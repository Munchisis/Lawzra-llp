import { Resend } from "resend";

/* eslint-env node */
const resend = new Resend(process.env.RESEND_API_KEY);

// Minimal HTML escaping so submitted text can't break out of the email markup
function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed" });
  }

  const {
    fullName,
    email,
    phone,
    practiceArea,
    message,
    "cf-turnstile-response": turnstileToken,
  } = req.body || {};

  // Required-field check mirrors the client-side react-hook-form rules
  if (!fullName || !email || !phone || !message) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
  }

  if (!turnstileToken) {
    return res
      .status(400)
      .json({ success: false, message: "Captcha verification missing" });
  }

  // Verify the Turnstile token server-side — the client-side widget alone
  // can be bypassed by POSTing directly to this endpoint
  try {
    const verifyResponse = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          secret: process.env.TURNSTILE_SECRET_KEY,
          response: turnstileToken,
          remoteip: req.headers["x-forwarded-for"],
        }),
      },
    );
    const verifyData = await verifyResponse.json();

    if (!verifyData.success) {
      return res
        .status(400)
        .json({ success: false, message: "Captcha verification failed" });
    }
  } catch (error) {
    console.error("Turnstile verification error:", error);
    return res
      .status(502)
      .json({ success: false, message: "Captcha service unavailable" });
  }

  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL, // e.g. "Lawzra Appointments <appointments@lawzra.com>" — must be a verified sending domain in Resend
      to: process.env.RESEND_TO_EMAIL, // the firm's intake inbox
      replyTo: email,
      subject: `New Consultation Request — ${fullName}`,
      html: `
        <h2>New Consultation Request</h2>
        <p><strong>Name:</strong> ${escapeHtml(fullName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
        <p><strong>Practice Area:</strong> ${escapeHtml(practiceArea || "Not specified")}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Resend send error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to send message" });
  }
}

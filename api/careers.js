import { Resend } from "resend";
import { formidable } from "formidable";
import fs from "fs";

// Multipart bodies (the CV upload) must be parsed by formidable itself,
// not Vercel's default JSON body parser
export const config = {
  api: {
    bodyParser: false,
  },
};

const resend = new Resend(process.env.RESEND_API_KEY);

// Keep comfortably under Vercel's serverless function body-size limit (~4.5MB
// on Hobby/Pro) — the client-side check in CareersPage.jsx should match this
const MAX_FILE_SIZE = 4 * 1024 * 1024;

const ALLOWED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function parseForm(req) {
  const form = formidable({ maxFileSize: MAX_FILE_SIZE, multiples: false });
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });
}

const first = (value) => (Array.isArray(value) ? value[0] : value);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed" });
  }

  let fields, files;
  try {
    ({ fields, files } = await parseForm(req));
  } catch (error) {
    console.error("Form parse error:", error);
    const tooLarge = /maxFileSize|1009/i.test(
      error?.message || error?.code || "",
    );
    return res.status(tooLarge ? 413 : 400).json({
      success: false,
      message: tooLarge
        ? "File is too large. Maximum size is 4MB."
        : "Could not process submission.",
    });
  }

  const name = first(fields.name);
  const email = first(fields.email);
  const message = first(fields.message);
  const turnstileToken = first(fields["cf-turnstile-response"]);
  const attachment = first(files.attachment);

  if (!name || !email || !message) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
  }

  if (!turnstileToken) {
    return res
      .status(400)
      .json({ success: false, message: "Captcha verification missing" });
  }

  // Verify the Turnstile token server-side — required regardless of what
  // the client already checked, since the client can be bypassed
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

  if (attachment?.mimetype && !ALLOWED_TYPES.includes(attachment.mimetype)) {
    return res.status(400).json({
      success: false,
      message: "Invalid file type. Please upload a PDF or Word document.",
    });
  }

  try {
    const attachments = [];
    if (attachment) {
      const fileBuffer = fs.readFileSync(attachment.filepath);
      attachments.push({
        filename: attachment.originalFilename || "attachment",
        content: fileBuffer.toString("base64"),
      });
    }

    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL, // must be a verified sending domain in Resend
      to: process.env.RESEND_TO_EMAIL, // the firm's careers/hiring inbox
      replyTo: email,
      subject: `New Career Application — ${name}`,
      html: `
        <h2>New Career Application</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
      `,
      attachments,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Resend send error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to send message" });
  }
}

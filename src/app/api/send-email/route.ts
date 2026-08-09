import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// --- Gmail SMTP transport ---
// Uses a Gmail App Password — never expose your real password.
// Steps to get one: https://support.google.com/accounts/answer/185833
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

type FormType = "connect" | "event-registration" | "general";

interface EmailPayload {
  type: FormType;
  // Common fields
  name?: string;
  email?: string;
  message?: string;
  // Event registration fields
  eventTitle?: string;
  eventLocation?: string;
  organization?: string;
  country?: string;
  role?: string;
}

function buildEmailBody(data: EmailPayload): { subject: string; html: string } {
  const timestamp = new Date().toLocaleString("en-GB", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "short",
  });

  if (data.type === "connect") {
    const subject = `[BRHF] Volunteer Registration — ${data.name || "New Applicant"}`;
    const html = `
      <h2>🤝 New Volunteer / Ambassador Registration</h2>
      <table style="border-collapse:collapse;width:100%;max-width:600px;font-family:sans-serif;color:#1a1a2e;">
        <tr style="background:#f59e0b22;"><td style="padding:8px 12px;font-weight:bold;color:#b45309;">Name</td><td style="padding:8px 12px;">${escapeHtml(data.name || "—")}</td></tr>
        <tr style="background:#f59e0b11;"><td style="padding:8px 12px;font-weight:bold;color:#b45309;">Email</td><td style="padding:8px 12px;"><a href="mailto:${escapeHtml(data.email || "")}">${escapeHtml(data.email || "")}</a></td></tr>
        <tr style="background:#f59e0b22;"><td style="padding:8px 12px;font-weight:bold;color:#b45309;">Country</td><td style="padding:8px 12px;">${escapeHtml(data.country || "—")}</td></tr>
        <tr style="background:#f59e0b11;"><td style="padding:8px 12px;font-weight:bold;color:#b45309;">Desired Role</td><td style="padding:8px 12px;">${escapeHtml(data.role || "—")}</td></tr>
        <tr style="background:#f59e0b22;"><td style="padding:8px 12px;font-weight:bold;color:#b45309;">Message</td><td style="padding:8px 12px;white-space:pre-wrap;">${escapeHtml(data.message || "—")}</td></tr>
        <tr style="background:#f59e0b11;color:#6b7280;"><td style="padding:8px 12px;">Received</td><td style="padding:8px 12px;">${timestamp}</td></tr>
      </table>`;
    return { subject, html };
  }

  if (data.type === "event-registration") {
    const subject = `[BRHF] Event Registration — ${data.eventTitle || "New Registration"}`;
    const html = `
      <h2>📅 New Event Delegate Registration</h2>
      <table style="border-collapse:collapse;width:100%;max-width:600px;font-family:sans-serif;color:#1a1a2e;">
        <tr style="background:#f59e0b22;"><td style="padding:8px 12px;font-weight:bold;color:#b45309;">Event</td><td style="padding:8px 12px;">${escapeHtml(data.eventTitle || "")}</td></tr>
        <tr style="background:#f59e0b11;"><td style="padding:8px 12px;font-weight:bold;color:#b45309;">Location</td><td style="padding:8px 12px;">${escapeHtml(data.eventLocation || "")}</td></tr>
        <tr style="background:#f59e0b22;"><td style="padding:8px 12px;font-weight:bold;color:#b45309;">Full Name</td><td style="padding:8px 12px;">${escapeHtml(data.name || "")}</td></tr>
        <tr style="background:#f59e0b11;"><td style="padding:8px 12px;font-weight:bold;color:#b45309;">Email</td><td style="padding:8px 12px;"><a href="mailto:${escapeHtml(data.email || "")}">${escapeHtml(data.email || "")}</a></td></tr>
        <tr style="background:#f59e0b22;"><td style="padding:8px 12px;font-weight:bold;color:#b45309;">Organization</td><td style="padding:8px 12px;">${escapeHtml(data.organization || "—")}</td></tr>
        <tr style="background:#f59e0b11;color:#6b7280;"><td style="padding:8px 12px;">Received</td><td style="padding:8px 12px;">${timestamp}</td></tr>
      </table>`;
    return { subject, html };
  }

  // General / fallback
  const subject = `[BRHF Website] New Message — ${data.name || "Anonymous"}`;
  const html = `
    <h2>💬 New Message from Website</h2>
    <table style="border-collapse:collapse;width:100%;max-width:600px;font-family:sans-serif;color:#1a1a2e;">
      <tr style="background:#f59e0b22;"><td style="padding:8px 12px;font-weight:bold;color:#b45309;">Name</td><td style="padding:8px 12px;">${escapeHtml(data.name || "—")}</td></tr>
      <tr style="background:#f59e0b11;"><td style="padding:8px 12px;font-weight:bold;color:#b45309;">Email</td><td style="padding:8px 12px;"><a href="mailto:${escapeHtml(data.email || "")}">${escapeHtml(data.email || "—")}</a></td></tr>
      <tr style="background:#f59e0b22;"><td style="padding:8px 12px;font-weight:bold;color:#b45309;">Message</td><td style="padding:8px 12px;white-space:pre-wrap;">${escapeHtml(data.message || "—")}</td></tr>
      <tr style="background:#f59e0b11;color:#6b7280;"><td style="padding:8px 12px;">Received</td><td style="padding:8px 12px;">${timestamp}</td></tr>
    </table>`;
  return { subject, html };
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(request: Request) {
  try {
    const body: EmailPayload = await request.json();

    // --- Validate required fields ---
    if (!body.type || !body.name) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields: type and name" },
        { status: 400 }
      );
    }

    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      return NextResponse.json(
        { ok: false, error: "Server misconfigured: missing Gmail credentials" },
        { status: 500 }
      );
    }

    const { subject, html } = buildEmailBody(body);

    await transporter.sendMail({
      from: `"BRHF Website" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER, // sends to your Gmail inbox
      replyTo: body.email || process.env.GMAIL_USER,
      subject,
      html,
    });

    return NextResponse.json({ ok: true, message: "Email sent successfully" });
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to send email" },
      { status: 500 }
    );
  }
}

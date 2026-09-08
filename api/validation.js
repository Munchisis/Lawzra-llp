/* global process */

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^\+?[0-9\s().-]{10,25}$/;
const MAX_NAME_LENGTH = 120;
const MAX_EMAIL_LENGTH = 254;
const MAX_PHONE_LENGTH = 25;
const MAX_MESSAGE_LENGTH = 5000;

const recentRequests = new Map();
const RATE_LIMIT_WINDOW = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;

export function validateContactFields({ name, email, phone, message }) {
  const values = {
    name: String(name || "").trim(),
    email: String(email || "").trim().toLowerCase(),
    phone: String(phone || "").trim(),
    message: String(message || "").trim(),
  };

  if (!values.name || !values.email || !values.message || (phone !== undefined && !values.phone)) {
    return { error: "Missing required fields" };
  }
  if (values.name.length > MAX_NAME_LENGTH) {
    return { error: "Name is too long" };
  }
  if (values.email.length > MAX_EMAIL_LENGTH || !EMAIL_PATTERN.test(values.email)) {
    return { error: "Invalid email address" };
  }
  if (
    phone !== undefined &&
    (values.phone.length > MAX_PHONE_LENGTH || !PHONE_PATTERN.test(values.phone))
  ) {
    return { error: "Invalid phone number" };
  }
  if (values.message.length < 20 || values.message.length > MAX_MESSAGE_LENGTH) {
    return { error: "Message must be between 20 and 5000 characters" };
  }

  return { values };
}

export function isRateLimited(request) {
  const forwarded = request.headers["x-forwarded-for"];
  const ip = (forwarded || request.socket?.remoteAddress || "unknown")
    .split(",")[0]
    .trim();
  const now = Date.now();
  const recent = (recentRequests.get(ip) || []).filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW,
  );

  if (recent.length >= RATE_LIMIT_MAX) {
    recentRequests.set(ip, recent);
    return true;
  }

  recent.push(now);
  recentRequests.set(ip, recent);
  return false;
}

export function requireEnvironment(...names) {
  return names.find((name) => !process.env[name])
    ? `Missing server configuration: ${names.find((name) => !process.env[name])}`
    : null;
}

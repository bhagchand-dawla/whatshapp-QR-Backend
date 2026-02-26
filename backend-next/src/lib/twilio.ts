import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

if (!accountSid || !authToken) {
  throw new Error('Missing TWILIO_ACCOUNT_SID or TWILIO_AUTH_TOKEN environment variable');
}

export const twilioClient = twilio(accountSid, authToken);

export function getWhatsappFromNumber(): string {
  const fromNumber = process.env.TWILIO_WHATSAPP_FROM;

  if (!fromNumber) {
    throw new Error('Missing TWILIO_WHATSAPP_FROM environment variable');
  }

  return `whatsapp:${fromNumber}`;
}

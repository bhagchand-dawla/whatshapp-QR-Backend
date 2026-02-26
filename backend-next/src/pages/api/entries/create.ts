import type { NextApiRequest, NextApiResponse } from 'next';
import { createVisitorEntry } from '../../../data/entries';
import { createEntrySchema } from '../../../lib/validation';
import { handleCorsPreFlight } from '../../../lib/cors';
import { twilioClient, getWhatsappFromNumber } from '../../../lib/twilio';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Handle CORS preflight
  if (handleCorsPreFlight(req, res)) return;

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const parsed = createEntrySchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      success: false,
      message: parsed.error.issues[0]?.message || 'Invalid request payload',
    });
  }

  const entry = createVisitorEntry(parsed.data.phone);

  // Send WhatsApp greeting message with QR code image to the visitor
  let whatsappSent = false;
  try {
    // Generate a publicly accessible QR code image URL using free API
    const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(entry.scanUrl)}`;

    const greetingMessage =
      `🏢 *Welcome, Visitor!*\n\n` +
      `You have been registered for gate entry.\n\n` +
      `📱 *Your QR Code:*\nPlease show this QR code to the security guard at the gate.\n\n` +
      `🔗 *Link:* ${entry.scanUrl}\n\n` +
      `🕐 _Generated at: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}_\n\n` +
      `Thank you for visiting! 🙏`;

    await twilioClient.messages.create({
      from: getWhatsappFromNumber(),
      to: `whatsapp:${parsed.data.phone}`,
      body: greetingMessage,
      mediaUrl: [qrImageUrl],
    });

    whatsappSent = true;
    console.log(`WhatsApp greeting with QR image sent to ${parsed.data.phone}`);
  } catch (error) {
    const err = error as { message?: string };
    console.error('WhatsApp greeting failed:', err?.message || error);
  }

  return res.status(201).json({
    success: true,
    message: whatsappSent
      ? 'Visitor entry created & WhatsApp greeting sent'
      : 'Visitor entry created (WhatsApp not sent)',
    data: { ...entry, whatsappSent },
  });
}

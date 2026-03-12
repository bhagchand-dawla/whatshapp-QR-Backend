import type { NextApiRequest, NextApiResponse } from 'next';
import { createVisitorEntry } from '../../../data/entries';
import { createEntrySchema } from '../../../lib/validation';
import { handleCorsPreFlight } from '../../../lib/cors';
import { sendWhatsAppQR } from '../../../lib/msg91';

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

  // Generate QR code image URL (random token as data)
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(entry.qrToken)}`;

  // Send WhatsApp via MSG91
  const result = await sendWhatsAppQR(parsed.data.phone, qrImageUrl, entry.qrToken);

  return res.status(201).json({
    success: true,
    message: result.success ? 'Success' : 'WhatsApp send failed',
    data: {
      whatsappSent: result.success,
      ...(result.error && { whatsappError: result.error }),
    },
  });
}

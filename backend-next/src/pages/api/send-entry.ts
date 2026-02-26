import type { NextApiRequest, NextApiResponse } from 'next';
import { twilioClient, getWhatsappFromNumber } from '../../lib/twilio';
import { sendEntrySchema } from '../../lib/validation';
import { ApiResponse } from '../../types/api';
import { handleCorsPreFlight } from '../../lib/cors';

type ErrorWithMessage = {
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>,
) {
  // Handle CORS preflight
  if (handleCorsPreFlight(req, res)) return;

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const parsed = sendEntrySchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      success: false,
      message: parsed.error.issues[0]?.message || 'Invalid request payload',
    });
  }

  try {
    await twilioClient.messages.create({
      from: getWhatsappFromNumber(),
      to: `whatsapp:${parsed.data.phone}`,
      body: 'Your gate entry has been scanned successfully.',
    });

    return res.status(200).json({ success: true, message: 'WhatsApp message sent' });
  } catch (error) {
    const err = error as ErrorWithMessage;
    console.error('send-entry error:', err?.message || error);
    return res
      .status(500)
      .json({ success: false, message: 'Failed to send WhatsApp message' });
  }
}

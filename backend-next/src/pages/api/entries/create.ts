import type { NextApiRequest, NextApiResponse } from 'next';
import { createVisitorEntry } from '../../../data/entries';
import { createEntrySchema } from '../../../lib/validation';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
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

  return res.status(201).json({
    success: true,
    message: 'Visitor entry created',
    data: entry,
  });
}

import crypto from 'node:crypto';
import { VisitorEntry } from '../types/api';

const entryStore = new Map<string, VisitorEntry>();

export function createVisitorEntry(phone: string): VisitorEntry {
  const id = crypto.randomUUID();
  const qrToken = crypto.randomBytes(12).toString('hex');

  const entry: VisitorEntry = {
    id,
    phone,
    qrToken,
    createdAt: new Date().toISOString(),
  };

  entryStore.set(qrToken, entry);
  return entry;
}

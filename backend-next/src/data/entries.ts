import crypto from 'node:crypto';
import { VisitorEntry } from '../types/api';

const entryStore = new Map<string, VisitorEntry>();

function getBackendBaseUrl(): string {
  return process.env.BACKEND_BASE_URL || 'http://localhost:3000';
}

export function createVisitorEntry(phone: string): VisitorEntry {
  const id = crypto.randomUUID();
  const qrToken = crypto.randomBytes(12).toString('hex');
  const scanUrl = `${getBackendBaseUrl()}/scan?entryToken=${qrToken}&phone=${encodeURIComponent(phone)}`;

  const entry: VisitorEntry = {
    id,
    phone,
    qrToken,
    scanUrl,
    createdAt: new Date().toISOString(),
  };

  entryStore.set(qrToken, entry);
  return entry;
}

export function getVisitorEntryByToken(qrToken: string): VisitorEntry | undefined {
  return entryStore.get(qrToken);
}

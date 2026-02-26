import { useState } from 'react';
import { EntryQRCode } from '../components/EntryQRCode';
import { PhoneEntryForm } from '../components/PhoneEntryForm';
import { createEntry } from '../services/api';
import { useToast } from '../hooks/useToast';

type EntryData = {
  phone: string;
  scanUrl: string;
};

export function VisitorEntryPage() {
  const [entry, setEntry] = useState<EntryData | null>(null);
  const toast = useToast();

  async function handleSubmitPhone(phone: string) {
    try {
      const response = await createEntry(phone);

      if (!response.success || !response.data?.scanUrl) {
        throw new Error(response.message || 'Could not generate QR entry');
      }

      setEntry({ phone, scanUrl: response.data.scanUrl as string });
      toast.success('QR generated successfully');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Something went wrong';
      toast.error(message);
      throw error;
    }
  }

  return (
    <main style={{ padding: 24 }}>
      <h1>Visitor Entry</h1>
      <PhoneEntryForm onSubmitPhone={handleSubmitPhone} />

      {entry ? (
        <section style={{ marginTop: 24 }}>
          <h2>Scan this QR at gate</h2>
          <p>Phone: {entry.phone}</p>
          <EntryQRCode value={entry.scanUrl} />
        </section>
      ) : null}
    </main>
  );
}

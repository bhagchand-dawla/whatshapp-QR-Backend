import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { sendEntry } from '../services/api';
import { validatePhone } from '../utils/validation';
import { useToast } from '../hooks/useToast';

export function GuardScanPage() {
  const [params] = useSearchParams();
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const toast = useToast();

  const phone = useMemo(() => params.get('phone') || '', [params]);
  const entryToken = useMemo(() => params.get('entryToken') || '', [params]);

  useEffect(() => {
    const validationError = validatePhone(phone);
    if (validationError) {
      setStatus('error');
      toast.error(validationError);
      return;
    }

    let cancelled = false;

    async function triggerSendEntry() {
      setStatus('loading');
      try {
        const response = await sendEntry(phone);
        if (cancelled) return;
        setStatus('done');
        toast.success(response.message);
      } catch (error) {
        if (cancelled) return;
        setStatus('error');
        const message = error instanceof Error ? error.message : 'Failed to send entry alert';
        toast.error(message);
      }
    }

    triggerSendEntry();

    return () => {
      cancelled = true;
    };
  }, [phone, toast]);

  return (
    <main style={{ padding: 24 }}>
      <h1>Guard Scan Processing</h1>
      <p>Entry token: {entryToken || 'Not provided'}</p>
      <p>Phone: {phone || 'Not provided'}</p>
      <p>Status: {status}</p>
    </main>
  );
}

import { useState } from 'react';
import { PhoneEntryForm } from '../components/PhoneEntryForm';
import { WhatsAppStatus } from '../components/WhatsAppStatus';
import { createEntry } from '../services/api';
import { useToast } from '../hooks/useToast';

type PageState = 'idle' | 'sending' | 'sent' | 'failed';

export function VisitorEntryPage() {
  const [pageState, setPageState] = useState<PageState>('idle');
  const [phone, setPhone] = useState('');
  const toast = useToast();

  async function handleSubmitPhone(phoneNumber: string) {
    setPhone(phoneNumber);
    setPageState('sending');

    try {
      const response = await createEntry(phoneNumber);

      if (!response.success) {
        throw new Error(response.message || 'Could not generate QR entry');
      }

      const whatsappSent = !!response.data?.whatsappSent;

      if (whatsappSent) {
        setPageState('sent');
        toast.success('QR Code sent on WhatsApp! 🎉');
      } else {
        setPageState('failed');
        toast.error('QR generated but WhatsApp delivery failed');
      }
    } catch (error) {
      setPageState('failed');
      const message = error instanceof Error ? error.message : 'Something went wrong';
      toast.error(message);
    }
  }

  function handleReset() {
    setPageState('idle');
    setPhone('');
  }

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-icon">🏢</div>
        <h1 className="card-title">Visitor Entry</h1>
        <p className="card-subtitle">
          Enter visitor's phone number — we'll send the QR code directly on WhatsApp
        </p>
      </div>

      {pageState === 'idle' && (
        <PhoneEntryForm onSubmitPhone={handleSubmitPhone} />
      )}

      {pageState === 'sending' && (
        <WhatsAppStatus status="sending" phone={phone} />
      )}

      {pageState === 'sent' && (
        <>
          <WhatsAppStatus status="sent" phone={phone} />
          <button className="btn btn-primary" onClick={handleReset} style={{ marginTop: '1.5rem' }}>
            ➕ Register Another Visitor
          </button>
        </>
      )}

      {pageState === 'failed' && (
        <>
          <WhatsAppStatus status="failed" phone={phone} />
          <button className="btn btn-primary" onClick={handleReset} style={{ marginTop: '1.5rem' }}>
            🔄 Try Again
          </button>
        </>
      )}
    </div>
  );
}

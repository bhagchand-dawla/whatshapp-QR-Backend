import { useState } from 'react';
import { PhoneEntryForm } from '../components/PhoneEntryForm';
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
        <div className="card-icon">🏯</div>
        <h1 className="card-title">Temple Entry</h1>
        <p className="card-subtitle">
          Enter your phone number — QR code will be sent on WhatsApp
        </p>
      </div>

      {pageState === 'idle' && (
        <PhoneEntryForm onSubmitPhone={handleSubmitPhone} />
      )}

      {pageState === 'sending' && (
        <div className="text-center p-8">
          <div className="btn-spinner mb-4 mx-auto" style={{ width: '40px', height: '40px' }} />
          <p>Sending QR code to your WhatsApp...</p>
        </div>
      )}

      {pageState === 'sent' && (
        <div className="text-center p-8">
          <div className="success-icon mb-4" style={{ fontSize: '4rem' }}>✅</div>
          <h2 className="text-2xl font-bold mb-2">Message Sent!</h2>
          <p className="mb-6 text-gray-600">Please check your WhatsApp for the entry QR code.</p>
          <button className="btn btn-primary" onClick={handleReset}>
            Register Again
          </button>
        </div>
      )}

      {pageState === 'failed' && (
        <div className="text-center p-8">
          <div className="error-icon mb-4" style={{ fontSize: '4rem' }}>❌</div>
          <h2 className="text-2xl font-bold mb-2">Failed</h2>
          <p className="mb-6 text-gray-600">Something went wrong. Please check your number and try again.</p>
          <button className="btn btn-primary" onClick={handleReset}>
            Try Again
          </button>
        </div>
      )}
    </div>
  );
}

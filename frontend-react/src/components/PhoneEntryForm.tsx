import { FormEvent, useState } from 'react';
import { validatePhone } from '../utils/validation';

type Props = {
  onSubmitPhone: (phone: string) => Promise<void>;
};

export function PhoneEntryForm({ onSubmitPhone }: Props) {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validationError = validatePhone(phone);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    setLoading(true);

    try {
      await onSubmitPhone(phone.trim());
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="phone" className="form-label">
          Visitor Phone Number
        </label>
        <div className="form-input-wrapper">
          <span className="form-input-icon">📱</span>
          <input
            id="phone"
            className="form-input"
            value={phone}
            onChange={(event) => {
              setPhone(event.target.value);
              if (error) setError(null);
            }}
            placeholder="+91 98765 43210"
            autoComplete="tel"
          />
        </div>
        {error ? (
          <div className="form-error">
            <span>⚠</span> {error}
          </div>
        ) : (
          <div className="form-hint">
            Enter phone in E.164 format (e.g. +919876543210)
          </div>
        )}
      </div>

      <button
        className="btn btn-success"
        disabled={loading}
        type="submit"
        id="generate-qr-btn"
      >
        {loading ? (
          <>
            <span className="btn-spinner" />
            Sending...
          </>
        ) : (
          <>
            💬 Send QR on WhatsApp
          </>
        )}
      </button>
    </form>
  );
}

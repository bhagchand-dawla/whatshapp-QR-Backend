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
    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 8 }}>
      <label htmlFor="phone">Visitor phone (E.164)</label>
      <input
        id="phone"
        value={phone}
        onChange={(event) => setPhone(event.target.value)}
        placeholder="+14155550100"
      />
      {error ? <small style={{ color: 'red' }}>{error}</small> : null}
      <button disabled={loading} type="submit">
        {loading ? 'Generating...' : 'Generate Gate QR'}
      </button>
    </form>
  );
}

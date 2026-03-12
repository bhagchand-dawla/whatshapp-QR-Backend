const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

export async function createEntry(phone: string) {
  const response = await fetch(`${API_BASE_URL}/api/entries/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone }),
  });

  return response.json();
}

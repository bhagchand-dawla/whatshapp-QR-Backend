# WhatsApp QR Visitor Entry (Full-Stack)

This project contains a full-stack starter application for visitor gate entry with QR codes and WhatsApp notifications.

- **Backend**: Next.js API routes (`backend-next`)
- **Frontend**: React + Vite (`frontend-react`)
- **Messaging**: Twilio WhatsApp Sandbox

---

## 1) Prerequisites

Install these tools first:

- **Node.js** 18+
- **npm** 9+
- A **Twilio account** with WhatsApp Sandbox enabled

Check your versions:

```bash
node -v
npm -v
```

---

## 2) Project Structure

```text
.
├── backend-next/
│   ├── .env.local.example
│   ├── package.json
│   └── src/
│       └── pages/api/
│           ├── send-entry.ts
│           └── entries/create.ts
├── frontend-react/
│   ├── .env.example
│   ├── package.json
│   └── src/
│       ├── pages/VisitorEntryPage.tsx
│       └── pages/GuardScanPage.tsx
└── README.md
```

---

## 3) Install Dependencies

Install backend and frontend dependencies separately.

### Backend dependencies

```bash
cd backend-next
npm install
```

### Frontend dependencies

```bash
cd ../frontend-react
npm install
```

> If you are in project root again, you can run:
>
> ```bash
> cd backend-next && npm install
> cd ../frontend-react && npm install
> ```

---

## 4) Environment Configuration

### Backend env file

Create `backend-next/.env.local`:

```bash
cd backend-next
cp .env.local.example .env.local
```

Edit `backend-next/.env.local`:

```env
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_WHATSAPP_FROM=+14155238886
BACKEND_BASE_URL=http://localhost:3000
```

### Frontend env file

Create `frontend-react/.env`:

```bash
cd ../frontend-react
cp .env.example .env
```

Edit `frontend-react/.env`:

```env
VITE_API_BASE_URL=http://localhost:3000
VITE_FRONTEND_BASE_URL=http://localhost:5173
```

---

## 5) Run Backend Server

Open terminal 1:

```bash
cd backend-next
npm run dev
```

Backend runs at:

- `http://localhost:3000`

---

## 6) Run Frontend Server

Open terminal 2:

```bash
cd frontend-react
npm run dev
```

Frontend runs at:

- `http://localhost:5173`

Open this URL in your browser.

---

## 7) Basic Usage Flow

1. Open frontend (`http://localhost:5173`).
2. Enter visitor phone number in E.164 format (example: `+14155550100`).
3. Generate QR code.
4. Open/scan the generated QR URL.
5. Guard scan page triggers backend `POST /api/send-entry`.
6. Backend sends WhatsApp via Twilio Sandbox.
7. Frontend shows success/error toast.

---

## 8) API Contract (`/api/send-entry`)

### Request

```json
{ "phone": "+14155550100" }
```

### Response

```json
{ "success": true, "message": "WhatsApp message sent" }
```

or

```json
{ "success": false, "message": "Failed to send WhatsApp message" }
```


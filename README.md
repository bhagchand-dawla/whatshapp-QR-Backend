# WhatsApp QR Visitor Entry (Full-Stack)

This repository now contains a practical full-stack architecture and starter code for:

- **Backend**: Next.js API routes
- **Frontend**: React (Vite)
- **Messaging**: Twilio WhatsApp Sandbox
- **Flow**: Visitor enters phone → QR generated → Guard scans → Frontend calls backend `/api/send-entry`

## Directory structure overview

```text
.
├── backend-next/
│   ├── .env.local.example
│   ├── package.json
│   ├── tsconfig.json
│   └── src/
│       ├── data/
│       │   └── entries.ts
│       ├── lib/
│       │   ├── twilio.ts
│       │   └── validation.ts
│       ├── pages/
│       │   └── api/
│       │       ├── send-entry.ts
│       │       └── entries/
│       │           └── create.ts
│       └── types/
│           └── api.ts
├── frontend-react/
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── src/
│       ├── App.tsx
│       ├── main.tsx
│       ├── components/
│       │   ├── EntryQRCode.tsx
│       │   └── PhoneEntryForm.tsx
│       ├── hooks/
│       │   └── useToast.ts
│       ├── pages/
│       │   ├── GuardScanPage.tsx
│       │   └── VisitorEntryPage.tsx
│       ├── services/
│       │   └── api.ts
│       └── utils/
│           └── validation.ts
└── README.md
```

## Backend

### Implemented API routes

1. `POST /api/entries/create`
   - Input: `{ phone: string }`
   - Validates E.164 phone format
   - Stores in-memory visitor entry
   - Generates unique QR token and scan URL

2. `POST /api/send-entry`
   - Input: `{ phone: string }`
   - Validates input
   - Sends WhatsApp message via Twilio Sandbox
   - Returns:

```json
{ "success": true, "message": "WhatsApp message sent" }
```

or

```json
{ "success": false, "message": "Failed to send WhatsApp message" }
```

### Data validation

- Backend uses `zod` schema.
- E.164 regex:

```ts
/^\+[1-9]\d{7,14}$/
```

### Error handling

- `405` method not allowed
- `400` invalid payload
- `500` Twilio/server failure
- Consistent response shape: `{ success: boolean, message: string }`

### Backend environment config

Create `backend-next/.env.local` from this example:

```env
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_WHATSAPP_FROM=+14155238886
BACKEND_BASE_URL=http://localhost:3000
```

## Frontend

### Pages

1. `VisitorEntryPage`
   - User enters phone number
   - Calls backend `/api/entries/create`
   - Receives unique scan URL
   - Displays QR using `qrcode.react` `QRCode`

2. `GuardScanPage`
   - Reads QR query params (phone)
   - Calls backend `/api/send-entry`
   - Shows success/error toast via `react-toastify`

### Frontend environment config

Create `frontend-react/.env` from this example:

```env
VITE_API_BASE_URL=http://localhost:3000
VITE_FRONTEND_BASE_URL=http://localhost:5173
```

## Run locally

### Backend

```bash
cd backend-next
npm install
npm run dev
```

### Frontend

```bash
cd frontend-react
npm install
npm run dev
```

Then open `http://localhost:5173`.

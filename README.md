# Temple Entry - WhatsApp QR (Mini Version)

Simple app: Visitor enters phone number → Random QR code + template text sent to their WhatsApp via **MSG91**.

## Flow
```
Visitor → Phone Number → Backend → MSG91 WhatsApp API → QR + Template → WhatsApp
```

## Setup

### 1. Backend (`backend-next/.env.local`)
```env
MSG91_AUTH_KEY=your_msg91_authkey
MSG91_INTEGRATED_NUMBER=91XXXXXXXXXX
MSG91_TEMPLATE_NAME=temple_entry_qr
```

### 2. Frontend (`frontend-react/.env`)
```env
VITE_API_BASE_URL=http://localhost:3000
```

### 3. MSG91 Template Setup
Create a WhatsApp template on MSG91 dashboard:
- **Name:** `temple_entry_qr`
- **Header:** Image (QR code will be sent here)
- **Body:** `Your entry QR code is ready. Registration ID: {{1}}`

## Run
```bash
# Terminal 1 (Backend)
cd backend-next && npm install && npm run dev

# Terminal 2 (Frontend)
cd frontend-react && npm install && npm run dev
```

Open **http://localhost:5173**

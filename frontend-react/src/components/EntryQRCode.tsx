import { QRCodeCanvas } from 'qrcode.react';
import { useState } from 'react';

type Props = {
  value: string;
  phone: string;
  whatsappSent: boolean;
  onResendWhatsApp: () => Promise<void>;
};

export function EntryQRCode({ value, phone, whatsappSent, onResendWhatsApp }: Props) {
  const [resending, setResending] = useState(false);

  async function handleResend() {
    setResending(true);
    try {
      await onResendWhatsApp();
    } finally {
      setResending(false);
    }
  }

  return (
    <div className="qr-section">
      <div className="qr-divider">
        <div className="qr-divider-line" />
        <span className="qr-divider-text">QR Code Ready</span>
        <div className="qr-divider-line" />
      </div>

      <div className="qr-container">
        <div className="qr-frame">
          <QRCodeCanvas
            value={value}
            size={200}
            includeMargin
            level="M"
            bgColor="#ffffff"
            fgColor="#111827"
          />
        </div>

        <div className="qr-info">
          <div className="qr-phone-badge">
            📱 {phone}
          </div>
          <p className="qr-instruction">
            Show this QR code to the security guard at the gate
          </p>
        </div>

        {/* WhatsApp Status Section */}
        <div className="whatsapp-status-section">
          <div className="whatsapp-divider">
            <div className="qr-divider-line" />
            <span className="qr-divider-text">WhatsApp</span>
            <div className="qr-divider-line" />
          </div>

          {whatsappSent ? (
            <div className="whatsapp-status whatsapp-sent">
              <div className="whatsapp-status-icon">✅</div>
              <div className="whatsapp-status-content">
                <span className="whatsapp-status-title">Greeting Sent!</span>
                <span className="whatsapp-status-detail">
                  A welcome message with the QR link has been sent to {phone} on WhatsApp
                </span>
              </div>
            </div>
          ) : (
            <div className="whatsapp-status whatsapp-failed">
              <div className="whatsapp-status-icon">⚠️</div>
              <div className="whatsapp-status-content">
                <span className="whatsapp-status-title">WhatsApp Not Sent</span>
                <span className="whatsapp-status-detail">
                  The greeting message could not be delivered. You can try again.
                </span>
              </div>
              <button
                className="btn btn-whatsapp"
                onClick={handleResend}
                disabled={resending}
                id="resend-whatsapp-btn"
              >
                {resending ? (
                  <>
                    <span className="btn-spinner" />
                    Sending...
                  </>
                ) : (
                  <>
                    💬 Resend on WhatsApp
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

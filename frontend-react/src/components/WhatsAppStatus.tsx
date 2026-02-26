type Props = {
    status: 'sending' | 'sent' | 'failed';
    phone: string;
};

export function WhatsAppStatus({ status, phone }: Props) {
    if (status === 'sending') {
        return (
            <div className="wa-status-container">
                {/* Animated phone with signal waves */}
                <div className="wa-sending-animation">
                    <div className="wa-phone-icon">
                        <span>📱</span>
                    </div>
                    <div className="wa-signal-waves">
                        <div className="wa-wave wa-wave-1" />
                        <div className="wa-wave wa-wave-2" />
                        <div className="wa-wave wa-wave-3" />
                    </div>
                    <div className="wa-whatsapp-icon">
                        <span>💬</span>
                    </div>
                </div>

                {/* Progress bar */}
                <div className="wa-progress-track">
                    <div className="wa-progress-bar" />
                </div>

                <div className="wa-status-text">
                    <h3 className="wa-status-title sending">Sending QR on WhatsApp...</h3>
                    <p className="wa-status-detail">
                        Delivering QR code to <strong>{phone}</strong>
                    </p>
                </div>

                {/* Floating particles */}
                <div className="wa-particles">
                    <div className="wa-particle wa-p1" />
                    <div className="wa-particle wa-p2" />
                    <div className="wa-particle wa-p3" />
                    <div className="wa-particle wa-p4" />
                    <div className="wa-particle wa-p5" />
                    <div className="wa-particle wa-p6" />
                </div>
            </div>
        );
    }

    if (status === 'sent') {
        return (
            <div className="wa-status-container">
                <div className="wa-success-animation">
                    <div className="wa-success-circle">
                        <svg className="wa-checkmark" viewBox="0 0 52 52">
                            <circle className="wa-checkmark-circle" cx="26" cy="26" r="25" fill="none" />
                            <path className="wa-checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                        </svg>
                    </div>
                </div>

                <div className="wa-status-text">
                    <h3 className="wa-status-title success">QR Sent Successfully! 🎉</h3>
                    <p className="wa-status-detail">
                        The QR code has been delivered to
                    </p>
                    <div className="wa-phone-badge">
                        <span className="wa-badge-icon">📱</span>
                        <span className="wa-badge-number">{phone}</span>
                        <span className="wa-badge-check">✓</span>
                    </div>
                    <p className="wa-status-hint">
                        The visitor can show the QR from their WhatsApp at the gate
                    </p>
                </div>
            </div>
        );
    }

    // failed
    return (
        <div className="wa-status-container">
            <div className="wa-failed-animation">
                <div className="wa-failed-circle">
                    <span className="wa-failed-x">✕</span>
                </div>
            </div>

            <div className="wa-status-text">
                <h3 className="wa-status-title failed">Delivery Failed</h3>
                <p className="wa-status-detail">
                    Could not send QR code to <strong>{phone}</strong>
                </p>
                <p className="wa-status-hint">
                    Please check the number and try again
                </p>
            </div>
        </div>
    );
}

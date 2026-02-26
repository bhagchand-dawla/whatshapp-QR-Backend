import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { sendEntry } from '../services/api';
import { validatePhone } from '../utils/validation';
import { useToast } from '../hooks/useToast';

type ScanStatus = 'idle' | 'loading' | 'done' | 'error';

const STATUS_CONFIG: Record<ScanStatus, { icon: string; label: string; detail: string }> = {
  idle: {
    icon: '⏳',
    label: 'Waiting...',
    detail: 'Preparing to send entry notification',
  },
  loading: {
    icon: '📡',
    label: 'Sending Notification...',
    detail: 'Sending WhatsApp message to the visitor',
  },
  done: {
    icon: '✅',
    label: 'Entry Approved!',
    detail: 'WhatsApp notification sent successfully',
  },
  error: {
    icon: '❌',
    label: 'Something Went Wrong',
    detail: 'Could not send the WhatsApp notification',
  },
};

export function GuardScanPage() {
  const [params] = useSearchParams();
  const [status, setStatus] = useState<ScanStatus>('idle');
  const toast = useToast();

  const phone = useMemo(() => params.get('phone') || '', [params]);
  const entryToken = useMemo(() => params.get('entryToken') || '', [params]);

  useEffect(() => {
    const validationError = validatePhone(phone);
    if (validationError) {
      setStatus('error');
      toast.error(validationError);
      return;
    }

    let cancelled = false;

    async function triggerSendEntry() {
      setStatus('loading');
      try {
        const response = await sendEntry(phone);
        if (cancelled) return;
        setStatus('done');
        toast.success(response.message);
      } catch (error) {
        if (cancelled) return;
        setStatus('error');
        const message = error instanceof Error ? error.message : 'Failed to send entry alert';
        toast.error(message);
      }
    }

    triggerSendEntry();

    return () => {
      cancelled = true;
    };
  }, [phone, toast]);

  const config = STATUS_CONFIG[status];

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-icon">🛡️</div>
        <h1 className="card-title">Guard Scan</h1>
        <p className="card-subtitle">
          Processing visitor entry verification
        </p>
      </div>

      <div className="scan-status">
        <div className={`scan-status-icon ${status}`}>
          {config.icon}
        </div>
        <p className="scan-status-text">{config.label}</p>
        <p className="scan-status-detail">{config.detail}</p>

        {status === 'loading' && (
          <div className="dots-loader">
            <span></span>
            <span></span>
            <span></span>
          </div>
        )}
      </div>

      <div className="scan-info-grid">
        <div className="scan-info-item">
          <div>
            <div className="scan-info-label">Phone Number</div>
            <div className="scan-info-value">{phone || 'Not provided'}</div>
          </div>
        </div>
        <div className="scan-info-item">
          <div>
            <div className="scan-info-label">Entry Token</div>
            <div className="scan-info-value">{entryToken || 'Not provided'}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { QRCode } from 'qrcode.react';

type Props = {
  value: string;
};

export function EntryQRCode({ value }: Props) {
  return (
    <div>
      <QRCode value={value} size={256} includeMargin level="M" />
      <p style={{ maxWidth: 360, fontSize: 12, wordBreak: 'break-all' }}>{value}</p>
    </div>
  );
}

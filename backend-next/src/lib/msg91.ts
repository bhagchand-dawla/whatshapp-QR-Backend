/**
 * MSG91 WhatsApp Integration
 * Sends WhatsApp messages via MSG91 API
 */

const MSG91_API_URL = 'https://control.msg91.com/api/v5/whatsapp/whatsapp-outbound-message/bulk/';

function getAuthKey(): string {
    const authKey = process.env.MSG91_AUTH_KEY;
    if (!authKey) throw new Error('Missing MSG91_AUTH_KEY environment variable');
    return authKey;
}

function getIntegratedNumber(): string {
    const number = process.env.MSG91_INTEGRATED_NUMBER;
    if (!number) throw new Error('Missing MSG91_INTEGRATED_NUMBER environment variable');
    return number;
}

function getTemplateName(): string {
    return process.env.MSG91_TEMPLATE_NAME || 'temple_entry_qr';
}

export type Msg91SendResult = {
    success: boolean;
    error?: string;
};

/**
 * Send a WhatsApp message with QR image via MSG91
 */
export async function sendWhatsAppQR(
    phone: string,
    qrImageUrl: string,
    registrationId: string
): Promise<Msg91SendResult> {
    const authKey = getAuthKey();
    const integratedNumber = getIntegratedNumber();
    const templateName = getTemplateName();

    // Remove '+' prefix if present for MSG91 format
    const cleanPhone = phone.startsWith('+') ? phone.slice(1) : phone;

    const payload = {
        integrated_number: integratedNumber,
        content_type: 'template',
        payload: {
            type: 'template',
            template: {
                name: templateName,
                language: {
                    code: 'en',
                    policy: 'deterministic',
                },
                to_and_components: [
                    {
                        to: [cleanPhone],
                        components: {
                            header_1: {
                                type: 'image',
                                value: qrImageUrl,
                            },
                            body_1: {
                                type: 'text',
                                value: 'Visitor',
                            },
                            body_2: {
                                type: 'text',
                                value: registrationId,
                            },
                        },
                    },
                ],
            },
        },
    };

    console.log('========== MSG91 WhatsApp Request ==========');
    console.log('Phone:', cleanPhone);
    console.log('Template:', templateName);
    console.log('Integrated Number:', integratedNumber);
    console.log('QR Image URL:', qrImageUrl);
    console.log('Full Payload:', JSON.stringify(payload, null, 2));

    try {
        const response = await fetch(MSG91_API_URL, {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json',
                'authkey': authKey,
            },
            body: JSON.stringify(payload),
        });

        const data = await response.json();

        console.log('========== MSG91 WhatsApp Response ==========');
        console.log('HTTP Status:', response.status);
        console.log('Response Body:', JSON.stringify(data, null, 2));

        if (!response.ok) {
            console.error('MSG91 API Error (HTTP):', response.status, data);
            return { success: false, error: JSON.stringify(data) };
        }

        // MSG91 can return 200 but still have errors in the body
        if (data?.type === 'error' || data?.status === 'error' || data?.message?.toLowerCase?.()?.includes?.('error')) {
            console.error('MSG91 API Error (Body):', data);
            return { success: false, error: JSON.stringify(data) };
        }

        console.log('MSG91 WhatsApp message sent successfully!');
        return { success: true };
    } catch (err: any) {
        console.error('MSG91 API Exception:', err?.message || err);
        return { success: false, error: err?.message || 'Unknown error' };
    }
}

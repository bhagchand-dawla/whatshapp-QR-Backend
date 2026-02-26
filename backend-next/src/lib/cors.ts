import type { NextApiRequest, NextApiResponse } from 'next';

const ALLOWED_ORIGINS = [
    'http://localhost:5173',
    'http://localhost:3000',
];

export function setCorsHeaders(req: NextApiRequest, res: NextApiResponse) {
    const origin = req.headers.origin;

    if (origin && ALLOWED_ORIGINS.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    } else {
        // Fallback for development
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    }

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Max-Age', '86400');
}

/**
 * Handle preflight OPTIONS request. Returns true if it was an OPTIONS request
 * (meaning the caller should stop processing).
 */
export function handleCorsPreFlight(req: NextApiRequest, res: NextApiResponse): boolean {
    setCorsHeaders(req, res);

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return true;
    }

    return false;
}

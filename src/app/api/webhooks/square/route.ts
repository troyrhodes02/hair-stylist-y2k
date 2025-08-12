import { NextResponse } from 'next/server';
import { env } from '@/lib/config/env';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const signature = request.headers.get('x-square-signature');
    if (!signature) {
      return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
    }

    const rawBody = await request.text();

    // Verify webhook signature if key is configured
    if (env.SQUARE_WEBHOOK_SIGNATURE_KEY) {
      const hmac = crypto.createHmac(
        'sha256',
        env.SQUARE_WEBHOOK_SIGNATURE_KEY
      );
      hmac.update(rawBody);
      const hash = hmac.digest('base64');

      if (hash !== signature) {
        return NextResponse.json(
          { error: 'Invalid signature' },
          { status: 401 }
        );
      }
    } else {
      console.warn(
        'Square webhook signature verification skipped - no signature key configured'
      );
    }

    const body = JSON.parse(rawBody);
    const { type } = body;

    // Handle different webhook event types
    switch (type) {
      case 'payment.updated':
        // Handle payment update
        break;
      case 'refund.updated':
        // Handle refund update
        break;
      // Add more event types as needed
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Error in Square webhook:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

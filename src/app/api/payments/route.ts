import { NextResponse } from 'next/server';
import { squareService } from '@/lib/services/square';

export async function GET() {
  try {
    const config = squareService.getPaymentConfig();
    return NextResponse.json(config);
  } catch (error) {
    console.error('Error in payments config endpoint:', error);
    return NextResponse.json(
      { error: 'Failed to get payment configuration' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const paymentDetails = await request.json();
    const result = await squareService.processPayment(paymentDetails);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in payments endpoint:', error);
    return NextResponse.json(
      { error: 'Payment processing failed' },
      { status: 500 }
    );
  }
}

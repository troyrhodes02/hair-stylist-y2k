import { env } from '@/lib/server/env';
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    depositAmount: env.DEPOSIT_AMOUNT,
    cashAppHandle: env.CASHAPP_HANDLE,
  });
}

import { NextResponse } from 'next/server';
import { getAirtableService } from '@/lib/services/airtable';

// Initialize Airtable booking service
const airtableBookingService = getAirtableService();

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const result = await airtableBookingService.createBooking({
      serviceId: body.serviceId,
      startTime: new Date(body.startTime),
      endTime: new Date(body.endTime),
      customerId: body.customerId,
      status: body.status,
      paymentId: body.paymentId,
      notes: body.notes,
      basePrice: Number(body.basePrice),
      addOns: body.addOns,
      addOnPrice: Number(body.addOnPrice),
      totalPrice: Number(body.totalPrice),
      duration: Number(body.duration),
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    );
  }
}

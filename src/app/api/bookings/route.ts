import { NextResponse } from 'next/server';
import { getAirtableService } from '@/lib/services/airtable';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      serviceId,
      startTime,
      endTime,
      customerName,
      customerEmail,
      customerPhone,
      basePrice,
      addOns,
      addOnPrice,
      totalPrice,
      duration,
    } = body;

    // Validate required fields
    if (
      !serviceId ||
      !startTime ||
      !endTime ||
      !customerName ||
      !customerEmail ||
      !customerPhone ||
      !basePrice ||
      !totalPrice
    ) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const airtableService = getAirtableService();

    // Create the booking with initial status of "pending-payment"
    const booking = await airtableService.createBooking({
      serviceId,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      duration,
      customerId: `${customerName}|${customerEmail}|${customerPhone}`, // Store customer info in a single field for now
      status: 'pending-payment',
      paymentId: '', // Will be updated when payment is confirmed
      basePrice,
      addOns,
      addOnPrice,
      totalPrice,
    });

    return NextResponse.json({
      success: true,
      booking,
      message: 'Booking created successfully',
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    );
  }
}

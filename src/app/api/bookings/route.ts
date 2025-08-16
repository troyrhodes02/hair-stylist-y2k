import { NextResponse } from 'next/server';
import { getAirtableService } from '@/lib/services/airtable';
import { NewBooking } from '@/lib/types/booking';

// Initialize Airtable booking service
const airtableBookingService = getAirtableService();

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Convert string dates from JSON to Date objects
    const newBooking: NewBooking = {
      ...body,
      startTime: new Date(body.startTime),
      endTime: new Date(body.endTime),
    };

    // Add the booking to Airtable
    const bookingRecord = await airtableBookingService.addBooking(newBooking);

    // Return the created record
    return new Response(JSON.stringify(bookingRecord), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    );
  }
}

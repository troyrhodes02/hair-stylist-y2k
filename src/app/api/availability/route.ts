import { NextResponse } from 'next/server';
import { availabilityService } from '@/lib/services/availability';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const dateStr = searchParams.get('date');
    const serviceDuration = parseInt(searchParams.get('duration') || '30', 10);

    console.log(
      `Received availability request for date: ${dateStr}, duration: ${serviceDuration}`
    );

    if (!dateStr) {
      return NextResponse.json(
        { error: 'Date parameter is required' },
        { status: 400 }
      );
    }

    const localDate = new Date(dateStr + 'T00:00:00');
    if (isNaN(localDate.getTime())) {
      return NextResponse.json(
        { error: 'Invalid date format' },
        { status: 400 }
      );
    }

    const slots = await availabilityService.getAvailableSlots(
      localDate,
      serviceDuration
    );
    console.log(`Returning ${slots.length} slots for ${dateStr}`);

    return NextResponse.json({ slots });
  } catch (error) {
    console.error('Error in availability endpoint:', error);
    return NextResponse.json(
      { error: 'Failed to fetch availability' },
      { status: 500 }
    );
  }
}

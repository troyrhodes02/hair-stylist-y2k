import { NextResponse } from 'next/server';
import { airtableService } from '@/lib/services/airtable';
import { squareService } from '@/lib/services/square';
import { twilioService } from '@/lib/services/twilio';
import { availabilityService } from '@/lib/services/availability';
import type { Customer, Service, PaymentDetails } from '@/lib/types/booking';

interface BookingRequestBody {
  customerId: string;
  serviceId: string;
  startTime: string;
  endTime: string;
  paymentDetails: PaymentDetails;
  customer: Customer;
  service: Service;
}

export async function POST(request: Request) {
  try {
    const body: BookingRequestBody = await request.json();
    const {
      customerId,
      serviceId,
      startTime,
      endTime,
      paymentDetails,
      customer,
      service,
    } = body;

    // Validate time slot availability
    const slot = {
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      isAvailable: true,
    };

    if (!availabilityService.isValidTimeSlot(slot, service.durationMinutes)) {
      return NextResponse.json(
        { error: 'Selected time slot is not available' },
        { status: 400 }
      );
    }

    // Process payment
    const paymentResult = await squareService.processPayment(paymentDetails);

    // Create booking
    const booking = await airtableService.createBooking({
      customerId,
      serviceId,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      status: 'new',
      paymentId: paymentResult.paymentId,
    });

    // Send notifications
    await twilioService.sendNotification({
      to: customer.phone,
      type: 'booking_confirmation',
      booking,
      customer,
      service,
    });

    return NextResponse.json({ booking });
  } catch (error) {
    console.error('Error in bookings endpoint:', error);
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const bookingId = searchParams.get('id');

    if (bookingId) {
      const booking = await airtableService.getBooking(bookingId);
      if (!booking) {
        return NextResponse.json(
          { error: 'Booking not found' },
          { status: 404 }
        );
      }
      return NextResponse.json({ booking });
    }

    // In a real implementation, you would add pagination and filters
    const bookings = await airtableService.getNewBookings();
    return NextResponse.json({ bookings });
  } catch (error) {
    console.error('Error in bookings endpoint:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
}

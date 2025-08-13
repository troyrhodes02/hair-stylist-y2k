import { NextResponse } from 'next/server';
import { env } from '@/lib/server/env';
import { sendSMS, toE164 } from '@/lib/server/twilio';
import {
  bookingPendingCustomer,
  bookingPendingStylist,
} from '@/lib/server/messages';
import { getAirtableService } from '@/lib/services/airtable';
import type { BookingFields } from '@/lib/types/airtable';

const airtableService = getAirtableService();

export async function POST(req: Request) {
  try {
    // 1) Parse the incoming payload
    const body = await req.json();

    const {
      serviceId,
      serviceName, // optional; fall back to serviceId for SMS copy
      startTime: startTimeRaw, // string from client, e.g. "2025-08-14T16:00:00.000Z"
      endTime: endTimeRaw, // optional string
      duration, // minutes
      customerName,
      customerEmail,
      customerPhone,
      basePrice,
      addOns, // string or array (your code can join if needed)
      addOnPrice,
      totalPrice,
    } = body;

    // 2) Normalize date/time inputs
    const start = new Date(startTimeRaw);
    const end = endTimeRaw ? new Date(endTimeRaw) : undefined;

    if (Number.isNaN(start.getTime())) {
      return NextResponse.json(
        { error: 'Invalid startTime provided' },
        { status: 400 }
      );
    }
    if (end && Number.isNaN(end.getTime())) {
      return NextResponse.json(
        { error: 'Invalid endTime provided' },
        { status: 400 }
      );
    }

    // 3) Create the booking first (don’t send SMS before persistence)
    const booking = await airtableService.createBooking({
      serviceId,
      startTime: start,
      endTime: end ?? start,
      duration,
      // If your service expects a combined customerId string, keep it:
      customerId: `${customerName}|${customerEmail}|${customerPhone}`,
      status: 'pending-payment',
      paymentId: '', // to be filled later if/when you add payments
      basePrice,
      addOns,
      addOnPrice,
      totalPrice,
    });

    // 4) Derive date/time strings for SMS (prefer explicit ISO fields from created record)
    // Handle both possible booking response shapes
    const fields =
      booking && 'fields' in booking
        ? (booking as { fields: Partial<BookingFields> }).fields
        : {};

    const startISOFromRecord: string | undefined =
      fields['Start Time ISO'] || fields['Start Time Iso'] || undefined;

    const startISO = startISOFromRecord ?? start.toISOString();

    const dateISO = body.dateISO ?? fields['Date'] ?? startISO.slice(0, 10); // YYYY-MM-DD

    const timeISO = body.timeISO ?? startISO.slice(11, 16); // HH:mm (24h)

    const serviceDisplay = serviceName ?? serviceId ?? 'Service';

    // 5) Best-effort SMS sends (never fail the booking if SMS fails)

    // Customer SMS
    try {
      if (customerPhone && dateISO && timeISO) {
        const to = toE164(customerPhone);
        if (to) {
          await sendSMS(
            to,
            bookingPendingCustomer({
              customerName: customerName ?? 'Customer',
              serviceName: serviceDisplay,
              dateISO,
              timeISO,
            })
          );
        } else {
          console.warn('SMS customer skipped: invalid phone', customerPhone);
        }
      } else {
        console.warn('SMS customer skipped: missing phone or date/time', {
          customerPhone,
          dateISO,
          timeISO,
        });
      }
    } catch (e) {
      console.error('Failed to send customer SMS (non-fatal):', e);
    }

    // Stylist SMS
    try {
      const stylistTo = env.STYLIST_PHONE || '+14692236837';
      if (stylistTo && dateISO && timeISO) {
        await sendSMS(
          stylistTo,
          bookingPendingStylist({
            customerName: customerName ?? 'Customer',
            serviceName: serviceDisplay,
            dateISO,
            timeISO,
            durationMinutes: duration,
          })
        );
      } else {
        console.warn(
          'SMS stylist skipped: missing STYLIST_PHONE or date/time',
          {
            stylistTo,
            dateISO,
            timeISO,
          }
        );
      }
    } catch (e) {
      console.error('Failed to send stylist SMS (non-fatal):', e);
    }

    // 6) Return your original success shape
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

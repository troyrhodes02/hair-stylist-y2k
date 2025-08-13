import { env } from './env';

export interface BookingFieldMap {
  date: string;
  startTime: string;
  startTimeISO: string;
  endTimeISO: string;
  status: string;
  serviceName: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  notes: string;
  paymentStatus: string;
  duration: string;
  basePrice: string;
  addOns: string;
  addOnPrice: string;
  totalPrice: string;
}

export async function getBookingFieldMap(): Promise<BookingFieldMap> {
  return {
    date: env.BOOKING_DATE_FIELD || 'Preferred Date',
    startTime: env.BOOKING_START_TIME_FIELD || 'Preferred Time',
    startTimeISO: 'Start Time ISO',
    endTimeISO: 'End Time ISO',
    status: env.BOOKING_STATUS_FIELD || 'Booking Status',
    serviceName: 'Service Name',
    customerName: 'Customer Name',
    customerEmail: 'Customer Email',
    customerPhone: 'Customer Phone',
    notes: 'Special Requests',
    paymentStatus: 'Payment Status',
    duration: 'Duration',
    basePrice: 'Base Price',
    addOns: 'Add-ons',
    addOnPrice: 'Add-on Price',
    totalPrice: 'Total Price',
  };
}

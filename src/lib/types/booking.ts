export type BookingStatus =
  | 'new'
  | 'confirmed'
  | 'completed'
  | 'cancelled'
  | 'pending-payment';

export interface TimeSlot {
  startTime: Date;
  endTime: Date;
  isAvailable: boolean;
}

export interface WeeklySchedule {
  id: string;
  dayOfWeek: number; // 0-6, where 0 is Sunday
  startTime: string; // HH:mm format
  endTime: string; // HH:mm format
  isAvailable: boolean;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  durationMinutes: number;
  category: string;
}

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface Booking {
  id: string;
  customerId: string;
  serviceId: string;
  startTime: Date;
  endTime: Date;
  status: BookingStatus;
  paymentId?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TimeOff {
  id: string;
  startTime: Date;
  endTime: Date;
  note?: string;
}

export type NewBooking = Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>;

export interface NotificationPayload {
  to: string;
  type:
    | 'booking_confirmation'
    | 'booking_reminder'
    | 'booking_cancelled'
    | 'stylist_alert';
  booking: Booking;
  customer: Customer;
  service: Service;
}

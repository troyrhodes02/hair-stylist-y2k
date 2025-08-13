import { BookingStatus } from './booking';

export interface BookingFields {
  'Customer Name': string;
  'Customer Email': string;
  'Customer Phone': string;
  'Service Name': string;
  'Preferred Date': string;
  'Preferred Time': string;
  'Start Time ISO': string;
  'End Time ISO': string;
  'Booking Status': BookingStatus;
  'Payment Status': string;
  Duration: number;
  'Base Price': number;
  'Add-ons'?: string;
  'Add-on Price'?: number;
  'Total Price': number;
  'Special Requests'?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface ScheduleFields {
  Day: string;
  'Start Time': string;
  'End Time': string;
  Available: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

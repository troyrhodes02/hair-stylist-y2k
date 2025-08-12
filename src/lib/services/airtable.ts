import Airtable from 'airtable';
import { env } from '../server/env';
import type { Booking, WeeklySchedule, BookingStatus } from '../types/booking';

interface AirtableBookingFields {
  customerId: string;
  serviceId: string;
  startTime: string;
  endTime: string;
  status: BookingStatus;
  paymentId: string;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
  [key: string]: string | BookingStatus | undefined; // Index signature for Airtable FieldSet
}

interface AirtableScheduleFields {
  Day: string;
  'Start Time': string;
  'End Time': string;
  Available: boolean;
  [key: string]: string | boolean; // Index signature for Airtable FieldSet
}

class AirtableService {
  private base: Airtable.Base;
  private bookingTable: Airtable.Table<AirtableBookingFields>;
  private scheduleTable: Airtable.Table<AirtableScheduleFields>;

  constructor() {
    Airtable.configure({
      apiKey: env.AIRTABLE_ACCESS_TOKEN,
    });

    this.base = Airtable.base(env.AIRTABLE_BASE_ID);
    this.bookingTable = this.base(env.AIRTABLE_BOOKING_TABLE_ID);
    this.scheduleTable = this.base(env.AIRTABLE_WEEKLY_SCHEDULE_TABLE_ID);
  }

  // Booking Operations
  async createBooking(
    booking: Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<Booking> {
    try {
      const record = await this.bookingTable.create([
        {
          fields: {
            ...booking,
            startTime: booking.startTime.toISOString(),
            endTime: booking.endTime.toISOString(),
          },
        },
      ]);

      return this.transformBookingRecord(record[0]);
    } catch (error) {
      throw new Error(
        `Failed to create booking: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  async getBooking(id: string): Promise<Booking | null> {
    try {
      const record = await this.bookingTable.find(id);
      return record ? this.transformBookingRecord(record) : null;
    } catch (error) {
      throw new Error(
        `Failed to get booking: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  async updateBookingStatus(
    id: string,
    status: Booking['status']
  ): Promise<Booking> {
    try {
      const record = await this.bookingTable.update(id, {
        status,
        updatedAt: new Date().toISOString(),
      });
      return this.transformBookingRecord(record);
    } catch (error) {
      throw new Error(
        `Failed to update booking status: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  async getNewBookings(): Promise<Booking[]> {
    try {
      const records = await this.bookingTable
        .select({
          filterByFormula: "{status} = 'new'",
          sort: [{ field: 'createdAt', direction: 'desc' }],
        })
        .all();

      return records.map(this.transformBookingRecord);
    } catch (error) {
      throw new Error(
        `Failed to get new bookings: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  async getBookingsForDate(date: Date): Promise<Booking[]> {
    try {
      // Convert date to YYYY-MM-DD format for comparison
      const dateStr = date.toISOString().split('T')[0];

      const records = await this.bookingTable
        .select({
          filterByFormula: `AND(
            IS_SAME({startTime}, '${dateStr}', 'day'),
            NOT({status} = 'cancelled')
          )`,
        })
        .all();

      return records.map(this.transformBookingRecord);
    } catch (error) {
      throw new Error(
        `Failed to get bookings for date: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  // Weekly Schedule Operations
  async getWeeklySchedule(): Promise<WeeklySchedule[]> {
    try {
      const records = await this.scheduleTable.select().all();
      return records.map(this.transformScheduleRecord);
    } catch (error) {
      throw new Error(
        `Failed to get weekly schedule: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  // Helper functions to transform Airtable records to our types
  private validateBookingStatus(status: string): BookingStatus {
    if (!['new', 'confirmed', 'completed', 'cancelled'].includes(status)) {
      throw new Error(`Invalid booking status: ${status}`);
    }
    return status as BookingStatus;
  }

  private transformBookingRecord(
    record: Airtable.Record<AirtableBookingFields>
  ): Booking {
    const fields = record.fields;
    const status = this.validateBookingStatus(fields.status);
    return {
      id: record.id,
      customerId: fields.customerId,
      serviceId: fields.serviceId,
      startTime: new Date(fields.startTime),
      endTime: new Date(fields.endTime),
      status,
      paymentId: fields.paymentId,
      notes: fields.notes,
      createdAt: new Date(fields.createdAt || record._rawJson.createdTime),
      updatedAt: new Date(fields.updatedAt || record._rawJson.createdTime),
    };
  }

  private getDayNumber(dayName: string): number {
    const days = [
      'sunday',
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
    ];
    const dayIndex = days.indexOf(dayName.toLowerCase());
    if (dayIndex === -1) {
      throw new Error(
        `Invalid day name: ${dayName}. Expected one of: ${days.join(', ')}`
      );
    }
    return dayIndex;
  }

  private transformScheduleRecord(
    record: Airtable.Record<AirtableScheduleFields>
  ): WeeklySchedule {
    const fields = record.fields;
    return {
      id: record.id,
      dayOfWeek: this.getDayNumber(fields.Day), // Convert day name to number (0-6)
      startTime: fields['Start Time'],
      endTime: fields['End Time'],
      isAvailable: fields.Available === true,
    };
  }
}

// Export a singleton instance
export const airtableService = new AirtableService();

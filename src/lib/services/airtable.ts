import Airtable from 'airtable';
import { env } from '../config/env';
import type { Booking, WeeklySchedule } from '../types/booking';

interface AirtableBookingFields {
  customerId: string;
  serviceId: string;
  startTime: string;
  endTime: string;
  status: string;
  paymentId: string;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface AirtableScheduleFields {
  Day: string;
  'Start Time': string;
  'End Time': string;
  Available: boolean;
}

class AirtableService {
  private base: Airtable.Base;
  private bookingTable: Airtable.Table<Partial<Booking>>;
  private scheduleTable: Airtable.Table<Partial<WeeklySchedule>>;

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
  private transformBookingRecord(
    record: Airtable.Record<Partial<Booking>>
  ): Booking {
    const fields = record.fields as AirtableBookingFields;
    return {
      id: record.id,
      customerId: fields.customerId,
      serviceId: fields.serviceId,
      startTime: new Date(fields.startTime),
      endTime: new Date(fields.endTime),
      status: fields.status,
      paymentId: fields.paymentId,
      notes: fields.notes,
      createdAt: new Date(fields.createdAt || record._rawJson.createdTime),
      updatedAt: new Date(fields.updatedAt || record._rawJson.createdTime),
    };
  }

  private transformScheduleRecord(
    record: Airtable.Record<Partial<WeeklySchedule>>
  ): WeeklySchedule {
    const fields = record.fields as AirtableScheduleFields;
    return {
      id: record.id,
      dayOfWeek: fields.Day, // Assuming field name in Airtable is 'Day'
      startTime: fields['Start Time'], // Assuming field name is 'Start Time'
      endTime: fields['End Time'], // Assuming field name is 'End Time'
      isAvailable: fields.Available === true, // Assuming field name is 'Available'
    };
  }
}

// Export a singleton instance
export const airtableService = new AirtableService();

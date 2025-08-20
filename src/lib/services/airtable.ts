import Airtable from 'airtable';
import { env } from '../server/env';
import type {
  Booking,
  WeeklySchedule,
  BookingStatus,
  NewBooking,
  TimeOff,
} from '../types/booking';
import type {
  BookingFields,
  ScheduleFields,
  TimeOffFields,
} from '../types/airtable';

// Exact Airtable column names, with env overrides for critical fields
const F = {
  // Configurable via env (preserve existing feature)
  date: env.BOOKING_DATE_FIELD || 'Preferred Date',
  startTime: env.BOOKING_START_TIME_FIELD || 'Preferred Time',
  startTimeISO: 'Start Time ISO', // Added for time calculations
  endTimeISO: 'End Time ISO', // Added for time calculations
  status: env.BOOKING_STATUS_FIELD || 'Booking Status',

  // Fixed column names from Airtable
  serviceName: 'Service Name',
  customerName: 'Customer Name',
  customerEmail: 'Customer Email',
  customerPhone: 'Customer Phone',
  notes: 'Special Requests',
  paymentStatus: 'Payment Status',
  duration: 'Duration',

  // Financial details
  basePrice: 'Base Price',
  addOns: 'Add-ons',
  addOnPrice: 'Add-on Price',
  totalPrice: 'Total Price',
} as const;

const TF = {
  date: 'Date',
  startTime: 'Start Time',
  endTime: 'End Time',
  notes: 'Notes',
} as const;

export class AirtableBookingService {
  private base: Airtable.Base;
  private bookingTable: Airtable.Table<BookingFields>;
  private scheduleTable: Airtable.Table<ScheduleFields>;
  private timeOffTable: Airtable.Table<TimeOffFields>;

  constructor() {
    Airtable.configure({
      apiKey: env.AIRTABLE_ACCESS_TOKEN,
    });
    this.base = Airtable.base(env.AIRTABLE_BASE_ID);
    this.bookingTable = this.base(env.AIRTABLE_BOOKING_TABLE_ID);
    this.scheduleTable = this.base(env.AIRTABLE_WEEKLY_SCHEDULE_TABLE_ID);
    this.timeOffTable = this.base(env.AIRTABLE_TIME_OFF_TABLE_ID);
  }

  // --- Booking Operations ---

  async addBooking(booking: NewBooking): Promise<Booking> {
    const [customerName, customerEmail, customerPhone] =
      booking.customerId.split('|');

    const fields = {
      [F.customerName]: customerName,
      [F.customerEmail]: customerEmail,
      [F.customerPhone]: customerPhone,
      [F.serviceName]: booking.serviceId,
      [F.date]: booking.startTime.toISOString().split('T')[0],
      [F.startTime]: booking.startTime.toLocaleTimeString('en-US', {
        timeZone: 'America/Chicago',
        hour: '2-digit',
        minute: '2-digit',
      }),
      [F.startTimeISO]: booking.startTime.toISOString(),
      [F.endTimeISO]: booking.endTime.toISOString(),
      [F.duration]: Math.round(
        (booking.endTime.getTime() - booking.startTime.getTime()) / 60000
      ),
      [F.status]: booking.status,
      [F.notes]: booking.notes || '',
    };

    const record = await this.bookingTable.create(fields, { typecast: true });
    return this.transformBookingRecord(record);
  }

  async createBooking(input: {
    serviceId: string;
    startTime: Date;
    endTime: Date;
    customerId: string;
    status: BookingStatus;
    paymentId?: string;
    notes?: string;
    basePrice: number;
    addOns?: string[];
    addOnPrice?: number;
    totalPrice: number;
    duration: number;
  }): Promise<{ id: string }> {
    try {
      // Parse customer info from the combined customerId string
      const [customerName, customerEmail, customerPhone] =
        input.customerId.split('|');

      // Build fields using exact Airtable column names
      // Format the time in US Central Time
      const timeOptions: Intl.DateTimeFormatOptions = {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
        timeZone: 'America/Chicago',
      };
      const formattedTime =
        input.startTime.toLocaleTimeString('en-US', timeOptions) + ' CST';

      const fields: Partial<BookingFields> = {
        [F.customerName]: customerName,
        [F.customerEmail]: customerEmail,
        [F.customerPhone]: customerPhone,
        [F.serviceName]: input.serviceId,
        [F.date]: input.startTime.toISOString().split('T')[0], // YYYY-MM-DD
        [F.startTime]: formattedTime, // e.g., "11:30 AM CST"
        [F.startTimeISO]: input.startTime.toISOString(), // Store ISO time for calculations
        [F.endTimeISO]: input.endTime.toISOString(), // Store ISO time for calculations
        [F.status]: input.status,
        [F.basePrice]: input.basePrice,
        [F.totalPrice]: input.totalPrice,
      };

      if (input.notes) fields[F.notes] = input.notes;
      if (input.addOns?.length) {
        fields[F.addOns] = input.addOns.join(', ');
        fields[F.addOnPrice] = input.addOnPrice || 0;
      }

      fields[F.duration] = input.duration;

      // Set initial payment status
      fields[F.paymentStatus] = 'Pending';

      const [record] = await this.bookingTable.create([{ fields }], {
        typecast: true,
      });
      console.log('Successfully created booking with fields:', fields);

      return { id: record.id };
    } catch (error) {
      console.error('Failed to create booking in Airtable:', {
        error,
        note: 'Check that Airtable column names match F mapping exactly.',
        attemptedFields: Object.keys(F),
      });
      throw new Error('Failed to create booking.');
    }
  }

  async getBookingsForDate(date: Date): Promise<Booking[]> {
    const dateStr = date.toISOString().split('T')[0];
    const formula = `IS_SAME({${F.date}}, '${dateStr}', 'day')`;

    console.log(`Querying Airtable bookings with formula: ${formula}`);

    const records = await this.bookingTable
      .select({
        filterByFormula: formula,
        sort: [{ field: F.startTimeISO, direction: 'asc' }],
      })
      .all();

    return records
      .map(record => this.transformBookingRecord(record))
      .filter(booking => booking.status === 'confirmed');
  }

  async getTimeOffForDate(date: Date): Promise<TimeOff[]> {
    const dateStr = date.toISOString().split('T')[0];
    const formula = `IS_SAME({${TF.date}}, '${dateStr}', 'day')`;

    console.log(`Querying time-off with formula: ${formula}`);

    const records = await this.timeOffTable
      .select({ filterByFormula: formula })
      .all();

    console.log(`Found ${records.length} time-off records`);

    return records.map(record => {
      const startTimeStr = record.fields[TF.startTime] as string;
      const endTimeStr = record.fields[TF.endTime] as string;

      console.log(`Processing time-off record ${record.id}:`);
      console.log(`  Raw start time: "${startTimeStr}"`);
      console.log(`  Raw end time: "${endTimeStr}"`);

      const startTime = this.combineDateAndTime(dateStr, startTimeStr);
      const endTime = this.combineDateAndTime(dateStr, endTimeStr);

      console.log(
        `  Parsed start time: ${startTime.toISOString()} (${startTime.toLocaleTimeString()})`
      );
      console.log(
        `  Parsed end time: ${endTime.toISOString()} (${endTime.toLocaleTimeString()})`
      );

      return {
        id: record.id,
        startTime,
        endTime,
        note: record.fields[TF.notes] as string | undefined,
      };
    });
  }

  // --- Schedule Operations ---

  async getWeeklySchedule(): Promise<WeeklySchedule[]> {
    const records = await this.scheduleTable.select().all();
    return records.map(record => this.transformScheduleRecord(record));
  }

  // --- Data Transformers ---

  private transformBookingRecord(
    record: Airtable.Record<BookingFields>
  ): Booking {
    const fields = record.fields;
    const startTime = fields[F.startTimeISO]
      ? new Date(fields[F.startTimeISO])
      : this.combineDateAndTime(fields[F.date], fields[F.startTime]);

    const endTime = fields[F.endTimeISO]
      ? new Date(fields[F.endTimeISO])
      : new Date(startTime.getTime() + (fields[F.duration] as number) * 60000);

    return {
      id: record.id,
      customerId: `${fields['Customer Name']}|${fields['Customer Email']}|${fields['Customer Phone']}`,
      serviceId: fields['Service Name'],
      startTime,
      endTime,
      status: (fields[F.status] as string)?.toLowerCase() as BookingStatus,
      paymentId: undefined,
      notes: fields[F.notes],
      createdAt: new Date(record._rawJson.createdTime),
      updatedAt: new Date(record._rawJson.createdTime),
    };
  }

  private combineDateAndTime(dateStr?: string, timeStr?: string): Date {
    if (!dateStr || !timeStr) {
      console.log(
        `combineDateAndTime: Missing params - dateStr: "${dateStr}", timeStr: "${timeStr}"`
      );
      return new Date();
    }

    console.log(
      `combineDateAndTime: Processing dateStr: "${dateStr}", timeStr: "${timeStr}"`
    );
    const [hours, minutes] = this.parseTimeString(timeStr);
    console.log(
      `combineDateAndTime: Parsed hours: ${hours}, minutes: ${minutes}`
    );

    // Fix: Create date in local timezone to avoid date shifts
    const [year, month, day] = dateStr.split('-').map(Number);
    const date = new Date(year, month - 1, day, hours, minutes, 0, 0);

    console.log(
      `combineDateAndTime: Final result: ${date.toISOString()} (${date.toLocaleTimeString()})`
    );
    console.log(
      `combineDateAndTime: Date components - Year: ${year}, Month: ${month - 1}, Day: ${day}`
    );
    return date;
  }

  private parseTimeString(timeStr: string): [number, number] {
    console.log(`parseTimeString: Parsing "${timeStr}"`);

    // Try parsing as ISO date first
    const iso = new Date(timeStr);
    if (!isNaN(iso.getTime())) {
      console.log(
        `parseTimeString: Parsed as ISO date - hours: ${iso.getHours()}, minutes: ${iso.getMinutes()}`
      );
      return [iso.getHours(), iso.getMinutes()];
    }

    // Try parsing as AM/PM format
    const match = timeStr.trim().match(/(\d{1,2})(?::(\d{2}))?\s*(AM|PM)/i);
    if (!match) {
      console.log(
        `parseTimeString: No match found for "${timeStr}", returning [0, 0]`
      );
      return [0, 0];
    }

    let hours = parseInt(match[1], 10);
    const minutes = match[2] ? parseInt(match[2], 10) : 0;
    const period = match[3].toUpperCase();

    console.log(
      `parseTimeString: Matched - raw hours: ${hours}, minutes: ${minutes}, period: ${period}`
    );

    if (period === 'PM' && hours !== 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;

    console.log(
      `parseTimeString: Final result - hours: ${hours}, minutes: ${minutes}`
    );
    return [hours, minutes];
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
    if (dayIndex === -1) throw new Error(`Invalid day name: ${dayName}`);
    return dayIndex;
  }

  private transformScheduleRecord(
    record: Airtable.Record<ScheduleFields>
  ): WeeklySchedule {
    const fields = record.fields;
    return {
      id: record.id,
      dayOfWeek: this.getDayNumber(fields['Day']),
      startTime: fields['Start Time'],
      endTime: fields['End Time'],
      isAvailable: fields['Available'],
    };
  }
}

let airtableServiceInstance: AirtableBookingService | null = null;

function getAirtableService(): AirtableBookingService {
  if (!airtableServiceInstance) {
    airtableServiceInstance = new AirtableBookingService();
  }
  return airtableServiceInstance;
}

// Export the getter function instead of the instance
export { getAirtableService };

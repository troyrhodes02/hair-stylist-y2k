import type { TimeSlot, WeeklySchedule, Booking } from '../types/booking';
import { airtableService } from './airtable';

class AvailabilityService {
  private readonly SLOT_DURATION = 30; // minutes

  private generateTimeSlots(
    startTime: Date,
    endTime: Date,
    existingBookings: Booking[],
    serviceDuration: number
  ): TimeSlot[] {
    console.log(
      `Generating slots from ${startTime.toLocaleTimeString()} to ${endTime.toLocaleTimeString()} with service duration ${serviceDuration} mins`
    );

    const slots: TimeSlot[] = [];
    const currentTime = new Date(startTime);

    while (currentTime <= endTime) {
      const serviceEnd = new Date(
        currentTime.getTime() + serviceDuration * 60000
      );

      console.log(`\nChecking slot: ${currentTime.toLocaleTimeString()}`);
      console.log(`  Service would end at: ${serviceEnd.toLocaleTimeString()}`);

      // Business rule: Appointments can start any time during operating hours
      // Service duration does not limit start times - stylist works until service is complete
      const hasConflict = existingBookings.some(
        booking =>
          (currentTime >= booking.startTime && currentTime < booking.endTime) ||
          (serviceEnd > booking.startTime && serviceEnd <= booking.endTime) ||
          (currentTime <= booking.startTime && serviceEnd >= booking.endTime)
      );

      slots.push({
        startTime: new Date(currentTime),
        endTime: serviceEnd,
        isAvailable: !hasConflict,
      });

      currentTime.setMinutes(currentTime.getMinutes() + this.SLOT_DURATION);
    }

    console.log(
      'Final generated slots:',
      slots.map(s => s.startTime.toLocaleTimeString())
    );
    return slots;
  }

  private parseTimeString(timeStr: string): [number, number] {
    console.log(`Parsing time string: "${timeStr}"`);

    // Check if the string is in ISO 8601 format
    const isoDate = new Date(timeStr);
    if (!isNaN(isoDate.getTime())) {
      const hours = isoDate.getHours();
      const minutes = isoDate.getMinutes();
      console.log(`Parsed ISO time: ${hours}:${minutes}`);
      return [hours, minutes];
    }

    // Fallback for "h:mm A" format
    const time = timeStr.match(/(\d+):(\d+)\s*(AM|PM)/i);
    if (!time) {
      console.error(`Invalid time format for: "${timeStr}"`);
      return [0, 0];
    }

    let hours = parseInt(time[1], 10);
    const minutes = parseInt(time[2], 10);
    const period = time[3].toUpperCase();

    if (period === 'PM' && hours !== 12) {
      hours += 12;
    } else if (period === 'AM' && hours === 12) {
      hours = 0;
    }

    console.log(`Parsed time: ${hours}:${minutes}`);
    return [hours, minutes];
  }

  private getDayNumber(date: Date): number {
    return date.getDay(); // Returns 0-6, where 0 is Sunday
  }

  private getDateSchedule(
    schedule: WeeklySchedule[],
    date: Date
  ): WeeklySchedule | null {
    const dayNumber = this.getDayNumber(date);
    console.log(
      `Looking for schedule for day ${dayNumber} (${date.toLocaleDateString('en-US', { weekday: 'long' })})`
    );

    return (
      schedule.find(s => s.dayOfWeek === dayNumber && s.isAvailable) || null
    );
  }

  async getAvailableSlots(
    date: Date,
    serviceDuration: number
  ): Promise<TimeSlot[]> {
    try {
      console.log(
        `\n--- Getting available slots for ${date.toDateString()} ---`
      );

      const schedule = await airtableService.getWeeklySchedule();
      console.log('Fetched weekly schedule:', schedule);

      const daySchedule = this.getDateSchedule(schedule, date);
      if (!daySchedule) {
        console.log('No schedule found for this day.');
        return [];
      }
      console.log('Found day schedule:', daySchedule);

      const [startHours, startMinutes] = this.parseTimeString(
        daySchedule.startTime
      );
      const [endHours, endMinutes] = this.parseTimeString(daySchedule.endTime);

      const startTime = new Date(date);
      startTime.setHours(startHours, startMinutes, 0, 0);

      const endTime = new Date(date);
      endTime.setHours(endHours, endMinutes, 0, 0);

      console.log(
        `Operating hours: ${startTime.toLocaleTimeString()} - ${endTime.toLocaleTimeString()}`
      );

      const existingBookings = await this.getBookingsForDate(date);
      console.log('Existing bookings for the day:', existingBookings);

      const slots = this.generateTimeSlots(
        startTime,
        endTime,
        existingBookings,
        serviceDuration
      );
      console.log('Generated time slots:', slots);

      console.log(
        `--- Finished getting slots for ${date.toDateString()} ---\n`
      );
      return slots;
    } catch (error) {
      console.error(
        `Failed to get available slots: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
      throw new Error(
        `Failed to get available slots: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  private async getBookingsForDate(date: Date): Promise<Booking[]> {
    return airtableService.getBookingsForDate(date);
  }

  isValidTimeSlot(slot: TimeSlot, serviceDuration: number): boolean {
    // Check if the slot is available and if the service duration fits within operating hours
    const serviceEnd = new Date(
      slot.startTime.getTime() + serviceDuration * 60000
    );
    return slot.isAvailable && serviceEnd <= slot.endTime;
  }
}

// Export a singleton instance
export const availabilityService = new AvailabilityService();

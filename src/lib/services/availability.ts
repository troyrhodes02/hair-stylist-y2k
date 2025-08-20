import type {
  TimeSlot,
  WeeklySchedule,
  Booking,
  TimeOff,
} from '../types/booking';
import { getAirtableService } from './airtable';

class AvailabilityService {
  private readonly SLOT_DURATION = 30; // minutes

  private generateTimeSlots(
    startTime: Date,
    endTime: Date,
    existingBlocks: Array<{ startTime: Date; endTime: Date }>,
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
      const hasConflict = existingBlocks.some(block => {
        // Slot starts within blocked time (including exactly at end time)
        const conflict1 =
          currentTime >= block.startTime && currentTime <= block.endTime;
        // Service would end within blocked time
        const conflict2 =
          serviceEnd > block.startTime && serviceEnd <= block.endTime;
        // Slot completely envelops the blocked time
        const conflict3 =
          currentTime < block.startTime && serviceEnd > block.endTime;
        const hasConflict = conflict1 || conflict2 || conflict3;

        if (hasConflict) {
          console.log(`    CONFLICT DETECTED with block:`);
          console.log(
            `      Block: ${block.startTime.toLocaleTimeString()} - ${block.endTime.toLocaleTimeString()}`
          );
          console.log(
            `      Slot: ${currentTime.toLocaleTimeString()} - ${serviceEnd.toLocaleTimeString()}`
          );
          console.log(
            `      Conflict reasons: slotStartsInBlock=${conflict1}, serviceEndsInBlock=${conflict2}, slotEnvelopsBlock=${conflict3}`
          );
        }

        return hasConflict;
      });

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

    // Fallback for 12-hour text like "h:mm AM" or "h AM"
    const time = timeStr.trim().match(/(\d{1,2})(?::(\d{2}))?\s*(AM|PM)/i);
    if (!time) {
      console.error(`Invalid time format for: "${timeStr}"`);
      return [0, 0];
    }

    let hours = parseInt(time[1], 10);
    const minutes = time[2] ? parseInt(time[2], 10) : 0;
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

      const airtableService = getAirtableService();
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

      const confirmedBookings: Booking[] =
        await airtableService.getBookingsForDate(date);
      console.log('Confirmed bookings for the day:', confirmedBookings);

      const timeOffBlocks: TimeOff[] =
        await airtableService.getTimeOffForDate(date);
      console.log('Stylist time off for the day:', timeOffBlocks);

      // Enhanced debugging for time-off blocks
      if (timeOffBlocks.length > 0) {
        console.log('=== TIME OFF BLOCKS DEBUG ===');
        timeOffBlocks.forEach((block, index) => {
          console.log(`Block ${index + 1}:`);
          console.log(`  ID: ${block.id}`);
          console.log(
            `  Start Time: ${block.startTime.toISOString()} (${block.startTime.toLocaleTimeString()})`
          );
          console.log(
            `  End Time: ${block.endTime.toISOString()} (${block.endTime.toLocaleTimeString()})`
          );
          console.log(`  Note: ${block.note || 'No note'}`);
          console.log(
            `  Date object validity: Start=${!isNaN(block.startTime.getTime())}, End=${!isNaN(block.endTime.getTime())}`
          );
        });
        console.log('=== END TIME OFF BLOCKS DEBUG ===');
      } else {
        console.log('No time-off blocks found for this date');
      }

      const conflicts = [...confirmedBookings, ...timeOffBlocks];

      const slots = this.generateTimeSlots(
        startTime,
        endTime,
        conflicts,
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

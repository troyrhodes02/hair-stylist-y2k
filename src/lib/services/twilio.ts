import twilio from 'twilio';
import { env } from '../config/env';
import type {
  NotificationPayload,
  Booking,
  Customer,
  Service,
} from '../types/booking';

class TwilioService {
  private client: twilio.Twilio;

  constructor() {
    this.client = twilio(env.TWILIO_ACCOUNT_SID, env.TWILIO_AUTH_TOKEN);
  }

  private async sendSMS(to: string, body: string): Promise<void> {
    try {
      await this.client.messages.create({
        to,
        from: env.TWILIO_PHONE_NUMBER,
        body,
      });
    } catch (error) {
      throw new Error(
        `Failed to send SMS: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  private formatBookingConfirmation(
    booking: Booking,
    customer: Customer,
    service: Service
  ): string {
    const date = booking.startTime.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    const time = booking.startTime.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    });

    return `Hi ${customer.firstName}! Your appointment for ${service.name} is confirmed for ${date} at ${time}. Duration: ${service.durationMinutes} minutes. Total: $${service.price}. Reply CANCEL to cancel your appointment.`;
  }

  private formatStylistAlert(
    booking: Booking,
    customer: Customer,
    service: Service
  ): string {
    const date = booking.startTime.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    });
    const time = booking.startTime.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    });

    return `New booking: ${customer.firstName} ${customer.lastName} for ${service.name} on ${date} at ${time}. Duration: ${service.durationMinutes} minutes.`;
  }

  async sendNotification(payload: NotificationPayload): Promise<void> {
    const { to, type, booking, customer, service } = payload;

    let message: string;
    switch (type) {
      case 'booking_confirmation':
        message = this.formatBookingConfirmation(booking, customer, service);
        break;
      case 'booking_reminder':
        message = `Reminder: Your appointment for ${service.name} is tomorrow at ${booking.startTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}. We look forward to seeing you!`;
        break;
      case 'booking_cancelled':
        message = `Your appointment for ${service.name} on ${booking.startTime.toLocaleDateString()} has been cancelled. Please contact us if you need to reschedule.`;
        break;
      case 'stylist_alert':
        message = this.formatStylistAlert(booking, customer, service);
        break;
      default:
        throw new Error(`Invalid notification type: ${type}`);
    }

    await this.sendSMS(to, message);
  }
}

// Export a singleton instance
export const twilioService = new TwilioService();

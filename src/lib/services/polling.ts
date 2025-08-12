import { airtableService } from './airtable';
import { twilioService } from './twilio';
import type {
  Booking,
  Customer,
  Service,
  NotificationPayload,
} from '../types/booking';

class PollingService {
  private isPolling = false;
  private pollingInterval: NodeJS.Timeout | null = null;
  private processedBookings = new Set<string>();

  async startPolling(intervalMinutes: number = 5) {
    if (this.isPolling) {
      return;
    }

    this.isPolling = true;
    await this.pollNewBookings();

    this.pollingInterval = setInterval(
      () => this.pollNewBookings(),
      intervalMinutes * 60 * 1000
    );
  }

  stopPolling() {
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
      this.pollingInterval = null;
    }
    this.isPolling = false;
  }

  private async pollNewBookings() {
    try {
      const newBookings = await airtableService.getNewBookings();

      for (const booking of newBookings) {
        if (!this.processedBookings.has(booking.id)) {
          await this.processBooking(booking);
          this.processedBookings.add(booking.id);

          // Prevent the set from growing indefinitely
          if (this.processedBookings.size > 1000) {
            const [firstItem] = this.processedBookings;
            this.processedBookings.delete(firstItem);
          }
        }
      }
    } catch (error) {
      console.error('Error in polling service:', error);
    }
  }

  private async processBooking(booking: Booking) {
    try {
      // In a real implementation, you would fetch these from your database
      const customer: Customer = await this.getCustomer(booking.customerId);
      const service: Service = await this.getService(booking.serviceId);

      // Send confirmation to customer
      const customerNotification: NotificationPayload = {
        to: customer.phone,
        type: 'booking_confirmation',
        booking,
        customer,
        service,
      };
      await twilioService.sendNotification(customerNotification);

      // Send alert to stylist
      const stylistNotification: NotificationPayload = {
        to: process.env.STYLIST_PHONE_NUMBER || '', // You should add this to your env variables
        type: 'stylist_alert',
        booking,
        customer,
        service,
      };
      await twilioService.sendNotification(stylistNotification);

      // Update booking status to confirmed
      await airtableService.updateBookingStatus(booking.id, 'confirmed');
    } catch (error) {
      console.error(`Error processing booking ${booking.id}:`, error);
    }
  }

  private async getCustomer(customerId: string): Promise<Customer> {
    // For now, return a mock customer - in production, this would fetch from Airtable
    return {
      id: customerId,
      firstName: 'Test',
      lastName: 'Customer',
      email: 'test@example.com',
      phone: '+1234567890',
    };
  }

  private async getService(serviceId: string): Promise<Service> {
    // For now, return a mock service - in production, this would fetch from Airtable
    return {
      id: serviceId,
      name: 'Test Service',
      description: 'Test service description',
      price: 100,
      durationMinutes: 60,
      category: 'Test Category',
    };
  }
}

// Export a singleton instance
export const pollingService = new PollingService();

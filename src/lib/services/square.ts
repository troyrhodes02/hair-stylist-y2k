import { Client, Environment } from 'square';
import { env } from '../config/env';
import type { PaymentDetails } from '../types/booking';

class SquareService {
  private client: Client;

  constructor() {
    this.client = new Client({
      accessToken: env.SQUARE_ACCESS_TOKEN,
      environment:
        env.SQUARE_ENVIRONMENT === 'sandbox'
          ? Environment.Sandbox
          : Environment.Production,
    });
  }

  async processPayment(details: PaymentDetails) {
    try {
      const { amount, currency, sourceId, customerId, idempotencyKey } =
        details;

      const payment = await this.client.paymentsApi.createPayment({
        sourceId,
        idempotencyKey,
        amountMoney: {
          amount: Math.round(amount * 100), // Convert to cents
          currency,
        },
        customerId,
        autocomplete: true,
      });

      if (payment.result.payment?.id) {
        return {
          success: true,
          paymentId: payment.result.payment.id,
        };
      } else {
        throw new Error('Payment failed: No payment ID returned');
      }
    } catch (error) {
      throw new Error(
        `Payment processing failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  async createCustomer(firstName: string, lastName: string, email: string) {
    try {
      const response = await this.client.customersApi.createCustomer({
        idempotencyKey: `${email}-${Date.now()}`,
        givenName: firstName,
        familyName: lastName,
        emailAddress: email,
      });

      if (response.result.customer?.id) {
        return response.result.customer.id;
      } else {
        throw new Error('Failed to create customer: No customer ID returned');
      }
    } catch (error) {
      throw new Error(
        `Failed to create customer: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  getPaymentConfig() {
    return {
      applicationId: env.SQUARE_APPLICATION_ID,
      locationId: env.SQUARE_SUBSCRIPTION_ID,
      environment: env.SQUARE_ENVIRONMENT,
    };
  }
}

// Export a singleton instance
export const squareService = new SquareService();

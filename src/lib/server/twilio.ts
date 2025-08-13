import 'server-only';
import twilio from 'twilio';
import { env } from './env';

export function toE164(usPhone: string): string | null {
  // Strip all non-digits
  const digits = usPhone.replace(/\D/g, '');

  // Handle different formats
  if (digits.length === 10) {
    return `+1${digits}`; // US 10-digit
  } else if (digits.length === 11 && digits.startsWith('1')) {
    return `+${digits}`; // US 11-digit with leading 1
  } else if (usPhone.startsWith('+')) {
    return usPhone; // Already E.164
  }

  return null; // Invalid format
}

// Initialize Twilio client (will throw if env vars missing)
const client = twilio(env.TWILIO_ACCOUNT_SID, env.TWILIO_AUTH_TOKEN);

export async function sendSMS(to: string, body: string): Promise<void> {
  const e164To = toE164(to);
  if (!e164To) {
    throw new Error('Invalid phone number format');
  }

  try {
    await client.messages.create({
      to: e164To,
      from: env.TWILIO_PHONE_NUMBER,
      body,
    });
    console.log('SMS sent successfully to:', e164To.slice(0, -4) + 'XXXX');
  } catch (error) {
    console.error(
      'Failed to send SMS:',
      error instanceof Error ? error.message : 'Unknown error'
    );
    throw error; // Re-throw for caller to handle
  }
}

import { z } from 'zod';

const envSchema = z.object({
  // Payment Configuration
  CASHAPP_HANDLE: z
    .string()
    .min(1, 'CashApp handle must be a non-empty string'),
  DEPOSIT_AMOUNT: z.coerce.number().int().min(1).default(15),

  // Twilio Configuration
  TWILIO_ACCOUNT_SID: z
    .string()
    .min(1, 'Twilio account SID must be a non-empty string')
    .optional(),
  TWILIO_AUTH_TOKEN: z
    .string()
    .min(1, 'Twilio auth token must be a non-empty string')
    .optional(),
  TWILIO_PHONE_NUMBER: z
    .string()
    .min(1, 'Twilio phone number must be a non-empty string')
    .optional(),

  // Airtable Configuration (Required)
  AIRTABLE_ACCESS_TOKEN: z
    .string()
    .min(1, 'Airtable access token must be a non-empty string'),
  AIRTABLE_BASE_ID: z
    .string()
    .min(1, 'Airtable base ID must be a non-empty string'),
  AIRTABLE_BOOKING_TABLE_ID: z
    .string()
    .min(1, 'Airtable booking table ID must be a non-empty string'),
  AIRTABLE_WEEKLY_SCHEDULE_TABLE_ID: z
    .string()
    .min(1, 'Airtable weekly schedule table ID must be a non-empty string'),

  // App Configuration
  NEXT_PUBLIC_SITE_URL: z
    .string()
    .url('Site URL must be a valid URL')
    .default('http://localhost:3000'),
  POLLING_INTERVAL_MINUTES: z.coerce.number().int().min(1).max(60).default(5),
});

export type Env = z.infer<typeof envSchema>;

function validateEnv(): Env {
  try {
    const parsedEnv = envSchema.safeParse(process.env);
    if (!parsedEnv.success) {
      const issues = parsedEnv.error.issues.map(
        issue => `${issue.path.join('.')}: ${issue.message}`
      );
      throw new Error(
        `Environment validation failed:\n${issues.join(
          '\n'
        )}\n\nPlease check your .env.local file and ensure all required environment variables are set.`
      );
    }
    return parsedEnv.data;
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.startsWith('Environment validation failed')
    ) {
      // Re-throw the specific validation error to be caught by the framework
      throw error;
    }
    // For other unexpected errors, provide a generic message
    throw new Error(
      'An unexpected error occurred during environment validation. Please check your setup.'
    );
  }
}

export const env = validateEnv();

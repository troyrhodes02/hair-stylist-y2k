import 'server-only';
import { z } from 'zod';

const serverSchema = z.object({
  // Payment Configuration
  CASHAPP_HANDLE: z
    .string()
    .min(1, 'CashApp handle must be a non-empty string'),
  DEPOSIT_AMOUNT: z.coerce.number().int().min(1).default(15),

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

  // **Required** Airtable Field Names
  // These MUST match the exact names in your Airtable base.
  BOOKING_DATE_FIELD: z.string().min(1, 'BOOKING_DATE_FIELD is required'),
  BOOKING_STATUS_FIELD: z.string().min(1, 'BOOKING_STATUS_FIELD is required'),
  BOOKING_START_TIME_FIELD: z
    .string()
    .min(1, 'BOOKING_START_TIME_FIELD is required'),

  // App Configuration (Server-side only)
  POLLING_INTERVAL_MINUTES: z.coerce.number().int().min(1).max(60).default(5),
});

export type ServerEnv = z.infer<typeof serverSchema>;

function validateEnv(): ServerEnv {
  try {
    const parsedEnv = serverSchema.safeParse(process.env);
    if (!parsedEnv.success) {
      const issues = parsedEnv.error.issues.map(
        issue => `${issue.path.join('.')}: ${issue.message}`
      );
      throw new Error(
        `Server environment validation failed:\n${issues.join(
          '\n'
        )}\n\nPlease check your .env.local file and ensure all required environment variables are set.`
      );
    }
    return parsedEnv.data;
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.startsWith('Server environment validation failed')
    ) {
      throw error;
    }
    throw new Error(
      'An unexpected error occurred during server environment validation. Please check your setup.'
    );
  }
}

export const env = validateEnv();

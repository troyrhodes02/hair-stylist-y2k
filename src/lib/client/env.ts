import { z } from 'zod';

const clientSchema = z.object({
  // Public App Configuration
  NEXT_PUBLIC_SITE_URL: z
    .string()
    .url('Site URL must be a valid URL')
    .default('http://localhost:3000'),

  // Add any other NEXT_PUBLIC_* variables here
});

export type ClientEnv = z.infer<typeof clientSchema>;

function validateClientEnv(): ClientEnv {
  try {
    const parsedEnv = clientSchema.safeParse(process.env);
    if (!parsedEnv.success) {
      const issues = parsedEnv.error.issues.map(
        issue => `${issue.path.join('.')}: ${issue.message}`
      );
      console.error(
        `Client environment validation warning:\n${issues.join('\n')}`
      );
      // Return defaults for client-side to avoid breaking the app
      return clientSchema.parse({
        NEXT_PUBLIC_SITE_URL: 'http://localhost:3000',
      });
    }
    return parsedEnv.data;
  } catch (error) {
    console.error(
      'An unexpected error occurred during client environment validation.',
      error
    );
    // Return defaults for client-side to avoid breaking the app
    return clientSchema.parse({
      NEXT_PUBLIC_SITE_URL: 'http://localhost:3000',
    });
  }
}

export const clientEnv = validateClientEnv();

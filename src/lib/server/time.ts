import 'server-only';
import { env } from './env';

export function formatInCentral(iso: string): string {
  const tz = env.SITE_TZ || 'America/Chicago';
  return new Intl.DateTimeFormat('en-US', {
    timeZone: tz,
    weekday: 'short',
    month: 'short',
    day: '2-digit',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(iso));
}

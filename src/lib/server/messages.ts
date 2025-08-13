import 'server-only';
import { formatInCentral } from './time';

export function bookingPendingCustomer(p: {
  customerName: string;
  serviceName: string;
  dateISO: string;
  timeISO: string;
}): string {
  const d = formatInCentral(`${p.dateISO}T${p.timeISO}:00.000Z`);
  return `Hi ${p.customerName}, we received your booking for ${p.serviceName} on ${d}. Status: pending review. We'll text you once it's confirmed.`;
}

export function bookingPendingStylist(p: {
  customerName: string;
  serviceName: string;
  dateISO: string;
  timeISO: string;
  durationMinutes?: number;
}): string {
  const d = formatInCentral(`${p.dateISO}T${p.timeISO}:00.000Z`);
  const dur = p.durationMinutes ? `, ${p.durationMinutes} min` : '';
  return `New booking ➜ ${p.customerName}, ${p.serviceName}, ${d}${dur}. Please review in Airtable.`;
}

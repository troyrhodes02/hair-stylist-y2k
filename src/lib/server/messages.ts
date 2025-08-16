import 'server-only';

export const messages = {
  bookingPendingCustomer: (data: {
    customerName: string;
    serviceName: string;
    dateISO: string;
    timeISO: string;
  }) =>
    `Hi ${data.customerName}, your booking request for ${data.serviceName} on ${data.dateISO} at ${data.timeISO} is pending. We'll confirm shortly!`,

  bookingPendingStylist: (data: {
    customerName: string;
    serviceName: string;
    dateISO: string;
    timeISO: string;
    durationMinutes: number;
  }) =>
    `New booking request from ${data.customerName} for ${data.serviceName} on ${data.dateISO} at ${data.timeISO} (${data.durationMinutes} min).`,
};

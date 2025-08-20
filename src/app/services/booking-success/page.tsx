import { Suspense } from 'react';
import BookingSuccessClient from './BookingSuccessClient';

export default function BookingSuccessPage() {
  return (
    <Suspense fallback={null}>
      <BookingSuccessClient />
    </Suspense>
  );
}

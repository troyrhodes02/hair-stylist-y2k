'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Box, Container, Typography, Button } from '@mui/material';
import dynamic from 'next/dynamic';
import theme from '@/styles/theme';
import Link from 'next/link';
import emailjs from '@emailjs/browser';

const AnimatedStars = dynamic(
  () =>
    import('@/app/components/AnimatedStars/AnimatedStars').then(
      mod => mod.AnimatedStars
    ),
  { ssr: false, loading: () => null }
);

export default function BookingSuccessClient() {
  const [isMounted, setIsMounted] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) {
      return;
    }

    const sendEmail = async () => {
      const bookingData = {
        customer_name: searchParams.get('customerName') || '',
        customer_email: searchParams.get('customerEmail') || '',
        customer_phone: searchParams.get('customerPhone') || '',
        service_name: searchParams.get('serviceName') || '',
        booking_date: searchParams.get('bookingDate') || '',
        booking_time: searchParams.get('bookingTime') || '',
        duration_minutes: searchParams.get('duration') || '',
        notes: searchParams.get('notes') || '',
      };

      const bookingId = searchParams.get('bookingId');
      if (bookingId && !localStorage.getItem(bookingId)) {
        localStorage.setItem(bookingId, 'true');
        try {
          await emailjs.send(
            process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
            process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
            bookingData,
            process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
          );
        } catch (error) {
          console.error('Failed to send email:', error);
        }
      }
    };

    sendEmail();
  }, [searchParams, isMounted]);

  if (!isMounted) {
    return null;
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        position: 'relative',
        bgcolor: theme.palette.y2k.background,
        overflow: 'hidden',
        color: theme.palette.y2k.foreground,
      }}
    >
      <AnimatedStars />

      <Container
        maxWidth='md'
        sx={{
          py: 8,
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
        }}
      >
        <Typography
          variant='h1'
          sx={{
            color: theme.palette.y2k.primary,
            fontSize: { xs: '3rem', md: '5rem' },
            fontWeight: 'bold',
            mb: 4,
          }}
        >
          Booking Request Received!
        </Typography>

        <Typography
          variant='h5'
          sx={{
            color: theme.palette.y2k.foreground,
            mb: 3,
          }}
        >
          Thank you for submitting your booking request! We&apos;ll review it
          shortly.
        </Typography>

        <Typography
          sx={{
            color: 'white',
            mb: 2,
          }}
        >
          Please be on the lookout for a confirmation message for your
          appointment.
        </Typography>

        <Typography
          sx={{
            color: 'white',
            mb: 6,
            fontStyle: 'italic',
          }}
        >
          Note: Your appointment is not confirmed until you receive a
          confirmation message from us.
        </Typography>

        <Link href='/' passHref>
          <Button
            variant='contained'
            sx={{
              bgcolor: theme.palette.y2k.primary,
              '&:hover': {
                bgcolor: theme.palette.y2k.primaryDark,
              },
            }}
          >
            Return to Home
          </Button>
        </Link>
      </Container>
    </Box>
  );
}

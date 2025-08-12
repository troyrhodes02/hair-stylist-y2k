'use client';

import { Box, Container, Typography, Button } from '@mui/material';
import { AnimatedStars } from '@/app/components/AnimatedStars/AnimatedStars';
import theme from '@/styles/theme';
import Link from 'next/link';

export default function BookingSuccessPage() {
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
          Booking Received!
        </Typography>

        <Typography
          variant='h5'
          sx={{
            color: theme.palette.y2k.foreground,
            mb: 3,
          }}
        >
          Thank you for your booking request! Please check your SMS for deposit
          instructions.
        </Typography>

        <Typography
          sx={{
            color: theme.palette.y2k.muted,
            mb: 6,
          }}
        >
          Your appointment will be confirmed once we receive your deposit.
          We&apos;ll send you a confirmation text!
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

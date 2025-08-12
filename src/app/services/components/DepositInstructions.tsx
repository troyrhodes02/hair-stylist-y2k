'use client';

import { Box, Typography, Paper, Button } from '@mui/material';
import { Service } from '@/lib/types/booking';
import theme from '@/styles/theme';
import { env } from '@/lib/config/env';
import AutoAwesome from '@mui/icons-material/AutoAwesome';

interface DepositInstructionsProps {
  service: Service;
  total: number;
  onComplete: () => void;
}

const DepositInstructions = ({
  service,
  total,
  onComplete,
}: DepositInstructionsProps) => {
  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography variant='h4' sx={{ color: theme.palette.y2k.primary, mb: 3 }}>
        Complete Your Booking
      </Typography>

      <Paper
        sx={{
          p: 4,
          bgcolor: 'rgba(30, 20, 25, 0.5)',
          border: `1px solid ${theme.palette.y2k.muted}`,
          borderRadius: '12px',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        }}
      >
        <Typography variant='h5' sx={{ color: 'white', mb: 2 }}>
          {service.name}
        </Typography>

        <Box sx={{ mb: 4 }}>
          <Typography variant='h6' sx={{ color: theme.palette.y2k.primary }}>
            Total Cost: ${total}
          </Typography>
          <Typography sx={{ color: 'white', opacity: 0.8 }}>
            ${env.DEPOSIT_AMOUNT} deposit required to secure your appointment
          </Typography>
          <Typography sx={{ color: 'white', opacity: 0.8 }}>
            ${total - env.DEPOSIT_AMOUNT} remaining balance due at appointment
          </Typography>
        </Box>

        <Box
          sx={{
            bgcolor: 'rgba(228, 0, 121, 0.1)',
            p: 3,
            borderRadius: '8px',
            border: `1px solid ${theme.palette.y2k.primary}`,
            mb: 3,
          }}
        >
          <Typography
            variant='h6'
            sx={{ color: theme.palette.y2k.primary, mb: 2 }}
          >
            Send Deposit via CashApp
          </Typography>
          <Typography
            variant='h4'
            sx={{ color: 'white', mb: 2, fontFamily: 'monospace' }}
          >
            {env.CASHAPP_HANDLE}
          </Typography>
          <Typography sx={{ color: 'white', opacity: 0.8, mb: 2 }}>
            Please include your name in the payment note
          </Typography>
        </Box>

        <Typography sx={{ color: 'white', opacity: 0.8, mb: 3 }}>
          After sending the deposit, click below to complete your booking.
          We&apos;ll send you a confirmation text once we verify your deposit.
        </Typography>

        <Button
          variant='contained'
          onClick={onComplete}
          startIcon={<AutoAwesome />}
          sx={{
            bgcolor: theme.palette.y2k.primary,
            color: 'white',
            py: 1.5,
            px: 4,
            '&:hover': {
              bgcolor: theme.palette.y2k.secondary,
              transform: 'scale(1.02)',
            },
            transition: 'transform 0.2s',
            boxShadow: `0 0 20px ${theme.palette.y2k.primary}`,
          }}
        >
          I&apos;ve Sent the Deposit
        </Button>
      </Paper>
    </Box>
  );
};

export default DepositInstructions;

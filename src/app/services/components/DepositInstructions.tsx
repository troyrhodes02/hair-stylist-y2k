'use client';

import { Box, Typography, Button, Modal, IconButton } from '@mui/material';
import { Service } from '@/lib/types/booking';
import theme from '@/styles/theme';
import { useEffect, useState } from 'react';
import AutoAwesome from '@mui/icons-material/AutoAwesome';
import CloseIcon from '@mui/icons-material/Close';
import Image from 'next/image';

interface DepositInstructionsProps {
  service: Service;
  total: number;
  onComplete: () => void;
  loading?: boolean;
  error?: string | null;
  open: boolean;
  onClose: () => void;
}

const DepositInstructions = ({
  service,
  total,
  onComplete,
  loading = false,
  error = null,
  open,
  onClose,
}: DepositInstructionsProps) => {
  const [depositInfo, setDepositInfo] = useState<{
    depositAmount: number;
    cashAppHandle: string;
  } | null>(null);

  useEffect(() => {
    const fetchDepositInfo = async () => {
      try {
        const response = await fetch('/api/deposit-info');
        const data = await response.json();
        setDepositInfo(data);
      } catch (error) {
        console.error('Failed to fetch deposit info:', error);
      }
    };
    fetchDepositInfo();
  }, []);

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby='deposit-instructions-modal'
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
      }}
    >
      <Box
        sx={{
          position: 'relative',
          maxWidth: 500,
          width: '100%',
          bgcolor: 'rgba(30, 20, 25, 0.95)',
          border: `1px solid ${theme.palette.y2k.muted}`,
          borderRadius: '16px',
          p: 4,
          backdropFilter: 'blur(10px)',
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: 'white',
          }}
        >
          <CloseIcon />
        </IconButton>

        <Typography
          variant='h4'
          sx={{ color: theme.palette.y2k.primary, mb: 3, textAlign: 'center' }}
        >
          Complete Your Booking
        </Typography>

        <Typography
          variant='h5'
          sx={{ color: 'white', mb: 2, textAlign: 'center' }}
        >
          {service.name}
        </Typography>

        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant='h6' sx={{ color: theme.palette.y2k.primary }}>
            Total Cost: ${total}
          </Typography>
          <Typography sx={{ color: 'white', opacity: 0.8 }}>
            ${depositInfo?.depositAmount ?? '...'} deposit required to secure
            your appointment
          </Typography>
          <Typography sx={{ color: 'white', opacity: 0.8, fontWeight: 'bold' }}>
            ${total - (depositInfo?.depositAmount ?? 0)} remaining balance due
            in CASH at your appointment
          </Typography>
        </Box>

        {/* CashApp Option */}
        <Box
          sx={{
            bgcolor: '#00D632', // CashApp green
            p: 3,
            borderRadius: '12px',
            mb: 2,
            display: 'flex',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Box sx={{ width: 40, height: 40, position: 'relative' }}>
            <Image
              src='/images/cashapp-logo.png'
              alt='CashApp'
              fill
              style={{ objectFit: 'contain' }}
            />
          </Box>
          <Box>
            <Typography variant='h6' sx={{ color: 'white', mb: 1 }}>
              Send via CashApp
            </Typography>
            <Typography
              variant='h5'
              sx={{
                color: 'white',
                fontFamily: 'monospace',
                fontWeight: 'bold',
              }}
            >
              {depositInfo?.cashAppHandle ?? '...'}
            </Typography>
          </Box>
        </Box>

        {/* Zelle Option */}
        <Box
          sx={{
            bgcolor: '#6D1ED4', // Zelle purple
            p: 3,
            borderRadius: '12px',
            mb: 3,
            display: 'flex',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Box sx={{ width: 40, height: 40, position: 'relative' }}>
            <Image
              src='/images/zelle-logo-white.png'
              alt='Zelle'
              fill
              style={{ objectFit: 'contain' }}
            />
          </Box>
          <Box>
            <Typography variant='h6' sx={{ color: 'white', mb: 1 }}>
              Send via Zelle
            </Typography>
            <Typography
              variant='h5'
              sx={{
                color: 'white',
                fontFamily: 'monospace',
                fontWeight: 'bold',
              }}
            >
              972-904-4979
            </Typography>
          </Box>
        </Box>

        <Box sx={{ mb: 3, textAlign: 'center' }}>
          <Typography
            sx={{
              color: theme.palette.y2k.primary,
              fontWeight: 'bold',
              mb: 2,
            }}
          >
            DEPOSIT ONLY - Remaining balance must be paid in CASH at your
            appointment
          </Typography>
          <Typography sx={{ color: 'white', opacity: 0.8 }}>
            Please include your name in the payment note when sending the
            deposit. After sending, click below to submit your booking request.
            We&apos;ll send you a confirmation text once we verify your deposit.
          </Typography>
        </Box>

        {error && (
          <Typography color='error' sx={{ mb: 2, textAlign: 'center' }}>
            {error}
          </Typography>
        )}

        <Button
          variant='contained'
          onClick={onComplete}
          disabled={loading}
          fullWidth
          startIcon={<AutoAwesome />}
          sx={{
            bgcolor: theme.palette.y2k.primary,
            color: 'white',
            py: 1.5,
            '&:hover': {
              bgcolor: theme.palette.y2k.secondary,
              transform: loading ? 'none' : 'scale(1.02)',
            },
            transition: 'transform 0.2s',
            boxShadow: `0 0 20px ${theme.palette.y2k.primary}`,
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? 'Creating Booking...' : "I've Sent the Deposit"}
        </Button>
      </Box>
    </Modal>
  );
};

export default DepositInstructions;

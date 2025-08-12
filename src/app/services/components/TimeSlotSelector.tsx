'use client';

import { useState, useEffect } from 'react';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import { TimeSlot } from '@/lib/types/booking';
import theme from '@/styles/theme';

interface TimeSlotSelectorProps {
  selectedDate: string;
  serviceDuration: number;
  onTimeSlotSelect: (slot: TimeSlot) => void;
  selectedTimeSlot: TimeSlot | null;
}

export const TimeSlotSelector = ({
  selectedDate,
  serviceDuration,
  onTimeSlotSelect,
  selectedTimeSlot,
}: TimeSlotSelectorProps) => {
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAvailability = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `/api/availability?date=${selectedDate}&duration=${serviceDuration}`
        );
        if (!response.ok) throw new Error('Failed to fetch availability');
        const data = await response.json();

        // Parse the date strings back into Date objects
        const parsedSlots = data.slots.map(
          (slot: {
            startTime: string;
            endTime: string;
            isAvailable: boolean;
          }) => ({
            ...slot,
            startTime: new Date(slot.startTime),
            endTime: new Date(slot.endTime),
          })
        );

        setSlots(parsedSlots);
      } catch {
        setError('Unable to load available time slots. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (selectedDate && serviceDuration) {
      fetchAvailability();
    }
  }, [selectedDate, serviceDuration]);

  const formatTimeSlot = (slot: TimeSlot) => {
    return new Date(slot.startTime).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <Box display='flex' justifyContent='center' p={3}>
        <CircularProgress sx={{ color: theme.palette.y2k.primary }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign='center' p={3}>
        <Typography color='error'>{error}</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography
        variant='h6'
        sx={{
          color: theme.palette.y2k.primary,
          textAlign: 'center',
          mb: 2,
        }}
      >
        Available Time Slots
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)' },
          gap: 2,
        }}
      >
        {slots.map(slot => (
          <Box key={slot.startTime.toString()}>
            <Button
              fullWidth
              variant='outlined'
              onClick={() => onTimeSlotSelect(slot)}
              disabled={!slot.isAvailable}
              sx={{
                borderColor:
                  selectedTimeSlot?.startTime.getTime() ===
                  slot.startTime.getTime()
                    ? theme.palette.y2k.primary
                    : theme.palette.y2k.muted,
                backgroundColor:
                  selectedTimeSlot?.startTime.getTime() ===
                  slot.startTime.getTime()
                    ? theme.palette.y2k.primary
                    : 'transparent',
                color: !slot.isAvailable
                  ? theme.palette.y2k.muted
                  : selectedTimeSlot?.startTime.getTime() ===
                      slot.startTime.getTime()
                    ? 'white'
                    : theme.palette.y2k.foreground,
                transition:
                  'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out, background-color 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: `0 0 20px ${theme.palette.y2k.primary}`,
                  borderColor: theme.palette.y2k.primary,
                  backgroundColor:
                    selectedTimeSlot?.startTime.getTime() ===
                    slot.startTime.getTime()
                      ? theme.palette.y2k.primary
                      : 'rgba(248, 197, 216, 0.1)',
                },
                ...(selectedTimeSlot?.startTime.getTime() ===
                  slot.startTime.getTime() && {
                  boxShadow: `0 0 20px ${theme.palette.y2k.primary}`,
                  transform: 'translateY(-2px)',
                }),
              }}
            >
              {formatTimeSlot(slot)}
            </Button>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

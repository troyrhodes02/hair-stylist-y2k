'use client';

import { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Divider,
  InputAdornment,
  List,
  ListItem,
} from '@mui/material';
import { TimeSlotSelector } from './TimeSlotSelector';
import DepositInstructions from './DepositInstructions';
import { Service, TimeSlot } from '@/lib/types/booking';
import theme from '@/styles/theme';
import AutoAwesome from '@mui/icons-material/AutoAwesome';
import PersonOutline from '@mui/icons-material/PersonOutline';
import Phone from '@mui/icons-material/Phone';
import EmailOutlined from '@mui/icons-material/EmailOutlined';
import MessageOutlined from '@mui/icons-material/MessageOutlined';
import CalendarTodayOutlined from '@mui/icons-material/CalendarTodayOutlined';

interface BookingSectionProps {
  selectedService: string;
  serviceDuration: number;
  selectedAddOns: string[];
  services: Service[];
  total: number;
}

const BookingSection = ({
  selectedService,
  serviceDuration,
  selectedAddOns,
  services,
  total,
}: BookingSectionProps) => {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(
    null
  );
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError('Email is required');
      return false;
    }
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
      return false;
    }
    setEmailError(null);
    return true;
  };

  const validatePhone = (phone: string) => {
    // Allow formats: (123) 456-7890, 123-456-7890, 1234567890
    const phoneRegex =
      /^(\+1|1)?[-. ]?\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (!phone) {
      setPhoneError('Phone number is required');
      return false;
    }
    if (!phoneRegex.test(phone)) {
      setPhoneError('Please enter a valid phone number');
      return false;
    }
    setPhoneError(null);
    return true;
  };

  const formatPhoneNumber = (value: string) => {
    // Remove all non-numeric characters
    const numbers = value.replace(/\D/g, '');

    // Format the number as (XXX) XXX-XXXX
    if (numbers.length >= 10) {
      return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
    } else if (numbers.length > 6) {
      return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6)}`;
    } else if (numbers.length > 3) {
      return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
    } else if (numbers.length > 0) {
      return `(${numbers}`;
    }
    return numbers;
  };

  const selectedServiceObject = services.find(s => s.id === selectedService);

  // Calculate date constraints using useMemo to avoid hydration issues
  const { minDate, maxDate } = useMemo(() => {
    const today = new Date();
    const twoMonthsFromNow = new Date();
    twoMonthsFromNow.setMonth(today.getMonth() + 2);

    return {
      minDate: today.toISOString().split('T')[0],
      maxDate: twoMonthsFromNow.toISOString().split('T')[0],
    };
  }, []);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  // Removed unused handleTimeSlotSelect as we're using setSelectedTimeSlot directly

  const isFormValid = useMemo(() => {
    return (
      customerName &&
      !phoneError &&
      !emailError &&
      customerPhone &&
      customerEmail
    );
  }, [customerName, phoneError, emailError, customerPhone, customerEmail]);

  const handleCustomerInfoSubmit = () => {
    // Validate all fields
    const isPhoneValid = validatePhone(customerPhone);
    const isEmailValid = validateEmail(customerEmail);

    if (!customerName) {
      setError('Please enter your name');
      return;
    }

    if (!isPhoneValid || !isEmailValid) {
      setError('Please correct the errors in the form');
      return;
    }

    setError(null);
    setStep(3);
  };

  // Removed unused handleBookingSubmit as we're using handleCustomerInfoSubmit for form submission

  const handleDepositComplete = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          serviceId: selectedServiceObject?.name || selectedService,
          startTime: selectedTimeSlot?.startTime,
          endTime: selectedTimeSlot?.endTime,
          duration: serviceDuration,
          customerId: `${customerName}|${customerEmail}|${customerPhone}`,
          status: 'pending-payment',
          basePrice: selectedServiceObject?.price || 0,
          addOns: selectedAddOns,
          addOnPrice: selectedAddOns.length
            ? total - (selectedServiceObject?.price || 0)
            : 0,
          totalPrice: total,
          notes: specialRequests,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const queryParams = new URLSearchParams({
          bookingId: data.id,
          customerName: customerName,
          customerEmail: customerEmail,
          customerPhone: customerPhone,
          serviceName: selectedServiceObject?.name || selectedService,
          bookingDate: new Date(
            selectedTimeSlot?.startTime || ''
          ).toLocaleDateString('en-CA'), // Format as YYYY-MM-DD
          bookingTime: new Date(
            selectedTimeSlot?.startTime || ''
          ).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
            timeZone: 'America/Chicago',
          }), // Format as HH:MM (24h, Central Time)
          duration: serviceDuration.toString(),
          notes: specialRequests,
        }).toString();
        window.location.href = `/services/booking-success?${queryParams}`;
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create booking');
      }
    } catch (err) {
      console.error('Error creating booking:', err);
      setError(err instanceof Error ? err.message : 'Failed to create booking');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography
        variant='h2'
        textAlign='center'
        sx={{
          color: theme.palette.y2k.primary,
          mb: 4,
          fontSize: '2.5rem',
          fontWeight: 'bold',
        }}
      >
        Book Appointment
      </Typography>

      <Card
        sx={{
          background: 'rgba(30, 20, 25, 0.5)',
          border: `1px solid ${theme.palette.y2k.muted}`,
          borderRadius: '12px',
          color: theme.palette.y2k.foreground,
          backdropFilter: 'blur(10px)',
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        }}
      >
        <CardContent sx={{ p: 4 }}>
          {error && (
            <Typography color='error' textAlign='center' mb={2}>
              {error}
            </Typography>
          )}

          {selectedService ? (
            <>
              {/* Service Summary - Always Visible */}
              <Box>
                <Typography
                  variant='h5'
                  fontWeight='bold'
                  align='center'
                  sx={{ color: 'white', mb: 1 }}
                >
                  Service Summary
                </Typography>
                <Typography align='center' sx={{ color: '#f8c5d8', mb: 3 }}>
                  Let&apos;s make your hair dreams come true! ✨
                </Typography>
              </Box>

              <Box
                sx={{
                  bgcolor: 'rgba(228, 0, 121, 0.1)',
                  borderRadius: '8px',
                  p: 3,
                  textAlign: 'center',
                  border: `1px solid ${theme.palette.y2k.primary}`,
                  mb: 3,
                }}
              >
                <Typography variant='h6' fontWeight='semibold'>
                  {selectedServiceObject?.name}
                </Typography>
                <Typography
                  variant='h4'
                  fontWeight='bold'
                  sx={{
                    fontFamily: 'var(--font-poppins)',
                    color: 'white',
                    my: 1,
                  }}
                >
                  ${total}
                </Typography>
                {selectedAddOns.length > 0 && (
                  <Box
                    sx={{
                      borderTop: `1px solid ${theme.palette.y2k.muted}`,
                      pt: 2,
                      mt: 2,
                    }}
                  >
                    <Typography variant='body2' fontWeight='medium'>
                      Add-ons:
                    </Typography>
                    <List dense sx={{ p: 0 }}>
                      {selectedAddOns.map((addOn, index) => (
                        <ListItem
                          key={index}
                          sx={{ justifyContent: 'center', p: 0 }}
                        >
                          <Typography variant='body2' sx={{ color: '#f8c5d8' }}>
                            • {addOn}
                          </Typography>
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                )}
              </Box>

              {/* Date & Time Selection */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Typography
                  variant='h6'
                  align='center'
                  sx={{ color: '#f8c5d8' }}
                >
                  Select Your Appointment Date
                </Typography>

                <TextField
                  type='date'
                  value={selectedDate}
                  onChange={handleDateChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <CalendarTodayOutlined sx={{ color: 'white' }} />
                      </InputAdornment>
                    ),
                  }}
                  inputProps={{
                    min: minDate,
                    max: maxDate,
                  }}
                  fullWidth
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      color: 'white',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(5px)',
                      '& fieldset': { borderColor: theme.palette.y2k.muted },
                      '&:hover fieldset': {
                        borderColor: theme.palette.y2k.primary,
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: theme.palette.y2k.primary,
                        boxShadow: `0 0 10px ${theme.palette.y2k.primary}`,
                      },
                    },
                    '& input[type="date"]::-webkit-calendar-picker-indicator': {
                      filter: 'invert(1)',
                      cursor: 'pointer',
                    },
                  }}
                />

                {selectedDate && (
                  <TimeSlotSelector
                    selectedDate={selectedDate}
                    serviceDuration={serviceDuration}
                    onTimeSlotSelect={setSelectedTimeSlot}
                    selectedTimeSlot={selectedTimeSlot}
                  />
                )}

                {selectedTimeSlot && (
                  <>
                    <Divider
                      sx={{ my: 2, borderColor: theme.palette.y2k.muted }}
                    />

                    <Typography
                      variant='h6'
                      align='center'
                      sx={{ color: '#f8c5d8' }}
                    >
                      Your Information
                    </Typography>

                    <Box
                      sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
                    >
                      <TextField
                        fullWidth
                        label='Your Name'
                        value={customerName}
                        onChange={e => setCustomerName(e.target.value)}
                        required
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position='start'>
                              <PersonOutline sx={{ color: '#f8c5d8' }} />
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            color: '#f8c5d8',
                            '& fieldset': { borderColor: '#f8c5d8' },
                            '&:hover fieldset': {
                              borderColor: theme.palette.y2k.primary,
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: theme.palette.y2k.primary,
                            },
                          },
                          '& .MuiInputLabel-root': { color: '#f8c5d8' },
                        }}
                      />

                      <TextField
                        fullWidth
                        label='Phone Number'
                        value={customerPhone}
                        onChange={e => {
                          const formattedNumber = formatPhoneNumber(
                            e.target.value
                          );
                          setCustomerPhone(formattedNumber);
                          validatePhone(formattedNumber);
                        }}
                        required
                        error={!!phoneError}
                        helperText={phoneError}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position='start'>
                              <Phone
                                sx={{
                                  color: phoneError ? 'error.main' : '#f8c5d8',
                                }}
                              />
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            color: '#f8c5d8',
                            '& fieldset': {
                              borderColor: phoneError
                                ? 'error.main'
                                : '#f8c5d8',
                            },
                            '&:hover fieldset': {
                              borderColor: phoneError
                                ? 'error.main'
                                : theme.palette.y2k.primary,
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: phoneError
                                ? 'error.main'
                                : theme.palette.y2k.primary,
                            },
                          },
                          '& .MuiInputLabel-root': {
                            color: phoneError ? 'error.main' : '#f8c5d8',
                          },
                          '& .MuiFormHelperText-root': {
                            color: 'error.main',
                            marginLeft: 0,
                            marginTop: '4px',
                          },
                        }}
                      />

                      <TextField
                        fullWidth
                        label='Email Address'
                        type='email'
                        value={customerEmail}
                        onChange={e => {
                          setCustomerEmail(e.target.value);
                          validateEmail(e.target.value);
                        }}
                        required
                        error={!!emailError}
                        helperText={emailError}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position='start'>
                              <EmailOutlined
                                sx={{
                                  color: emailError ? 'error.main' : '#f8c5d8',
                                }}
                              />
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            color: '#f8c5d8',
                            '& fieldset': {
                              borderColor: emailError
                                ? 'error.main'
                                : '#f8c5d8',
                            },
                            '&:hover fieldset': {
                              borderColor: emailError
                                ? 'error.main'
                                : theme.palette.y2k.primary,
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: emailError
                                ? 'error.main'
                                : theme.palette.y2k.primary,
                            },
                          },
                          '& .MuiInputLabel-root': {
                            color: emailError ? 'error.main' : '#f8c5d8',
                          },
                          '& .MuiFormHelperText-root': {
                            color: 'error.main',
                            marginLeft: 0,
                            marginTop: '4px',
                          },
                        }}
                      />

                      <TextField
                        fullWidth
                        label='Special Requests'
                        multiline
                        rows={3}
                        value={specialRequests}
                        onChange={e => setSpecialRequests(e.target.value)}
                        placeholder='Any special requests or notes for your appointment?'
                        InputProps={{
                          startAdornment: (
                            <InputAdornment
                              position='start'
                              sx={{ alignSelf: 'flex-start', mt: 1.5 }}
                            >
                              <MessageOutlined sx={{ color: '#f8c5d8' }} />
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            color: '#f8c5d8',
                            '& fieldset': {
                              borderColor: '#f8c5d8',
                            },
                            '&:hover fieldset': {
                              borderColor: theme.palette.y2k.primary,
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: theme.palette.y2k.primary,
                            },
                          },
                          '& .MuiInputLabel-root': {
                            color: '#f8c5d8',
                          },
                        }}
                      />

                      <Button
                        variant='contained'
                        onClick={handleCustomerInfoSubmit}
                        disabled={loading}
                        sx={{
                          mt: 2,
                          py: 1.5,
                          bgcolor: isFormValid
                            ? theme.palette.y2k.primary
                            : 'rgba(255, 255, 255, 0.12)',
                          color: isFormValid
                            ? 'white'
                            : theme.palette.y2k.muted,
                          '&:hover': {
                            bgcolor: isFormValid
                              ? theme.palette.y2k.secondary
                              : 'rgba(255, 255, 255, 0.2)',
                            transform: isFormValid ? 'scale(1.02)' : 'none',
                          },
                          transition: 'all 0.2s ease-in-out',
                          boxShadow: isFormValid
                            ? `0 0 20px ${theme.palette.y2k.primary}`
                            : 'none',
                          pointerEvents: loading ? 'none' : 'auto',
                          opacity: loading ? 0.5 : 1,
                        }}
                        startIcon={
                          <AutoAwesome
                            sx={{
                              color: isFormValid
                                ? 'white'
                                : theme.palette.y2k.muted,
                            }}
                          />
                        }
                      >
                        Continue to Deposit Instructions
                      </Button>
                    </Box>
                  </>
                )}
              </Box>

              {/* Deposit Instructions Modal */}
              <DepositInstructions
                service={selectedServiceObject!}
                total={total}
                onComplete={handleDepositComplete}
                loading={loading}
                error={error}
                open={step === 3}
                onClose={() => setStep(2)}
              />
            </>
          ) : (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <AutoAwesome
                sx={{ fontSize: 64, color: theme.palette.y2k.muted, mb: 2 }}
              />
              <Typography
                variant='h5'
                fontWeight='bold'
                sx={{ mb: 1, color: 'white' }}
              >
                Select a Service
              </Typography>
              <Typography sx={{ color: '#f8c5d8' }}>
                Choose a service from the left to see pricing and booking
                options
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default BookingSection;

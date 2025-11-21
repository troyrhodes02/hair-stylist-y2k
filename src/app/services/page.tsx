'use client';
import { useState } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { AnimatedStars } from '@/app/components/AnimatedStars/AnimatedStars';
import { Navbar } from '@/app/components';
import ServicesSection from './components/ServicesSection';
import BookingSection from './components/BookingSection';
import theme from '@/styles/theme';

const ServicesPage = () => {
  const [selectedService, setSelectedService] = useState<string>('');
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  // Removed unused fixedDeposit constant

  const services = [
    {
      id: 'standard-retwist',
      name: 'Standard Retwist',
      category: 'Locs',
      price: 85,
      basePrice: 85,
      durationMinutes: 180,
      description: 'Professional loc maintenance and retwisting service',
      addOns: [
        { name: 'Two-Strand Twist', price: 10 },
        { name: 'Barrel Twist', price: 10 },
      ],
    },
    {
      id: 'wash-blowdry',
      name: 'Wash & Blow Dry',
      category: 'Healthy Hair',
      price: 50,
      basePrice: 50,
      durationMinutes: 180,
      description: 'Professional wash and blow dry service',
      addOns: [{ name: 'Trim Add-on', price: 10 }],
    },
    {
      id: 'press',
      name: 'Press',
      category: 'Healthy Hair',
      price: 70,
      basePrice: 70,
      durationMinutes: 180,
      description:
        'Professional hair pressing service for smooth, sleek styling',
      addOns: [{ name: 'Trim Add-on', price: 10 }],
    },
    {
      id: 'take-down',
      name: 'Take Down',
      category: 'Healthy Hair',
      price: 100,
      basePrice: 100,
      durationMinutes: 180,
      description: 'Professional protective style removal service',
      addOns: [],
    },
    {
      id: 'premium-takedown',
      name: 'Premium Take Down',
      category: 'Healthy Hair',
      price: 185,
      basePrice: 185,
      durationMinutes: 360,
      description:
        'Complete service including wash, blow dry, trim, treatment, and press',
      addOns: [],
    },
    {
      id: 'editorial-consultation',
      name: 'Editorial Consultation',
      category: 'Editorial Styling',
      price: 50,
      basePrice: 50,
      durationMinutes: 30,
      description:
        'Professional editorial styling consultation ($25 per 30 minutes)',
      addOns: [],
      isHourly: true,
    },
    {
      id: 'multiple-people',
      name: 'Multiple People Styling',
      category: 'Editorial Styling',
      price: 150,
      basePrice: 150,
      durationMinutes: 180,
      description:
        'Group styling sessions starting at $150 for 3 people, $25 per extra hour',
      addOns: [],
    },
  ];

  const calculateTotal = () => {
    const service = services.find(s => s.id === selectedService);
    if (!service) return 0;

    const addOnTotal = selectedAddOns.reduce((total, addOnName) => {
      const addOn = service.addOns.find(a => a.name === addOnName);
      return total + (addOn?.price || 0);
    }, 0);

    return service.basePrice + addOnTotal;
  };

  const total = calculateTotal();

  const handleAddOnToggle = (addOnName: string) => {
    setSelectedAddOns(prev => (prev.includes(addOnName) ? [] : [addOnName]));
  };

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
      <Navbar />
      <AnimatedStars />

      <Container
        maxWidth={false}
        sx={{ py: 8, position: 'relative', zIndex: 1, px: { xs: 2, md: 8 } }}
      >
        <Box textAlign='center' mb={10}>
          <Typography
            variant='h1'
            sx={{
              color: theme.palette.y2k.primary,
              fontSize: { xs: '3.5rem', sm: '5rem', md: '7rem' },
              fontWeight: 'bold',
            }}
          >
            SERVICES
          </Typography>
          <Typography
            variant='body1'
            sx={{
              color: theme.palette.y2k.foreground,
              maxWidth: 'md',
              mx: 'auto',
              fontSize: '1rem',
            }}
          >
            Professional hair services tailored to enhance your unique style
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 10,
            justifyContent: 'center',
            maxWidth: '1200px',
            mx: 'auto',
          }}
        >
          <Box sx={{ flex: { md: 5 } }}>
            <ServicesSection
              services={services}
              selectedService={selectedService}
              selectedAddOns={selectedAddOns}
              onServiceSelect={setSelectedService}
              onAddOnToggle={handleAddOnToggle}
              total={total}
            />
          </Box>
          <Box sx={{ flex: { md: 5 } }}>
            <BookingSection
              selectedService={selectedService}
              serviceDuration={
                services.find(s => s.id === selectedService)?.durationMinutes ||
                0
              }
              selectedAddOns={selectedAddOns}
              services={services}
              total={total}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default ServicesPage;

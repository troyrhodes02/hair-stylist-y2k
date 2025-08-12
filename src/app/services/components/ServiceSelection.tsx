'use client';

import { useState, useMemo } from 'react';
import { Box, Container, Typography, Grid, Button } from '@mui/material';
import { services } from '../data/services';
import { Service } from '../types';
import ServiceCard from './ServiceCard';
import CategoryFilter from './CategoryFilter';

const ServiceSelection = () => {
  const [selectedCategory, setSelectedCategory] =
    useState<string>('All Services');
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const activeServices = useMemo(
    () => services.filter(service => service.active),
    []
  );

  const categories = useMemo(() => {
    const allCategories = activeServices.map(service => service.category);
    return [...new Set(allCategories)];
  }, [activeServices]);

  const filteredServices = useMemo(() => {
    if (selectedCategory === 'All Services') {
      return activeServices;
    }
    return activeServices.filter(
      service => service.category === selectedCategory
    );
  }, [selectedCategory, activeServices]);

  const handleSelectService = (service: Service) => {
    setSelectedService(prevService =>
      prevService?.id === service.id ? null : service
    );
  };

  return (
    <Box sx={{ bgcolor: 'y2k.background', py: 8, minHeight: '100vh' }}>
      <Container maxWidth='lg'>
        <Typography
          variant='h2'
          align='center'
          gutterBottom
          sx={{
            color: 'y2k.foreground',
            fontFamily: 'Playfair Display, serif',
            fontStyle: 'italic',
          }}
        >
          Choose Your Service
        </Typography>

        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        <Grid container spacing={4} sx={{ mt: 4 }}>
          {filteredServices.map(service => (
            <Grid item key={service.id} xs={12} sm={6} md={4}>
              <ServiceCard
                service={service}
                isSelected={selectedService?.id === service.id}
                onSelect={handleSelectService}
              />
            </Grid>
          ))}
        </Grid>

        {selectedService && (
          <Box sx={{ mt: 6, textAlign: 'center' }}>
            <Button variant='contained' className='y2k-button' size='large'>
              Book Now: {selectedService.name}
            </Button>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default ServiceSelection;

'use client';

import {
  Box,
  Card,
  CardContent,
  Typography,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import theme from '@/styles/theme';
import AutoAwesome from '@mui/icons-material/AutoAwesome';
import CheckBoxOutlineBlank from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBox from '@mui/icons-material/CheckBox';

interface Service {
  id: string;
  name: string;
  category: string;
  basePrice: number;
  description: string;
  addOns: Array<{ name: string; price: number }>;
  isHourly?: boolean;
}

interface ServicesSectionProps {
  services: Service[];
  selectedService: string;
  selectedAddOns: string[];
  onServiceSelect: (id: string) => void;
  onAddOnToggle: (addOnName: string) => void;
  total: number;
}

const ServicesSection = ({
  services,
  selectedService,
  selectedAddOns,
  onServiceSelect,
  onAddOnToggle,
  total,
}: ServicesSectionProps) => {
  const categories = ['Locs', 'Healthy Hair', 'Editorial Styling'];

  return (
    <Box>
      <Typography
        variant='h2'
        textAlign='center'
        sx={{
          color: theme.palette.y2k.primary,
          mb: 4,
          fontSize: '2.5rem',
        }}
      >
        Our Services
      </Typography>

      {categories.map(category => (
        <Box key={category} mb={4}>
          <Typography
            variant='h3'
            sx={{
              color: theme.palette.y2k.primary,
              mb: 2,
              fontSize: '1.5rem',
            }}
          >
            {category}
          </Typography>
          <Box
            sx={{
              borderTop: `1px solid ${theme.palette.y2k.primary}`,
              pt: 2,
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {services
                .filter(service => service.category === category)
                .map(service => (
                  <Card
                    key={service.id}
                    onClick={() => onServiceSelect(service.id)}
                    sx={{
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: `1px solid ${theme.palette.y2k.primary}`,
                      borderRadius: '8px',
                      color: theme.palette.y2k.foreground,
                      cursor: 'pointer',
                      width: '100%',
                      maxWidth: '100%',
                      transition: 'all 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'scale(1.02)',
                        boxShadow: `0 0 15px ${theme.palette.y2k.primary}`,
                      },
                      ...(selectedService === service.id && {
                        background: 'rgba(228, 0, 121, 0.1)',
                        transform: 'scale(1.03)',
                        borderColor: theme.palette.y2k.primary,
                        borderWidth: '2px',
                        boxShadow: `0 0 20px ${theme.palette.y2k.primary}`,
                      }),
                    }}
                  >
                    <CardContent>
                      <Box
                        display='flex'
                        justifyContent='space-between'
                        alignItems='center'
                      >
                        <Box display='flex' alignItems='center' gap={1}>
                          <AutoAwesome
                            sx={{ color: theme.palette.y2k.primary }}
                          />
                          <Typography variant='h6'>{service.name}</Typography>
                        </Box>
                        <Box textAlign='right'>
                          <Typography
                            variant='h6'
                            sx={{ color: theme.palette.y2k.foreground }}
                          >
                            ${service.basePrice}
                          </Typography>
                          {selectedService === service.id &&
                            total > service.basePrice && (
                              <Typography variant='caption'>
                                Total: ${total}
                              </Typography>
                            )}
                        </Box>
                      </Box>
                      <Typography
                        variant='body2'
                        sx={{ my: 2, color: theme.palette.y2k.foreground }}
                      >
                        {service.description}
                      </Typography>
                      {service.addOns.length > 0 && (
                        <Box
                          sx={{
                            borderTop: `1px solid ${theme.palette.y2k.muted}`,
                            pt: 2,
                          }}
                        >
                          <Typography variant='body2' sx={{ mb: 1 }}>
                            Add-ons Available:
                          </Typography>
                          <Box display='flex' flexDirection='column'>
                            {service.addOns.map(addOn => (
                              <FormControlLabel
                                key={addOn.name}
                                control={
                                  <Checkbox
                                    icon={
                                      <CheckBoxOutlineBlank
                                        sx={{
                                          color: theme.palette.y2k.primary,
                                        }}
                                      />
                                    }
                                    checkedIcon={
                                      <CheckBox
                                        sx={{
                                          color: theme.palette.y2k.primary,
                                        }}
                                      />
                                    }
                                    checked={
                                      selectedService === service.id &&
                                      selectedAddOns.includes(addOn.name)
                                    }
                                    onChange={() => onAddOnToggle(addOn.name)}
                                    disabled={selectedService !== service.id}
                                  />
                                }
                                label={
                                  <Box
                                    display='flex'
                                    alignItems='center'
                                    gap={1}
                                  >
                                    <Typography
                                      variant='body2'
                                      sx={{ color: 'white' }}
                                    >
                                      {addOn.name}: +${addOn.price}
                                    </Typography>
                                  </Box>
                                }
                              />
                            ))}
                          </Box>
                        </Box>
                      )}
                    </CardContent>
                  </Card>
                ))}
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default ServicesSection;

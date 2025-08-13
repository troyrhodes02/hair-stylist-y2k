import {
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  CardMedia,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Service } from '../types';

interface ServiceCardProps {
  service: Service;
  isSelected: boolean;
  onSelect: (service: Service) => void;
}

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme.palette.y2k.card,
  border: `2px solid ${theme.palette.y2k.border}`,
  borderRadius: theme.spacing(2),
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: `0 0 20px ${theme.palette.y2k.primary}`,
  },
}));

const ServiceCard = ({ service, isSelected, onSelect }: ServiceCardProps) => {
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    let durationString = '';
    if (hours > 0) {
      durationString += `${hours} hour${hours > 1 ? 's' : ''}`;
    }
    if (remainingMinutes > 0) {
      durationString += `${hours > 0 ? ' ' : ''}${remainingMinutes} minutes`;
    }
    return durationString;
  };

  return (
    <StyledCard>
      {service.imageUrl && (
        <CardMedia
          component='img'
          height='140'
          image={service.imageUrl}
          alt={service.name}
        />
      )}
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          gutterBottom
          variant='h5'
          component='div'
          sx={{
            color: 'y2k.foreground',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {service.name}
          <Typography
            variant='body2'
            component='span'
            sx={{ color: 'white', ml: 1.5 }}
          >
            ({formatDuration(service.durationMinutes)})
          </Typography>
        </Typography>
        <Typography
          variant='body2'
          color='y2k.foreground'
          sx={{ opacity: 0.8 }}
        >
          {service.description}
        </Typography>
        <Typography variant='h6' sx={{ color: 'y2k.primary', mt: 2 }}>
          Starting at ${service.basePrice}
        </Typography>
        {service.addOns.length > 0 && (
          <Typography
            variant='caption'
            sx={{ color: 'y2k.muted', display: 'block', mt: 1 }}
          >
            Add-ons available
          </Typography>
        )}
      </CardContent>
      <CardActions sx={{ justifyContent: 'center', p: 2 }}>
        <Button
          size='large'
          variant={isSelected ? 'contained' : 'outlined'}
          onClick={() => onSelect(service)}
          sx={{
            borderColor: 'y2k.primary',
            color: isSelected ? 'white' : 'y2k.primary',
            '&:hover': {
              backgroundColor: 'y2k.primary',
              color: 'white',
            },
          }}
        >
          {isSelected ? 'Selected' : 'Select This Service'}
        </Button>
      </CardActions>
    </StyledCard>
  );
};

export default ServiceCard;

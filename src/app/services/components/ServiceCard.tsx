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
  return (
    <StyledCard>
      <CardMedia
        component='img'
        height='140'
        image={service.imageUrl}
        alt={service.name}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          gutterBottom
          variant='h5'
          component='div'
          sx={{ color: 'y2k.foreground' }}
        >
          {service.name}
        </Typography>
        <Typography
          variant='body2'
          color='y2k.foreground'
          sx={{ opacity: 0.8 }}
        >
          {service.description}
        </Typography>
        <Typography variant='h6' sx={{ color: 'y2k.primary', mt: 2 }}>
          Deposit Required: ${service.deposit}
        </Typography>
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

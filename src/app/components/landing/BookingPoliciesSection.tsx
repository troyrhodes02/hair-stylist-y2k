'use client';

import { Box, Container, Typography, keyframes } from '@mui/material';
import { styled } from '@mui/material/styles';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CloseIcon from '@mui/icons-material/Close';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const starPositions = [
  { left: '15%', top: '10%', delay: '0s', size: '20px' },
  { left: '35%', top: '85%', delay: '0.5s', size: '24px' },
  { left: '55%', top: '15%', delay: '1s', size: '22px' },
  { left: '75%', top: '75%', delay: '1.5s', size: '18px' },
  { left: '85%', top: '25%', delay: '2s', size: '26px' },
  { left: '25%', top: '65%', delay: '2.5s', size: '20px' },
  { left: '45%', top: '35%', delay: '3s', size: '24px' },
  { left: '65%', top: '90%', delay: '3.5s', size: '22px' },
  { left: '90%', top: '45%', delay: '4s', size: '20px' },
  { left: '10%', top: '55%', delay: '4.5s', size: '18px' },
];

const StyledContainer = styled(Container)(({ theme }) => ({
  position: 'relative',
  zIndex: 10,
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

const PolicyTitle = styled(Typography)(({ theme }) => ({
  fontFamily: '"Playfair Display", serif',
  fontSize: '3.5rem',
  fontStyle: 'italic',
  color: theme.palette.y2k.foreground,
  lineHeight: 1,
  marginBottom: theme.spacing(1),
  [theme.breakpoints.up('md')]: {
    fontSize: '6rem',
  },
}));

const IconCircle = styled(Box)(({ theme }) => ({
  width: 80,
  height: 80,
  borderRadius: '50%',
  border: `2px solid ${theme.palette.y2k.foreground}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginLeft: 'auto',
  marginRight: 'auto',
  marginBottom: theme.spacing(2),
  transition: 'all 0.3s ease',
  '& svg': {
    width: 32,
    height: 32,
    color: theme.palette.y2k.foreground,
    transition: 'all 0.3s ease',
  },
  '.policy-card:hover &': {
    border: `2px solid ${theme.palette.y2k.primary}`,
    boxShadow: `0 0 20px ${theme.palette.y2k.primary}40`,
    '& svg': {
      color: theme.palette.y2k.primary,
    },
  },
}));

const policies = [
  {
    icon: AccessTimeIcon,
    title: 'APPOINTMENT',
    description:
      'Please be on time to your appointment. If your going to be late communicate that with me please.',
  },
  {
    icon: AttachMoneyIcon,
    title: 'DEPOSIT',
    description:
      '$10 non- refundable deposit upon booking. Cashapp and Zelle only',
  },
  {
    icon: CloseIcon,
    title: 'CANCELLATION',
    description:
      'After 15 minutes if nothing has been communicated your appointment will be canceld.',
  },
  {
    icon: LocationOnIcon,
    title: 'TRAVELING',
    description: 'Travel Fee will be discussed upon booking.',
  },
];

export const BookingPoliciesSection = () => {
  return (
    <Box
      component='section'
      sx={{
        position: 'relative',
        overflow: 'hidden',
        py: { xs: 2, md: 4 },
      }}
    >
      {/* Animated Stars Background */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          overflow: 'hidden',
        }}
      >
        {starPositions.map((pos, i) => (
          <Box
            key={i}
            sx={{
              position: 'absolute',
              color: 'y2k.primary',
              opacity: 0.2,
              animation: `${float} 3s ease-in-out infinite`,
              animationDelay: pos.delay,
              left: pos.left,
              top: pos.top,
              fontSize: pos.size,
              zIndex: 0,
            }}
          >
            ★
          </Box>
        ))}
      </Box>

      <StyledContainer>
        {/* Section Header */}
        <Box
          sx={{
            textAlign: 'center',
            mb: { xs: 6, md: 8 }, // Increased bottom margin
            position: 'relative',
            zIndex: 1,
          }}
        >
          <Box sx={{ position: 'relative', display: 'inline-block' }}>
            <PolicyTitle variant='h2'>Booking</PolicyTitle>
            <Typography
              variant='h2'
              sx={{
                fontSize: { xs: '2.5rem', md: '4.5rem' },
                fontWeight: 'bold',
                color: 'y2k.foreground',
                textTransform: 'uppercase',
                lineHeight: 1,
              }}
            >
              POLICIES
            </Typography>
            <Box
              sx={{
                position: 'absolute',
                top: -16,
                right: -32,
                animation: `${float} 3s ease-in-out infinite`,
                color: 'white',
                fontSize: '2rem',
                zIndex: 1,
              }}
            >
              🤍
            </Box>
          </Box>
        </Box>

        {/* Policies Grid */}
        <Box
          sx={{
            position: 'relative',
            zIndex: 1,
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              lg: 'repeat(4, 1fr)',
            },
            gap: { xs: 2, md: 3 },
            maxWidth: '1400px',
            mx: 'auto',
          }}
        >
          {policies.map(policy => (
            <Box
              key={policy.title}
              className='policy-card'
              sx={{
                textAlign: 'center',
                transform: 'translateY(0)',
                transition: 'transform 0.3s ease',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
              }}
            >
              <IconCircle>
                <policy.icon />
              </IconCircle>

              <Typography
                variant='h3'
                sx={{
                  fontSize: { xs: '1.25rem', md: '1.5rem' },
                  fontWeight: 'bold',
                  color: 'y2k.foreground',
                  mb: 1,
                  textTransform: 'uppercase',
                  width: '100%',
                }}
              >
                {policy.title}
              </Typography>

              <Typography
                sx={{
                  color: 'y2k.foreground',
                  opacity: 0.9,
                  fontSize: '0.875rem',
                  lineHeight: 1.4,
                  maxWidth: '90%',
                }}
              >
                {policy.description}
              </Typography>
            </Box>
          ))}
        </Box>
      </StyledContainer>
    </Box>
  );
};

'use client';

import { Box, Button, Container, Typography, keyframes } from '@mui/material';
import { styled } from '@mui/material/styles';
import { AnimatedStars } from '..';

const glow = keyframes`
  0%, 100% { text-shadow: 0 0 10px rgba(255, 255, 255, 0.8); }
  50% { text-shadow: 0 0 20px rgba(255, 255, 255, 0.4); }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const StyledContainer = styled(Container)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  paddingTop: theme.spacing(10),
  paddingBottom: theme.spacing(10),
  position: 'relative',
}));

const CircularPhoto = styled(Box)(({ theme }) => ({
  width: 256,
  height: 256,
  borderRadius: '50%',
  backgroundColor: theme.palette.y2k.muted,
  border: `4px solid ${theme.palette.y2k.primary}`,
  boxShadow: `0 0 20px ${theme.palette.y2k.primary}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  [theme.breakpoints.up('md')]: {
    width: 320,
    height: 320,
  },
}));

const FloatingEmoji = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: -16,
  right: -16,
  width: 64,
  height: 64,
  backgroundColor: theme.palette.y2k.accent,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  animation: `${float} 3s ease-in-out infinite`,
}));

export const MeetYourStylist = () => {
  return (
    <StyledContainer maxWidth={false} disableGutters>
      <AnimatedStars />
      <Container maxWidth='lg' sx={{ position: 'relative', zIndex: 1 }}>
        <Box
          sx={{
            maxWidth: '90rem',
            mx: 'auto',
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            gap: { xs: 8, md: 12 },
            py: { xs: 8, md: 12 },
          }}
        >
          {/* Photo Side */}
          <Box
            sx={{
              flex: '1 1 45%',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Box sx={{ position: 'relative' }}>
              <CircularPhoto>
                <Typography sx={{ fontSize: '4rem' }}>💇‍♀️</Typography>
              </CircularPhoto>
              <FloatingEmoji>
                <Typography sx={{ fontSize: '2rem' }}>💫</Typography>
              </FloatingEmoji>
            </Box>
          </Box>

          {/* Text Side */}
          <Box
            sx={{
              flex: '1 1 55%',
              textAlign: { xs: 'center', md: 'left' },
            }}
          >
            {/* Meet text */}
            <Typography
              variant='h1'
              sx={{
                fontSize: { xs: '3.75rem', md: '5rem' },
                color: 'y2k.foreground',
                mb: 2,
                animation: `${glow} 3s ease-in-out infinite`,
                lineHeight: 1,
              }}
            >
              Meet
            </Typography>

            {/* YOUR STYLIST text */}
            <Typography
              variant='h2'
              sx={{
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                color: 'y2k.foreground',
                mb: 4,
                lineHeight: 1.1,
              }}
            >
              YOUR <span style={{ display: 'inline' }}>STYLIST</span>
            </Typography>

            {/* Stylist info */}
            <Box sx={{ mb: 6 }}>
              <Typography
                variant='body1'
                sx={{
                  fontSize: { xs: '1.25rem', md: '1.5rem' },
                  color: 'y2k.foreground',
                  mb: 2,
                  maxWidth: '600px',
                }}
              >
                As a passionate hair artist, my goal is to provide you with
              </Typography>
              <Typography
                variant='body1'
                sx={{
                  fontSize: { xs: '1.25rem', md: '1.5rem' },
                  color: 'y2k.primary',
                  fontWeight: 600,
                  mb: 2,
                  maxWidth: '600px',
                }}
              >
                exceptional service and swaggy results.
              </Typography>
              <Typography
                variant='body1'
                sx={{
                  fontSize: { xs: '1.125rem', md: '1.25rem' },
                  color: 'y2k.foreground',
                  maxWidth: '600px',
                }}
              >
                I can&apos;t wait to work with you and help you feel your best.
              </Typography>
            </Box>

            {/* Signature */}
            <Typography
              variant='h4'
              sx={{
                fontSize: { xs: '1.875rem', md: '2.25rem' },
                color: 'y2k.primary',
                mb: 4,
                fontStyle: 'italic',
              }}
            >
              Kelsee Chenea
            </Typography>

            {/* CTA Button */}
            <Button
              className='y2k-button'
              sx={{
                mt: 2,
              }}
            >
              Book Your Appointment
            </Button>
          </Box>
        </Box>
      </Container>
    </StyledContainer>
  );
};

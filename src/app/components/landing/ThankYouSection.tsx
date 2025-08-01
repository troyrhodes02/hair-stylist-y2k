'use client';

import { Box, Container, Typography, keyframes, styled } from '@mui/material';

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const StyledContainer = styled(Container)(({ theme }) => ({
  position: 'relative',
  zIndex: 10,
  paddingTop: theme.spacing(12),
  paddingBottom: theme.spacing(12),
  overflow: 'visible',
}));

const PhoneMockup = styled(Box)(({ theme }) => ({
  width: 280,
  height: 560,
  backgroundColor: '#2D0F1F',
  borderRadius: 40,
  border: '2px solid rgba(255, 255, 255, 0.1)',
  padding: '12px',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4)',
  animation: `${float} 4s ease-in-out infinite`,
  '&:hover': {
    transform: 'translateY(-5px) scale(1.02)',
    boxShadow: `0 0 40px ${theme.palette.y2k.primary}60`,
  },
}));

const PhoneScreen = styled(Box)(() => ({
  width: '100%',
  height: '100%',
  borderRadius: 30,
  background: 'linear-gradient(45deg, #1A0912, #2D0F1F)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    inset: 0,
    background:
      'radial-gradient(circle at 30% 30%, rgba(255, 20, 147, 0.1), transparent)',
  },
}));

const starPositions = [
  { left: '10%', top: '20%', delay: '0s', size: '16px' },
  { left: '90%', top: '10%', delay: '0.5s', size: '20px' },
  { left: '40%', top: '80%', delay: '1s', size: '24px' },
  { left: '60%', top: '95%', delay: '1.5s', size: '18px' },
  { left: '75%', top: '60%', delay: '2s', size: '22px' },
  { left: '5%', top: '85%', delay: '2.5s', size: '20px' },
];

export const ThankYouSection = () => {
  return (
    <Box
      component='section'
      sx={{
        position: 'relative',
        overflow: 'hidden',
        background: '#1A0912',
      }}
    >
      {/* Animated Stars Background */}
      {starPositions.map((pos, i) => (
        <Box
          key={i}
          sx={{
            position: 'absolute',
            color: 'y2k.accent',
            opacity: 0.2,
            animation: `${float} 4s ease-in-out infinite`,
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

      <StyledContainer maxWidth='lg'>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: 'center',
            gap: { xs: 8, md: 20 },
          }}
        >
          {/* Phone Side - Now on the left */}
          <Box
            sx={{
              flex: '1 1 50%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
              zIndex: 1,
              maxWidth: { xs: '320px', md: '100%' },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <PhoneMockup>
                <PhoneScreen>
                  <Typography sx={{ fontSize: '4rem' }}>🤳</Typography>
                </PhoneScreen>
              </PhoneMockup>
              {/* Decorative elements */}
              <Box
                sx={{
                  position: 'absolute',
                  top: -20,
                  right: '20%',
                  animation: `${float} 3s ease-in-out infinite`,
                  color: 'y2k.accent',
                  fontSize: '2rem',
                }}
              >
                ★
              </Box>
              <Box
                sx={{
                  position: 'absolute',
                  bottom: -20,
                  left: '20%',
                  animation: `${float} 3s ease-in-out infinite`,
                  animationDelay: '1.5s',
                  color: 'y2k.primary',
                  fontSize: '2rem',
                }}
              >
                🤍
              </Box>
            </Box>
          </Box>

          {/* Text Side - Now on the right */}
          <Box
            sx={{
              flex: '1 1 50%',
              textAlign: { xs: 'center', md: 'left' },
              position: 'relative',
              zIndex: 2,
              maxWidth: { xs: '100%', md: '50%' },
              px: { xs: 2, md: 0 },
            }}
          >
            <Box sx={{ position: 'relative', mb: 6 }}>
              {/* Floating hearts above title */}
              <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                {[0, 1, 2].map(i => (
                  <Typography
                    key={i}
                    sx={{
                      fontSize: '2rem',
                      animation: `${float} 3s ease-in-out infinite`,
                      animationDelay: `${i * 0.3}s`,
                    }}
                  >
                    🤍
                  </Typography>
                ))}
              </Box>

              <Typography
                variant='h1'
                sx={{
                  fontSize: { xs: '3.5rem', md: '5rem' },
                  color: 'y2k.foreground',
                  mb: 2,
                  lineHeight: 1,
                }}
              >
                THANK YOU
              </Typography>

              <Typography
                variant='h2'
                sx={{
                  fontSize: { xs: '2rem', md: '3rem' },
                  fontStyle: 'italic',
                  color: 'y2k.primary',
                  mb: 4,
                }}
              >
                for choosing us!
              </Typography>
            </Box>

            <Box>
              <Typography
                variant='h3'
                sx={{
                  fontSize: { xs: '2rem', md: '3rem' },
                  color: 'y2k.foreground',
                  mb: 2,
                }}
              >
                TAG US ON YOUR SELFIES
              </Typography>

              <Box sx={{ display: 'flex', gap: 2 }}>
                {[0, 1].map(i => (
                  <Typography
                    key={i}
                    sx={{
                      fontSize: '2rem',
                      animation: `${float} 3s ease-in-out infinite`,
                      animationDelay: `${i * 0.5 + 1}s`,
                    }}
                  >
                    🤍
                  </Typography>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>
      </StyledContainer>
    </Box>
  );
};

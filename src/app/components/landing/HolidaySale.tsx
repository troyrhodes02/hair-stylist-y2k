'use client';

import { Box, Button, Container, Typography, keyframes } from '@mui/material';
import { styled } from '@mui/material/styles';
import { AnimatedStars } from '..';
import Link from 'next/link';

const glow = keyframes`
  0%, 100% { text-shadow: 0 0 10px rgba(255, 20, 147, 0.8), 0 0 20px rgba(255, 215, 0, 0.6); }
  50% { text-shadow: 0 0 20px rgba(255, 20, 147, 1), 0 0 30px rgba(255, 215, 0, 0.8); }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const sparkle = keyframes`
  0%, 100% { opacity: 0.5; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.2); }
`;

const StyledContainer = styled(Container)(({ theme }) => ({
  position: 'relative',
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(6),
  },
}));

const SaleCard = styled(Box)(({ theme }) => ({
  backgroundColor: '#2D0F1F',
  borderRadius: theme.spacing(3),
  padding: theme.spacing(3),
  border: `2px solid ${theme.palette.y2k.primary}`,
  boxShadow: `0 0 30px ${theme.palette.y2k.primary}40`,
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      'linear-gradient(135deg, rgba(255, 20, 147, 0.1), rgba(255, 215, 0, 0.1))',
    pointerEvents: 'none',
  },
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(4),
  },
}));

const PriceBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.y2k.muted,
  borderRadius: theme.spacing(2),
  padding: theme.spacing(2),
  border: `2px solid ${theme.palette.y2k.primary}`,
  textAlign: 'center',
  position: 'relative',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: `0 0 20px ${theme.palette.y2k.primary}60`,
  },
}));

const FloatingEmoji = styled(Box)(({ theme }) => ({
  position: 'absolute',
  animation: `${float} 3s ease-in-out infinite`,
  fontSize: '2rem',
  zIndex: 1,
}));

const SparkleEmoji = styled(Box)({
  display: 'inline-block',
  animation: `${sparkle} 2s ease-in-out infinite`,
  animationDelay: 'var(--delay, 0s)',
});

export const HolidaySale = () => {
  const christmasDate = new Date('2025-12-25');
  const today = new Date();
  const daysUntilChristmas = Math.ceil(
    (christmasDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <Box component='section' id='holiday-sale'>
      <StyledContainer maxWidth='lg'>
        <AnimatedStars />
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          {/* Floating Emojis */}
          <FloatingEmoji
            sx={{
              top: { xs: -20, md: -30 },
              left: { xs: '10%', md: '5%' },
            }}
          >
            <SparkleEmoji style={{ '--delay': '0s' } as React.CSSProperties}>
              ✨
            </SparkleEmoji>
          </FloatingEmoji>
          <FloatingEmoji
            sx={{
              top: { xs: -20, md: -30 },
              right: { xs: '10%', md: '5%' },
              animationDelay: '1s',
            }}
          >
            <SparkleEmoji style={{ '--delay': '1s' } as React.CSSProperties}>
              🎄
            </SparkleEmoji>
          </FloatingEmoji>
          <FloatingEmoji
            sx={{
              bottom: { xs: -20, md: -30 },
              left: { xs: '15%', md: '10%' },
              animationDelay: '2s',
            }}
          >
            <SparkleEmoji style={{ '--delay': '2s' } as React.CSSProperties}>
              ❄️
            </SparkleEmoji>
          </FloatingEmoji>
          <FloatingEmoji
            sx={{
              bottom: { xs: -20, md: -30 },
              right: { xs: '15%', md: '10%' },
              animationDelay: '1.5s',
            }}
          >
            <SparkleEmoji style={{ '--delay': '1.5s' } as React.CSSProperties}>
              ⭐
            </SparkleEmoji>
          </FloatingEmoji>

          <SaleCard>
            {/* Header */}
            <Box
              sx={{
                textAlign: 'center',
                mb: { xs: 3, md: 4 },
                position: 'relative',
                zIndex: 1,
              }}
            >
              <Typography
                variant='h5'
                sx={{
                  color: 'y2k.foreground',
                  opacity: 0.9,
                  mb: 1.5,
                  fontSize: { xs: '0.75rem', md: '0.875rem' },
                  textTransform: 'uppercase',
                  letterSpacing: '0.2em',
                }}
              >
                Limited Time Offer
              </Typography>

              <Typography
                variant='h1'
                sx={{
                  fontSize: { xs: '2.5rem', md: '4rem' },
                  color: 'y2k.primary',
                  mb: 0.5,
                  animation: `${glow} 3s ease-in-out infinite`,
                  lineHeight: 1.1,
                  fontStyle: 'italic',
                }}
              >
                Holiday
              </Typography>

              <Typography
                variant='h2'
                sx={{
                  fontSize: { xs: '2rem', md: '3rem' },
                  color: 'y2k.secondary',
                  mb: 2,
                  lineHeight: 1.1,
                  textTransform: 'uppercase',
                  fontWeight: 700,
                }}
              >
                SALE
              </Typography>

              <Typography
                variant='body1'
                sx={{
                  color: 'y2k.foreground',
                  fontSize: { xs: '0.875rem', md: '1rem' },
                  opacity: 0.9,
                  fontStyle: 'italic',
                }}
              >
                {daysUntilChristmas > 0
                  ? `Only ${daysUntilChristmas} day${daysUntilChristmas !== 1 ? 's' : ''} left until Christmas!`
                  : 'Sale ends December 25th, 2025'}
              </Typography>
            </Box>

            {/* Pricing Cards */}
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
                gap: { xs: 2, md: 3 },
                mb: { xs: 3, md: 4 },
                position: 'relative',
                zIndex: 1,
              }}
            >
              <PriceBox>
                <Typography
                  sx={{
                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                    color: 'y2k.primary',
                    fontWeight: 700,
                    mb: 0.5,
                    lineHeight: 1,
                  }}
                >
                  $50
                </Typography>
                <Typography
                  variant='h4'
                  sx={{
                    color: 'y2k.foreground',
                    fontSize: { xs: '1.25rem', md: '1.75rem' },
                    textTransform: 'uppercase',
                  }}
                >
                  Press
                </Typography>
              </PriceBox>

              <PriceBox>
                <Typography
                  sx={{
                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                    color: 'y2k.primary',
                    fontWeight: 700,
                    mb: 0.5,
                    lineHeight: 1,
                  }}
                >
                  $60
                </Typography>
                <Typography
                  variant='h4'
                  sx={{
                    color: 'y2k.foreground',
                    fontSize: { xs: '1.25rem', md: '1.75rem' },
                    textTransform: 'uppercase',
                  }}
                >
                  Retwist
                </Typography>
              </PriceBox>
            </Box>

            {/* CTA */}
            <Box
              sx={{
                textAlign: 'center',
                position: 'relative',
                zIndex: 1,
              }}
            >
              <Typography
                variant='body1'
                sx={{
                  color: 'y2k.foreground',
                  fontSize: { xs: '0.875rem', md: '1rem' },
                  mb: 2,
                  opacity: 0.9,
                  fontStyle: 'italic',
                }}
              >
                Book now and save! Offer valid until December 25th, 2025
              </Typography>
              <Link href='/services' passHref>
                <Button
                  variant='contained'
                  className='y2k-button'
                  size='large'
                  sx={{
                    fontSize: { xs: '0.875rem', md: '1rem' },
                    px: { xs: 3, md: 5 },
                  }}
                >
                  Book Your Appointment
                </Button>
              </Link>
            </Box>
          </SaleCard>
        </Box>
      </StyledContainer>
    </Box>
  );
};

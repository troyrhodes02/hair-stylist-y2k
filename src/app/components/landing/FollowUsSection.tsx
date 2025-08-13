'use client';

import {
  Box,
  Container,
  Typography,
  keyframes,
  styled,
  Link,
} from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import { AnimatedStars } from '..';
import Image from 'next/image';

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
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
    transform: 'translateY(-5px) scale(1.03)!important',
    boxShadow: `0 0 40px ${theme.palette.y2k.primary}60`,
  },
}));

const PhoneScreen = styled(Box)(() => ({
  width: '100%',
  height: '100%',
  borderRadius: 30,
  background: 'linear-gradient(45deg, #1A0912, #2D0F1F)',
  position: 'relative',
  overflow: 'hidden',
  padding: '16px',
}));

const InstagramButton = styled(Link)(({ theme }) => ({
  background: `linear-gradient(45deg, ${theme.palette.y2k.primary}, ${theme.palette.y2k.accent})`,
  color: 'white',
  fontWeight: 'bold',
  borderRadius: '9999px',
  padding: theme.spacing(1.5, 4),
  marginTop: theme.spacing(4),
  transition: 'all 0.3s ease',
  textDecoration: 'none',
  display: 'inline-flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: `0 0 20px ${theme.palette.y2k.primary}80`,
    textDecoration: 'none',
  },
}));

export const FollowUsSection = () => {
  return (
    <Box
      component='section'
      sx={{
        position: 'relative',
        overflow: 'hidden',
        background: '#1A0912',
      }}
    >
      <AnimatedStars />
      <StyledContainer>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: 'center',
            gap: { xs: 8, md: 20 },
          }}
        >
          {/* Text Side */}
          <Box
            sx={{
              flex: '1 1 50%',
              textAlign: { xs: 'center', md: 'left' },
              maxWidth: { xs: '100%', md: '50%' },
              px: { xs: 2, md: 0 },
            }}
          >
            <Typography
              sx={{ color: 'y2k.foreground', fontSize: '1.5rem', mb: 1 }}
            >
              Stay Inspired
            </Typography>
            <Typography
              sx={{
                fontFamily: '"Playfair Display", serif',
                fontSize: { xs: '3.5rem', md: '6rem' },
                fontStyle: 'italic',
                color: 'y2k.primary',
                lineHeight: 1.1,
                mb: 2,
              }}
            >
              Follow Us
            </Typography>
            <Typography
              sx={{
                color: 'y2k.foreground',
                fontSize: { xs: '1rem', md: '1.25rem' },
                maxWidth: '450px',
                opacity: 0.8,
                mx: { xs: 'auto', md: 0 },
                mb: 4,
              }}
            >
              Get your daily dose of hair inspiration, behind-the-scenes looks,
              and special offers by following @kelc.styles on Instagram.
            </Typography>

            <InstagramButton
              href='https://www.instagram.com/kelc.styles'
              target='_blank'
              rel='noopener noreferrer'
            >
              <InstagramIcon /> @kelc.styles
            </InstagramButton>
          </Box>

          {/* Phone Side */}
          <Box
            sx={{
              flex: '1 1 50%',
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              maxWidth: { xs: '320px', md: '100%' },
            }}
          >
            {/* Show only one phone on mobile, both on desktop */}
            <Box
              sx={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <PhoneMockup
                sx={{
                  transform: { xs: 'none', md: 'rotate(-8deg)' },
                  position: 'relative',
                  zIndex: 2,
                }}
              >
                <PhoneScreen>
                  <Image
                    src='/images/instagram.png'
                    alt='Instagram profile'
                    layout='fill'
                    objectFit='cover'
                  />
                </PhoneScreen>
              </PhoneMockup>

              <PhoneMockup
                sx={{
                  display: { xs: 'none', md: 'block' },
                  transform: {
                    xs: 'none',
                    md: 'rotate(8deg) translate(-40px, 40px)',
                  },
                  position: { xs: 'static', md: 'absolute' },
                  left: 0,
                  top: 0,
                  zIndex: { xs: 2, md: 1 },
                }}
              >
                <PhoneScreen>
                  <Image
                    src='/images/selfie.jpeg'
                    alt='Customer selfie'
                    layout='fill'
                    objectFit='cover'
                  />
                </PhoneScreen>
              </PhoneMockup>
            </Box>
          </Box>
        </Box>
      </StyledContainer>
    </Box>
  );
};

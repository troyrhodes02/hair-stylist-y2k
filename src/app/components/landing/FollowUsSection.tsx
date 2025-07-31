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
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
`;

const starFloat = keyframes`
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

const starPositions = [
  { left: '10%', top: '20%', delay: '0s', size: '16px' },
  { left: '90%', top: '10%', delay: '0.5s', size: '20px' },
  { left: '40%', top: '80%', delay: '1s', size: '24px' },
  { left: '60%', top: '95%', delay: '1.5s', size: '18px' },
  { left: '75%', top: '60%', delay: '2s', size: '22px' },
  { left: '5%', top: '85%', delay: '2.5s', size: '20px' },
];

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
      {starPositions.map((pos, i) => (
        <Box
          key={i}
          sx={{
            position: 'absolute',
            color: 'y2k.accent',
            opacity: 0.2,
            animation: `${starFloat} 4s ease-in-out infinite`,
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
                  display: { xs: 'none', md: 'block' },
                  transform: 'rotate(-8deg)',
                  position: 'relative',
                  zIndex: 2,
                }}
              >
                <PhoneScreen>
                  {/* Profile Mockup */}
                  <Box sx={{ color: 'white', textAlign: 'left' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Box
                        sx={{
                          width: 50,
                          height: 50,
                          borderRadius: '50%',
                          background: 'y2k.accent',
                          mr: 2,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '1.5rem',
                        }}
                      >
                        💇‍♀️
                      </Box>
                      <Typography sx={{ fontWeight: 'bold' }}>
                        kelc.styles
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        mb: 2,
                        textAlign: 'center',
                      }}
                    >
                      <Box>
                        <Typography sx={{ fontWeight: 'bold' }}>123</Typography>
                        <Typography sx={{ fontSize: '0.8rem', opacity: 0.7 }}>
                          Posts
                        </Typography>
                      </Box>
                      <Box>
                        <Typography sx={{ fontWeight: 'bold' }}>456</Typography>
                        <Typography sx={{ fontSize: '0.8rem', opacity: 0.7 }}>
                          Followers
                        </Typography>
                      </Box>
                      <Box>
                        <Typography sx={{ fontWeight: 'bold' }}>789</Typography>
                        <Typography sx={{ fontSize: '0.8rem', opacity: 0.7 }}>
                          Following
                        </Typography>
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr 1fr',
                        gap: '4px',
                      }}
                    >
                      {[...Array(9)].map((_, i) => (
                        <Box
                          key={i}
                          sx={{
                            aspectRatio: '1',
                            background: '#FF149330',
                            borderRadius: '4px',
                          }}
                        />
                      ))}
                    </Box>
                  </Box>
                </PhoneScreen>
              </PhoneMockup>

              <PhoneMockup
                sx={{
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
                  {/* Post Mockup */}
                  <Box sx={{ color: 'white', textAlign: 'left' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Box
                        sx={{
                          width: 30,
                          height: 30,
                          borderRadius: '50%',
                          background: 'y2k.accent',
                          mr: 1,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '1rem',
                        }}
                      >
                        💇‍♀️
                      </Box>
                      <Typography
                        sx={{ fontWeight: 'bold', fontSize: '0.9rem' }}
                      >
                        kelc.styles
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        aspectRatio: '1',
                        background: '#FF149330',
                        borderRadius: '8px',
                        mb: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '5rem',
                      }}
                    >
                      ✨
                    </Box>
                    <Box sx={{ display: 'flex', gap: '12px', mb: 1 }}>
                      <FavoriteBorderIcon />
                      <ChatBubbleOutlineIcon />
                    </Box>
                    <Typography sx={{ fontSize: '0.8rem' }}>
                      <span style={{ fontWeight: 'bold' }}>kelc.styles</span>{' '}
                      Swag results 💅
                    </Typography>
                  </Box>
                </PhoneScreen>
              </PhoneMockup>
            </Box>
          </Box>
        </Box>
      </StyledContainer>
    </Box>
  );
};

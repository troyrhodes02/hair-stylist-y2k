'use client';

import { Box, Button, Container, Typography, Theme } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { styled, keyframes } from '@mui/material/styles';

// Enhanced animations
const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  33% { transform: translateY(-15px) rotate(5deg); }
  66% { transform: translateY(-25px) rotate(-5deg); }
`;

const shimmer = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: calc(200px + 100%) 0; }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.4; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.05); }
`;

const glowRotate = keyframes`
  0% { 
    text-shadow: 0 0 20px #FF1493, 0 0 30px #FF1493, 0 0 40px #FF1493;
    transform: perspective(500px) rotateY(0deg);
  }
  50% { 
    text-shadow: 0 0 25px #00FFFF, 0 0 35px #00FFFF, 0 0 45px #00FFFF;
    transform: perspective(500px) rotateY(5deg);
  }
  100% { 
    text-shadow: 0 0 20px #FF1493, 0 0 30px #FF1493, 0 0 40px #FF1493;
    transform: perspective(500px) rotateY(0deg);
  }
`;

const borderGlow = keyframes`
  0%, 100% { box-shadow: 0 0 30px #FF1493, inset 0 0 30px rgba(255, 20, 147, 0.1); }
  50% { box-shadow: 0 0 50px #00FFFF, inset 0 0 50px rgba(0, 255, 255, 0.1); }
`;

// Styled components
const SectionContainer = styled(Box)({
  position: 'relative',
  padding: '64px 0',
  background: `
    radial-gradient(ellipse at top left, rgba(255, 182, 193, 0.3) 0%, transparent 50%),
    radial-gradient(ellipse at bottom right, rgba(255, 240, 245, 0.2) 0%, transparent 50%),
    linear-gradient(to bottom, rgba(255, 182, 193, 0.4) 0%, #FFFFFF 60%)
  `,
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `
      radial-gradient(circle at 20% 30%, #FF149320 2px, transparent 2px),
      radial-gradient(circle at 80% 70%, #00FFFF20 2px, transparent 2px),
      radial-gradient(circle at 40% 80%, #FF69B415 1px, transparent 1px)
    `,
    backgroundSize: '100px 100px, 80px 80px, 60px 60px',
    animation: `${float} 20s ease-in-out infinite`,
    zIndex: 1,
  },
});

const ContentWrapper = styled(Box)({
  position: 'relative',
  zIndex: 2,
});

const ImageSection = styled(Box)(({ theme }: { theme: Theme }) => ({
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  '&::before': {
    content: '""',
    position: 'absolute',
    width: '120%',
    height: '120%',
    background: `conic-gradient(from 0deg, ${theme.palette.y2k.hotPink}, ${theme.palette.y2k.cyan}, ${theme.palette.y2k.brightPink}, ${theme.palette.y2k.turquoise}, ${theme.palette.y2k.hotPink})`,
    borderRadius: '50%',
    animation: `${pulse} 4s ease-in-out infinite`,
    filter: 'blur(20px)',
    opacity: 0.3,
    zIndex: -1,
  },
}));

const GlowingFrame = styled(Box)(({ theme }) => ({
  position: 'relative',
  padding: '8px',
  background: `linear-gradient(45deg, ${theme.palette.y2k.hotPink}, ${theme.palette.y2k.cyan}, ${theme.palette.y2k.brightPink})`,
  borderRadius: '50%',
  animation: `${borderGlow} 3s ease-in-out infinite`,
  '&::before': {
    content: '""',
    position: 'absolute',
    inset: '4px',
    background: `conic-gradient(from 180deg, ${theme.palette.y2k.hotPink}40, ${theme.palette.y2k.cyan}40, ${theme.palette.y2k.hotPink}40)`,
    borderRadius: '50%',
    animation: `${float} 6s linear infinite reverse`,
  },
}));

const StylistImage = styled('img')(({ theme }) => ({
  position: 'relative',
  zIndex: 2,
  borderRadius: '50%',
  width: '400px',
  height: '400px',
  objectFit: 'cover',
  border: `4px solid ${theme.palette.y2k.white}`,
  filter: 'contrast(1.1) saturate(1.2)',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
  },
  [theme.breakpoints.down('md')]: {
    width: '320px',
    height: '320px',
  },
  [theme.breakpoints.down('sm')]: {
    width: '280px',
    height: '280px',
  },
}));

const FloatingDecor = styled(Box, {
  shouldForwardProp: prop => prop !== 'delay',
})<{ delay?: string }>(({ delay = '0s' }) => ({
  position: 'absolute',
  fontSize: '3rem',
  animation: `${float} 4s ease-in-out infinite`,
  animationDelay: delay,
  filter: 'drop-shadow(0 0 10px rgba(255, 20, 147, 0.5))',
  zIndex: 3,
  '@media (max-width: 600px)': {
    fontSize: '2rem',
  },
}));

const TitleSection = styled(Box)(({ theme }) => ({
  position: 'relative',
  marginBottom: theme.spacing(2),
}));

const MainTitle = styled(Typography)(({ theme }) => ({
  fontSize: '4rem',
  fontWeight: 800,
  background: `linear-gradient(135deg, ${theme.palette.y2k.darkPurple} 0%, #8B008B 50%, #4B0082 100%)`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  lineHeight: 1,
  animation: `${glowRotate} 4s ease-in-out infinite`,
  textShadow: `0 0 30px ${theme.palette.y2k.hotPink}`,
  [theme.breakpoints.down('md')]: {
    fontSize: '3rem',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '2.5rem',
  },
}));

const SubTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  color: theme.palette.y2k.hotPink,
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.2em',
  marginTop: theme.spacing(1),
  textShadow: `0 0 10px ${theme.palette.y2k.hotPink}`,
}));

const StylistName = styled(Typography)(({ theme }) => ({
  fontSize: '3rem',
  fontWeight: 700,
  background: `linear-gradient(90deg, ${theme.palette.y2k.hotPink} 0%, ${theme.palette.y2k.cyan} 50%, ${theme.palette.y2k.hotPink} 100%)`,
  backgroundSize: '200% 100%',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  animation: `${shimmer} 3s ease-in-out infinite`,
  marginBottom: theme.spacing(2),
  textShadow: `0 0 20px ${theme.palette.y2k.hotPink}`,
  [theme.breakpoints.down('md')]: {
    fontSize: '2.5rem',
  },
}));

const BioText = styled(Typography)(({ theme }) => ({
  fontSize: '1.25rem',
  color: '#FFFFFF',
  lineHeight: 1.6,
  marginBottom: theme.spacing(3),
  background: `linear-gradient(135deg, rgba(255, 20, 147, 0.8), rgba(0, 255, 255, 0.6))`,
  padding: theme.spacing(3),
  borderRadius: '20px',
  border: `2px solid ${theme.palette.y2k.borderPink}`,
  boxShadow: `0 10px 30px rgba(255, 20, 147, 0.2)`,
  position: 'relative',
  backdropFilter: 'blur(10px)',
  fontWeight: 500,
  textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '-2px',
    left: '-2px',
    right: '-2px',
    bottom: '-2px',
    background: `linear-gradient(45deg, ${theme.palette.y2k.hotPink}, ${theme.palette.y2k.cyan})`,
    borderRadius: '22px',
    zIndex: -1,
    animation: `${borderGlow} 4s ease-in-out infinite`,
  },
}));

const ActionButton = styled(Button)(({ theme }: { theme: Theme }) => ({
  fontSize: '1.25rem',
  fontWeight: 700,
  padding: '16px 40px',
  borderRadius: '50px',
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  background: `linear-gradient(45deg, ${theme.palette.y2k.hotPink} 0%, ${theme.palette.y2k.cyan} 100%)`,
  border: `3px solid transparent`,
  backgroundClip: 'padding-box',
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background:
      'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
    animation: `${shimmer} 2s ease-in-out infinite`,
  },
  '&:hover': {
    transform: 'translateY(-3px) scale(1.05)',
    boxShadow: `0 15px 40px rgba(255, 20, 147, 0.4)`,
  },
}));

export default function MeetStylist() {
  return (
    <SectionContainer>
      <ContentWrapper>
        <Container maxWidth='lg'>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', lg: 'row' },
              alignItems: 'center',
              gap: { xs: 4, lg: 6 },
              position: 'relative',
            }}
          >
            {/* Floating Decorative Elements */}
            <FloatingDecor delay='0s' sx={{ top: '10%', left: '5%' }}>
              ✨
            </FloatingDecor>
            <FloatingDecor delay='1s' sx={{ top: '20%', right: '10%' }}>
              💫
            </FloatingDecor>
            <FloatingDecor delay='2s' sx={{ bottom: '15%', left: '8%' }}>
              🌟
            </FloatingDecor>
            <FloatingDecor delay='1.5s' sx={{ bottom: '25%', right: '5%' }}>
              💖
            </FloatingDecor>

            {/* Enhanced Image Section */}
            <Box sx={{ flex: { lg: 1 } }}>
              <ImageSection>
                <GlowingFrame>
                  <StylistImage
                    src='/images/meet-kelsee.jpeg'
                    alt='Kelsee Chenea - Your Stylist'
                  />
                </GlowingFrame>

                {/* Floating Emojis around image */}
                <FloatingDecor
                  delay='0.5s'
                  sx={{ top: '-20px', right: '-20px' }}
                >
                  💅
                </FloatingDecor>
                <FloatingDecor
                  delay='2.5s'
                  sx={{ bottom: '-20px', left: '-20px' }}
                >
                  💇‍♀️
                </FloatingDecor>
              </ImageSection>
            </Box>

            {/* Enhanced Content Section */}
            <Box
              sx={{
                flex: { lg: 1 },
                textAlign: { xs: 'center', lg: 'left' },
                position: 'relative',
              }}
            >
              <TitleSection>
                <MainTitle>
                  Meet
                  <br />
                  Your Stylist
                </MainTitle>
                <SubTitle>✨ Hair Transformation Queen ✨</SubTitle>
              </TitleSection>

              <StylistName>Kelsee Chenea</StylistName>

              <BioText>
                Hey gorgeous! 💕 I&apos;m Kelsee, your hair transformation
                queen! With over 5 years of experience creating swaggy styles
                that make heads turn, I&apos;m here to bring your hair dreams to
                life. From protective braids to bold colors, I got you covered!
                ✨
              </BioText>

              <ActionButton
                variant='contained'
                size='large'
                startIcon={<AutoAwesomeIcon />}
                endIcon={<FavoriteIcon />}
              >
                Work With Me
              </ActionButton>
            </Box>
          </Box>
        </Container>
      </ContentWrapper>
    </SectionContainer>
  );
}

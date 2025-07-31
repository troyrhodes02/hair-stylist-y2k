'use client';

import { Box, Container, Typography, keyframes } from '@mui/material';
import { styled, Theme } from '@mui/material/styles';
import { AnimatedStars } from '..';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const StyledContainer = styled(Container)(({ theme }) => ({
  position: 'relative',
  zIndex: 10,
  paddingTop: theme.spacing(10),
  paddingBottom: theme.spacing(10),
}));

const PortfolioTitle = styled(Typography)(({ theme }) => ({
  fontSize: '4rem',
  fontWeight: 'bold',
  background: `linear-gradient(to right, ${theme.palette.y2k.primary}, ${theme.palette.y2k.secondary}, ${theme.palette.y2k.accent})`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  position: 'relative',
  zIndex: 10,
  [theme.breakpoints.up('md')]: {
    fontSize: '5rem',
  },
}));

const TitleShadow = styled(Typography)(({ theme }) => ({
  position: 'absolute',
  inset: 0,
  fontSize: 'inherit',
  fontWeight: 'bold',
  color: `${theme.palette.y2k.primary}10`,
  transform: 'translate(4px, 4px)',
  zIndex: -1,
}));

const PortfolioGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: theme.spacing(2),
  maxWidth: '1400px',
  margin: '0 auto',
  [theme.breakpoints.up('sm')]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: theme.spacing(3),
  },
  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: 'repeat(3, 1fr)',
  },
  [theme.breakpoints.up('lg')]: {
    gridTemplateColumns: 'repeat(4, 1fr)',
  },
}));

const PortfolioCard = styled(Box)(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  borderRadius: theme.spacing(2),
  border: `1px solid ${theme.palette.y2k.border}30`,
  background: `${theme.palette.y2k.card}20`,
  backdropFilter: 'blur(8px)',
  transition: 'all 0.5s ease',
  cursor: 'pointer',
  '&:hover': {
    transform: 'scale(1.05) rotate(1deg)',
    borderColor: `${theme.palette.y2k.primary}70`,
  },
}));

const CategoryBadge = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(2),
  left: theme.spacing(2),
  background: `${theme.palette.y2k.background}80`,
  backdropFilter: 'blur(4px)',
  color: theme.palette.y2k.primary,
  padding: theme.spacing(0.5, 1.5),
  borderRadius: '9999px',
  border: `1px solid ${theme.palette.y2k.primary}30`,
  fontSize: '0.75rem',
  fontWeight: 600,
  transform: 'rotate(-3deg)',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'rotate(0)',
  },
}));

const portfolioImages = [
  {
    id: 1,
    emoji: '💇‍♀️',
    alt: 'Blonde highlights styling',
    category: 'Color',
    height: 320,
  },
  {
    id: 2,
    emoji: '💁‍♀️',
    alt: 'Curly hair styling',
    category: 'Texture',
    height: 256,
  },
  {
    id: 3,
    emoji: '🎨',
    alt: 'Hair color transformation',
    category: 'Color',
    height: 288,
  },
  {
    id: 4,
    emoji: '👰‍♀️',
    alt: 'Wedding hair styling',
    category: 'Special Event',
    height: 320,
  },
  {
    id: 5,
    emoji: '✨',
    alt: 'Braided hairstyle',
    category: 'Style',
    height: 256,
  },
  {
    id: 6,
    emoji: '💫',
    alt: 'Short hair cut styling',
    category: 'Cut',
    height: 288,
  },
  {
    id: 7,
    emoji: '💄',
    alt: 'Hair extensions styling',
    category: 'Extensions',
    height: 320,
  },
  {
    id: 8,
    emoji: '🌟',
    alt: 'Natural hair styling',
    category: 'Natural',
    height: 256,
  },
];

export const PortfolioSection = () => {
  return (
    <Box
      component='section'
      sx={{
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <AnimatedStars />
      <StyledContainer>
        {/* Section Header */}
        <Box sx={{ textAlign: 'center', mb: 10 }}>
          <Box sx={{ position: 'relative', display: 'inline-block', mb: 3 }}>
            <PortfolioTitle variant='h1'>
              PORTFOLIO
              <TitleShadow>PORTFOLIO</TitleShadow>
            </PortfolioTitle>
          </Box>
          <Typography
            sx={{
              color: 'y2k.foreground',
              fontSize: { xs: '1.25rem', md: '1.5rem' },
              maxWidth: '800px',
              mx: 'auto',
              opacity: 0.8,
            }}
          >
            ✨ Discover the magic of transformation through our creative
            artistry ✨
          </Typography>
        </Box>

        {/* Portfolio Grid */}
        <PortfolioGrid>
          {portfolioImages.map((image, index) => (
            <PortfolioCard
              key={image.id}
              sx={{
                height: { xs: 180, sm: 220, md: image.height },
                animation: `${fadeIn} 0.6s ease-out forwards`,
                animationDelay: `${index * 0.1}s`,
                opacity: 0,
              }}
            >
              <CategoryBadge>{image.category}</CategoryBadge>

              <Box
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  p: 3,
                }}
              >
                <Typography
                  sx={{
                    fontSize: '3rem',
                    mb: 1,
                    transition: 'transform 0.7s ease',
                    '&:hover': {
                      transform: 'scale(1.25) rotate(12deg)',
                    },
                  }}
                >
                  {image.emoji}
                </Typography>

                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    p: 3,
                    background:
                      'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
                    transform: 'translateY(100%)',
                    transition: 'transform 0.5s ease',
                    '.MuiBox-root:hover > &': {
                      transform: 'translateY(0)',
                    },
                  }}
                >
                  <Typography
                    sx={{
                      color: 'y2k.foreground',
                      fontWeight: 600,
                      textAlign: 'center',
                      fontSize: '0.75rem',
                      mb: 0.5,
                    }}
                  >
                    {image.alt}
                  </Typography>
                  <Box
                    sx={{
                      width: '3rem',
                      height: '2px',
                      mx: 'auto',
                      background: (theme: Theme) =>
                        `linear-gradient(to right, ${theme.palette.y2k.primary}, ${theme.palette.y2k.secondary})`,
                      borderRadius: '9999px',
                    }}
                  />
                </Box>
              </Box>
            </PortfolioCard>
          ))}
        </PortfolioGrid>
      </StyledContainer>
    </Box>
  );
};

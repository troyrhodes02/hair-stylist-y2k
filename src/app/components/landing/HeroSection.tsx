'use client';

import { Box, Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';

const PolaroidCard = styled(Box)(({ theme }) => ({
  backgroundColor: '#2D0F1F',
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: theme.spacing(2),
    border: '1px solid rgba(255, 255, 255, 0.1)',
    pointerEvents: 'none',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    inset: '-2px',
    borderRadius: theme.spacing(2),
    background:
      'linear-gradient(to bottom right, rgba(255, 255, 255, 0.1), transparent)',
    pointerEvents: 'none',
    zIndex: -1,
  },
  '&:hover': {
    transform: 'translateY(-10px)',
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4)',
  },
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(3),
    '&:hover': {
      transform: 'scale(1.02)',
    },
  },
}));

const ImageFrame = styled(Box)(({ theme }) => ({
  aspectRatio: '1',
  backgroundColor: theme.palette.y2k.background,
  borderRadius: theme.spacing(1),
  marginBottom: theme.spacing(1.5),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: '1px solid rgba(255, 255, 255, 0.05)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    inset: 0,
    background:
      'linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.05), transparent)',
    pointerEvents: 'none',
  },
}));

const MobileCardContainer = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    position: 'relative',
    minHeight: '600px',
    width: '100%',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: theme.spacing(2, 0),
    marginBottom: theme.spacing(4),
  },
}));

interface CardData {
  id: number;
  emoji: string;
  text: string;
  defaultRotation: number;
  defaultTop: string;
}

const cards: CardData[] = [
  {
    id: 1,
    emoji: '💇‍♀️',
    text: 'Professional styling ✨',
    defaultRotation: -5,
    defaultTop: '5%',
  },
  {
    id: 2,
    emoji: '✨',
    text: 'Swag results 💅',
    defaultRotation: 3,
    defaultTop: '35%',
  },
  {
    id: 3,
    emoji: '💄',
    text: 'Your best look 🔥',
    defaultRotation: -2,
    defaultTop: '65%',
  },
];

const MobileCard = styled(Box)(({ theme }) => ({
  width: '70%', // Reduced from 85%
  maxWidth: '240px', // Reduced from 280px
  position: 'absolute',
  left: '50%',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  cursor: 'pointer',
  backgroundColor: '#2D0F1F',
  padding: theme.spacing(2.5),
  borderRadius: theme.spacing(2),
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: theme.spacing(2),
    border: '1px solid rgba(255, 255, 255, 0.1)',
    pointerEvents: 'none',
  },
}));

export const HeroSection = () => {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const handleCardClick = (cardId: number) => {
    setActiveCard(activeCard === cardId ? null : cardId);
  };

  const getCardStyle = (card: CardData) => {
    const isActive = activeCard === card.id;
    const baseTransform = 'translateX(-50%)';

    if (isActive) {
      return {
        transform: `${baseTransform} rotate(0deg)`,
        top: '30%',
        zIndex: 10,
        '&:hover': {
          transform: `${baseTransform} scale(1.05) rotate(0deg)`,
        },
      };
    }

    if (activeCard === null) {
      return {
        transform: `${baseTransform} rotate(${card.defaultRotation}deg)`,
        top: card.id === 1 ? '10%' : card.id === 2 ? '35%' : '60%',
        zIndex: 3 - card.id,
        '&:hover': {
          transform: `${baseTransform} scale(1.02) rotate(${card.defaultRotation}deg)`,
        },
      };
    }

    // When another card is active, shift this card
    return {
      transform: `${baseTransform} rotate(${card.defaultRotation}deg)`,
      top: card.id < activeCard ? '10%' : '50%',
      zIndex: 1,
      opacity: 0.7,
      '&:hover': {
        transform: `${baseTransform} scale(1.02) rotate(${card.defaultRotation}deg)`,
      },
    };
  };

  return (
    <Box
      component='section'
      sx={{
        py: { xs: 4, md: 10 },
        position: 'relative',
        overflow: 'visible',
      }}
    >
      <Container maxWidth='lg' sx={{ position: 'relative', zIndex: 2 }}>
        {/* Title Section */}
        <Box
          sx={{
            textAlign: 'center',
            mb: { xs: 2, md: 8 },
            px: { xs: 2, md: 0 },
          }}
        >
          <Typography
            variant='h2'
            sx={{
              fontSize: { xs: '2rem', md: '3.75rem' },
              fontWeight: 'bold',
              color: 'y2k.foreground',
              mb: { xs: 1, md: 2 },
            }}
          >
            WELCOME TO OUR
          </Typography>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: { xs: 1, md: 2 },
              mb: { xs: 2, md: 2 },
              flexWrap: 'wrap',
            }}
          >
            <Typography
              variant='h3'
              sx={{ fontSize: { xs: '1.5rem', md: '2rem' } }}
            >
              🤍
            </Typography>
            <Typography
              variant='h3'
              sx={{
                fontSize: { xs: '1.5rem', md: '3rem' },
                fontWeight: 'bold',
                color: 'y2k.primary',
              }}
            >
              SWAG SITE
            </Typography>
            <Typography
              variant='h3'
              sx={{ fontSize: { xs: '1.5rem', md: '2rem' } }}
            >
              🤍
            </Typography>
          </Box>

          <Box sx={{ mb: { xs: 2, md: 4 } }}>
            <Typography
              variant='h1'
              sx={{
                fontSize: { xs: '3rem', md: '6rem' },
                fontWeight: 'bold',
                color: 'y2k.foreground',
                lineHeight: 1.1,
              }}
            >
              KEL.C.
            </Typography>
            <Typography
              sx={{
                fontFamily: '"Playfair Display", serif',
                fontStyle: 'italic',
                fontSize: { xs: '1.75rem', md: '3.75rem' },
                color: 'y2k.secondary',
                mt: 1,
              }}
            >
              Styles
            </Typography>
          </Box>
        </Box>

        {/* Mobile Cards */}
        <MobileCardContainer sx={{ display: { md: 'none' } }}>
          {cards.map(card => (
            <MobileCard
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              sx={getCardStyle(card)}
            >
              <ImageFrame>
                <Typography
                  sx={{
                    fontSize: '2.5rem',
                    transform: 'scale(0.9)',
                  }}
                >
                  {card.emoji}
                </Typography>
              </ImageFrame>
              <Typography
                sx={{
                  textAlign: 'center',
                  color: 'y2k.foreground',
                  fontFamily: '"Playfair Display", serif',
                  fontStyle: 'italic',
                  fontSize: '0.875rem',
                  opacity: 0.9,
                }}
              >
                {card.text}
              </Typography>
            </MobileCard>
          ))}
        </MobileCardContainer>

        {/* Desktop Cards */}
        <Box
          sx={{
            display: { xs: 'none', md: 'grid' },
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 4,
            maxWidth: '1152px',
            mx: 'auto',
          }}
        >
          {/* Desktop Cards */}
          <PolaroidCard sx={{ transform: 'rotate(-3deg)' }}>
            <ImageFrame>
              <Typography sx={{ fontSize: '3rem' }}>💇‍♀️</Typography>
            </ImageFrame>
            <Typography
              sx={{
                textAlign: 'center',
                color: 'y2k.foreground',
                fontFamily: '"Playfair Display", serif',
                fontStyle: 'italic',
                fontSize: '1.25rem',
              }}
            >
              Professional styling ✨
            </Typography>
          </PolaroidCard>

          <PolaroidCard>
            <ImageFrame>
              <Typography sx={{ fontSize: '3rem' }}>✨</Typography>
            </ImageFrame>
            <Typography
              sx={{
                textAlign: 'center',
                color: 'y2k.foreground',
                fontFamily: '"Playfair Display", serif',
                fontStyle: 'italic',
                fontSize: '1.25rem',
              }}
            >
              Swag results 💅
            </Typography>
          </PolaroidCard>

          <PolaroidCard sx={{ transform: 'rotate(3deg)' }}>
            <ImageFrame>
              <Typography sx={{ fontSize: '3rem' }}>💄</Typography>
            </ImageFrame>
            <Typography
              sx={{
                textAlign: 'center',
                color: 'y2k.foreground',
                fontFamily: '"Playfair Display", serif',
                fontStyle: 'italic',
                fontSize: '1.25rem',
              }}
            >
              Your best look 🔥
            </Typography>
          </PolaroidCard>
        </Box>
      </Container>
    </Box>
  );
};

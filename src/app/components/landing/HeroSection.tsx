'use client';

import { Box, Container, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { AnimatedStars } from '..';
import Link from 'next/link';
import Image from 'next/image';

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
  image: string;
  defaultRotation: number;
  defaultTop: string;
}

const cards: CardData[] = [
  {
    id: 1,
    emoji: '💇‍♀️',
    text: 'Professional styling ✨',
    image: '/images/kelc1.jpeg',
    defaultRotation: -5,
    defaultTop: '5%',
  },
  {
    id: 2,
    emoji: '✨',
    text: 'Swag results 💅',
    image: '/images/kelc2.jpeg',
    defaultRotation: 3,
    defaultTop: '35%',
  },
  {
    id: 3,
    emoji: '💄',
    text: 'Your best look 🔥',
    image: '/images/kelc3.jpeg',
    defaultRotation: -2,
    defaultTop: '65%',
  },
];

const MobileCard = styled(Box)(({ theme }) => ({
  width: '70%',
  maxWidth: '240px',
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
      <AnimatedStars />
      <Container maxWidth='lg' sx={{ position: 'relative', zIndex: 2 }}>
        {/* Title Section */}
        <Box
          sx={{
            textAlign: 'center',
            mb: { xs: 8, md: 12 },
            position: 'relative',
            px: 2,
          }}
        >
          <Typography
            variant='h5'
            sx={{
              color: 'y2k.foreground',
              opacity: 0.8,
              mb: 2,
            }}
          >
            Welcome to the Swag Site
          </Typography>

          <Typography
            variant='h1'
            sx={{
              color: 'y2k.primary',
              fontSize: 'clamp(4rem, 12vw, 8rem)',
              lineHeight: 1.1,
              position: 'relative',
              display: 'inline-block',
              '& .style-text': {
                fontStyle: 'italic',
                color: 'y2k.secondary',
                display: 'block',
                fontSize: '0.6em',
                marginTop: '-0.2em',
              },
            }}
          >
            Kel.C.
            <span className='style-text'>Styles</span>
          </Typography>

          <Typography
            variant='body1'
            sx={{
              color: 'y2k.foreground',
              maxWidth: '600px',
              mx: 'auto',
              mt: 4,
              fontSize: '1.1rem',
              opacity: 0.9,
              fontStyle: 'italic',
            }}
          >
            Your one-stop destination for professional styling and swag results!
          </Typography>

          <Box sx={{ mt: 6 }}>
            <Link href='/services' passHref>
              <Button variant='contained' className='y2k-button' size='large'>
                Book Appointment
              </Button>
            </Link>
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
                <Image
                  src={card.image}
                  alt={card.text}
                  layout='fill'
                  objectFit='cover'
                  objectPosition={card.id === 1 ? 'center 10%' : 'center'}
                />
              </ImageFrame>
              <Typography
                variant='h6'
                sx={{
                  textAlign: 'center',
                  color: 'y2k.foreground',
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
              <Image
                src='/images/kelc1.jpeg'
                alt='Styling example 1'
                layout='fill'
                objectFit='cover'
                objectPosition='center 10%'
              />
            </ImageFrame>
            <Typography
              variant='h6'
              sx={{
                textAlign: 'center',
                color: 'y2k.foreground',
                fontStyle: 'italic',
                fontSize: '1.25rem',
              }}
            >
              Professional styling ✨
            </Typography>
          </PolaroidCard>

          <PolaroidCard>
            <ImageFrame>
              <Image
                src='/images/kelc2.jpeg'
                alt='Styling example 2'
                layout='fill'
                objectFit='cover'
              />
            </ImageFrame>
            <Typography
              variant='h6'
              sx={{
                textAlign: 'center',
                color: 'y2k.foreground',
                fontStyle: 'italic',
                fontSize: '1.25rem',
              }}
            >
              Swag results 💅
            </Typography>
          </PolaroidCard>

          <PolaroidCard sx={{ transform: 'rotate(3deg)' }}>
            <ImageFrame>
              <Image
                src='/images/kelc3.jpeg'
                alt='Styling example 3'
                layout='fill'
                objectFit='cover'
              />
            </ImageFrame>
            <Typography
              variant='h6'
              sx={{
                textAlign: 'center',
                color: 'y2k.foreground',
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

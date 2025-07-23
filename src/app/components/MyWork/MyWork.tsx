'use client';

import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
} from '@mui/material';
import { styled } from '@mui/system';
import Link from 'next/link';

// Styled components
const GradientHeader = styled(Box)(({ theme }) => ({
  display: 'inline-block',
  transform: 'rotate(-2deg)',
  background: 'linear-gradient(45deg, #FF1493, #00BFFF)',
  padding: theme.spacing(3),
  borderRadius: '0px',
  border: '4px solid #FF1493',
  boxShadow: '0 0 20px rgba(255, 20, 147, 0.5)',
}));

const SubHeader = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(3),
  transform: 'rotate(1deg)',
  background: '#fff',
  border: '4px solid #FF1493',
  padding: theme.spacing(2),
  display: 'inline-block',
  boxShadow: '0 0 15px rgba(255, 20, 147, 0.3)',
  borderRadius: '0px',
}));

interface StyledCardProps {
  index: number;
}

const StyledCard = styled(Card)<StyledCardProps>(({ index }) => ({
  border: '4px solid #FF1493',
  borderRadius: '0px',
  boxShadow: '0 0 15px rgba(255, 20, 147, 0.3)',
  transform: `rotate(${index % 3 === 0 ? '1deg' : index % 3 === 1 ? '-1deg' : '0deg'})`,
  transition: 'all 0.3s ease',
  padding: '12px',
  background: 'white',
  '&:hover': {
    boxShadow: '0 0 25px rgba(255, 20, 147, 0.6)',
    transform: 'scale(1.02)',
  },
}));

const StyledCardMedia = styled(Box)({
  border: '4px solid #FF1493',
  borderRadius: '0px',
  overflow: 'hidden',
  position: 'relative',
  height: '250px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#FFB6C1',
});

interface PortfolioItem {
  id: number;
  title: string;
  category: string;
}

const portfolioItems: PortfolioItem[] = [
  { id: 1, title: 'Protective Style Braids', category: 'braids' },
  { id: 2, title: 'Colorful Highlights', category: 'color' },
  { id: 3, title: 'Intricate Updo', category: 'braids' },
  { id: 4, title: 'Natural Curls', category: 'natural' },
  { id: 5, title: 'Creative Locs', category: 'locs' },
  { id: 6, title: 'Pink Paradise', category: 'color' },
];

const MyWork = () => {
  return (
    <Box
      sx={{
        py: 8,
        background: 'linear-gradient(to bottom, white 80%, #FFE6F3)',
        position: 'relative',
      }}
    >
      {/* Decorative elements */}
      <Box sx={{ position: 'absolute', top: 64, left: 80, fontSize: '2rem' }}>
        ⭐
      </Box>
      <Box
        sx={{ position: 'absolute', top: 160, right: 64, fontSize: '2.5rem' }}
      >
        ✨
      </Box>
      <Box
        sx={{ position: 'absolute', bottom: 128, left: 40, fontSize: '2rem' }}
      >
        💎
      </Box>

      <Container maxWidth='lg'>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <GradientHeader>
            <Typography
              variant='h2'
              sx={{
                color: 'white',
                fontFamily: '"Comic Sans MS", cursive',
                fontSize: { xs: '2.5rem', md: '3.5rem' },
              }}
            >
              ✨ MY WORK ✨
            </Typography>
          </GradientHeader>

          <SubHeader>
            <Typography
              variant='h6'
              sx={{
                color: '#FF1493',
                fontFamily: '"Comic Sans MS", cursive',
              }}
            >
              Check out these swaggy transformations! 💅
            </Typography>
          </SubHeader>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              md: '1fr 1fr',
              lg: '1fr 1fr 1fr',
            },
            gap: 4,
            maxWidth: '1200px',
            mx: 'auto',
          }}
        >
          {portfolioItems.map((item, index) => (
            <StyledCard key={item.id} index={index}>
              <StyledCardMedia>
                <Typography variant='h1'>🎀</Typography>
              </StyledCardMedia>
              <CardContent
                sx={{
                  textAlign: 'center',
                  p: 2,
                  '&:last-child': { pb: 2 },
                }}
              >
                <Typography
                  variant='h6'
                  sx={{
                    fontFamily: '"Comic Sans MS", cursive',
                    color: '#FF1493',
                    textTransform: 'uppercase',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                  }}
                >
                  {item.title}
                </Typography>
              </CardContent>
            </StyledCard>
          ))}
        </Box>

        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Button
            component={Link}
            href='https://www.instagram.com'
            target='_blank'
            rel='noopener noreferrer'
            variant='contained'
            sx={{
              bgcolor: '#FF1493',
              color: 'white',
              fontFamily: '"Comic Sans MS", cursive',
              fontSize: '1.2rem',
              padding: '12px 32px',
              borderRadius: '0px',
              border: '3px solid #FF69B4',
              boxShadow: '0 0 15px rgba(255, 20, 147, 0.3)',
              '&:hover': {
                bgcolor: '#FF69B4',
                boxShadow: '0 0 25px rgba(255, 20, 147, 0.6)',
              },
            }}
          >
            View More on Instagram ✨
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default MyWork;

'use client';

import { Box, Container, Typography, keyframes } from '@mui/material';
import { styled } from '@mui/material/styles';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarIcon from '@mui/icons-material/Star';

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const StyledContainer = styled(Container)(({ theme }) => ({
  position: 'relative',
  zIndex: 10,
  paddingTop: theme.spacing(10),
  paddingBottom: theme.spacing(10),
}));

const ReviewCard = styled(Box)(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(6),
  borderRadius: theme.spacing(2),
  background: '#2D0F1F',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
  transition: 'all 0.3s ease',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(2),
  transform: 'translateY(0)',
  '&:hover': {
    transform: 'translateY(-10px)',
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.5)',
  },
}));

const ProfileCircle = styled(Box)(({ theme }) => ({
  width: 80,
  height: 80,
  borderRadius: '50%',
  border: `2px solid ${theme.palette.y2k.primary}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: '#2D1F33',
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    inset: -4,
    borderRadius: '50%',
    border: `2px solid ${theme.palette.y2k.primary}`,
    opacity: 0.5,
  },
}));

const reviews = [
  {
    name: 'Sekai',
    text: 'Nice job, my style lasted me 3 weeks',
    emoji: '👩‍💼',
  },
  {
    name: 'Alyssa',
    text: 'I love my style, its exactly what i wanted.',
    emoji: '👩‍🎓',
    showHeart: true,
  },
  {
    name: 'Airica',
    text: 'My hair looks so good and shiny when i leave the chair. Ill definetly be back',
    emoji: '👩‍💻',
  },
];

const starPositions = [
  { left: '10%', top: '20%', delay: '0s', size: '16px' },
  { left: '25%', top: '15%', delay: '0.5s', size: '20px' },
  { left: '40%', top: '80%', delay: '1s', size: '24px' },
  { left: '60%', top: '25%', delay: '1.5s', size: '18px' },
  { left: '75%', top: '60%', delay: '2s', size: '22px' },
  { left: '85%', top: '30%', delay: '2.5s', size: '20px' },
  { left: '15%', top: '70%', delay: '3s', size: '16px' },
  { left: '45%', top: '40%', delay: '3.5s', size: '24px' },
  { left: '70%', top: '85%', delay: '4s', size: '18px' },
  { left: '90%', top: '10%', delay: '4.5s', size: '20px' },
  { left: '30%', top: '90%', delay: '5s', size: '22px' },
  { left: '50%', top: '5%', delay: '5.5s', size: '16px' },
];

export const ReviewsSection = () => {
  return (
    <Box
      component='section'
      sx={{
        position: 'relative',
        overflow: 'hidden',
        py: { xs: 8, md: 12 },
      }}
    >
      {/* Animated Stars Background */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          overflow: 'hidden',
        }}
      >
        {starPositions.map((pos, i) => (
          <Box
            key={i}
            sx={{
              position: 'absolute',
              color: 'y2k.accent',
              opacity: 0.3,
              animation: `${float} 3s ease-in-out infinite`,
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
      </Box>

      <StyledContainer>
        {/* Section Header */}
        <Box
          sx={{
            textAlign: 'center',
            mb: { xs: 6, md: 10 },
            position: 'relative',
            zIndex: 1,
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: -20,
              left: '25%',
              animation: `${float} 3s ease-in-out infinite`,
            }}
          >
            <FavoriteIcon sx={{ color: 'white', fontSize: '2rem' }} />
          </Box>
          <Typography
            variant='h2'
            sx={{
              fontSize: { xs: '4rem', md: '5rem' },
              color: 'y2k.foreground',
              position: 'relative',
              zIndex: 10,
              fontStyle: 'italic',
            }}
          >
            Customer Reviews
          </Typography>
          <Box
            sx={{
              position: 'absolute',
              top: -20,
              right: '25%',
              animation: `${float} 3s ease-in-out infinite`,
              animationDelay: '1s',
              color: theme => theme.palette.y2k.accent,
              fontSize: '2rem',
            }}
          >
            ★
          </Box>
        </Box>

        {/* Reviews Grid */}
        <Box
          sx={{
            position: 'relative',
            zIndex: 1,
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
            },
            gap: 4,
            maxWidth: '1200px',
            mx: 'auto',
          }}
        >
          {reviews.map(review => (
            <ReviewCard key={review.name}>
              <ProfileCircle>
                <Typography sx={{ fontSize: '2rem' }}>
                  {review.emoji}
                </Typography>
              </ProfileCircle>

              <Typography
                variant='h6'
                sx={{
                  textAlign: 'center',
                  color: 'y2k.foreground',
                  fontWeight: 'bold',
                  fontSize: '1.5rem',
                }}
              >
                {review.name}
              </Typography>

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: 0.5,
                }}
              >
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    sx={{
                      color: '#FFD700',
                      fontSize: '1.25rem',
                    }}
                  />
                ))}
              </Box>

              <Typography
                variant='body1'
                sx={{
                  textAlign: 'center',
                  color: 'y2k.foreground',
                  fontStyle: 'italic',
                  opacity: 0.9,
                  lineHeight: 1.6,
                }}
              >
                &quot;{review.text}&quot;
              </Typography>

              {review.showHeart && (
                <Box sx={{ mt: 2 }}>
                  <FavoriteIcon
                    sx={{
                      color: 'white',
                      animation: `${float} 2s ease-in-out infinite`,
                    }}
                  />
                </Box>
              )}
            </ReviewCard>
          ))}
        </Box>
      </StyledContainer>
    </Box>
  );
};

'use client';

import { Box, keyframes, styled } from '@mui/material';
import { useEffect, useState } from 'react';

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
`;

const Star = styled(Box)(({ theme }) => ({
  position: 'absolute',
  color: theme.palette.y2k.accent,
  animation: `${float} 3s ease-in-out infinite`,
  zIndex: 0,
  opacity: 0.3,
}));

interface StarProps {
  left: string;
  top: string;
  animationDelay: string;
  fontSize: string;
}

export const AnimatedStars = () => {
  const [stars, setStars] = useState<StarProps[]>([]);

  useEffect(() => {
    const generateStars = () => {
      const newStars = [...Array(20)].map(() => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 3}s`,
        fontSize: `${Math.random() * 6 + 10}px`, // Slightly smaller stars
      }));
      setStars(newStars);
    };
    generateStars();
  }, []);

  return (
    <Box
      sx={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      {stars.map((star, i) => (
        <Star
          key={i}
          sx={{
            left: star.left,
            top: star.top,
            animationDelay: star.animationDelay,
            fontSize: star.fontSize,
          }}
        >
          ★
        </Star>
      ))}
    </Box>
  );
};

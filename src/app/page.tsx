'use client';

import { type NextPage } from 'next';
import {
  HeroSection,
  MeetYourStylist,
  PortfolioSection,
  ReviewsSection,
  BookingPoliciesSection,
  AnimatedStars,
  FollowUsSection,
  ThankYouSection,
  Navbar,
} from './components';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';

const GradientBackground = styled(Box, {
  shouldForwardProp: prop => prop !== 'scrollY',
})<{ scrollY: number }>(({ scrollY }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: `linear-gradient(180deg,
    #1A0912 0%,
    #2D0F1F 20%,
    #FF1493 40%,
    #2D0F1F 60%,
    #FF1493 80%,
    #1A0912 100%
  )`,
  backgroundSize: '100% 300%',
  backgroundPosition: `50% ${scrollY}%`,
  transition: 'background-position 0.5s ease-out',
  opacity: 0.9,
  zIndex: -1,
  '&::before': {
    content: '""',
    position: 'absolute',
    inset: 0,
    background:
      'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.4) 100%)',
    pointerEvents: 'none',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    inset: 0,
    backdropFilter: 'blur(100px)',
    pointerEvents: 'none',
  },
}));

const ContentWrapper = styled(Box)({
  position: 'relative',
  zIndex: 1,
});

const Home: NextPage = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent =
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) *
        100;
      setScrollY(scrollPercent);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Box
      component='main'
      sx={{
        position: 'relative',
        minHeight: '100vh',
        overflow: 'hidden',
        background: '#1A0912',
      }}
    >
      <Navbar />
      <GradientBackground scrollY={scrollY} />
      <AnimatedStars />
      <ContentWrapper>
        <Box id='hero'>
          <HeroSection />
        </Box>
        <Box id='about'>
          <MeetYourStylist />
        </Box>
        <Box id='portfolio'>
          <PortfolioSection />
        </Box>
        <Box id='reviews'>
          <ReviewsSection />
        </Box>
        <Box id='policies'>
          <BookingPoliciesSection />
        </Box>
        <FollowUsSection />
        <ThankYouSection />
      </ContentWrapper>
    </Box>
  );
};

export default Home;

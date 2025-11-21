'use client';

import { useState, useEffect } from 'react';
import {
  AppBar,
  Box,
  Container,
  IconButton,
  Button,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useScrollTrigger,
  Slide,
  styled,
  keyframes,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const glow = keyframes`
  0%, 100% { text-shadow: 0 0 10px rgba(255, 20, 147, 0.4); }
  50% { text-shadow: 0 0 20px rgba(255, 20, 147, 0.8); }
`;

const StyledAppBar = styled(AppBar)(() => ({
  background: 'rgba(26, 9, 18, 0.85)',
  backdropFilter: 'blur(10px)',
  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  '&::before': {
    content: '""',
    position: 'absolute',
    inset: 0,
    background:
      'linear-gradient(90deg, transparent, rgba(255, 20, 147, 0.1), transparent)',
    opacity: 0.5,
  },
}));

const NavButton = styled(Button)(({ theme }) => ({
  color: theme.palette.y2k.foreground,
  fontSize: '0.9rem',
  padding: theme.spacing(1, 2),
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: 0,
    height: '2px',
    background: `linear-gradient(90deg, ${theme.palette.y2k.primary}, ${theme.palette.y2k.accent})`,
    transition: 'width 0.3s ease',
  },
  '&:hover': {
    background: 'transparent',
    color: theme.palette.y2k.primary,
    '&::before': {
      width: '80%',
    },
  },
}));

const BookButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(45deg, ${theme.palette.y2k.primary}, ${theme.palette.y2k.accent})`,
  color: 'white',
  padding: theme.spacing(1, 3),
  borderRadius: '9999px',
  fontWeight: 'bold',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(45deg, rgba(255,255,255,0.1), transparent)',
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: `0 0 20px ${theme.palette.y2k.primary}40`,
    '&::before': {
      opacity: 1,
    },
  },
}));

const Logo = styled(Typography)(({ theme }) => ({
  fontFamily: '"Playfair Display", serif',
  fontSize: '1.75rem',
  fontStyle: 'italic',
  color: theme.palette.y2k.primary,
  animation: `${glow} 3s ease-in-out infinite`,
  cursor: 'pointer',
  position: 'relative',
  '&::after': {
    content: '"✨"',
    position: 'absolute',
    top: '-8px',
    right: '-16px',
    fontSize: '1rem',
  },
}));

const navItems = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Policies', href: '#policies' },
];

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const trigger = useScrollTrigger({
    // It will default to window, which is what we want.
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.pageYOffset > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle scrolling to section after navigation
  useEffect(() => {
    if (pathname === '/' && window.location.hash) {
      const hash = window.location.hash;
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          const navbarHeight = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition =
            elementPosition + window.pageYOffset - navbarHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          });
        }
      }, 100);
    }
  }, [pathname]);

  const handleDrawerToggle = () => {
    setMobileOpen(prevState => !prevState);
  };

  const scrollToSection = (href: string) => {
    // If we're on the services page, navigate to home first
    if (pathname !== '/') {
      router.push(`/${href}`);
      setMobileOpen(false);
      return;
    }

    // If we're on the home page, scroll to the section
    const element = document.querySelector(href);
    if (element) {
      const navbarHeight = 80; // Height of navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
    setMobileOpen(false);
  };

  const drawer = (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <List sx={{ py: 2 }}>
        {navItems.map(item => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              sx={{
                textAlign: 'center',
                color: 'y2k.foreground',
                py: 1.5,
                '&:hover': {
                  color: 'y2k.primary',
                  background: 'rgba(255, 255, 255, 0.05)',
                },
              }}
              onClick={() => scrollToSection(item.href)}
            >
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontSize: '1.1rem',
                  fontWeight: 500,
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Box sx={{ p: 2 }}>
        <Link href='/services' passHref>
          <BookButton fullWidth>Book Now</BookButton>
        </Link>
      </Box>
    </Box>
  );

  return (
    <>
      <Box sx={{ height: { xs: '80px', md: '80px' } }} />{' '}
      {/* Spacer to prevent content overlap */}
      <Slide appear={false} direction='down' in={!trigger}>
        <StyledAppBar
          elevation={isScrolled ? 4 : 0}
          sx={{
            transition: 'all 0.3s ease',
            boxShadow: isScrolled ? '0 0 20px rgba(0,0,0,0.3)' : 'none',
          }}
        >
          <Container maxWidth='lg'>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                minHeight: '80px',
                position: 'relative',
                zIndex: 2,
              }}
            >
              <Link href='/' passHref style={{ textDecoration: 'none' }}>
                <Logo>Kel.C</Logo>
              </Link>

              {/* Desktop Navigation */}
              <Box
                sx={{
                  display: { xs: 'none', md: 'flex' },
                  alignItems: 'center',
                  gap: 1,
                  background: 'rgba(26, 9, 18, 0.5)',
                  borderRadius: '9999px',
                  padding: '4px 8px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                {navItems.map(item => (
                  <NavButton
                    key={item.label}
                    onClick={() => scrollToSection(item.href)}
                  >
                    {item.label}
                  </NavButton>
                ))}
                <Link href='/services' passHref>
                  <BookButton sx={{ ml: 2 }}>Book Now</BookButton>
                </Link>
              </Box>

              {/* Mobile Menu Button */}
              <IconButton
                color='inherit'
                aria-label='open drawer'
                edge='start'
                onClick={handleDrawerToggle}
                sx={{
                  display: { md: 'none' },
                  color: 'y2k.foreground',
                  '&:hover': {
                    color: 'y2k.primary',
                  },
                }}
              >
                {mobileOpen ? <CloseIcon /> : <MenuIcon />}
              </IconButton>
            </Box>
          </Container>

          {/* Mobile Navigation Drawer */}
          <Drawer
            variant='temporary'
            anchor='right'
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: 'block', md: 'none' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: 240,
                background: 'rgba(26, 9, 18, 0.9)',
                backdropFilter: 'blur(10px)',
                borderLeft: 'none',
                mt: '80px', // Add top margin to prevent content overlap
                height: 'calc(100% - 80px)', // Adjust height to account for navbar
              },
            }}
          >
            {drawer}
          </Drawer>
        </StyledAppBar>
      </Slide>
    </>
  );
};

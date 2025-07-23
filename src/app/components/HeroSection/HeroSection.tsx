'use client';

import {
  Box,
  Button,
  Container,
  Typography,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  Select,
  MenuItem,
  TextField,
  FormControl,
  InputLabel,
  Theme,
} from '@mui/material';

import InstagramIcon from '@mui/icons-material/Instagram';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { styled, keyframes } from '@mui/material/styles';
import { useState } from 'react';

// Animations
const sparkle = keyframes`
  0%, 100% { transform: scale(1) rotate(0deg); opacity: 1; }
  50% { transform: scale(1.2) rotate(180deg); opacity: 0.8; }
`;

const bounce = keyframes`
  0%, 20%, 53%, 80%, 100% { transform: translateY(0); }
  40%, 43% { transform: translateY(-30px); }
  70% { transform: translateY(-15px); }
`;

const pulse = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(45deg); }
  50% { transform: translateY(-20px) rotate(45deg); }
`;

const glowPulse = keyframes`
  0%, 100% { text-shadow: 0 0 5px #FFFFFF, 0 0 10px #FFFFFF, 0 0 15px #FFFFFF; }
  50% { text-shadow: 0 0 15px #FFFFFF, 0 0 25px #FFFFFF, 0 0 35px #FFFFFF; }
`;

// Styled components
const HeroContainer = styled(Box)({
  position: 'relative',
  minHeight: '100vh',
  backgroundColor: '#FFFFFF',
  overflow: 'hidden',
  backgroundImage: `url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZjY5YjQiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMyIvPjwvZz48L2c+PC9zdmc+")`,
});

const DecoElement = styled(Box, {
  shouldForwardProp: prop =>
    ![
      'animation',
      'top',
      'left',
      'right',
      'bottom',
      'fontSize',
      'rotate',
    ].includes(prop as string),
})<{
  animation: string;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  fontSize?: string;
  rotate?: number;
}>(({ animation, top, left, right, bottom, fontSize, rotate = 0 }) => ({
  position: 'absolute',
  fontSize,
  top,
  left,
  right,
  bottom,
  transform: `rotate(${rotate}deg)`,
  animation: `${animation} 2s ease-in-out infinite`,
  zIndex: 1,
}));

const MainTitleCard = styled(Box)(({ theme }) => ({
  transform: 'rotate(-2deg)',
  background: `linear-gradient(135deg, ${theme.palette.y2k.hotPink} 0%, ${theme.palette.y2k.cyan} 100%)`,
  padding: theme.spacing(3),
  borderRadius: '8px',
  border: `4px solid ${theme.palette.y2k.hotPink}`,
  boxShadow: `0 0 20px ${theme.palette.y2k.hotPink}`,
}));

const InfoCard = styled(Box, {
  shouldForwardProp: prop => prop !== 'rotate' && prop !== 'gradient',
})<{
  rotate?: number;
  gradient?: boolean;
}>(({ rotate = 0, gradient = false, theme }) => ({
  transform: `rotate(${rotate}deg)`,
  background: gradient
    ? `linear-gradient(135deg, ${(theme as Theme).palette.y2k.lightPink} 0%, ${
        (theme as Theme).palette.y2k.cyan
      } 100%)`
    : '#FFFFFF',
  border: `4px solid ${(theme as Theme).palette.y2k.hotPink}`,
  padding: (theme as Theme).spacing(2),
  boxShadow: gradient
    ? `0 0 20px ${(theme as Theme).palette.y2k.hotPink}`
    : `0 0 15px ${(theme as Theme).palette.y2k.hotPink}`,
}));

const BioCard = styled(Box)(({ theme }) => ({
  backgroundColor: '#FFFFFF',
  border: `4px solid ${theme.palette.y2k.hotPink}`,
  padding: theme.spacing(3),
  transform: 'rotate(-1deg)',
  boxShadow: `0 0 20px ${theme.palette.y2k.hotPink}`,
}));

const GlowText = styled(Typography)({
  animation: `${glowPulse} 4s ease-in-out infinite`,
  color: '#FFFFFF !important',
});

const services = [
  { name: 'Hair Cut & Style', price: '$75' },
  { name: 'Hair Color', price: '$150' },
  { name: 'Highlights', price: '$120' },
  { name: 'Hair Treatment', price: '$80' },
];

export default function HeroSection() {
  const theme = useTheme();
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <HeroContainer>
      {/* Scattered decorative elements */}
      <DecoElement
        animation={sparkle}
        top='80px'
        left='40px'
        fontSize='4rem'
        rotate={12}
      >
        💅
      </DecoElement>

      <DecoElement
        animation={bounce}
        top='128px'
        right='80px'
        fontSize='2.5rem'
      >
        ★
      </DecoElement>

      <DecoElement animation={pulse} top='240px' left='25%' fontSize='3rem'>
        ✨
      </DecoElement>

      <DecoElement
        animation={float}
        bottom='160px'
        right='40px'
        fontSize='4.5rem'
        rotate={45}
      >
        💖
      </DecoElement>

      <DecoElement
        animation={sparkle}
        top='320px'
        right='33%'
        fontSize='1.5rem'
      >
        ⭐
      </DecoElement>

      <DecoElement
        animation={bounce}
        bottom='240px'
        left='64px'
        fontSize='2.5rem'
      >
        💕
      </DecoElement>

      <Container maxWidth='lg' sx={{ py: 8, position: 'relative', zIndex: 10 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 4,
          }}
        >
          {/* Main title - off-center */}
          <MainTitleCard>
            <GlowText
              variant='h1'
              sx={{
                textAlign: 'center',
                fontSize: { xs: '2rem', md: '3.5rem' },
              }}
            >
              ✨ WELCOME TO ✨
              <br />
              <Box
                component='span'
                sx={{
                  fontSize: { xs: '2.5rem', md: '4.5rem' },
                  background: `linear-gradient(135deg, ${theme.palette.y2k.cyan} 0%, ${theme.palette.y2k.hotPink} 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                KEL.C. STYLES
              </Box>
              <br />
              <Box component='span' sx={{ fontSize: '1.5rem' }}>
                SWAG SITE
              </Box>
            </GlowText>
          </MainTitleCard>

          {/* Scattered info boxes */}
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 4,
              width: '100%',
              maxWidth: '1000px',
              mt: 6,
              justifyContent: 'center',
            }}
          >
            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 300px' } }}>
              <InfoCard rotate={1}>
                <Typography
                  variant='h5'
                  sx={{
                    color: theme.palette.y2k.hotPink,
                    textAlign: 'center',
                    fontWeight: 'bold',
                  }}
                >
                  📍 LOCATION
                </Typography>
                <Typography
                  variant='h6'
                  sx={{
                    color: theme.palette.y2k.hotPink,
                    textAlign: 'center',
                  }}
                >
                  Dallas, TX
                </Typography>
              </InfoCard>
            </Box>

            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 300px' } }}>
              <InfoCard rotate={-2} gradient>
                <Button
                  variant='contained'
                  size='large'
                  startIcon={<CalendarTodayIcon />}
                  onClick={() => setIsBookingOpen(true)}
                  sx={{
                    width: '100%',
                    fontSize: '1.125rem',
                    fontWeight: 'bold',
                    background: `linear-gradient(45deg, ${theme.palette.y2k.hotPink} 30%, ${theme.palette.y2k.cyan} 90%)`,
                    '&:hover': {
                      background: `linear-gradient(45deg, ${theme.palette.y2k.brightPink} 30%, ${theme.palette.y2k.turquoise} 90%)`,
                    },
                  }}
                >
                  BOOK NOW ✨
                </Button>
              </InfoCard>
            </Box>

            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 300px' } }}>
              <InfoCard rotate={1}>
                <Typography
                  variant='h5'
                  sx={{
                    color: theme.palette.y2k.hotPink,
                    textAlign: 'center',
                    fontWeight: 'bold',
                  }}
                >
                  📱 DM ME
                </Typography>
                <Button
                  variant='contained'
                  size='large'
                  startIcon={<InstagramIcon />}
                  href='https://instagram.com'
                  target='_blank'
                  sx={{
                    width: '100%',
                    fontWeight: 'bold',
                    background: `linear-gradient(45deg, ${theme.palette.y2k.cyan} 30%, ${theme.palette.y2k.hotPink} 90%)`,
                    '&:hover': {
                      background: `linear-gradient(45deg, ${theme.palette.y2k.turquoise} 30%, ${theme.palette.y2k.brightPink} 90%)`,
                    },
                  }}
                >
                  INSTAGRAM
                </Button>
              </InfoCard>
            </Box>
          </Box>

          {/* Bio section - irregular placement */}
          <Box sx={{ maxWidth: '768px', mx: 'auto', mt: 8 }}>
            <BioCard>
              <Typography
                variant='h6'
                sx={{
                  color: theme.palette.y2k.hotPink,
                  textAlign: 'center',
                  lineHeight: 1.6,
                }}
              >
                ✨ Ready to transform your look? Let&apos;s create some Y2K
                magic and make your hair dreams come true! I can&apos;t wait to
                work with you and help you feel your best! 💖
              </Typography>
            </BioCard>
          </Box>
        </Box>
      </Container>

      {/* Booking Dialog */}
      <Dialog
        open={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        maxWidth='sm'
        fullWidth
      >
        <DialogTitle
          sx={{
            textAlign: 'center',
            color: theme.palette.y2k.hotPink,
            fontSize: '1.5rem',
            fontWeight: 'bold',
          }}
        >
          Book Your Appointment ✨
        </DialogTitle>
        <DialogContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 1 }}>
            <FormControl fullWidth>
              <InputLabel>Service</InputLabel>
              <Select defaultValue=''>
                {services.map((service, index) => (
                  <MenuItem key={index} value={service.name}>
                    {service.name} - {service.price}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              fullWidth
              type='date'
              label='Date'
              InputLabelProps={{ shrink: true }}
            />

            <FormControl fullWidth>
              <InputLabel>Time</InputLabel>
              <Select defaultValue=''>
                <MenuItem value='9:00 AM'>9:00 AM</MenuItem>
                <MenuItem value='11:00 AM'>11:00 AM</MenuItem>
                <MenuItem value='1:00 PM'>1:00 PM</MenuItem>
                <MenuItem value='3:00 PM'>3:00 PM</MenuItem>
                <MenuItem value='5:00 PM'>5:00 PM</MenuItem>
              </Select>
            </FormControl>

            <TextField fullWidth label='Name' placeholder='Your name' />

            <TextField
              fullWidth
              label='Phone'
              placeholder='Your phone number'
              type='tel'
            />

            <Button
              variant='contained'
              size='large'
              onClick={() => setIsBookingOpen(false)}
              sx={{
                width: '100%',
                background: `linear-gradient(45deg, ${theme.palette.y2k.hotPink} 30%, ${theme.palette.y2k.cyan} 90%)`,
                '&:hover': {
                  background: `linear-gradient(45deg, ${theme.palette.y2k.brightPink} 30%, ${theme.palette.y2k.turquoise} 90%)`,
                },
              }}
            >
              Confirm Booking ✨
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </HeroContainer>
  );
}

import { createTheme } from '@mui/material/styles';
import { Playfair_Display, Roboto, Poppins } from 'next/font/google';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const poppins = Poppins({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
});

declare module '@mui/material/styles' {
  interface Palette {
    y2k: {
      primary: string;
      primaryDark: string;
      secondary: string;
      accent: string;
      background: string;
      backgroundAlt: string;
      foreground: string;
      muted: string;
      card: string;
      border: string;
      overlayHero: string;
      overlayStylist: string;
    };
  }
  interface PaletteOptions {
    y2k: {
      primary: string;
      primaryDark: string;
      secondary: string;
      accent: string;
      background: string;
      backgroundAlt: string;
      foreground: string;
      muted: string;
      card: string;
      border: string;
      overlayHero: string;
      overlayStylist: string;
    };
  }
}

const theme = createTheme({
  palette: {
    y2k: {
      primary: '#E5358E', // Hot pink from screenshot
      primaryDark: '#B32A70', // Darker hot pink for hover states
      secondary: '#E5358E', // Hot pink from screenshot
      accent: '#E5358E', // Hot pink from screenshot
      background: '#20121B', // Dark purple from screenshot
      backgroundAlt: '#3a2d39', // Lighter purple from screenshot
      overlayHero: 'rgba(10, 5, 12, 0.4)',
      overlayStylist: 'rgba(45, 31, 51, 0.5)',
      foreground: '#FFFFFF',
      muted: 'rgba(229, 53, 142, 0.2)', // Muted hot pink
      card: '#2E1E2A', // Card background from screenshot
      border: '#E5358E', // Hot pink from screenshot
    },
    background: {
      default: '#1A0912',
      paper: '#2D1F33',
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
    h1: {
      fontFamily: playfair.style.fontFamily,
      fontStyle: 'italic',
      fontWeight: 700,
    },
    h2: {
      fontFamily: playfair.style.fontFamily,
      fontWeight: 700,
    },
    h3: {
      fontFamily: playfair.style.fontFamily,
      fontWeight: 700,
    },
    h4: {
      fontFamily: playfair.style.fontFamily,
      fontWeight: 700,
    },
    h5: {
      fontFamily: roboto.style.fontFamily,
      fontWeight: 500,
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
    },
    h6: {
      fontFamily: roboto.style.fontFamily,
      fontWeight: 500,
    },
    body1: {
      fontFamily: roboto.style.fontFamily,
      fontSize: '1rem',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        'html, body': {
          backgroundColor: '#1A0912',
          minHeight: '100%',
          overscrollBehavior: 'none',
        },
        body: {
          minHeight: '100vh',
          overscrollBehaviorY: 'none',
          WebkitOverflowScrolling: 'touch',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '9999px',
          textTransform: 'none',
          '&.y2k-button': {
            background: 'linear-gradient(45deg, #FF1493 30%, #FFD700 90%)',
            color: '#FFFFFF',
            padding: '16px 32px',
            fontSize: '1.125rem',
            fontWeight: 600,
            boxShadow: '0 0 15px rgba(255, 20, 147, 0.5)',
            '&:hover': {
              background: 'linear-gradient(45deg, #FF1493 60%, #FFD700 100%)',
              boxShadow: '0 0 20px rgba(255, 20, 147, 0.7)',
            },
          },
        },
      },
    },
  },
});

export { poppins };
export default theme;

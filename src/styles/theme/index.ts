import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    y2k: {
      primary: string;
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
      primary: '#FF1493', // Hot pink
      secondary: '#FF69B4', // Light pink
      accent: '#FFEEFF', // Base color for stars, will be tinted
      background: '#1A0F1F', // Dark purple background
      backgroundAlt: '#2D1F33', // Lighter purple background
      overlayHero: 'rgba(10, 5, 12, 0.4)', // Dark overlay for hero
      overlayStylist: 'rgba(45, 31, 51, 0.5)', // Lighter overlay for stylist
      foreground: '#FFFFFF', // White text
      muted: '#2D1F33', // Lighter purple for muted elements
      card: '#2D1F33', // Card background
      border: '#FF1493', // Border color
    },
  },
  typography: {
    fontFamily: '"Roboto", "Arial", sans-serif',
    h1: {
      fontFamily: '"Playfair Display", serif',
      fontStyle: 'italic',
    },
    h2: {
      fontWeight: 700,
    },
  },
  components: {
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

export default theme;

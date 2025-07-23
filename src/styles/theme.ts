import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    y2k: {
      hotPink: string;
      brightPink: string;
      deepPink: string;
      lightPink: string;
      lavenderBlush: string;
      cyan: string;
      turquoise: string;
      darkTurquoise: string;
      white: string;
      darkPurple: string;
      mistyRose: string;
      borderPink: string;
    };
  }
  interface PaletteOptions {
    y2k: {
      hotPink: string;
      brightPink: string;
      deepPink: string;
      lightPink: string;
      lavenderBlush: string;
      cyan: string;
      turquoise: string;
      darkTurquoise: string;
      white: string;
      darkPurple: string;
      mistyRose: string;
      borderPink: string;
    };
  }
}

export const theme = createTheme({
  palette: {
    primary: {
      main: '#FF1493', // Hot Pink
      light: '#FF69B4', // Bright Pink
      dark: '#FF1493', // Deep Pink
    },
    secondary: {
      main: '#00FFFF', // Cyan
      light: '#40E0D0', // Turquoise
      dark: '#00CED1', // Dark Turquoise
    },
    y2k: {
      hotPink: '#FF1493',
      brightPink: '#FF69B4',
      deepPink: '#FF1493',
      lightPink: '#FFB6C1',
      lavenderBlush: '#FFF0F5',
      cyan: '#00FFFF',
      turquoise: '#40E0D0',
      darkTurquoise: '#00CED1',
      white: '#FFFFFF',
      darkPurple: '#1A0D26',
      mistyRose: '#FFE4E1',
      borderPink: '#F8BBD9',
    },
    background: {
      default: '#FFF0F5',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1A0D26',
      secondary: '#FF1493',
    },
  },
  typography: {
    fontFamily: '"Helvetica", "Arial", sans-serif', // We'll update this later with the actual font
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 25,
          padding: '12px 24px',
        },
        contained: {
          background: 'linear-gradient(45deg, #FF1493 30%, #00FFFF 90%)',
          color: '#FFFFFF',
          '&:hover': {
            background: 'linear-gradient(45deg, #FF69B4 30%, #40E0D0 90%)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 20px rgba(255, 20, 147, 0.1)',
        },
      },
    },
  },
});

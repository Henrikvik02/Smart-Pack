import { extendTheme, StyleFunctionProps } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    customLightPurple: {
      50: "#f3e8ff",
      100: "#d9c5ff",
      200: "#bf9fff",
      300: "#a57aff",
      400: "#8b54ff",
      500: "#8E6DFF",
      600: "#5816e5",
      700: "#4400b2",
      800: "#2f007f",
      900: "#1a004c",
    },
    customPurple: {
      500: '#84216B',
      600: '#6F1C5A',
      700: '#5A1749',
    },
    customYellow: {
      500: '#FFFF10',
      600: '#FFEB3B',
      700: '#6F1C5A',
      800: '#5A1749',
    },
    customRed: {
      500: '#E53E3E',
      600: '#C53030',
      700: '#9B2C2C',
    },
    customGray: {
      300: '#E2E8F0',
      400: '#d9d9d9',
      500: '#A0AEC0',
      600: '#2D3748',
      700: '#4A5568',
    },
    customBlue: {
      400: '#1E90FF',
      500: '#3182CE',
      600: '#2B6CB0',
      700: '#2C5282',
    },
    customLightBlue: {
      100: "#E0F7FA", // Light Blue 1
      200: "#B3E5FC", // Light Blue 2
      300: "#81D4FA", // Light Blue 3
      400: "#4FC3F7", // Light Blue 4
    },
    customGreen: {
      light: {
        100: '#2E7D32', // Green 1 Light Mode
        200: '#388E3C', // Green 2 Light Mode
        300: '#43A047', // Green 3 Light Mode
        400: '#4CAF50', // Green 4 Light Mode
      },
      dark: {
        100: '#C8E6C9', // Green 1 Dark Mode
        200: '#A5D6A7', // Green 2 Dark Mode
        300: '#81C784', // Green 3 Dark Mode
        400: '#66BB6A', // Green 4 Dark Mode
        500: '#48BB78'
      },
    }
  },
  components: {
    Button: {
      baseStyle: {
        color: 'white',
      },
      variants: {
        tool: {
          _focus: {
            boxShadow: '0 0 0 3px #FFFF10',
          },
        },
        primary: {
          bg: "customLightPurple.500",
          color: "white",
          _hover: {
            bg: "customLightPurple.600",
          },
          _active: {
            bg: "customLightPurple.700",
          },
          _focus: {
            boxShadow: '0 0 0 3px #FFFF10',
          },
        },
        secondary: {
          border: "2px solid",
          borderColor: "customLightPurple.500",
          color: "customLightPurple.500",
          _hover: {
            bg: "customLightPurple.50",
          },
          _active: {
            bg: "customLightPurple.100",
          },
          _focus: {
            boxShadow: '0 0 0 3px #FFFF10',
          },
        },
        tertiary: {
          color: "customLightPurple.500",
          _hover: {
            bg: "customLightPurple.50",
          },
          _active: {
            bg: "customLightPurple.100",
          },
          _focus: {
            boxShadow: '0 0 0 3px #FFFF10',
          },
        },
        main: {
          bg: 'customBlue.400',
          color: 'white',
          _hover: {
            bg: 'customBlue.600',
          },
          _active: {
            bg: 'customBlue.700',
          },
          _focus: {
            boxShadow: '0 0 0 3px #FFFF10',
          },
        },
        danger: {
          bg: 'customRed.500',
          _hover: {
            bg: 'customRed.600',
          },
          _active: {
            bg: 'customRed.700',
          },
          _focus: {
            boxShadow: '0 0 0 3px #FFFF10',
          },
        },
        cardButton: {
          borderWidth: '4px',
          borderColor: 'customPurple.500',
          bg: 'customGray.500',
          color: 'black',
          _hover: {
            bg: 'customGray.600',
          },
          _active: {
            bg: 'customGray.700',
          },
          _focus: {
            boxShadow: '0 0 0 3px #FFFF10',
          },
        },
        navHeader: {
          color: ({ colorMode }: StyleFunctionProps) => (colorMode === 'dark' ? 'white' : 'black'),
            bg: 'transparent',
          _hover: {
            bg: ({ colorMode }: StyleFunctionProps) => (colorMode === 'dark' ? 'customBlue.400' : 'customBlue.400'),
          },
          _active: {
            bg: ({ colorMode }: StyleFunctionProps) => (colorMode === 'dark' ? 'customBlue.700' : 'customBlue.700'),
          },
          _focus: {
            boxShadow: '0 0 0 3px #FFFF10',
          },
        },
      },
    },
  },
});

export default theme;

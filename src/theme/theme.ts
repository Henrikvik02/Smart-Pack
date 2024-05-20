import { extendTheme, StyleFunctionProps } from '@chakra-ui/react';


const theme = extendTheme({
  colors: {
    customLightPurple: {
      50: "#f3e8ff",
      100: "#d9c5ff",
      200: "#bf9fff",
      300: "#a57aff",
      400: "#8b54ff",
      500: "#712fff",
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
      600: 'FFEB3B',
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
      500: '#3182CE',
      600: '#2B6CB0',
      700: '#2C5282',
    },
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
        solid: {
          bg: 'customPurple.500',
          _hover: {
            bg: 'customPurple.600',
          },
          _active: {
            bg: 'customPurple.700',
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
            bg: ({ colorMode }: StyleFunctionProps) => (colorMode === 'dark' ? 'customGray.400' : 'customGray.600'),
          },
          _active: {
            bg: ({ colorMode }: StyleFunctionProps) => (colorMode === 'dark' ? 'customGray.300' : 'customGray.700'),
          },
          _focus: {
            boxShadow: '0 0 0 3px #FFFF10',
          },
        },
      },
    },
    IconButton: {
      baseStyle: {
        color: 'white',
      },
      variants: {
        solid: {
          bg: 'customPurple.500',
          _hover: {
            bg: 'customPurple.600',
          },
          _active: {
            bg: 'customPurple.700',
          },
          _focus: {
            boxShadow: `0 0 0 3px #FFFF10`,
          },
        },
      },
    },
  },
});

export default theme;

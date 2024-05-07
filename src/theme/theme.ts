import { extendTheme, StyleFunctionProps } from '@chakra-ui/react';


const theme = extendTheme({
  colors: {
    customPurple: {
      500: '#84216B',
      600: '#6F1C5A',
      700: '#5A1749',
    },
    customYellow: {
      500: '#FFFF10',
    },
    customRed: {
      500: '#E53E3E',
      600: '#C53030',
      700: '#9B2C2C',
    },
    customGray: {
      300: '#f2f2f2',
      400: '#d9d9d9',
      500: '#A0AEC0',
      600: '#718096',
      700: '#4A5568',
    },
  },
  components: {
    Button: {
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
          borderWidth: '4x',
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

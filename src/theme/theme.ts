import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    customPurple: {
      500: '#84216B',  // Light purple
      600: '#6F1C5A',  // Medium purple
      700: '#5A1749',  // Dark purple
    },
    customYellow: {
      500: '#FFFF10',  // Bright yellow
    },
    customRed: {
      500: '#E53E3E',  
      600: '#C53030',  
      700: '#9B2C2C',  
    },
    customGray: {
      500: '#A0AEC0',  // Light gray
      600: '#718096',  // Medium gray
      700: '#4A5568',  // Dark gray
    },
  },
  components: {
    Button: {
      baseStyle: {
        color: 'white',  // Ensuring text is white for all buttons
      },
      variants: {
        solid: {
          bg: 'customPurple.500',
          _hover: {
            bg: 'customPurple.600',  // Changes to medium purple on hover
          },
          _active: {
            bg: 'customPurple.700',  // Changes to dark purple when pressed
          },
          _focus: {
            boxShadow: '0 0 0 3px #FFFF10',  // Yellow border glow on focus using direct color reference
          },
        },
        danger: {
          bg: 'customRed.500',
          _hover: {
            bg: 'customRed.600',  // Changes to medium red on hover
          },
          _active: {
            bg: 'customRed.700',  // Changes to dark red when pressed
          },
          _focus: {
            boxShadow: '0 0 0 3px #FFFF10',  // Maintain the yellow glow on focus for accessibility
          },
        },
        cardButton: {
          borderWidth: '4x',  // Thick border
          borderColor: 'customPurple.500',
          bg: 'customGray.500',
          color: 'black',  // Set text color to black
          _hover: {
            bg: 'customGray.600',  // Medium gray on hover
          },
          _active: {
            bg: 'customGray.700',  // Dark gray when pressed
          },
          _focus: {
            boxShadow: '0 0 0 3px #FFFF10',  // Yellow border glow on focus
          },
        },
      },
    },
    IconButton: {
      baseStyle: {
        color: 'white',  // Apply white color directly to icon
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

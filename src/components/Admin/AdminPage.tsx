import React, { useState } from 'react';
import {
  Box,
  Button,
  VStack,
  Heading,
  Container,
  useColorModeValue,
} from '@chakra-ui/react';
import DisplayCat from './Display/DisplayCat';
import DisplayItem from './Display/DisplayItem';
import DisplayRule from './Display/DisplayRule';
import DisplayAll from './Display/DisplayAll';

const AdminPage = () => {
  const [activeView, setActiveView] = useState<string>('Everything');

  return (
    <Container maxW="container.xl">
      <VStack spacing={4} align="stretch">
        <Heading mb={6}>Admin Dashboard</Heading>
        <Box display="flex" justifyContent="center" mb={4}>
          <Button
            onClick={() => setActiveView('Everything')}
            variant="main"
            _focus= {{
              boxShadow: '0 0 0 3px #FFFF10',
            }}
            mr={2}
          >
            Kombinasjon
          </Button>
          <Button
            onClick={() => setActiveView('Categories')}
            variant="main"
            _focus= {{
              boxShadow: '0 0 0 3px #FFFF10',
            }}
            mr={2}
          >
            Kategorier
          </Button>
          <Button
            onClick={() => setActiveView('Items')}
            variant='main'
            _focus= {{
              boxShadow: '0 0 0 3px #FFFF10',
            }}
            mr={2}
          >
            Gjenstander
          </Button>
          <Button
            onClick={() => setActiveView('Rules')}
            variant="main"
            _focus= {{
              boxShadow: '0 0 0 3px #FFFF10',
            }}
          >
            Regelverk
          </Button>
        </Box>
        <Box>
          {activeView === 'Everything' && <DisplayAll />}
          {activeView === 'Categories' && <DisplayCat />}
          {activeView === 'Items' && <DisplayItem />}
          {activeView === 'Rules' && <DisplayRule />}
        </Box>
      </VStack>
    </Container>
  );
};

export default AdminPage;

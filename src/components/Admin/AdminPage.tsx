// AdminPage.tsx
import React, { useState } from 'react';
import {
  Box,
  Button,
  VStack,
  Heading,
  Container
} from '@chakra-ui/react';
import DisplayCat from './Display/DisplayCat';
import DisplayItem from './Display/DisplayItem';
import DisplayRule from './Display/DisplayRule';
import DisplayAll from './Display/DisplayAll';

const AdminPage = () => {
    const [activeView, setActiveView] = useState<string>('');

    return (
        <Container maxW="container.xl">
            <VStack spacing={4} align="stretch">
                <Heading mb={6}>Admin Dashboard</Heading>
                <Box display="flex" justifyContent="center">

                    <Button onClick={() => setActiveView('Everyting')}>Kombinasjon</Button>
                    <Button onClick={() => setActiveView('Categories')}>Kategorier</Button>
                    <Button onClick={() => setActiveView('Items')}>Gjenstander</Button>
                    <Button onClick={() => setActiveView('Rules')}>Regelverk</Button>
                </Box>
                <Box display="flex" justifyContent="space-between">
                    
                    <DisplayRule />

                </Box>

            </VStack>
        </Container>
    );
};

export default AdminPage;
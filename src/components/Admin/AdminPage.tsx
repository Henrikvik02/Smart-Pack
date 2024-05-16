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
import DisplayCat_It from './Display/DisplayCat_It';
import DisplayCat_Rul from './Display/DisplayCat_Rul';

const AdminPage = () => {
    const [activeView, setActiveView] = useState<string>('');

    return (
        <Container maxW="container.xl">
            <VStack spacing={4} align="stretch">
                <Heading mb={6}>Admin Dashboard</Heading>
                <Box display="flex" justifyContent="space-between">
                    <Button onClick={() => setActiveView('Categories_rules')}>Kategorier og regelverk</Button>
                    <Button onClick={() => setActiveView('Items')}>Gjenstander</Button>
                </Box>

                {activeView === 'Categories_rules' && <DisplayCat_Rul />}
                {activeView === 'Items' && <DisplayItem />}
            </VStack>
        </Container>
    );
};

export default AdminPage;

import React, { useState } from 'react';
import {
  Box,
  Button,
  VStack,
  Heading,
  Container,
  useDisclosure
} from '@chakra-ui/react';
import GenericList from './GenericList';
import CreateCategory from './CRUCategory/CreateCategory';
import UpdateCategory from './CRUCategory/UpdateCategory';
import ReadCategory from './CRUCategory/ReadCategory';
import useCategoryCRUD from '../../hooks/useCategoriesCRUD';

const AdminPage = () => {
    const { categories, createCategory, updateCategory, deleteCategory, fetchCategory } = useCategoryCRUD();
    const { isOpen: isCreateOpen, onOpen: onCreateOpen, onClose: onCreateClose } = useDisclosure();
    const { isOpen: isUpdateOpen, onOpen: onUpdateOpen, onClose: onUpdateClose } = useDisclosure();
    const { isOpen: isViewOpen, onOpen: onViewOpen, onClose: onViewClose } = useDisclosure();
    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleAddCategory = () => {
        onCreateOpen();
    };

    const handleViewCategory = async (id: number) => {
        const category = await fetchCategory(id);
        setSelectedCategory(category);
        onViewOpen();
    };

    const handleEditCategory = async (id: number) => {
        const category = await fetchCategory(id);
        setSelectedCategory(category);
        onUpdateOpen();
    };

    const handleDeleteCategory = async (id: number) => {
        if (window.confirm("Er du sikker på at du vil slette denne kategorien?")) {
            await deleteCategory(id);
            alert("Category deleted successfully");
        }
    };

    return (
        <Container maxW="container.xl">
            <VStack spacing={4} align="stretch">
                <Heading mb={6}>Admin Dashboard</Heading>
                <Box display="flex" justifyContent="space-between">
                    <Button colorScheme="blue" onClick={handleAddCategory}>Legg til Ny Kategori</Button>
                </Box>

                <Box mt={10}>
                    <GenericList
                        items={categories.map(cat => ({ id: cat.kategoriid, name: cat.kategorinavn }))}
                        onAdd={handleAddCategory}
                        onEdit={handleEditCategory}
                        onDelete={handleDeleteCategory}
                        onView={handleViewCategory}
                        title="Kategorier"
                    />
                </Box>

                {isCreateOpen && (
                    <CreateCategory onClose={onCreateClose} onCreate={createCategory} isOpen={isCreateOpen} />
                )}

                {isUpdateOpen && selectedCategory && (
                    <UpdateCategory category={selectedCategory} onClose={onUpdateClose} onUpdate={updateCategory} isOpen={isUpdateOpen} />
                )}

                {isViewOpen && selectedCategory && (
                    <ReadCategory isOpen={isViewOpen} onClose={onViewClose} category={selectedCategory} />
                )}
            </VStack>
        </Container>
    );
};

export default AdminPage;

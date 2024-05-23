import React, { useState } from "react";
import {
  Box,
  Button,
  VStack,
  Container,
  useDisclosure,
  useToast
} from "@chakra-ui/react";
import GenericList from "./../GenericList";
import CreateCategory from "./../CRUCategory/CreateCategory";
import UpdateCategory from "./../CRUCategory/UpdateCategory";
import ReadCategory from "./../CRUCategory/ReadCategory";
import useCategoryCRUD from "../../../hooks/useCategoriesCRUD";

const DisplayCat = () => {
  const { categories, createCategory, updateCategory, deleteCategory, fetchCategory } = useCategoryCRUD();
  const toast = useToast();
  const { isOpen: isCreateOpen, onOpen: onCreateOpen, onClose: onCreateClose } = useDisclosure();
  const { isOpen: isUpdateOpen, onOpen: onUpdateOpen, onClose: onUpdateClose } = useDisclosure();
  const { isOpen: isViewOpen, onOpen: onViewOpen, onClose: onViewClose } = useDisclosure();
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Håndterer åpning av modalen for å legge til en ny kategori
  const handleAddCategory = () => {
    onCreateOpen();
  };

  // Håndterer visning av kategoridetaljer
  const handleViewCategory = async (id: number) => {
    const category = await fetchCategory(id);
    setSelectedCategory(category);
    onViewOpen();
  };

  // Håndterer åpning av modalen for å oppdatere en kategori
  const handleEditCategory = async (id: number) => {
    const category = await fetchCategory(id);
    setSelectedCategory(category);
    onUpdateOpen();
  };

  // Håndterer sletting av en kategori med bekreftelse via en Toast
  const handleDeleteCategory = (id: number) => {
    toast({
      title: "Er du sikker?",
      description: "Vil du virkelig slette denne kategorien?",
      status: "warning",
      duration: 9000,
      isClosable: true,
      position: "top",
      onCloseComplete: async () => {
        try {
          await deleteCategory(id);
          toast({
            title: "Kategori slettet",
            description: "Kategorien er vellykket slettet.",
            status: "success",
            duration: 5000,
            isClosable: true
          });
        } catch (error) {
          toast({
            title: "Feil ved sletting",
            description: "Kunne ikke slette kategorien.",
            status: "error",
            duration: 5000,
            isClosable: true
          });
        }
      }
    });
  };

  return (
    <Container maxW="container.xl">
      <Box mt={10}>
        <VStack spacing={4} align="stretch">
          <GenericList
            items={categories.map((cat) => ({
              id: cat.kategoriid,
              name: cat.kategorinavn,
              type: "category",
              subItems: [],
            }))}
            onAdd={handleAddCategory}
            onEdit={handleEditCategory}
            onDelete={handleDeleteCategory}
            onView={handleViewCategory}
            title="Kategorier"
          />
        </VStack>
      </Box>

      {isCreateOpen && (
        <CreateCategory
          onClose={onCreateClose}
          onCreate={createCategory}
          isOpen={isCreateOpen}
        />
      )}

      {isUpdateOpen && selectedCategory && (
        <UpdateCategory
          category={selectedCategory}
          onClose={onUpdateClose}
          onUpdate={updateCategory}
          isOpen={isUpdateOpen}
        />
      )}

      {isViewOpen && selectedCategory && (
        <ReadCategory
          isOpen={isViewOpen}
          onClose={onViewClose}
          category={selectedCategory}
        />
      )}
    </Container>
  );
};

export default DisplayCat;

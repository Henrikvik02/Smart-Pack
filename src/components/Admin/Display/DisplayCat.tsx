// DisplayCat.tsx
import React, { useState } from "react";
import {
  Box,
  Button,
  VStack,
  Container,
  useDisclosure,
} from "@chakra-ui/react";
import GenericList from "./../GenericList";
import CreateCategory from "./../CRUCategory/CreateCategory";
import UpdateCategory from "./../CRUCategory/UpdateCategory";
import ReadCategory from "./../CRUCategory/ReadCategory";
import useCategoryCRUD from "../../../hooks/useCategoriesCRUD";

const DisplayCat = () => {
  const {
    categories,
    createCategory,
    updateCategory,
    deleteCategory,
    fetchCategory,
  } = useCategoryCRUD();
  const {
    isOpen: isCreateOpen,
    onOpen: onCreateOpen,
    onClose: onCreateClose,
  } = useDisclosure();
  const {
    isOpen: isUpdateOpen,
    onOpen: onUpdateOpen,
    onClose: onUpdateClose,
  } = useDisclosure();
  const {
    isOpen: isViewOpen,
    onOpen: onViewOpen,
    onClose: onViewClose,
  } = useDisclosure();
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
      <Box mt={10}>
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

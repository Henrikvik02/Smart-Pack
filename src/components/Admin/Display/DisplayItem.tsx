import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Heading,
  useDisclosure,
} from "@chakra-ui/react";
import GenericList from "./../GenericList";
import CreateItem from "./../CRUItem/CreateItem";
import ReadItem from "./../CRUItem/ReadItem";
import UpdateItem from "./../CRUItem/UpdateItem";
import { useItems } from "../../../hooks/useItemsCRUD";
import { Item, Category } from "../../../services/object-service";
import useCategoryCRUD from "../../../hooks/useCategoriesCRUD";

const DisplayItem = () => {
  const { items, createItem, updateItem, deleteItem, readItem, loadAllItems } =
    useItems();
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
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const { categories } = useCategoryCRUD();

  useEffect(() => {
    loadAllItems(); // Forsikre deg om at denne funksjonen kaller API og setter data
  }, [loadAllItems]); // Avhengighet sikrer at den ikke kjøres mer enn nødvendig

  const handleAddItem = () => {
    onCreateOpen();
  };

  const handleViewItem = async (id: number) => {
    const item = await readItem(id);
    if (item !== undefined) {
      setSelectedItem(item);
      onViewOpen();
    } else {
      alert("Item not found");
      setSelectedItem(null);
    }
  };

  const handleEditItem = async (id: number) => {
    const item = await readItem(id);
    if (item !== undefined) {
      setSelectedItem(item);
      onUpdateOpen();
    } else {
      alert("Item not found for editing");
      setSelectedItem(null);
    }
  };

  const handleDeleteItem = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      await deleteItem(id);
      alert("Item deleted successfully");
    }
  };

  return (
    <Container maxW="container.xl">
      <Box my={10}>
        <Heading size="lg">Items Dashboard</Heading>
        <GenericList
          items={items.map((item) => ({
            id: item.gjenstandid,
            name: item.gjenstandnavn,
          }))}
          onAdd={handleAddItem}
          onEdit={handleEditItem}
          onDelete={handleDeleteItem}
          onView={handleViewItem}
          title="Items"
        />
      </Box>

      {isCreateOpen && (
        <CreateItem
          onClose={onCreateClose}
          onCreate={createItem}
          isOpen={isCreateOpen}
          categories={categories}
        />
      )}

      {isUpdateOpen && selectedItem && (
        <UpdateItem
          item={selectedItem}
          onClose={onUpdateClose}
          onUpdate={updateItem}
          isOpen={isUpdateOpen}
        />
      )}

      {isViewOpen && selectedItem && (
        <ReadItem
          isOpen={isViewOpen}
          onClose={onViewClose}
          itemDetails={selectedItem}
        />
      )}
    </Container>
  );
};

export default DisplayItem;

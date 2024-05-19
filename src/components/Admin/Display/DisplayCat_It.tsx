import React, { useEffect, useState } from "react";
import { Box, Button, useDisclosure } from "@chakra-ui/react";
import GenericList from "../GenericList";
import CreateItem from "../CRUItem/CreateItem";
import UpdateItem from "../CRUItem/UpdateItem";
import ReadItem from "../CRUItem/ReadItem";
import useCategoryCRUD from "../../../hooks/useCategoriesCRUD";
import { useItemsCRUD } from "../../../hooks/useItemsCRUD";
import { Item, Entity } from "../../../services/object-service";

const DisplayCat_It = () => {
  const { categories, fetchCategories } = useCategoryCRUD();
  const { items, createItem, updateItem, deleteItem, readItem, loadAllItems } =
    useItemsCRUD();
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
    isOpen: isReadOpen,
    onOpen: onReadOpen,
    onClose: onReadClose,
  } = useDisclosure();
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [currentCategoryId, setCurrentCategoryId] = useState<number | null>(
    null
  );

  useEffect(() => {
    fetchCategories();
    loadAllItems();
  }, [fetchCategories, loadAllItems]);

  const handleAddItem = (kategoriid: number) => {
    setCurrentCategoryId(kategoriid);
    onCreateOpen();
    console.log("Den har nådd handleAdd");
  };

  const handleViewItem = async (id: number) => {
    const item = await readItem(id);
    if (item) {
      setSelectedItem(item);
      onReadOpen();
    } else {
      console.error("Item not found");
    }
  };

  const handleEditItem = async (id: number) => {
    const item = await readItem(id);
    if (item) {
      setSelectedItem(item);
      onUpdateOpen();
    } else {
      console.error("Item not found");
    }
  };

  const handleDeleteItem = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      await deleteItem(id);
      loadAllItems(); // Reload items to update the list after deletion
    }
  };

  const transformItems = (items: Item[], kategoriid: number): Entity[] => items.map(item => ({
    id: item.gjenstandid,
    name: item.gjenstandnavn,
    subItems: [],
    kategoriid: kategoriid
  }));

  return (
    <Box>
      {categories.map((cat) => (
        <GenericList
          key={cat.kategoriid}
          items={[{
            id: cat.kategoriid,
            name: cat.kategorinavn,
            subItems: transformItems(items.filter(item => item.kategoriid === cat.kategoriid), cat.kategoriid)
          }]}
          onAdd={() => {}}
          onEdit={() => {}}
          onDelete={() => {}}
          onView={() => {}}
          title={`${cat.kategorinavn} med gjenstander`}
          renderSubList={(subItems) => (
            <GenericList
              items={subItems}
              onAdd={() => handleAddItem(cat.kategoriid)}
              onEdit={handleEditItem}
              onDelete={handleDeleteItem}
              onView={handleViewItem}
              title="Gjenstander"
            />
          )}
        />
      ))}

      {isCreateOpen && currentCategoryId !== null && (
        <CreateItem
          isOpen={isCreateOpen}
          onClose={() => {
            onCreateClose();
            setCurrentCategoryId(null); // Reset currentCategoryId after closing the modal
          }}
          onCreate={createItem}
          categories={categories}
          initialCategoryId={currentCategoryId} // Bruker den forhåndsinnstilte kategori IDen
        />
      )}

      {isUpdateOpen && selectedItem && (
        <UpdateItem
          isOpen={isUpdateOpen}
          onClose={onUpdateClose}
          onUpdate={updateItem}
          item={selectedItem}
          categories={categories}
        />
      )}
      {isReadOpen && selectedItem && (
        <ReadItem
          isOpen={isReadOpen}
          onClose={onReadClose}
          itemDetails={selectedItem}
          categories={categories}
        />
      )}
    </Box>
  );
};

export default DisplayCat_It;

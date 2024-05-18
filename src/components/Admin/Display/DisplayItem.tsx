import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Heading,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import GenericList from "../GenericList";
import CreateItem from "../CRUItem/CreateItem";
import ReadItem from "../CRUItem/ReadItem";
import UpdateItem from "../CRUItem/UpdateItem";
import ReadRule from "../CRURule/ReadRule";
import { useItemsCRUD } from "../../../hooks/useItemsCRUD";
import { Item, Category, Rule } from "../../../services/object-service";
import useCategoryCRUD from "../../../hooks/useCategoriesCRUD";
import { useRulesCRUD } from "../../../hooks/useRulesCRUD";

const DisplayItem = () => {
  const { items, createItem, updateItem, deleteItem, readItem, loadAllItems } =
    useItemsCRUD();
  const { categories, fetchCategories } = useCategoryCRUD();
  const {
    getRulesByCategoryId,
    linkRuleToItem,
    getRulesByItemId,
    unlinkRuleFromItem,
    unlinkRuleFromItemWithItemid,
  } = useRulesCRUD();
  const [itemRules, setItemRules] = useState<Rule[]>([]);
  const toast = useToast();

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
  const {
    isOpen: isRuleDetailsOpen,
    onOpen: onRuleDetailsOpen,
    onClose: onRuleDetailsClose,
  } = useDisclosure();

  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [selectedRule, setSelectedRule] = useState<Rule | null>(null);
  const [categoryRules, setCategoryRules] = useState<Rule[]>([]);
  const [selectedRuleIds, setSelectedRuleIds] = useState<number[]>([]);
  const onOpenUpdateModal = () => {
    onUpdateOpen();
  };

  useEffect(() => {
    fetchCategories();
    loadAllItems();
  }, []);

  const handleViewItem = async (id: number) => {
    const item = await readItem(id);
    if (item) {
      setSelectedItem(item);
      getRulesByItemId(item.gjenstandid) // Forsikrer oss om at vi venter på dataen
        .then((rules) => {
          if (rules.length > 0) {
            setItemRules(rules);
          } else {
            setItemRules([]); // Setter tom liste om det ikke er regler
            toast({
              title: "Info",
              description: "No rules found for this item.",
              status: "info",
              duration: 5000,
              isClosable: true,
            });
          }
        })
        .catch((error) => {
          toast({
            title: "Error loading rules",
            description: error.message || "Unable to fetch rules.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
          setItemRules([]); // Tømmer regler hvis det er en feil
        });
      onViewOpen();
    } else {
      toast({
        title: "Error",
        description: "Item not found",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleAddItem = async (selectedCategoryId: number) => {
    if (selectedCategoryId) {
      const rules = await getRulesByCategoryId(selectedCategoryId);
      setCategoryRules(rules);
    }
    onCreateOpen();
  };

  const handleUpdateItem = async (
    id: number,
    itemData: {
      gjenstandnavn: string;
      gjenstandbeskrivelse: string;
      kategoriid: number;
    },
    selectedRuleIds: number[]
  ) => {
    try {
      await updateItem(id, itemData);
  
      const unlinkPromises = itemRules.map(async (rule) => {
        await unlinkRuleFromItem(id, rule.regelverkid);
      });
      await Promise.all(unlinkPromises);
  
      const linkPromises = selectedRuleIds.map(async (ruleId) => {
        await linkRuleToItem({
          gjenstandid: id,
          regelverkid: ruleId,
        });
      });
      await Promise.all(linkPromises);
  
      toast({
        title: "Item Updated",
        description: "Item and rules updated successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onUpdateClose(); // Lukker update-modalen etter vellykket operasjon
    } catch (error) {
      toast({
        title: "Update Error",
        description: `Update failed:`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };
  

  const handleEdit = (id: number) => {
    const currentItem = items.find((item) => item.gjenstandid === id);
    if (currentItem) {
      setSelectedItem(currentItem);
      onOpenUpdateModal(); // Correctly invoke to open the update modal
    } else {
      toast({
        title: "Error",
        description: "Item not found",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  
  const handleDeleteItem = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this item and all its rules?")) {
      try {
        console.log(`Starting to unlink all rules from item ID: ${id}`);
        await unlinkRuleFromItemWithItemid(id);
        console.log(`All rules unlinked for item ID: ${id}`);
  
        console.log(`Starting to delete item ID: ${id}`);
        await deleteItem(id);
        console.log(`Item ID: ${id} deleted`);
  
        toast({
          title: "Item Deleted",
          description: "Item and all associated rules have been successfully deleted.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } catch (error) {
        console.error(`Failed to delete item ID: ${id}`, error);
        toast({
          title: "Deletion Error",
          description: `Failed to delete the item and its rules`,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
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
            type: "items",
            subItems: [],
          }))}
          onAdd={() => handleAddItem(1)}
          onEdit={handleEdit}
          onDelete={handleDeleteItem}
          onView={handleViewItem}
          title="Items"
        />
      </Box>

      {isCreateOpen && selectedItem && (
        <CreateItem
          isOpen={isCreateOpen}
          onClose={onCreateClose}
          onCreate={(itemData, selectedRuleIds) =>
            createItem(itemData).then((newItemId) => {
              selectedRuleIds.forEach(async (ruleId) => {
                await linkRuleToItem({
                  gjenstandid: newItemId,
                  regelverkid: ruleId,
                });
              });
            })
          }
          categories={categories}
          rules={categoryRules}
        />
      )}

      {isUpdateOpen && selectedItem && (
        <UpdateItem
          isOpen={isUpdateOpen}
          onClose={onUpdateClose}
          onUpdate={(updatedItemData, selectedRuleIds) =>
            handleUpdateItem(
              selectedItem.gjenstandid,
              updatedItemData,
              selectedRuleIds
            )
          }
          item={selectedItem}
          categories={categories}
        />
      )}

      {isViewOpen && selectedItem && (
        <ReadItem
          isOpen={isViewOpen}
          onClose={onViewClose}
          itemDetails={selectedItem}
          categories={categories}
          rules={itemRules}
        />
      )}

      {isRuleDetailsOpen && selectedRule && (
        <ReadRule
          isOpen={isRuleDetailsOpen}
          onClose={onRuleDetailsClose}
          ruleDetails={selectedRule}
          categories={categories}
        />
      )}
    </Container>
  );
};

export default DisplayItem;

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

  //Håndterer lesing av gjenstand 
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
              title: "Feil",
              description: "Ingen regler var funnet for denne gjenstanden.",
              status: "info",
              duration: 5000,
              isClosable: true,
            });
          }
        })
        .catch((error) => {
          toast({
            title: "Feil med lasting av regler",
            description: error.message || "Feil på henting regler.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
          setItemRules([]); // Tømmer regler hvis det er en feil
        });
      onViewOpen();
    } else {
      toast({
        title: "Feil",
        description: "Gjenstand ikke funne",
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

  // Håndterer oppdatering av gjenstand
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
      onUpdateClose();
    } catch (error) {
    }
  };
  
  // Håndterer oppdatering av en gjenstand
  const handleEdit = (id: number) => {
    const currentItem = items.find((item) => item.gjenstandid === id);
    if (currentItem) {
      setSelectedItem(currentItem);
      onOpenUpdateModal(); 
    } else {
      toast({
        title: "Feil",
        description: "Gjenstanden ble ikke funnet",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // Håndterer sletting av en gjenstand med en bekreftelsesdialog via Toast
  const handleDeleteItem = async (id: number) => {
    toast({
      title: "Er du sikker på at du vil slette denne gjenstanden og alle dens regler?",
      status: "warning",
      duration: null,
      isClosable: true,
      position: "top",
      onCloseComplete: async () => {
        try {
          await unlinkRuleFromItemWithItemid(id);
          await deleteItem(id);
          toast({
            title: "Gjenstand slettet",
            description: "Gjenstanden og alle tilknyttede regler har blitt slettet.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        } catch (error) {
          toast({
            title: "Slettefeil",
            description: "Det oppstod en feil ved sletting av gjenstanden.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      }
    });
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

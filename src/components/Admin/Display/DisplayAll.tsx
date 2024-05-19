import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  VStack,
  Container,
  useDisclosure,
  useToast,
  Heading,
} from "@chakra-ui/react";
import FullList from "../FullList";
import CreateCategory from "./../CRUCategory/CreateCategory";
import UpdateCategory from "./../CRUCategory/UpdateCategory";
import ReadCategory from "./../CRUCategory/ReadCategory";
import useCategoryCRUD from "../../../hooks/useCategoriesCRUD";
import { useItemsCRUD } from "../../../hooks/useItemsCRUD";
import { useRulesCRUD } from "../../../hooks/useRulesCRUD";
import { Item, Rule, Category, Entity } from "../../../services/object-service";
import UpdateItem from "../CRUItem/UpdateItem";
import ReadItem from "../CRUItem/ReadItem";
import ReadRule from "../CRURule/ReadRule";
import CreateItem from "../CRUItem/CreateItem";
import UpdateRule from "../CRURule/UpdateRule";
import CreateRule from "../CRURule/CreateRule";

const DisplayAll = () => {
  const {
    categories,
    createCategory,
    updateCategory,
    deleteCategory,
    fetchCategory,
    fetchCategories,
  } = useCategoryCRUD();
  const {
    isOpen: isCreateCategoryOpen,
    onOpen: onCreateCategoryOpen,
    onClose: onCreateCategoryClose,
  } = useDisclosure();
  const {
    isOpen: isUpdateCategoryOpen,
    onOpen: onUpdateCategoryOpen,
    onClose: onUpdateCategoryClose,
  } = useDisclosure();
  const {
    isOpen: isViewCategoryOpen,
    onOpen: onViewCategoryOpen,
    onClose: onViewCategoryClose,
  } = useDisclosure();
  const {
    isOpen: isCreateItemOpen,
    onOpen: onCreateItemOpen,
    onClose: onCreateItemClose,
  } = useDisclosure();
  const {
    isOpen: isUpdateItemOpen,
    onOpen: onUpdateItemOpen,
    onClose: onUpdateItemClose,
  } = useDisclosure();
  const {
    isOpen: isViewItemOpen,
    onOpen: onViewItemOpen,
    onClose: onViewItemClose,
  } = useDisclosure();
  const {
    isOpen: isCreateRuleOpen,
    onOpen: onCreateRuleOpen,
    onClose: onCreateRuleClose,
  } = useDisclosure();
  const {
    isOpen: isUpdateRuleOpen,
    onOpen: onUpdateRuleOpen,
    onClose: onUpdateRuleClose,
  } = useDisclosure();
  const {
    isOpen: isViewRuleOpen,
    onOpen: onViewRuleOpen,
    onClose: onViewRuleClose,
  } = useDisclosure();
  const {
    isOpen: isRuleDetailsOpen,
    onOpen: onRuleDetailsOpen,
    onClose: onRuleDetailsClose,
  } = useDisclosure();
  const {
    isOpen: isViewOpen,
    onOpen: onViewOpen,
    onClose: onViewClose,
  } = useDisclosure();
  const {
    isOpen: isUpdateOpen,
    onOpen: onUpdateOpen,
    onClose: onUpdateClose,
  } = useDisclosure();
  const { items, createItem, updateItem, deleteItem, readItem, loadAllItems } =
    useItemsCRUD();
  const {
    rules,
    createRule,
    updateRule,
    deleteRule,
    getRuleById,
    fetchAllRules,
    getRulesByCategoryId,
    linkRuleToItem,
    getRulesByItemId,
    unlinkRuleFromItem,
    unlinkRuleFromItemWithRuleid,
    unlinkRuleFromItemWithItemid,
  } = useRulesCRUD();
  const [itemRules, setItemRules] = useState<Rule[]>([]);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [selectedRule, setSelectedRule] = useState<Rule | null>(null);
  const [categoryRules, setCategoryRules] = useState<Rule[]>([]);
  const [selectedRuleIds, setSelectedRuleIds] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const onOpenUpdateModal = () => {
    onUpdateOpen();
  };
  const toast = useToast();

  useEffect(() => {
    fetchCategories();
    loadAllItems();
    fetchAllRules();
  }, []);

  const handleAddCategory = () => {
    fetchCategories();
    loadAllItems();
    fetchAllRules();
    onCreateCategoryOpen();
  };

  const handleViewCategory = async (kategoriid: number) => {
    const category = await fetchCategory(kategoriid);
    console.log("Fetched category:", category);
    setSelectedCategory(category);
    onViewCategoryOpen();
  };

  const handleEditCategory = async (kategoriid: number) => {
    const category = await fetchCategory(kategoriid);
    setSelectedCategory(category);
    onUpdateCategoryOpen();
  };

  const handleDeleteCategory = async (kategoriid: number) => {
    if (window.confirm("Er du sikker på at du vil slette denne kategorien?")) {
      await deleteCategory(kategoriid);
      alert("Category deleted successfully");
    }
  };

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
    console.log("Attempting to add item to category ID:", selectedCategoryId);
    if (selectedCategoryId) {
      const rules = await getRulesByCategoryId(selectedCategoryId);
      console.log("Fetched rules for category:", rules);
      setCategoryRules(rules);
    }
    onCreateItemOpen();
  };

  const handleEditItem = (id: number) => {
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

  const handleDeleteItem = async (gjenstandid: number) => {
    if (
      window.confirm(
        "Are you sure you want to delete this item and all its rules?"
      )
    ) {
      try {
        await unlinkRuleFromItemWithItemid(gjenstandid);
        await deleteItem(gjenstandid);
        toast({
          title: "Item Deleted",
          description:
            "Item and all associated rules have been successfully deleted.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } catch (error) {
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

  const handleAddRule = (selectedCategoryId: number) => {
    if (selectedCategoryId) {
      onCreateRuleOpen();
    } else {
      toast({
        title: "No Category Selected",
        description: "Please select a category before adding a rule.",
        status: "info",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleViewRule = async (regelverkid: number) => {
    const rule = await getRuleById(regelverkid);
    if (rule) {
      const enrichedRule = {
        ...rule,
        kategorinavn:
          categories.find((cat) => cat.kategoriid === rule.kategoriid)
            ?.kategorinavn || "Unknown Category",
      };
      setSelectedRule(enrichedRule);
      onViewRuleOpen();
    } else {
      alert("Rule not found");
    }
  };

  const handleEditRule = async (regelverkid: number) => {
    const rule = await getRuleById(regelverkid);
    if (rule) {
      const enrichedRule = {
        ...rule,
        kategorinavn:
          categories.find((cat) => cat.kategoriid === rule.kategoriid)
            ?.kategorinavn || "Unknown Category",
      };
      setSelectedRule(enrichedRule);
      onUpdateRuleOpen();
    } else {
      alert("Rule not found for editing");
    }
  };

  const handleDeleteRule = async (regelverkid: number) => {
    if (window.confirm("Are you sure you want to delete this rule?")) {
      try {
        // Unlink the rule from items
        await unlinkRuleFromItemWithRuleid(regelverkid);
        
        // Delete the rule itself
        await deleteRule(regelverkid);
        
        toast({
          title: "Rule Deleted",
          description: "Rule and its associations have been deleted successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } catch (error) {
        toast({
          title: "Deletion Error",
          description: `Failed to delete the rule and its associations.`,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  const renderRulesList = (subRules: Rule[], categoryId: number): Entity[] => {
    return subRules
      .filter((rule) => rule.kategoriid === categoryId)
      .map((rule) => ({
        id: rule.regelverkid,
        name: rule.betingelse,
        type: "rule",
        subItems: [],
      }));
  };

  const renderItemsList = (subItems: Item[], categoryId: number): Entity[] => {
    return subItems
      .filter((item) => item.kategoriid === categoryId)
      .map((item) => ({
        id: item.gjenstandid,
        name: item.gjenstandnavn,
        type: "item",
        subItems: [],
      }));
  };

  return (
    <Container maxW="container.xl">
      <Box mt={10}>
        <FullList
          items={categories.map((cat) => ({
            id: cat.kategoriid,
            name: cat.kategorinavn,
            type: "category",
            subItems: [
              ...renderRulesList(rules, cat.kategoriid),
              ...renderItemsList(items, cat.kategoriid),
            ],
          }))}
          onAddCategory={handleAddCategory}
          onEditCategory={handleEditCategory}
          onDeleteCategory={handleDeleteCategory}
          onViewCategory={(categoryId) => {
            handleViewCategory(categoryId);
          }}
          onAddRule={handleAddRule}
          onEditRule={handleEditRule}
          onDeleteRule={handleDeleteRule}
          onViewRule={handleViewRule}
          onAddItem={handleAddItem}
          onEditItem={handleEditItem }
          onDeleteItem={handleDeleteItem}
          onViewItem={handleViewItem}
          title="Categories"
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </Box>

      {isCreateRuleOpen && !selectedRule && (
        <CreateRule
          onClose={onCreateRuleClose}
          onCreate={createRule}
          isOpen={isCreateRuleOpen}
          categories={categories}
          selectedCategoryId={
            selectedCategory ? selectedCategory.kategoriid : undefined
          }
        />
      )}

      {isUpdateRuleOpen && selectedRule && (
        <UpdateRule
          rule={selectedRule}
          onClose={onUpdateRuleClose}
          onUpdate={updateRule}
          isOpen={isUpdateRuleOpen}
          categories={categories}
        />
      )}

      {isViewRuleOpen && selectedRule && (
        <ReadRule
          isOpen={isViewRuleOpen}
          onClose={onViewRuleClose}
          ruleDetails={selectedRule}
          categories={categories}
        />
      )}

      {isCreateCategoryOpen && !selectedCategory && (
        <CreateCategory
          onClose={onCreateCategoryClose}
          onCreate={createCategory}
          isOpen={isCreateCategoryOpen}
        />
      )}

      {isUpdateCategoryOpen && selectedCategory && (
        <UpdateCategory
          category={selectedCategory}
          onClose={onUpdateCategoryClose}
          onUpdate={updateCategory}
          isOpen={isUpdateCategoryOpen}
        />
      )}

      {isViewCategoryOpen && selectedCategory && (
        <ReadCategory
          isOpen={isViewCategoryOpen}
          onClose={onViewCategoryClose}
          category={selectedCategory}
        />
      )}

      {isCreateItemOpen && !selectedItem && (
        <CreateItem
          isOpen={isCreateItemOpen}
          onClose={onCreateItemClose}
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

export default DisplayAll;

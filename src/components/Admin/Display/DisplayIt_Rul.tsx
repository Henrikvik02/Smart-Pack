import React, { useEffect, useState } from "react";
import { Box, useDisclosure } from "@chakra-ui/react";
import GenericList from "../GenericList";
import CreateRuleTagComponent from "../CRuleTag/CreateRuleTag";
import ReadRule from "../CRURule/ReadRule";
import useCategoryCRUD from "../../../hooks/useCategoriesCRUD";
import { useItemsCRUD } from "../../../hooks/useItemsCRUD";
import { useRulesCRUD } from "../../../hooks/useRulesCRUD";
import { Item, Entity, RuleTag } from "../../../services/object-service";

const DisplayIt_Rul = () => {
  const { categories, fetchCategories } = useCategoryCRUD();
  const { items, loadAllItems } = useItemsCRUD();
  const { rules, fetchAllRules, getRulesByItemId, linkRuleToItem, unlinkRuleFromItem } = useRulesCRUD();
  const { isOpen: isCreateOpen, onOpen: onCreateOpen, onClose: onCreateClose } = useDisclosure();
  const { isOpen: isReadOpen, onOpen: onReadOpen, onClose: onReadClose } = useDisclosure();
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [selectedRuleTags, setSelectedRuleTags] = useState<RuleTag[]>([]);

  useEffect(() => {
    fetchCategories();
    loadAllItems();
    fetchAllRules();
  }, [fetchCategories, loadAllItems, fetchAllRules]);

  const handleViewItem = async (id: number) => {
    const rules = await getRulesByItemId(id);
    setSelectedRuleTags(rules); // Oppdaterer state med regler, selv tom liste
    onReadOpen();
  };
  
  const handleDeleteRuleTag = async (regelverktagid: number) => {
    await unlinkRuleFromItem(regelverktagid);
    if (selectedItem) {
      const updatedRules = await getRulesByItemId(selectedItem.gjenstandid);
      setSelectedRuleTags(updatedRules); // Oppdaterer state med nye regler eller tom liste
    }
  };

  const handleAddRuleTag = async (gjenstandId: number) => { // Her burde linkRuleToItem brukes
    onCreateOpen();
    setSelectedItem(items.find(item => item.gjenstandid === gjenstandId) || null);
  };    

  const renderItemSubList = (item: Item) => (
    <GenericList
      items={selectedRuleTags.map(ruleTag => ({
        id: ruleTag.regelverktagid,
        name: `${rules.find(rule => rule.regelverkid === ruleTag.regelverkid)?.betingelse} - ${rules.find(rule => rule.regelverkid === ruleTag.regelverkid)?.verdi}`,
        subItems: []
      }))}
      onAdd={() => handleAddRuleTag(item.gjenstandid)}
      onEdit={() => {}}
      onDelete={handleDeleteRuleTag}
      onView={() => {}}
      title="Regelverk"
    />
  );

  return (
    <Box>
      <GenericList
        items={items.map(item => ({
          id: item.gjenstandid,
          name: item.gjenstandnavn,
          subItems: [],
          renderSubList: () => renderItemSubList(item)
        }))}
        onAdd={() => {}}
        onEdit={() => {}}
        onDelete={() => {}}
        onView={handleViewItem}
        title="Gjenstander med tilknyttede regelverk"
      />

      {isCreateOpen && selectedItem && (
        <CreateRuleTagComponent
          isOpen={isCreateOpen}
          onClose={() => {
            onCreateClose();
            setSelectedItem(null); // Reset selected item after closing modal
          }}
          gjenstandId={selectedItem.gjenstandid}
        />
      )}

      {isReadOpen && selectedRuleTags.length > 0 && (
        <ReadRule
          isOpen={isReadOpen}
          onClose={onReadClose}
          ruleDetails={selectedRuleTags.map(tag => rules.find(rule => rule.regelverkid === tag.regelverkid))}
          categories={categories}
        />
      )}
    </Box>
  );
};

export default DisplayIt_Rul;

import React, { useEffect, useState } from "react";
import { Box, useDisclosure } from "@chakra-ui/react";
import GenericList from "../GenericList";
import CreateRule from "../CRURule/CreateRule";
import UpdateRule from "../CRURule/UpdateRule";
import ReadRule from "../CRURule/ReadRule";
import { useRulesCRUD } from "../../../hooks/useRulesCRUD";
import useCategoryCRUD from "../../../hooks/useCategoriesCRUD";
import { Rule, Entity } from "../../../services/object-service";

const DisplayCat_Rul = () => {
  const { categories, fetchCategories } = useCategoryCRUD();
  const { rules, fetchAllRules, createRule, updateRule, deleteRule, getRuleById } = useRulesCRUD();
  const { isOpen: isCreateOpen, onOpen: onCreateOpen, onClose: onCreateClose } = useDisclosure();
  const { isOpen: isUpdateOpen, onOpen: onUpdateOpen, onClose: onUpdateClose } = useDisclosure();
  const { isOpen: isReadOpen, onOpen: onReadOpen, onClose: onReadClose } = useDisclosure();
  const [selectedRule, setSelectedRule] = useState<Rule | null>(null);

  useEffect(() => {
    fetchCategories();
    fetchAllRules();
  }, [fetchCategories, fetchAllRules]);

  const handleAddRule = () => {
    onCreateOpen();
  };

  const handleViewItem = async (id: number) => {
    const rule = await getRuleById(id);
    if (rule) {
      setSelectedRule(rule);
      onReadOpen();
    } else {
      console.error("Rule not found");
    }
  };

  const handleEditRule = async (id: number) => {
    const rule = await getRuleById(id);
    if (rule) {
      setSelectedRule(rule);
      onUpdateOpen();
    } else {
      console.error("Rule not found");
    }
  };

  const handleDeleteRule = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this rule?")) {
      await deleteRule(id);
      fetchAllRules();
    }
  };

  const transformRules = (rules: Rule[], kategoriid: number): Entity[] => {
    return rules.filter(rule => rule.kategoriid === kategoriid).map(rule => ({
      id: rule.regelverkid,
      name: rule.betingelse + ": " + rule.verdi, // Customize display info as needed
      subItems: [], // assuming no further nesting
      kategoriid: kategoriid
    }));
  };

  const renderItemSubList = (kategoriid: number, rules: Entity[]): JSX.Element => (
    <GenericList
      items={rules}
      onAdd={() => handleAddRule()}
      onEdit={handleEditRule}
      onDelete={handleDeleteRule}
      onView={handleViewItem}
      title={`${categories.find(cat => cat.kategoriid === kategoriid)?.kategorinavn}, med regler`}
    />
  );

  return (
    <Box>
      {categories.map((cat) => (
        <GenericList
          key={cat.kategoriid}
          items={[{
            id: cat.kategoriid,
            name: cat.kategorinavn,
            subItems: transformRules(rules, cat.kategoriid),
            kategoriid: cat.kategoriid
          }]}
          onAdd={() => {}}
          onEdit={() => {}}
          onDelete={() => {}}
          onView={() => {}}
          title={cat.kategorinavn + ", med regler"}
          renderSubList={() => renderItemSubList(cat.kategoriid, transformRules(rules, cat.kategoriid))}
        />
      ))}

      {isCreateOpen && (
        <CreateRule
          isOpen={isCreateOpen}
          onClose={onCreateClose}
          onCreate={createRule}
          categories={categories}
        />
      )}

      {isUpdateOpen && selectedRule && (
        <UpdateRule
          isOpen={isUpdateOpen}
          onClose={onUpdateClose}
          onUpdate={updateRule}
          rule={selectedRule}
          categories={categories}
        />
      )}

      {isReadOpen && selectedRule && (
        <ReadRule
          isOpen={isReadOpen}
          onClose={onReadClose}
          ruleDetails={selectedRule}
          categories={categories}
        />
      )}
    </Box>
  );
};

export default DisplayCat_Rul;

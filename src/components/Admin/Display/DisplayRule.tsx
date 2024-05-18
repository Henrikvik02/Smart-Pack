import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Heading,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import GenericList from "./../GenericList";
import CreateRule from "./../CRURule/CreateRule";
import ReadRule from "./../CRURule/ReadRule";
import UpdateRule from "./../CRURule/UpdateRule";
import { useRulesCRUD } from "../../../hooks/useRulesCRUD";
import useCategoryCRUD from "../../../hooks/useCategoriesCRUD";
import { Rule } from "../../../services/object-service";

const DisplayRule = () => {
  const {
    rules,
    createRule,
    updateRule,
    deleteRule,
    getRuleById,
    fetchAllRules,
    unlinkRuleFromItemWithRuleid,
  } = useRulesCRUD();
  const { categories } = useCategoryCRUD();
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
  const [selectedRule, setSelectedRule] = useState<Rule | null>(null);
  const toast = useToast();

  useEffect(() => {
    fetchAllRules();
  }, [fetchAllRules]);

  const handleAddRule = () => {
    onCreateOpen();
  };

  const handleViewRule = async (id: number) => {
    const rule = await getRuleById(id);
    if (rule) {
      const enrichedRule = {
        ...rule,
        kategorinavn:
          categories.find((cat) => cat.kategoriid === rule.kategoriid)
            ?.kategorinavn || "Unknown Category",
      };
      setSelectedRule(enrichedRule);
      onViewOpen();
    } else {
      alert("Rule not found");
    }
  };

  const handleEditRule = async (id: number) => {
    const rule = await getRuleById(id);
    if (rule) {
      const enrichedRule = {
        ...rule,
        kategorinavn:
          categories.find((cat) => cat.kategoriid === rule.kategoriid)
            ?.kategorinavn || "Unknown Category",
      };
      setSelectedRule(enrichedRule);
      onUpdateOpen();
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
  

  return (
    <Container maxW="container.xl">
      <Box my={10}>
        <Heading size="lg">Rules Dashboard</Heading>
        <GenericList
          items={rules.map((rule) => ({
            id: rule.regelverkid,
            name: `${rule.betingelse} - ${
              categories.find((cat) => cat.kategoriid === rule.kategoriid)
                ?.kategorinavn || "Unknown Category"
            }`,
            type: "rule", 
            subItems: [],
          }))}
          onAdd={handleAddRule}
          onEdit={handleEditRule}
          onDelete={handleDeleteRule}
          onView={handleViewRule}
          title="Rules"
        />
      </Box>

      {isCreateOpen && (
        <CreateRule
          onClose={onCreateClose}
          onCreate={createRule}
          isOpen={isCreateOpen}
          categories={categories}
        />
      )}

      {isUpdateOpen && selectedRule && (
        <UpdateRule
          rule={selectedRule}
          onClose={onUpdateClose}
          onUpdate={updateRule}
          isOpen={isUpdateOpen}
          categories={categories}
        />
      )}

      {isViewOpen && selectedRule && (
        <ReadRule
          isOpen={isViewOpen}
          onClose={onViewClose}
          ruleDetails={selectedRule}
          categories={categories}
        />
      )}
    </Container>
  );
};

export default DisplayRule;
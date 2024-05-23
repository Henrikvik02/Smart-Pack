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
  const { rules, createRule, updateRule, deleteRule, getRuleById, fetchAllRules, unlinkRuleFromItemWithRuleid } = useRulesCRUD();
  const { categories } = useCategoryCRUD();
  const { isOpen: isCreateOpen, onOpen: onCreateOpen, onClose: onCreateClose } = useDisclosure();
  const { isOpen: isUpdateOpen, onOpen: onUpdateOpen, onClose: onUpdateClose } = useDisclosure();
  const { isOpen: isViewOpen, onOpen: onViewOpen, onClose: onViewClose } = useDisclosure();
  const [selectedRule, setSelectedRule] = useState<Rule | null>(null);
  const toast = useToast();

  useEffect(() => {
    fetchAllRules(); // Hent alle regler ved komponentens oppstart
  }, [fetchAllRules]);

  // Legger til en ny regel
  const handleAddRule = () => {
    onCreateOpen();
  };

  // Viser detaljer for en regel
  const handleViewRule = async (id: number) => {
    const rule = await getRuleById(id);
    if (rule) {
      const enrichedRule = {
        ...rule,
        kategorinavn: categories.find((cat) => cat.kategoriid === rule.kategoriid)?.kategorinavn || "Ukjent kategori",
      };
      setSelectedRule(enrichedRule);
      onViewOpen();
    } else {
      toast({
        title: "Feil",
        description: "Regelen ble ikke funnet.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // Starter oppdatering av en regel
  const handleEditRule = async (id: number) => {
    const rule = await getRuleById(id);
    if (rule) {
      setSelectedRule(rule);
      onUpdateOpen();
    } else {
      toast({
        title: "Feil",
        description: "Regelen for redigering ble ikke funnet.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // Sletter en regel
  const handleDeleteRule = async (regelverkid: number) => {
    if (confirm("Er du sikker på at du vil slette denne regelen?")) {
      try {
        await unlinkRuleFromItemWithRuleid(regelverkid);
        await deleteRule(regelverkid);
        toast({
          title: "Regel slettet",
          description: "Regelen og dens tilknytninger er vellykket slettet.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } catch (error) {
        toast({
          title: "Slettefeil",
          description: `Det oppstod en feil ved sletting av regelen.`,
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
        <Heading size="lg">Regelverk Dashboard</Heading>
        <GenericList
          items={rules.map((rule) => ({
            id: rule.regelverkid,
            name: `${rule.betingelse} - ${categories.find((cat) => cat.kategoriid === rule.kategoriid)?.kategorinavn || "Ukjent kategori"}`,
            type: "rule",
            subItems: [],
          }))}
          onAdd={handleAddRule}
          onEdit={handleEditRule}
          onDelete={handleDeleteRule}
          onView={handleViewRule}
          title="Regler"
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

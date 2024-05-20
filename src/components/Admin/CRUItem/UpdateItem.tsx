import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Checkbox,
  Stack,
  useToast,
  Box,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { Category, Item, Rule } from "../../../services/object-service";
import { useRulesCRUD } from "../../../hooks/useRulesCRUD";
import { EditIcon, ViewIcon } from "@chakra-ui/icons";
import ReadRule from "../CRURule/ReadRule";

interface UpdateItemProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (
    itemData: {
      gjenstandnavn: string;
      gjenstandbeskrivelse: string;
      kategoriid: number;
    },
    selectedRuleIds: number[]
  ) => Promise<void>;
  item: Item;
  categories: Category[];
}

const UpdateItem: React.FC<UpdateItemProps> = ({
  isOpen,
  onClose,
  onUpdate,
  item,
  categories,
}) => {
  const [gjenstandnavn, setGjenstandnavn] = useState(item.gjenstandnavn);
  const [gjenstandbeskrivelse, setGjenstandbeskrivelse] = useState(
    item.gjenstandbeskrivelse
  );
  const [selectedKategoriId, setSelectedKategoriId] = useState(item.kategoriid);
  const [rules, setRules] = useState<Rule[]>([]);
  const [selectedRuleIds, setSelectedRuleIds] = useState<number[]>([]);
  const [canEditRules, setCanEditRules] = useState(false);
  const [isRuleDetailsOpen, setIsRuleDetailsOpen] = useState(false);
  const [selectedRule, setSelectedRule] = useState<Rule | null>(null);
  const {
    getRulesByItemId,
    getRulesByCategoryId,
    unlinkRuleFromItemWithItemid,
  } = useRulesCRUD();
  const toast = useToast();

  useEffect(() => {
    if (selectedKategoriId) {
      getRulesByCategoryId(selectedKategoriId).then(setRules);
    }
    getRulesByItemId(item.gjenstandid)
      .then((rules) => {
        const ruleIds = rules.map((rule) => rule.regelverkid); // Transform Rule[] to number[]
        setSelectedRuleIds(ruleIds);
      })
      .catch((error) => {
        console.error("Failed to fetch rules for item:", error);
        setSelectedRuleIds([]);
      });
  }, [
    selectedKategoriId,
    item.gjenstandid,
    getRulesByCategoryId,
    getRulesByItemId,
  ]);

  const handleViewDetails = (rule: Rule) => {
    console.log("Viewing details for rule:", rule); // Check if this logs when you click the icon
    setSelectedRule(rule);
    setIsRuleDetailsOpen(true);
  };

  const handleEditRules = async () => {
    // Attempt to unlink all rules associated with this item
    try {
      await unlinkRuleFromItemWithItemid(item.gjenstandid);
      toast({
        title: "Rules Unlinked",
        description: "All rules have been unlinked from the item.",
        status: "info",
        duration: 5000,
        isClosable: true,
      });
      setCanEditRules(true);
      // Clear the current selections after unlinking
      setSelectedRuleIds([]);

      // Reload rules to allow user to select new ones
      const newRules = await getRulesByCategoryId(selectedKategoriId);
      setRules(newRules);
    } catch (error) {
      console.error("Failed to unlink rules for item:", error);
      toast({
        title: "Unlink Error",
        description: "There was an error unlinking the rules.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleUpdate = async () => {
    try {
      const updatedItemData = {
        gjenstandnavn: gjenstandnavn,
        gjenstandbeskrivelse: gjenstandbeskrivelse,
        kategoriid: selectedKategoriId,
      };

      // Pass både updatedItemData og selectedRuleIds til onUpdate funksjonen
      await onUpdate(updatedItemData, selectedRuleIds);

      toast({
        title: "Item Updated",
        description: "Item has been successfully updated.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      toast({
        title: "Update Error",
        description: "There was an error updating the item.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const modalBg = useColorModeValue("gray.50", "gray.800");

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent bg={modalBg}>
        <ModalHeader>Oppdater gjenstand</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl isRequired>
            <FormLabel>Navn på gjenstand</FormLabel>
            <Input
              value={gjenstandnavn}
              onChange={(e) => setGjenstandnavn(e.target.value)}
            />
          </FormControl>
          <FormControl mt={4} isRequired>
            <FormLabel>Beskrivelse av gjenstand</FormLabel>
            <Input
              value={gjenstandbeskrivelse}
              onChange={(e) => setGjenstandbeskrivelse(e.target.value)}
            />
          </FormControl>
          <FormControl mt={4} isRequired>
            <FormLabel>Kategori</FormLabel>
            <Select
              value={selectedKategoriId}
              onChange={(e) => setSelectedKategoriId(Number(e.target.value))}
              placeholder="Select a category"
            >
              {categories.map((category) => (
                <option key={category.kategoriid} value={category.kategoriid}>
                  {category.kategorinavn}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Regelverker</FormLabel>
            <Stack spacing={2}>
              {rules.map((rule) => (
                <Box key={rule.regelverkid} display="flex" alignItems="center">
                  <IconButton
                    icon={<ViewIcon />}
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent the event from propagating to parent elements
                      handleViewDetails(rule);
                    }}
                    aria-label="View details"
                    variant="outline"
                    colorScheme="blue"
                    _focus={{
                      boxShadow: "0 0 0 3px #FFFF10",
                    }}
                    size="sm"
                    marginTop="1"
                    marginLeft="1"
                    marginRight="4"
                  />
                  <Checkbox
                    isChecked={selectedRuleIds.includes(rule.regelverkid)}
                    onChange={(e) => {
                      if (canEditRules) {
                        // Only allow changes if editing is enabled
                        const index = selectedRuleIds.indexOf(rule.regelverkid);
                        if (index === -1) {
                          setSelectedRuleIds([
                            ...selectedRuleIds,
                            rule.regelverkid,
                          ]);
                        } else {
                          setSelectedRuleIds(
                            selectedRuleIds.filter(
                              (id) => id !== rule.regelverkid
                            )
                          );
                        }
                      }
                    }}
                    isDisabled={!canEditRules} // Disable checkbox based on canEditRules state
                  >
                    {rule.betingelse} - {rule.verdi}
                  </Checkbox>
                </Box>
              ))}
            </Stack>
          </FormControl>
          <IconButton
            icon={<EditIcon />}
            variant="outline"
            colorScheme="yellow"
            _focus={{
              boxShadow: "0 0 0 3px #FFFF10",
            }}
            mt={4}
            onClick={handleEditRules}
            aria-label={"Edit"}
          ></IconButton>
        </ModalBody>
        <ModalFooter>
          <Button
            variant="outline"
            colorScheme="yellow"
            _focus={{
              boxShadow: "0 0 0 3px #FFFF10",
            }}
            mr={3}
            onClick={handleUpdate}
          >
            Oppdater
          </Button>
          <Button
            variant="outline"
            colorScheme="red"
            _focus={{
              boxShadow: "0 0 0 3px #FFFF10",
            }}
            onClick={onClose}
          >
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>

      {isRuleDetailsOpen && selectedRule && (
        <ReadRule
          isOpen={isRuleDetailsOpen}
          onClose={() => setIsRuleDetailsOpen(false)}
          ruleDetails={selectedRule}
          categories={categories}
        />
      )}
    </Modal>
  );
};

export default UpdateItem;

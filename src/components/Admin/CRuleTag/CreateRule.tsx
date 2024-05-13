import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Select,
  useToast
} from '@chakra-ui/react';

import { CreateRuleTag } from '../../../services/object-service'; // Adjust path if necessary
import { useRulesCRUD } from '../../../hooks/useRulesCRUD';

interface CreateRuleTagProps {
  isOpen: boolean;
  onClose: () => void;
  gjenstandId: number;
}

const CreateRuleTagComponent: React.FC<CreateRuleTagProps> = ({ isOpen, onClose, gjenstandId }) => {
  const [selectedRuleId, setSelectedRuleId] = useState<number | null>(null);
  const { rules, fetchAllRules, linkRuleToItem } = useRulesCRUD();
  const toast = useToast();

  useEffect(() => {
    fetchAllRules();
  }, [fetchAllRules]);

  const handleLinkRule = async () => {
    if (!selectedRuleId) {
      toast({
        title: "Error",
        description: "Please select a rule",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      const CreateRuleTag: CreateRuleTag = {
        gjenstandid: gjenstandId,
        regelverkid: selectedRuleId
      };
      await linkRuleToItem(CreateRuleTag);
      toast({
        title: "Rule Linked",
        description: "Rule has been successfully linked to the item.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onClose();
    } catch (error: any) {
      toast({
        title: "Error Linking Rule",
        description: error.message || "An error occurred while linking the rule.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Link a Rule to an Item</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Rule</FormLabel>
            <Select placeholder="Select rule" onChange={e => setSelectedRuleId(Number(e.target.value))}>
              {rules.map(rule => (
                <option key={rule.regelverkid} value={rule.regelverkid}>
                  {`${rule.betingelse} - ${rule.verdi} (${rule.regelverkbeskrivelse})`}
                </option>
              ))}
            </Select>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleLinkRule}>
            Link Rule
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateRuleTagComponent;

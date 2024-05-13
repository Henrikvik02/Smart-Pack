import React, { useState } from 'react';
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
  useToast
} from '@chakra-ui/react';

import { CreateItem } from '../../../services/object-service';

interface CreateItemProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (itemData: CreateItem) => void;
  kategoriid?: number;
}

const CreateItem: React.FC<CreateItemProps> = ({ isOpen, onClose, onCreate, kategoriid }) => {
  const [gjenstandnavn, setGjenstandnavn] = useState('');
  const [gjenstandbeskrivelse, setGjenstandbeskrivelse] = useState('');
  const toast = useToast();

  const handleCreate = () => {
    onCreate({
      gjenstandnavn,
      gjenstandbeskrivelse,
      kategoriid: kategoriid!
    });
    toast({
      title: 'Item created',
      description: 'The item was successfully created.',
      status: 'success',
      duration: 5000,
      isClosable: true
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create New Item</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl isRequired>
            <FormLabel>Item Name</FormLabel>
            <Input value={gjenstandnavn} onChange={(e) => setGjenstandnavn(e.target.value)} placeholder="Enter item name" />
          </FormControl>
          <FormControl mt={4} isRequired>
            <FormLabel>Item Description</FormLabel>
            <Input value={gjenstandbeskrivelse} onChange={(e) => setGjenstandbeskrivelse(e.target.value)} placeholder="Enter item description" />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleCreate}>
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateItem;

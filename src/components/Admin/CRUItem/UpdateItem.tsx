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
  Input
} from '@chakra-ui/react';

import { Item, UpdateItem } from '../../../services/object-service';

interface UpdateItemProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (id: number, itemData: UpdateItem) => void;
  item: Item;
}

const UpdateItem: React.FC<UpdateItemProps> = ({ isOpen, onClose, onUpdate, item }) => {
  const [gjenstandnavn, setGjenstandnavn] = useState(item.gjenstandnavn);
  const [gjenstandbeskrivelse, setGjenstandbeskrivelse] = useState(item.gjenstandbeskrivelse);

  const handleUpdate = () => {
    onUpdate(item.gjenstandid, {
      gjenstandnavn,
      gjenstandbeskrivelse,
      kategoriid: item.kategoriid
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update Item</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl isRequired>
            <FormLabel>Item Name</FormLabel>
            <Input value={gjenstandnavn} onChange={(e) => setGjenstandnavn(e.target.value)} />
          </FormControl>
          <FormControl mt={4} isRequired>
            <FormLabel>Item Description</FormLabel>
            <Input value={gjenstandbeskrivelse} onChange={(e) => setGjenstandbeskrivelse(e.target.value)} />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleUpdate}>
            Update
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UpdateItem;

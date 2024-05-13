import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Text
} from '@chakra-ui/react';

import { Item } from '../../../services/object-service';

interface ReadItemProps {
  isOpen: boolean;
  onClose: () => void;
  item: Item;
}

const ReadItem: React.FC<ReadItemProps> = ({ isOpen, onClose, item }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Item Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Text fontWeight="bold">Name:</Text>
          <Text mb={4}>{item.gjenstandnavn}</Text>
          <Text fontWeight="bold">Description:</Text>
          <Text>{item.gjenstandbeskrivelse}</Text>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ReadItem;

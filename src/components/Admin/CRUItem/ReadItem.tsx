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

interface ReadItemProps {
  isOpen: boolean;
  onClose: () => void;
  itemDetails: {
    gjenstandnavn: string;
    gjenstandbeskrivelse: string;
    kategoriid?: number; 
  };
}

const ReadItem: React.FC<ReadItemProps> = ({ isOpen, onClose, itemDetails }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Item Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Text fontWeight="bold">Name:</Text>
          <Text mb={4}>{itemDetails.gjenstandnavn}</Text>
          <Text fontWeight="bold">Description:</Text>
          <Text>{itemDetails.gjenstandbeskrivelse}</Text>
          {itemDetails.kategoriid && (
            <>
              <Text fontWeight="bold">Category ID:</Text>
              <Text>{itemDetails.kategoriid}</Text>
            </>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ReadItem;

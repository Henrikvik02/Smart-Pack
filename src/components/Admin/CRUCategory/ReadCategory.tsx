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

interface ReadCategoryProps {
  isOpen: boolean;
  onClose: () => void;
  category: { kategorinavn: string; kategoribeskrivelse: string; };
}

const ReadCategory: React.FC<ReadCategoryProps> = ({ isOpen, onClose, category }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Kategoridetaljer</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Text fontWeight="bold">Navn:</Text>
          <Text mb={4}>{category.kategorinavn}</Text>
          <Text fontWeight="bold">Beskrivelse:</Text>
          <Text>{category.kategoribeskrivelse}</Text>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ReadCategory;

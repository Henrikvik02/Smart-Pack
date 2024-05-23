import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Text,
  useToast,
} from '@chakra-ui/react';

interface ReadCategoryProps {
  isOpen: boolean;
  onClose: () => void;
  category: { kategorinavn: string; kategoribeskrivelse: string; };
}

/**
 * Komponent for å vise detaljer om en kategori.
 * @param isOpen - Boolean som styrer om modalen er åpen.
 * @param onClose - Funksjon som kalles for å lukke modalen.
 * @param category - Objekt som inneholder informasjon om kategorien.
 */
const ReadCategory: React.FC<ReadCategoryProps> = ({ isOpen, onClose, category }) => {

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Detaljer om Kategorien</ModalHeader>
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

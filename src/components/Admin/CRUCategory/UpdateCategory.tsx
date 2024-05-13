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

interface UpdateCategoryProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (id: number, category: { kategorinavn: string; kategoribeskrivelse: string; }) => void;
  category: { kategoriid: number; kategorinavn: string; kategoribeskrivelse: string; };
}

const UpdateCategory: React.FC<UpdateCategoryProps> = ({ isOpen, onClose, onUpdate, category }) => {
  const [kategorinavn, setKategorinavn] = useState(category.kategorinavn);
  const [kategoribeskrivelse, setKategoribeskrivelse] = useState(category.kategoribeskrivelse);

  const handleUpdate = () => {
    onUpdate(category.kategoriid, { kategorinavn, kategoribeskrivelse });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Oppdater Kategori</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Kategorinavn</FormLabel>
            <Input value={kategorinavn} onChange={(e) => setKategorinavn(e.target.value)} />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Kategoribeskrivelse</FormLabel>
            <Input value={kategoribeskrivelse} onChange={(e) => setKategoribeskrivelse(e.target.value)} />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleUpdate}>
            Oppdater
          </Button>
          <Button onClick={onClose}>Avbryt</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UpdateCategory;

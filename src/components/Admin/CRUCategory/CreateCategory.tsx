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

interface CreateCategoryProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (category: { kategorinavn: string; kategoribeskrivelse: string; }) => void;
}

const CreateCategory: React.FC<CreateCategoryProps> = ({ isOpen, onClose, onCreate }) => {
  const [kategorinavn, setKategorinavn] = useState('');
  const [kategoribeskrivelse, setKategoribeskrivelse] = useState('');
  const toast = useToast();

  const handleCreate = () => {
    onCreate({ kategorinavn, kategoribeskrivelse });
    toast({
      title: "Kategori opprettet.",
      description: "Ny kategori ble vellykket lagt til.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Opprett Ny Kategori</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Kategorinavn</FormLabel>
            <Input value={kategorinavn} onChange={(e) => setKategorinavn(e.target.value)} placeholder="Navn på kategori" />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Kategoribeskrivelse</FormLabel>
            <Input value={kategoribeskrivelse} onChange={(e) => setKategoribeskrivelse(e.target.value)} placeholder="Beskrivelse av kategori" />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleCreate}>
            Lagre
          </Button>
          <Button onClick={onClose}>Avbryt</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateCategory;

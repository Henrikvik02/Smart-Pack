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

interface UpdateItemProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (id: number, itemData: { gjenstandnavn: string; gjenstandbeskrivelse: string; kategoriid?: number; }) => void;
  item: { gjenstandid: number; gjenstandnavn: string; gjenstandbeskrivelse: string; kategoriid?: number; };
}

const UpdateItem: React.FC<UpdateItemProps> = ({ isOpen, onClose, onUpdate, item }) => {
  const [gjenstandnavn, setGjenstandnavn] = useState(item.gjenstandnavn);
  const [gjenstandbeskrivelse, setGjenstandbeskrivelse] = useState(item.gjenstandbeskrivelse);
  const toast = useToast();

  const handleUpdate = () => {
    onUpdate(item.gjenstandid, {
      gjenstandnavn,
      gjenstandbeskrivelse,
      kategoriid: item.kategoriid // Pass kategoriid if it's available, it may be undefined which is handled by optional chaining
    });
    toast({
      title: "Gjenstand opprettet.",
      description: "Ny gjenstand ble vellykket lagt til.",
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

import React, { useState } from "react";
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
  useToast,
  Select,
} from "@chakra-ui/react";
import { Category } from "../../../services/object-service";

interface CreateItemProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (itemData: {
    gjenstandnavn: string;
    gjenstandbeskrivelse: string;
    kategoriid: number;
  }) => void;
  categories: Category[];
}

const CreateItem: React.FC<CreateItemProps> = ({
  isOpen,
  onClose,
  onCreate,
  categories,
}) => {
  const [gjenstandnavn, setGjenstandnavn] = useState("");
  const [gjenstandbeskrivelse, setGjenstandbeskrivelse] = useState("");
  const [selectedKategoriId, setSelectedKategoriId] = useState<number>(0);
  const toast = useToast();

  const handleCreate = () => {
    if (gjenstandnavn && gjenstandbeskrivelse && selectedKategoriId) {
      onCreate({
        gjenstandnavn,
        gjenstandbeskrivelse,
        kategoriid: selectedKategoriId,
      });
      toast({
        title: "Gjenstand opprettet.",
        description: "Ny gjenstand ble vellykket lagt til.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onClose();
    } else {
      toast({
        title: "Validation Error",
        description: "Please fill all required fields including category.",
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
        <ModalHeader>Create New Item</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl isRequired>
            <FormLabel>Item Name</FormLabel>
            <Input
              value={gjenstandnavn}
              onChange={(e) => setGjenstandnavn(e.target.value)}
              placeholder="Enter item name"
            />
          </FormControl>
          <FormControl mt={4} isRequired>
            <FormLabel>Item Description</FormLabel>
            <Input
              value={gjenstandbeskrivelse}
              onChange={(e) => setGjenstandbeskrivelse(e.target.value)}
              placeholder="Enter item description"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Category</FormLabel>
            <Select
              placeholder="Select category"
              onChange={(e) => setSelectedKategoriId(Number(e.target.value))}
            >
              {categories.map((category) => (
                <option key={category.kategoriid} value={category.kategoriid}>
                  {category.kategorinavn}
                </option>
              ))}
            </Select>
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

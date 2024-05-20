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
  useColorModeValue,
} from "@chakra-ui/react";

interface UpdateCategoryProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (
    id: number,
    category: { kategorinavn: string; kategoribeskrivelse: string }
  ) => void;
  category: {
    kategoriid: number;
    kategorinavn: string;
    kategoribeskrivelse: string;
  };
}

const UpdateCategory: React.FC<UpdateCategoryProps> = ({
  isOpen,
  onClose,
  onUpdate,
  category,
}) => {
  const [kategorinavn, setKategorinavn] = useState(category.kategorinavn);
  const [kategoribeskrivelse, setKategoribeskrivelse] = useState(
    category.kategoribeskrivelse
  );

  const handleUpdate = () => {
    onUpdate(category.kategoriid, { kategorinavn, kategoribeskrivelse });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Oppdater kategori</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Navn på kategorien</FormLabel>
            <Input
              value={kategorinavn}
              onChange={(e) => setKategorinavn(e.target.value)}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Beskrivelse av kategorien</FormLabel>
            <Input
              value={kategoribeskrivelse}
              onChange={(e) => setKategoribeskrivelse(e.target.value)}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            variant="outline"
            colorScheme="yellow"
            _focus={{
              boxShadow: "0 0 0 3px #FFFF10",
            }}
            mr={3}
            onClick={handleUpdate}
          >
            Oppdater
          </Button>
          <Button
            variant="outline"
            colorScheme="red"
            _focus={{
              boxShadow: "0 0 0 3px #FFFF10",
            }}
            onClick={onClose}
          >
            Avbryt
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UpdateCategory;

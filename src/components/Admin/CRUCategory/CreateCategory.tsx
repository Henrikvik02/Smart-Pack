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
} from "@chakra-ui/react";

interface CreateCategoryProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (category: {
    kategorinavn: string;
    kategoribeskrivelse: string;
  }) => void;
}

/**
 * Komponent for å opprette en ny kategori.
 * @param isOpen - Boolean som styrer om modalen er åpen eller ikke.
 * @param onClose - Funksjon for å lukke modalen.
 * @param onCreate - Funksjon som kalles for å opprette en ny kategori.
 */
const CreateCategory: React.FC<CreateCategoryProps> = ({
  isOpen,
  onClose,
  onCreate,
}) => {
  const [kategorinavn, setKategorinavn] = useState("");
  const [kategoribeskrivelse, setKategoribeskrivelse] = useState("");
  const toast = useToast();

  const handleCreate = () => {
    if (!kategorinavn.trim() || !kategoribeskrivelse.trim()) {
      toast({
        title: "Feil",
        description: "Begge feltene må fylles ut.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    onCreate({ kategorinavn, kategoribeskrivelse });
    toast({
      title: "Kategori opprettet",
      description: "Ny kategori ble vellykket lagt til.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Opprett ny kategori</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Navn på kategori</FormLabel>
            <Input
              value={kategorinavn}
              onChange={(e) => setKategorinavn(e.target.value)}
              placeholder="Skriv inn navn på kategorien"
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Beskrivelse av kategori</FormLabel>
            <Input
              value={kategoribeskrivelse}
              onChange={(e) => setKategoribeskrivelse(e.target.value)}
              placeholder="Skriv inn beskrivelse av kategorien"
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            variant="solid"
            colorScheme="green"
            _focus={{
              boxShadow: "0 0 0 3px #FFFF10",
            }}
            mr={3}
            onClick={handleCreate}
          >
            Lagre
          </Button>
          <Button
            variant="solid"
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

export default CreateCategory;

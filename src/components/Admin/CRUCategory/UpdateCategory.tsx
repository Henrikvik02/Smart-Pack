import React, { useState, useEffect } from "react";
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

/**
 * Komponent for å oppdatere en kategori.
 * Gir brukeren mulighet til å endre navn og beskrivelse på en eksisterende kategori.
 * 
 * @param isOpen - Boolean som styrer om modalen er åpen.
 * @param onClose - Funksjon som kalles for å lukke modalen.
 * @param onUpdate - Funksjon som oppdaterer kategorien i databasen.
 * @param category - Objekt som inneholder kategoriens nåværende data.
 */
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
  const toast = useToast();

  // Effekt for å oppdatere komponentens tilstand når `category` endres.
  useEffect(() => {
    setKategorinavn(category.kategorinavn);
    setKategoribeskrivelse(category.kategoribeskrivelse);
  }, [category]);

  const handleUpdate = async () => {
    try {
      await onUpdate(category.kategoriid, { kategorinavn, kategoribeskrivelse });
      toast({
        title: "Kategori Oppdatert",
        description: "Kategorien ble vellykket oppdatert.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      // Feilhåndtering med toast melding
      toast({
        title: "Oppdateringsfeil",
        description: "Det oppstod en feil under oppdatering av kategorien. Prøv igjen senere.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };  

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Oppdater Kategori</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Navn på kategorien</FormLabel>
            <Input
              value={kategorinavn}
              onChange={(e) => setKategorinavn(e.target.value)}
              placeholder="Skriv inn nytt navn"
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Beskrivelse av kategorien</FormLabel>
            <Input
              value={kategoribeskrivelse}
              onChange={(e) => setKategoribeskrivelse(e.target.value)}
              placeholder="Skriv inn ny beskrivelse"
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
            onClick={handleUpdate}
          >
            Oppdater
          </Button>
          <Button variant="solid"
            colorScheme="red"
            _focus={{
              boxShadow: "0 0 0 3px #FFFF10",
            }} onClick={onClose}>
            Avbryt
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UpdateCategory;

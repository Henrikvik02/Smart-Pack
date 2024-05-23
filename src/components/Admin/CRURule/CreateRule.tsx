import React, { useEffect, useState } from "react";
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
  Switch,
  Select,
  useToast,
} from "@chakra-ui/react";
import { CreateRule, Category } from "../../../services/object-service";

interface CreateRuleProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (ruleData: CreateRule) => Promise<void>;
  categories: Category[];
  selectedCategoryId?: number;
}

/**
 * Komponent for å opprette nye regler.
 * Lar brukeren legge til regler med spesifikke betingelser og verdier.
 * Integrerer med et gitt sett av kategorier for tilknytning.
 */
const CreateRuleComponent: React.FC<CreateRuleProps> = ({
  isOpen,
  onClose,
  onCreate,
  categories,
  selectedCategoryId,
}) => {
  const [kategoriid, setKategoriid] = useState<number>(0);
  const [betingelse, setBetingelse] = useState("");
  const [verdi, setVerdi] = useState("");
  const [tillatthandbagasje, setTillatthandbagasje] = useState(false);
  const [tillattinnsjekketbagasje, setTillattinnsjekketbagasje] = useState(false);
  const [regelverkbeskrivelse, setRegelverkbeskrivelse] = useState("");
  const toast = useToast();

  useEffect(() => {
    if (selectedCategoryId) {
      setKategoriid(selectedCategoryId);
    }
  }, [selectedCategoryId]);

  const handleCreate = async () => {
    try {
      await onCreate({
        kategoriid,
        betingelse,
        verdi,
        tillatthandbagasje,
        tillattinnsjekketbagasje,
        regelverkbeskrivelse,
      });
      toast({
        title: "Regel opprettet",
        description: "En ny regel ble vellykket opprettet.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      toast({
        title: "Feil ved oppretting av regel",
        description: "Det oppstod en feil under oppretting av regelen.",
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
        <ModalHeader>Opprett et nytt regelverk</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl isRequired>
            <FormLabel>Kategori</FormLabel>
            <Select
              placeholder="Velg en kategori"
              value={kategoriid}
              onChange={(e) => setKategoriid(Number(e.target.value))}
            >
              {categories.map((category) => (
                <option key={category.kategoriid} value={category.kategoriid}>
                  {category.kategorinavn}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl mt={4} isRequired>
            <FormLabel>Betingelsen</FormLabel>
            <Input
              value={betingelse}
              onChange={(e) => setBetingelse(e.target.value)}
              placeholder="Angi betingelsen"
            />
          </FormControl>
          <FormControl mt={4} isRequired>
            <FormLabel>Verdi</FormLabel>
            <Input
              value={verdi}
              onChange={(e) => setVerdi(e.target.value)}
              placeholder="Angi verdi"
            />
          </FormControl>
          <FormControl mt={4} display="flex" alignItems="center">
            <FormLabel mb={0}>Tillatt i håndbagasje</FormLabel>
            <Switch
              isChecked={tillatthandbagasje}
              onChange={(e) => setTillatthandbagasje(e.target.checked)}
            />
          </FormControl>
          <FormControl mt={4} display="flex" alignItems="center">
            <FormLabel mb={0}>Tillatt i innsjekket bagasje</FormLabel>
            <Switch
              isChecked={tillattinnsjekketbagasje}
              onChange={(e) => setTillattinnsjekketbagasje(e.target.checked)}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Regelbeskrivelse</FormLabel>
            <Input
              value={regelverkbeskrivelse}
              onChange={(e) => setRegelverkbeskrivelse(e.target.value)}
              placeholder="Angi regelbeskrivelse"
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button
            variant="outline"
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

export default CreateRuleComponent;

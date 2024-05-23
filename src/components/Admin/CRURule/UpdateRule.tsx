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
  Switch,
  Select,
  useToast
} from "@chakra-ui/react";
import { Category } from "../../../services/object-service";

interface UpdateRuleProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (
    regelverkid: number,
    ruleData: {
      kategoriid: number;
      betingelse: string;
      verdi: string;
      tillatthandbagasje: boolean;
      tillattinnsjekketbagasje: boolean;
      regelverkbeskrivelse: string;
    }
  ) => Promise<void>;
  rule: {
    regelverkid: number;
    kategoriid: number;
    betingelse: string;
    verdi: string;
    tillatthandbagasje: boolean;
    tillattinnsjekketbagasje: boolean;
    regelverkbeskrivelse: string;
  };
  categories: Category[];
}

const UpdateRule: React.FC<UpdateRuleProps> = ({
  isOpen,
  onClose,
  onUpdate,
  rule,
  categories,
}) => {
  const [kategoriid, setKategoriid] = useState<number>(rule.kategoriid);
  const [betingelse, setBetingelse] = useState(rule.betingelse);
  const [verdi, setVerdi] = useState(rule.verdi);
  const [tillatthandbagasje, setTillatthandbagasje] = useState(rule.tillatthandbagasje);
  const [tillattinnsjekketbagasje, setTillattinnsjekketbagasje] = useState(rule.tillattinnsjekketbagasje);
  const [regelverkbeskrivelse, setRegelverkbeskrivelse] = useState(rule.regelverkbeskrivelse);
  const toast = useToast();

  // Funksjon for å håndtere oppdateringen av et regelverk
  const handleUpdate = async () => {
    try {
      await onUpdate(rule.regelverkid, {
        kategoriid,
        betingelse,
        verdi,
        tillatthandbagasje,
        tillattinnsjekketbagasje,
        regelverkbeskrivelse,
      });
      toast({
        title: "Regelverk oppdatert",
        description: "Regelverket er vellykket oppdatert.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      toast({
        title: "Feil under oppdatering",
        description: "Det oppstod en feil under oppdateringen av regelverket.",
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
        <ModalHeader>Oppdater Regelverk</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl isRequired>
            <FormLabel>Kategori</FormLabel>
            <Select
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
            <FormLabel>Betingelse</FormLabel>
            <Input
              value={betingelse}
              onChange={(e) => setBetingelse(e.target.value)}
            />
          </FormControl>
          <FormControl mt={4} isRequired>
            <FormLabel>Verdi</FormLabel>
            <Input value={verdi} onChange={(e) => setVerdi(e.target.value)} />
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
            <FormLabel>Beskrivelse av regelverket</FormLabel>
            <Input
              value={regelverkbeskrivelse}
              onChange={(e) => setRegelverkbeskrivelse(e.target.value)}
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

export default UpdateRule;

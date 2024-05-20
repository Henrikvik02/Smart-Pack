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
  useColorModeValue,
} from "@chakra-ui/react";
import { CreateRule, Category } from "../../../services/object-service";

interface CreateRuleProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (ruleData: CreateRule) => void;
  categories: Category[];
  selectedCategoryId?: number;
}

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
  const [tillattinnsjekketbagasje, setTillattinnsjekketbagasje] =
    useState(false);
  const [regelverkbeskrivelse, setRegelverkbeskrivelse] = useState("");
  const toast = useToast();

  useEffect(() => {
    if (selectedCategoryId) {
      setKategoriid(selectedCategoryId);
    }
  }, [selectedCategoryId, isOpen]);

  const handleCreate = () => {
    onCreate({
      kategoriid,
      betingelse,
      verdi,
      tillatthandbagasje,
      tillattinnsjekketbagasje,
      regelverkbeskrivelse,
    });
    toast({
      title: "Rule Created",
      description: "A new rule has been successfully created.",
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
        <ModalHeader>Opprett et nytt regelverk</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl isRequired>
            <FormLabel>Kategori</FormLabel>
            <Select
              placeholder="Select a category"
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
            <FormLabel>Betingelsen på regelverket</FormLabel>
            <Input
              value={betingelse}
              onChange={(e) => setBetingelse(e.target.value)}
              placeholder="Enter condition"
            />
          </FormControl>
          <FormControl mt={4} isRequired>
            <FormLabel>Verdien av betingelsen</FormLabel>
            <Input
              value={verdi}
              onChange={(e) => setVerdi(e.target.value)}
              placeholder="Enter value"
            />
          </FormControl>
          <FormControl mt={4} display="flex" alignItems="center">
            <FormLabel mb={0}>Tillat i handbaggasje</FormLabel>
            <Switch
              isChecked={tillatthandbagasje}
              onChange={(e) => setTillatthandbagasje(e.target.checked)}
              ml={2}
            />
          </FormControl>
          <FormControl mt={4} display="flex" alignItems="center">
            <FormLabel mb={0}>Tillatt i innsjekketbaggasje</FormLabel>
            <Switch
              isChecked={tillattinnsjekketbagasje}
              onChange={(e) => setTillattinnsjekketbagasje(e.target.checked)}
              ml={2}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Beskrivelse av regelverket</FormLabel>
            <Input
              value={regelverkbeskrivelse}
              onChange={(e) => setRegelverkbeskrivelse(e.target.value)}
              placeholder="Enter rule description"
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

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
  Checkbox,
  Stack,
  useToast,
  Select,
  IconButton,
  Box,
} from "@chakra-ui/react";
import { ViewIcon } from "@chakra-ui/icons";
import { Category, Rule } from "../../../services/object-service";
import { useRulesCRUD } from "../../../hooks/useRulesCRUD";
import ReadRule from "../CRURule/ReadRule";

interface CreateItemProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (
    itemData: {
      gjenstandnavn: string;
      gjenstandbeskrivelse: string;
      kategoriid: number;
    },
    selectedRuleIds: number[]
  ) => Promise<void>;
  categories: Category[];
  initialCategoryId?: number | null;
  rules: Rule[];
}

const CreateItem: React.FC<CreateItemProps> = ({
  isOpen,
  onClose,
  onCreate,
  categories,
  initialCategoryId,
}) => {
  const [gjenstandnavn, setGjenstandnavn] = useState("");
  const [gjenstandbeskrivelse, setGjenstandbeskrivelse] = useState("");
  const [selectedKategoriId, setSelectedKategoriId] = useState<number | null>(
    initialCategoryId || null
  );
  const [rules, setRules] = useState<Rule[]>([]);
  const [selectedRuleIds, setSelectedRuleIds] = useState<number[]>([]);
  const { getRulesByCategoryId } = useRulesCRUD();
  const toast = useToast();
  const [isRuleDetailsOpen, setIsRuleDetailsOpen] = useState(false);
  const [selectedRule, setSelectedRule] = useState<Rule | null>(null);

  useEffect(() => {
    // Last inn regler for valgt kategori ved endring
    if (selectedKategoriId) {
      getRulesByCategoryId(selectedKategoriId)
        .then(setRules)
        .catch((error) => {
          toast({
            title: "Feil ved lasting av regler",
            description: error.message,
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        });
    }
  }, [selectedKategoriId, getRulesByCategoryId, toast]);

  // Håndterer opprettelsen av en ny gjenstand
  const handleCreate = async () => {
    if (gjenstandnavn && gjenstandbeskrivelse && selectedKategoriId != null) {
      try {
        await onCreate(
          {
            gjenstandnavn,
            gjenstandbeskrivelse,
            kategoriid: selectedKategoriId,
          },
          selectedRuleIds
        );
        toast({
          title: "Gjenstand opprettet",
          description: "Ny gjenstand ble vellykket lagt til og koblet til regler.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        onClose();
      } catch (error) {
        toast({
          title: "Feil ved opprettelse",
          description: "Det oppstod en feil under oppretting av gjenstanden. Vennligst prøv igjen.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } else {
      toast({
        title: "Valideringsfeil",
        description: "Vennligst fyll ut alle nødvendige felter og velg minst én regel.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // Vis detaljer for en spesifikk regel
  const handleViewDetails = (rule: Rule) => {
    setSelectedRule(rule);
    setIsRuleDetailsOpen(true);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Opprett en ny gjenstand</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isRequired>
              <FormLabel>Navn på gjenstanden</FormLabel>
              <Input
                value={gjenstandnavn}
                onChange={(e) => setGjenstandnavn(e.target.value)}
                placeholder="Skriv inn navnet på gjenstanden"
              />
            </FormControl>
            <FormControl mt={4} isRequired>
              <FormLabel>Beskrivelse av gjenstanden</FormLabel>
              <Input
                value={gjenstandbeskrivelse}
                onChange={(e) => setGjenstandbeskrivelse(e.target.value)}
                placeholder="Skriv inn beskrivelse av gjenstanden"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Tilhørende kategori</FormLabel>
              <Select
                value={selectedKategoriId ?? ""}
                onChange={(e) => setSelectedKategoriId(Number(e.target.value))}
                placeholder="Velg en kategori"
                isReadOnly={initialCategoryId !== null} // Skrivebeskyttet hvis initialCategoryId er satt
              >
                {categories.map((category) => (
                  <option key={category.kategoriid} value={category.kategoriid}>
                    {category.kategorinavn}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Regelverk</FormLabel>
              <Stack spacing={2}>
                {rules.map((rule) => (
                  <Box
                    key={rule.regelverkid}
                    display="flex"
                    alignItems="center"
                  >
                    <IconButton
                      icon={<ViewIcon />}
                      onClick={() => handleViewDetails(rule)}
                      aria-label="Vis detaljer"
                      variant="outline"
                      colorScheme="blue"
                      size="sm"
                      marginRight="4"
                    />
                    <Checkbox
                      isChecked={selectedRuleIds.includes(rule.regelverkid)}
                      onChange={(e) => {
                        const index = selectedRuleIds.indexOf(rule.regelverkid);
                        if (index === -1) {
                          setSelectedRuleIds([...selectedRuleIds, rule.regelverkid]);
                        } else {
                          setSelectedRuleIds(selectedRuleIds.filter(id => id !== rule.regelverkid));
                        }
                      }}
                    >
                      {`${rule.betingelse} - ${rule.verdi}`}
                    </Checkbox>
                  </Box>
                ))}
              </Stack>
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

      {isRuleDetailsOpen && selectedRule && (
        <ReadRule
          isOpen={isRuleDetailsOpen}
          onClose={() => setIsRuleDetailsOpen(false)}
          ruleDetails={selectedRule}
          categories={categories}
        />
      )}
    </>
  );
};

export default CreateItem;

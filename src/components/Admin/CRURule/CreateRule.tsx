import React, { useEffect, useState } from 'react';
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
} from '@chakra-ui/react';
import { CreateRule, Category } from '../../../services/object-service';

interface CreateRuleProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (ruleData: CreateRule) => void;
  categories: Category[];
  selectedCategoryId?: number | number;
}

const CreateRuleComponent: React.FC<CreateRuleProps> = ({ isOpen, onClose, onCreate, categories, selectedCategoryId }) => {
  const [kategoriid, setKategoriid] = useState<number>(0);
  const [betingelse, setBetingelse] = useState('');
  const [verdi, setVerdi] = useState('');
  const [tillatthandbagasje, setTillatthandbagasje] = useState(false);
  const [tillattinnsjekketbagasje, setTillattinnsjekketbagasje] = useState(false);
  const [regelverkbeskrivelse, setRegelverkbeskrivelse] = useState('');
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
      regelverkbeskrivelse
    });
    toast({
      title: 'Rule Created',
      description: 'A new rule has been successfully created.',
      status: 'success',
      duration: 5000,
      isClosable: true
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create New Rule</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl isRequired>
            <FormLabel>Category</FormLabel>
            <Select placeholder="Select a category" value={kategoriid} onChange={(e) => setKategoriid(Number(e.target.value))}>
              {categories.map((category) => (
                <option key={category.kategoriid} value={category.kategoriid}>
                  {category.kategorinavn}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl mt={4} isRequired>
            <FormLabel>Condition</FormLabel>
            <Input value={betingelse} onChange={(e) => setBetingelse(e.target.value)} placeholder="Enter condition" />
          </FormControl>
          <FormControl mt={4} isRequired>
            <FormLabel>Value</FormLabel>
            <Input value={verdi} onChange={(e) => setVerdi(e.target.value)} placeholder="Enter value" />
          </FormControl>
          <FormControl mt={4} display="flex" alignItems="center">
            <FormLabel mb={0}>Allowed in Hand Luggage</FormLabel>
            <Switch isChecked={tillatthandbagasje} onChange={(e) => setTillatthandbagasje(e.target.checked)} />
          </FormControl>
          <FormControl mt={4} display="flex" alignItems="center">
            <FormLabel mb={0}>Allowed in Checked Luggage</FormLabel>
            <Switch isChecked={tillattinnsjekketbagasje} onChange={(e) => setTillattinnsjekketbagasje(e.target.checked)} />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Rule Description</FormLabel>
            <Input value={regelverkbeskrivelse} onChange={(e) => setRegelverkbeskrivelse(e.target.value)} placeholder="Enter rule description" />
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

export default CreateRuleComponent;

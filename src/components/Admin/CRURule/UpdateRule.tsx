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
  Switch
} from '@chakra-ui/react';

import { Rule, UpdateRule } from '../../../services/object-service';

interface UpdateRuleProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (ruleData: UpdateRule) => void;
  rule: Rule;
}

const UpdateRule: React.FC<UpdateRuleProps> = ({ isOpen, onClose, onUpdate, rule }) => {
  const [kategoriid, setKategoriid] = useState<number>(rule.kategoriid);
  const [betingelse, setBetingelse] = useState(rule.betingelse);
  const [verdi, setVerdi] = useState(rule.verdi);
  const [tillatthandbagasje, setTillatthandbagasje] = useState(rule.tillatthandbagasje);
  const [tillattinnsjekketbagasje, setTillattinnsjekketbagasje] = useState(rule.tillattinnsjekketbagasje);
  const [regelverkbeskrivelse, setRegelverkbeskrivelse] = useState(rule.regelverkbeskrivelse);

  const handleUpdate = () => {
    onUpdate({
      kategoriid,
      betingelse,
      verdi,
      tillatthandbagasje,
      tillattinnsjekketbagasje,
      regelverkbeskrivelse
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update Rule</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl isRequired>
            <FormLabel>Category ID</FormLabel>
            <Input type="number" value={kategoriid} onChange={(e) => setKategoriid(Number(e.target.value))} />
          </FormControl>
          <FormControl mt={4} isRequired>
            <FormLabel>Condition</FormLabel>
            <Input value={betingelse} onChange={(e) => setBetingelse(e.target.value)} />
          </FormControl>
          <FormControl mt={4} isRequired>
            <FormLabel>Value</FormLabel>
            <Input value={verdi} onChange={(e) => setVerdi(e.target.value)} />
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
            <Input value={regelverkbeskrivelse} onChange={(e) => setRegelverkbeskrivelse(e.target.value)} />
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

export default UpdateRule;

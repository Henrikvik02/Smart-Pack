import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Text
} from '@chakra-ui/react';

import { Rule } from '../../../services/object-service';

interface ReadRuleProps {
  isOpen: boolean;
  onClose: () => void;
  rule: Rule;
}

const ReadRule: React.FC<ReadRuleProps> = ({ isOpen, onClose, rule }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Rule Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Text fontWeight="bold">Condition:</Text>
          <Text mb={4}>{rule.betingelse}</Text>
          <Text fontWeight="bold">Value:</Text>
          <Text mb={4}>{rule.verdi}</Text>
          <Text fontWeight="bold">Allowed in Hand Luggage:</Text>
          <Text mb={4}>{rule.tillatthandbagasje ? 'Yes' : 'No'}</Text>
          <Text fontWeight="bold">Allowed in Checked Luggage:</Text>
          <Text>{rule.tillattinnsjekketbagasje ? 'Yes' : 'No'}</Text>
          <Text fontWeight="bold">Description:</Text>
          <Text>{rule.regelverkbeskrivelse}</Text>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ReadRule;

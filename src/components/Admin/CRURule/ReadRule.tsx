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
import { Category } from '../../../services/object-service';

interface ReadRuleProps {
  isOpen: boolean;
  onClose: () => void;
  ruleDetails: {
    betingelse: string;
    verdi: string;
    tillatthandbagasje: boolean;
    tillattinnsjekketbagasje: boolean;
    regelverkbeskrivelse: string;
    kategoriid: number;
  };
  categories: Category[];
}

const ReadRule: React.FC<ReadRuleProps> = ({ isOpen, onClose, ruleDetails, categories }) => {
  const category = categories.find(cat => cat.kategoriid === ruleDetails.kategoriid);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Rule Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Text fontWeight="bold">Category:</Text>
          <Text mb={4}>{category ? category.kategorinavn : 'Unknown'}</Text>
          <Text fontWeight="bold">Condition:</Text>
          <Text mb={4}>{ruleDetails.betingelse}</Text>
          <Text fontWeight="bold">Value:</Text>
          <Text mb={4}>{ruleDetails.verdi}</Text>
          <Text fontWeight="bold">Allowed in Hand Luggage:</Text>
          <Text mb={4}>{ruleDetails.tillatthandbagasje ? 'Yes' : 'No'}</Text>
          <Text fontWeight="bold">Allowed in Checked Luggage:</Text>
          <Text mb={4}>{ruleDetails.tillattinnsjekketbagasje ? 'Yes' : 'No'}</Text>
          <Text fontWeight="bold">Description:</Text>
          <Text>{ruleDetails.regelverkbeskrivelse}</Text>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ReadRule;

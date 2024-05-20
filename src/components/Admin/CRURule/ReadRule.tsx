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
        <ModalHeader>Detaljer på regelverket</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Text fontWeight="bold">Kategori:</Text>
          <Text mb={4}>{category ? category.kategorinavn : 'Unknown'}</Text>
          <Text fontWeight="bold">Betingelse:</Text>
          <Text mb={4}>{ruleDetails.betingelse}</Text>
          <Text fontWeight="bold">Verdien av betingelse:</Text>
          <Text mb={4}>{ruleDetails.verdi}</Text>
          <Text fontWeight="bold">Tillat i handbaggasje:</Text>
          <Text mb={4}>{ruleDetails.tillatthandbagasje ? 'Yes' : 'No'}</Text>
          <Text fontWeight="bold">Tillat i innsjekketbaggasje</Text>
          <Text mb={4}>{ruleDetails.tillattinnsjekketbagasje ? 'Yes' : 'No'}</Text>
          <Text fontWeight="bold">Beskrivelse:</Text>
          <Text>{ruleDetails.regelverkbeskrivelse}</Text>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ReadRule;

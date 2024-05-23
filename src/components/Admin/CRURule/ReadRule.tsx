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

/**
 * Komponent for å vise detaljer om et spesifikt regelverk.
 * Tar inn regelverksdetaljer og en liste over kategorier for å vise tilknyttet kategori.
 */
const ReadRule: React.FC<ReadRuleProps> = ({ isOpen, onClose, ruleDetails, categories }) => {
  // Finn kategorien som tilsvarer regelens kategori ID
  const category = categories.find(cat => cat.kategoriid === ruleDetails.kategoriid);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Detaljer om regelverket</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Text fontWeight="bold">Kategori:</Text>
          <Text mb={4}>{category ? category.kategorinavn : 'Ukjent'}</Text>
          <Text fontWeight="bold">Betingelse:</Text>
          <Text mb={4}>{ruleDetails.betingelse}</Text>
          <Text fontWeight="bold">Verdi av betingelsen:</Text>
          <Text mb={4}>{ruleDetails.verdi}</Text>
          <Text fontWeight="bold">Tillatt i håndbaggasje:</Text>
          <Text mb={4}>{ruleDetails.tillatthandbagasje ? 'Ja' : 'Nei'}</Text>
          <Text fontWeight="bold">Tillatt i innsjekket bagasje:</Text>
          <Text mb={4}>{ruleDetails.tillattinnsjekketbagasje ? 'Ja' : 'Nei'}</Text>
          <Text fontWeight="bold">Beskrivelse:</Text>
          <Text>{ruleDetails.regelverkbeskrivelse}</Text>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ReadRule;

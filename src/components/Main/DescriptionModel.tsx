import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Button,
  useDisclosure,
} from "@chakra-ui/react";

interface DescriptionProps {
  regelverkbeskrivelse: string | null;
}

const DescriptionModel = ({ regelverkbeskrivelse }: DescriptionProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen} variant="link" colorScheme="blue" size="sm">
        Se mer
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Beskrivelse</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{regelverkbeskrivelse}</ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DescriptionModel;

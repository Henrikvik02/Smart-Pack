import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Text,
  List,
  ListItem,
  useDisclosure,
  IconButton,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";
import { Category, Item, Rule } from "../../../services/object-service";
import ReadRule from "../CRURule/ReadRule"; // Ensure the path to ReadRule is correct
import { ViewIcon } from "@chakra-ui/icons";

interface ReadItemProps {
  isOpen: boolean;
  onClose: () => void;
  itemDetails: Item;
  categories: Category[];
  rules: Rule[];
}

const ReadItem: React.FC<ReadItemProps> = ({
  isOpen,
  onClose,
  itemDetails,
  categories,
  rules,
}) => {
  const [selectedRule, setSelectedRule] = useState<Rule | null>(null);
  const {
    isOpen: isRuleDetailsOpen,
    onOpen: onRuleDetailsOpen,
    onClose: onRuleDetailsClose,
  } = useDisclosure();

  const category = categories.find(
    (cat) => cat.kategoriid === itemDetails.kategoriid
  );

  const handleViewRuleDetails = (rule: Rule) => {
    setSelectedRule(rule);
    onRuleDetailsOpen();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Detaljer på gjenstanden</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Text fontWeight="bold">Navn:</Text>
          <Text mb={4}>{itemDetails.gjenstandnavn}</Text>
          <Text fontWeight="bold">Beskrivelse:</Text>
          <Text mb={4}>{itemDetails.gjenstandbeskrivelse}</Text>
          <Text fontWeight="bold">Kategori:</Text>
          <Text mb={4}>{category ? category.kategorinavn : "Unknown"}</Text>
          <Text fontWeight="bold">Regelverker:</Text>
          <List spacing={3}>
            {rules.map((rule) => (
              <Box key={rule.regelverkid} display="flex" alignItems="center">
                <IconButton
                  icon={<ViewIcon />}
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent the event from propagating to parent elements
                    handleViewRuleDetails(rule);
                  }}
                  aria-label="View details"
                  variant="outline"
                  colorScheme="blue"
                  _focus={{
                    boxShadow: "0 0 0 3px #FFFF10",
                  }}
                  size="sm"
                  marginTop="1"
                  marginLeft="1"
                  marginRight="4"
                />
                <ListItem
                  key={rule.regelverkid}
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  {`${rule.betingelse} - ${rule.verdi}`}
                </ListItem>
              </Box>
            ))}
          </List>
        </ModalBody>
      </ModalContent>

      {isRuleDetailsOpen && selectedRule && (
        <ReadRule
          isOpen={isRuleDetailsOpen}
          onClose={onRuleDetailsClose}
          ruleDetails={selectedRule}
          categories={categories}
        />
      )}
    </Modal>
  );
};

export default ReadItem;

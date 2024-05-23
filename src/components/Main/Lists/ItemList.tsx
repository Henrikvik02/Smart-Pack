import React, { useState } from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Collapse,
  Text,
} from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import useItems from "../../../hooks/useItems";
import RuleView from "../RuleView";

interface ItemListProps {
  kategoriid: number | null;
}

const ItemList = ({ kategoriid }: ItemListProps) => {
  const { items: gjenstander, isLoading, error } = useItems(kategoriid);
  const [openDetails, setOpenDetails] = useState<number | null>(null);

  const toggleDetails = (id: number) => {
    setOpenDetails(openDetails === id ? null : id);
  };

  const capitalizeFirstLetter = (string: string) =>
    string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();

  if (error) return <Text className="error-message">{error}</Text>;
  if (isLoading) return <Text>Loading items...</Text>;

  return (
    <Box width="100%" className="item-list-container">
      <Table variant="simple" size="sm" className="item-list-table">
        <Thead>
          <Tr>
            <Th
              width="50%"
              textAlign="center"
              fontSize="lg"
              className="header-gjenstander"
            >
              Gjenstander
            </Th>
            <Th
              width="50%"
              textAlign="center"
              fontSize="lg"
              className="header-informasjon"
            >
              Informasjon
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {gjenstander.map((gjenstand) => (
            <React.Fragment key={gjenstand.gjenstandid}>
              <Tr className="item-row">
                <Td textAlign="center">
                  {capitalizeFirstLetter(gjenstand.gjenstandnavn)}
                </Td>
                <Td textAlign="center">
                  <IconButton
                    aria-label="Vis detaljer"
                    icon={
                      openDetails === gjenstand.gjenstandid ? (
                        <ChevronUpIcon color="white" />
                      ) : (
                        <ChevronDownIcon color="white" />
                      )
                    }
                    onClick={() => toggleDetails(gjenstand.gjenstandid)}
                    variant="main"
                    className="details-button"
                  />
                </Td>
              </Tr>
              {openDetails === gjenstand.gjenstandid && (
                <Tr className="details-row">
                  <Td colSpan={2}>
                    <Collapse
                      in={openDetails === gjenstand.gjenstandid}
                      animateOpacity
                    >
                      <Box
                        borderWidth="1px"
                        borderRadius="md"
                        mt={2}
                        width="100%"
                        className="rule-view-container"
                      >
                        <RuleView gjenstandid={gjenstand.gjenstandid} />
                      </Box>
                    </Collapse>
                  </Td>
                </Tr>
              )}
            </React.Fragment>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default ItemList;

import React from "react";
import { Box, Text, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import useRuleTags from "../../hooks/useRuleTags";
import DescriptionModel from "./DescriptionModel";
import { Rule } from "../../services/object-service";

interface RuleViewProps {
  gjenstandid: number;
}

const RuleView: React.FC<RuleViewProps> = ({ gjenstandid }) => {
  const { regelverker, isLoading, error } = useRuleTags(gjenstandid);

  const renderValue = (value: any) => {
    if (value === undefined || value === null) return "Ikke oppgitt";
    if (typeof value === "boolean") return value ? "Ja" : "Nei";
    return value.toString();
  };

  if (isLoading) return <Text>Laster regler...</Text>;
  if (error) return <Text>{error}</Text>;

  const shouldShowValueRow = regelverker.some(rule => rule.verdi.toLowerCase() !== "true");

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      overflowX="auto"
      p={0}
      m={0}
      w="full"
    >
      <Table variant="striped" colorScheme="gray" size="sm">
        <Thead>
          <Tr>
            <Th>Informasjon</Th>
            {regelverker.map((rule, index) => (
              <Th key={index}>Lovverk {index + 1}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>Betingelse</Td>
            {regelverker.map((rule, index) => (
              <Td key={index}>{renderValue(rule.betingelse)}</Td>
            ))}
          </Tr>
          {shouldShowValueRow && (
            <Tr>
              <Td>Verdi</Td>
              {regelverker.map((rule, index) => (
                <Td key={index}>{renderValue(rule.verdi)}</Td>
              ))}
            </Tr>
          )}
          <Tr>
            <Td>Tillatt i håndbagasje</Td>
            {regelverker.map((rule, index) => (
              <Td key={index}>{rule.tillatthandbagasje ? "Ja" : "Nei"}</Td>
            ))}
          </Tr>
          <Tr>
            <Td>Tillatt i innsjekket bagasje</Td>
            {regelverker.map((rule, index) => (
              <Td key={index}>{rule.tillattinnsjekketbagasje ? "Ja" : "Nei"}</Td>
            ))}
          </Tr>
          <Tr>
            <Td>Beskrivelse</Td>
            {regelverker.map((rule, index) => (
              <Td key={index}>
                {rule.regelverkbeskrivelse && rule.regelverkbeskrivelse.length > 16 ? (
                  <>
                    {rule.regelverkbeskrivelse.substring(0, 16)}...
                    <DescriptionModel regelverkbeskrivelse={rule.regelverkbeskrivelse} />
                  </>
                ) : (
                  rule.regelverkbeskrivelse || "Ikke oppgitt"
                )}
              </Td>
            ))}
          </Tr>
        </Tbody>
      </Table>
    </Box>
  );
};

export default RuleView;

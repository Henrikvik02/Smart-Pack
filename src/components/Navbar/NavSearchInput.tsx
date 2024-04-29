import { Input, useColorModeValue } from "@chakra-ui/react";

const NavSearchInput = () => {
  const inputBg = useColorModeValue("white", "gray.600"); // Lysere i lys modus, mørkere i mørk modus
  const inputBorder = useColorModeValue("gray.400", "gray.500"); // Mer distinkt i lys modus

  return (
    <Input
      borderRadius="full"
      placeholder="Søk etter informasjon..."
      variant="filled"
      focusBorderColor="blue.500" // Sterk kontrastfarge ved fokus
      size="md"
      bg={inputBg}
      borderColor={inputBorder}
      _hover={{
        borderColor: "blue.500", // Endre border farge på hover
      }}
    />
  )
}

export default NavSearchInput

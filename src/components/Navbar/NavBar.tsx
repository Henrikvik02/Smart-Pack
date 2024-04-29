import { HStack, Image, useColorModeValue, Box } from "@chakra-ui/react";
import logo from "/logo/AvinorLogo.webp";
import ColorModeSwitch from "../ColorModeSwitch";
import NavSearchInput from "./NavSearchInput";

const NavBar = () => {
  const bg = useColorModeValue("gray.100", "gray.700"); // Dynamisk bakgrunnsfarge basert på fargemodus
  const shadow = useColorModeValue("sm", "lg"); // Mykere skygge i lys modus, sterkere i mørk modus

  return (
    <Box as="nav" width="full" bg={bg} boxShadow={shadow} paddingY="4">
      <HStack
        justifyContent="space-between"
        maxWidth="1200px"
        marginX="auto"
        paddingX="5"
      >
        <Image
          boxShadow="dark-lg"
          src={logo}
          borderRadius="20"
          boxSize="70px"
          objectFit="contain"
        />
        <NavSearchInput />
        <ColorModeSwitch />
      </HStack>
    </Box>
  );
};

export default NavBar;

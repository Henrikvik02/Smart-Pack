import { HStack, Image, useColorModeValue, Box, Button } from "@chakra-ui/react";
import logo from "/logo/AvinorLogo.webp";
import ColorModeSwitch from "../ColorModeSwitch";
import NavSearchInput from "./NavSearchInput";
import { Link as RouterLink } from "react-router-dom";

const NavBar = () => {
  const bg = useColorModeValue("gray.100", "gray.700"); // Dynamisk bakgrunnsfarge basert på fargemodus
  const shadow = useColorModeValue("sm", "lg"); // Mykere skygge i lys modus, sterkere i mørk modus

  return (
    <Box as="nav" width="full" bg={bg} boxShadow={shadow} paddingY="4">
      <HStack
        justifyContent="center"
        maxWidth="1200px"
        width="full"
        marginX="auto"
        paddingX="5"
        spacing={4} // Space mellom elementene
        alignItems="center"
      >
        <Image
          boxShadow="dark-lg"
          src={logo}
          borderRadius="20"
          boxSize="70px"
          objectFit="contain"
        />

        <HStack spacing={8}>
          <Button as={RouterLink} to="/" variant="ghost">
            Home
          </Button>
          <Button as={RouterLink} to="/SmartPack" variant="ghost">
            About
          </Button>
          <Button as={RouterLink} to="/BaggageGrid" variant="ghost">
            Contact
          </Button>
        </HStack>

        <ColorModeSwitch />
      </HStack>
    </Box>
  );
};

export default NavBar;

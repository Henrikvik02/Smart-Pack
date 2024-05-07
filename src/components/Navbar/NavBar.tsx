import {
  Flex,
  Image,
  Box,
  Button,
  Spacer,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  useBreakpointValue,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import logo from "/logo/AvinorLogo.webp";
import ColorModeSwitch from "../ColorModeSwitch";
import { Link as RouterLink } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  // Responsive display settings
  const displayNavButtons = useBreakpointValue({ base: "none", md: "flex" });
  const displayMenu = useBreakpointValue({ base: "flex", md: "none" });

  const bg = useColorModeValue("gray.100", "gray.700"); // Dynamisk bakgrunnsfarge basert på fargemodus
  const shadow = useColorModeValue("sm", "lg"); // Mykere skygge i lys modus, sterkere i mørk modus

  return (
    <Box as="nav" className="navbar" bg={bg} boxShadow={shadow}>
      <Flex
        className="flex-nav"
        align="center"
        maxWidth="1200px"
        width="full"
        mx="auto"
        px="5"
        justifyContent={{ base: "space-between", md: "space-between" }} // Ensures items are spaced out
      >
        <Image className="logo-image" src={logo} />

        <Box
          flex={1}
          justifyContent="center"
          display={{ base: "none", md: "flex" }}
        >
          <Flex className="nav-buttons" justifyContent="center">
            <Button
              as={RouterLink}
              to="/"
              className="nav-button"
              variant="navHeader"
            >
              Hjem
            </Button>
            <Button
              as={RouterLink}
              to="/SmartPack"
              className="nav-button"
              variant="navHeader"
            >
              SmartPack
            </Button>
            <Button
              as={RouterLink}
              to="/BaggageGrid"
              className="nav-button"
              variant="navHeader"
            >
              Informasjon
            </Button>
          </Flex>
        </Box>

        <Box display={displayMenu} ml="auto" mr={4}>
          {" "}
          <Menu>
            <MenuButton
              as={IconButton}
              icon={<HamburgerIcon />}
              size="lg"
              variant="outline"
              aria-label="Options"
            />
            <MenuList>
              <MenuItem as={RouterLink} to="/">
                Hjem
              </MenuItem>
              <MenuItem as={RouterLink} to="/SmartPack">
                SmartPack
              </MenuItem>
              <MenuItem as={RouterLink} to="/BaggageGrid">
                Informasjon
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>

        <ColorModeSwitch />
      </Flex>
    </Box>
  );
};

export default NavBar;

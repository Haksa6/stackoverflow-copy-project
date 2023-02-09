import React from "react";
import {
  Box,
  Flex,
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
  IconButton,
  Button,
  HStack,
  useBreakpointValue,
  Link,
} from "@chakra-ui/react";
import LightThemeIcon from "./icons/LightThemeIcon";
import { HamburgerIcon } from "@chakra-ui/icons";
import DarkLightToggle from "./DarkLightToggle";

const Navbar = () => {
  //Checks the width of the screen
  //md meaning 48em upwards so when the screen is under 48em isDesktop is set to false and the menu icon is shown
  const isDesktop = useBreakpointValue({ base: false, md: "solid" });
  return (
    <Flex
      as="nav"
      align="center"
      padding="1.5rem"
      justify="space-between"
      position="fixed"
      left="0"
      right="0"
      top="0"
      w="100%"
      zIndex={2}
      css={{ backdropFilter: "blur(10px)" }}
      borderBottom="2px"
    >
      <LightThemeIcon />
      {isDesktop ? (
        <Flex marginLeft="1rem" justify="space-between" flex="1">
          <Box>
            <Link href="/">
              <Button variant="ghost">Home</Button>
            </Link>
            <Button variant="ghost">About</Button>
          </Box>

          <HStack spacing="4">
            <Link href="/login">
              <Button variant="ghost" backgroundColor="#BBC0C4">
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button variant="ghost" backgroundColor="#0A95FF">
                Sign up
              </Button>
            </Link>
            <DarkLightToggle />
          </HStack>
        </Flex>
      ) : (
        <Box flex={1} align="right">
          <DarkLightToggle />

          <Box ml={2} display={{ base: "inline-block", md: "none" }}>
            <Menu isLazy id="navbar-menu">
              <MenuButton
                as={IconButton}
                icon={<HamburgerIcon />}
                variant="outline"
                aria-label="Options"
              />
              <MenuList>
                <MenuItem href="/">Home</MenuItem>
                <MenuItem href="/works">About</MenuItem>
                <MenuItem href="/login">Login</MenuItem>
                <MenuItem href="register">Sign up</MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </Box>
      )}
    </Flex>
  );
};

export default Navbar;

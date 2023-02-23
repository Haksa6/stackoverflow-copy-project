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
  useColorModeValue,
} from "@chakra-ui/react";
import LightThemeIcon from "./icons/LightThemeIcon";
import { HamburgerIcon } from "@chakra-ui/icons";
import DarkLightToggle from "./DarkLightToggle";
import AuthService from "../services/auth.service";

const Navbar = () => {
  // Check if the user is logged in and change the navbar accordingly
  const token = localStorage.getItem("token");
  console.log(token);

  // Checks the width of the screen
  // md meaning 48em upwards so when the screen is under 48em isDesktop is set to false and the menu icon is shown
  const isDesktop = useBreakpointValue({ base: false, md: "solid" });
  return (
    <Flex
      as="nav"
      align="center"
      padding={{ base: "0.75rem", sm: "1.5rem" }}
      justify="space-between"
      position="fixed"
      left="0"
      right="0"
      top="0"
      zIndex={2}
      css={{ backdropFilter: "blur(10px)" }}
      bg={useColorModeValue("#FEF5EE")}
      boxShadow="0 1px 2px hsla(0,0%,0%,0.05), 0 1px 4px hsla(0,0%,0%,0.05), 0 2px 8px hsla(0,0%,0%,0.05)"
    >
      <LightThemeIcon />
      {isDesktop ? (
        <Flex marginLeft="1rem" justify="space-between" flex="1">
          <Box>
            <Link href="/">
              <Button variant="ghost">Home</Button>
            </Link>
            <Link href="/ask">
              <Button variant="ghost" backgroundColor="#0A95FF" color="white">
                Ask question
              </Button>
            </Link>
          </Box>

          <HStack spacing="4">
            {token ? (
              <Button
                variant="ghost"
                backgroundColor="red"
                onClick={AuthService.logout}
              >
                Logout
              </Button>
            ) : (
              <>
                <Link href="/login">
                  <Button
                    variant="ghost"
                    backgroundColor="#BBC0C4"
                    color="white"
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button
                    variant="ghost"
                    backgroundColor="#0A95FF"
                    color="white"
                  >
                    Sign up
                  </Button>
                </Link>
              </>
            )}

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
                <MenuItem as="a" href="/">
                  Home
                </MenuItem>
                <MenuItem as="a" href="/ask">
                  Ask question
                </MenuItem>
                <MenuItem as="a" href="/login">
                  Login
                </MenuItem>
                <MenuItem as="a" href="/signup">
                  Sign up
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </Box>
      )}
    </Flex>
  );
};

export default Navbar;

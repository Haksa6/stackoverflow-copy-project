import React, { useContext } from "react";
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
  Switch,
  Text,
} from "@chakra-ui/react";
import LightThemeIcon from "./icons/LightThemeIcon";
import { HamburgerIcon } from "@chakra-ui/icons";
import DarkLightToggle from "./DarkLightToggle";
import AuthService from "../services/auth.service";
import { CurrentUserContext } from "../CurrentUserContext";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  // Get the user and check if the user is logged in and change the navbar accordingly
  const currentUser = useContext(CurrentUserContext);

  // Handle the language change
  const { t, i18n } = useTranslation();
  const handleLanguageChange = (event) => {
    if (event.target.checked) {
      i18n.changeLanguage("fi");
    } else {
      i18n.changeLanguage("en");
    }
  };
  // IF the language is finnish the switch is checked
  const isChecked = i18n.language === "fi";
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
              <Button variant="ghost">{t("Home")}</Button>
            </Link>
            <Link href="/ask">
              <Button variant="ghost" backgroundColor="#0A95FF" color="white">
                {t("Ask question")}
              </Button>
            </Link>
          </Box>

          <HStack spacing="4">
            {currentUser ? (
              <Button
                variant="ghost"
                backgroundColor="red"
                onClick={AuthService.logout}
              >
                {t("Logout")}
              </Button>
            ) : (
              <>
                <Link href="/login">
                  <Button
                    variant="ghost"
                    backgroundColor="#BBC0C4"
                    color="white"
                  >
                    {t("Login")}
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button
                    variant="ghost"
                    backgroundColor="#0A95FF"
                    color="white"
                  >
                    {t("Sign up")}
                  </Button>
                </Link>
              </>
            )}

            <DarkLightToggle />
            <HStack>
              <Text>EN</Text>
              <Switch
                isChecked={isChecked}
                id="language-switch"
                onChange={handleLanguageChange}
              />
              <Text>FI</Text>
            </HStack>
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
                  {t("Home")}
                </MenuItem>
                <MenuItem as="a" href="/ask">
                  {t("Ask question")}
                </MenuItem>
                {currentUser ? (
                  <MenuItem color="red" onClick={AuthService.logout}>
                    {t("Logout")}
                  </MenuItem>
                ) : (
                  <>
                    <MenuItem as="a" href="/signup">
                      {t("Sign up")}
                    </MenuItem>
                    <MenuItem as="a" href="/Login">
                      {t("Login")}
                    </MenuItem>
                  </>
                )}

                <HStack marginLeft={"3"}>
                  <Text>EN</Text>
                  <Switch
                    id="language-switch"
                    isChecked={isChecked}
                    onChange={handleLanguageChange}
                  />
                  <Text>FI</Text>
                </HStack>
              </MenuList>
            </Menu>
          </Box>
        </Box>
      )}
    </Flex>
  );
};

export default Navbar;

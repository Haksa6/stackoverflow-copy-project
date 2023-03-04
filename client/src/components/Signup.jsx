import React, { useState } from "react";
import {
  Flex,
  Button,
  FormControl,
  Input,
  FormLabel,
  useColorModeValue,
  Heading,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import { useTranslation } from "react-i18next";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Uses the axios register function from services folder
      await AuthService.register(username, password).then(
        () => {
          // Goes back to home page after succesful register
          navigate("/");
          // Reloads the page
          window.location.reload();
        },
        (error) => {
          setErrorMessage(error.response.data);
          console.log(error);
        }
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Flex flexDir="column" alignSelf="center">
      {errorMessage && (
        <Alert padding={0} bg="transparent" status="error">
          <AlertIcon />
          {errorMessage}
        </Alert>
      )}
      <Heading w="100%">{t("Sign up")}</Heading>

      <Flex
        justify={"center"}
        alignItems="center"
        padding={"24px"}
        w={{ base: "14rem", sm: "17.5rem" }}
        h="15rem"
        bg={useColorModeValue("hsl(35, 87%, 94%)", "grey")}
        borderRadius="5"
        boxShadow="0 10px 24px hsla(0,0%,0%,0.05), 0 20px 48px hsla(0,0%,0%,0.05), 0 1px 4px hsla(0,0%,0%,0.05)"
        id="form-container"
      >
        <form onSubmit={handleSubmit} id="signup-form">
          <Flex flexDir="column">
            <FormControl flexDir="column">
              <FormLabel htmlFor="Username">{t("Username")}</FormLabel>
              <Input
                backgroundColor={"white"}
                color="black"
                id="username"
                type="text"
                isRequired
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                w="100%"
                border={"1px solid"}
              />
            </FormControl>
            <FormControl flexDir="column">
              <FormLabel htmlFor="password">{t("Password")}</FormLabel>
              <Input
                backgroundColor={"white"}
                color="black"
                id="password"
                type="password"
                isRequired
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                w="100%"
                border={"1px solid"}
              />
            </FormControl>
            <Button type="submit" backgroundColor="#0A95FF" marginTop={"1rem"}>
              {t("Sign up")}
            </Button>
          </Flex>
        </form>
      </Flex>
    </Flex>
  );
};

export default Signup;

import React, { useState } from "react";
import {
  Flex,
  Button,
  FormControl,
  Input,
  FormLabel,
  useColorModeValue,
  Heading,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

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
          console.log(error);
        }
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Flex flexDir="column" alignSelf="center">
      <Heading w="100%">Sign up</Heading>

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
              <FormLabel htmlFor="Username">Username</FormLabel>
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
              <FormLabel htmlFor="password">Password</FormLabel>
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
              Sign up
            </Button>
          </Flex>
        </form>
      </Flex>
    </Flex>
  );
};

export default Signup;

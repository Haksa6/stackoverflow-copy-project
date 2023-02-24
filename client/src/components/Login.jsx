import React, { useState } from "react";
import { Flex, Button, FormControl, Input, FormLabel } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Uses the axios login from services folder
      await AuthService.login(username, password).then(
        () => {
          // Goes back to home page after succesful login
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
      <Button marginBottom={"2rem"}>Google</Button>
      <Flex
        justify={"center"}
        alignItems="center"
        padding={"24px"}
        w={{ base: "14rem", sm: "17.5rem" }}
        h="15rem"
        background="pink"
        borderRadius="5"
        boxShadow="0 10px 24px hsla(0,0%,0%,0.05), 0 20px 48px hsla(0,0%,0%,0.05), 0 1px 4px hsla(0,0%,0%,0.05)"
        id="form-container"
      >
        <form onSubmit={handleSubmit} id="login-form">
          <Flex flexDir="column">
            <FormControl flexDir="column">
              <FormLabel htmlFor="Username" color={"black"}>
                Username
              </FormLabel>
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
              <FormLabel htmlFor="password" color={"black"}>
                Password
              </FormLabel>
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
              Log in
            </Button>
          </Flex>
        </form>
      </Flex>
    </Flex>
  );
};

export default Login;
import React from "react";
import { VStack, Text } from "@chakra-ui/react";

const NotFound = () => {
  return (
    <VStack textAlign={"center"}>
      <Text as="h4" fontSize={"3xl"}>
        Something went wrong
      </Text>
      <Text
        fontSize={"xl"}
        as="a"
        href="/"
        textDecoration={"underline"}
        color="#551A8B"
      >
        Go back
      </Text>
    </VStack>
  );
};

export default NotFound;

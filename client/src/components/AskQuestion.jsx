import React from "react";
import { Flex, Text, Heading, Input, Textarea, Button } from "@chakra-ui/react";

const AskQuestion = () => {
  return (
    <Flex w="100%" flexDir={"column"}>
      <Heading>Ask a public question</Heading>
      <Flex
        padding="3.5"
        border="1px"
        borderRadius={3}
        marginTop="2rem"
        id="post-title"
      >
        <Flex flexDir={"column"} w="100%">
          <Text fontSize={"xl"} fontWeight="bold">
            Title
          </Text>
          <Text fontSize={"sm"} marginBottom="1rem">
            Be specific and imagine you're asking a question to another person.
          </Text>
          <Input
            size="sm"
            placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
          />
        </Flex>
      </Flex>
      <Flex
        padding="3.5"
        border="1px"
        borderRadius={3}
        marginTop="2rem"
        id="post-code"
      >
        <Flex flexDir={"column"} w="100%">
          <Text fontSize={"xl"} fontWeight="bold">
            Code snippet
          </Text>
          <Text fontSize={"sm"}>
            Post your code and more details about your problem, if needed.
          </Text>
          <Textarea size="sm" />
        </Flex>
      </Flex>
      <Button marginTop="1rem">Submit</Button>
    </Flex>
  );
};

export default AskQuestion;

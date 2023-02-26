import React, { useState } from "react";
import { Flex, Text, Heading, Input, Textarea, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import PostService from "../services/post.service";

const AskQuestion = ({ currentUser }) => {
  const [title, setTitle] = useState("");
  const [codeSnippet, setCodeSnippet] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await PostService.addPost(currentUser._id, title, codeSnippet).then(
        () => {
          // Goes back to home page after succesful post
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
            isRequired
            onChange={(event) => setTitle(event.target.value)}
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
          <Textarea
            onChange={(event) => setCodeSnippet(event.target.value)}
            size="sm"
          />
        </Flex>
      </Flex>
      <Button
        alignSelf={"flex-start"}
        backgroundColor="#0A95FF"
        onClick={handleSubmit}
        marginTop="1rem"
      >
        Submit
      </Button>
    </Flex>
  );
};

export default AskQuestion;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Flex,
  Text,
  Heading,
  Button,
  HStack,
  Grid,
  GridItem,
  Textarea,
} from "@chakra-ui/react";
import axios from "axios";
import VoteButtons from "./VoteButtons";

const SinglePost = () => {
  const [post, setPost] = useState(null);
  // useParams() gets the current posts id from the url
  const { id } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      const { data } = await axios.get(`/api/post/${id}`);
      setPost(data);
    };
    fetchPost();
  }, [id]);

  const click = () => {
    console.log(post);
    console.log(id);
  };

  // Changes the post's date to finnish format
  const lastEditedDate = new Date(post?.lastEdited);
  const formattedDate = lastEditedDate.toLocaleString("en-FI", {
    dateStyle: "short",
  });

  return (
    <Flex w="100%" flexDir={"column"}>
      <Flex flexDir={"column"} borderBottom="1px solid grey">
        <Flex
          alignItems={"center"}
          justify="space-between"
          flexWrap={"wrap"}
          wordBreak={"break-word"}
        >
          <Heading>{post?.title}</Heading>
          <Button onClick={click}></Button>
        </Flex>
        <HStack fontSize="sm" spacing={9} marginBottom="2">
          <Text>
            Modified: <Text as="time">{formattedDate}</Text>
          </Text>
          <Text>Posted by: {post?.user} ABC</Text>
        </HStack>
      </Flex>
      <Grid
        marginTop={"6"}
        templateColumns="max-content 1fr"
        maxW={"100%"}
        borderBottom="7px solid #DAE0E6"
      >
        <GridItem>
          <VoteButtons />
        </GridItem>
        <GridItem wordBreak={"break-word"}>
          <Text marginBottom={"4"}>
            dasdas dasdas dasdas dasdas dasdas dasdas dasdas dasdas dasdas
            dasdas dasdas dasdas dasdas dasdas dasdas dasdas dasdas dasdas
            dasdas dasdas dasdas dasdas dasdas dasdas dasdas dasdas dasdas
            dasdas dasdas dasdas dasdas dasdas dasdas dasdas dasdas dasdas
            dasdas dasdas dasdas dasdas dasdas dasdas dasdas dasdas dasdas
            dasdas dasdas dasdas dasdas dasdas dasdas dasdas dasdas dasdas
            dasdas dasdas dasdas dasdas dasdas dasdas dasdas dasdas dasdas
            dasdas dasdas dasdas dasdas dasdas dasdas vdasdas dasdas dasdas
            dasdas dasdas dasdas dasdas dasdas dasdas dasdas dasdas dasdas
            dasdas dasdas dasdas dasdas dasdas dasdas dasdas dasdas dasdas
            dasdas dasdas dasdas dasdas dasdas dasdas dasdas dasdas dasdas
            dasdas dasdas dasdas dasdas dasdas dasdas dasdas dasdas dasdas
            dasdas dasdas dasdas dasdas dasdas dasdas dasdas dasdas dasdas
            dasdas dasdas dasdas dasdas dasdas dasdas dasdas dasdas dasdas
            dasdas dasdas dasdas dasdas dasdas dasdas dasdas dasdas dasdas vv
          </Text>
        </GridItem>
      </Grid>
      <Flex marginTop={"4"} flexDir="column">
        <Text>Write a comment</Text>
        <Textarea
          minH={"150px"}
          marginTop={"2"}
          placeholder="What are your thoughts?"
        ></Textarea>
        <Button alignSelf={"flex-end"} backgroundColor="#0A95FF">
          Submit
        </Button>
      </Flex>

      {post?.comments.length === 0 && (
        <Flex marginTop={"4"}>
          <Heading fontSize={"xl"}>Comments</Heading>{" "}
        </Flex>
      )}
    </Flex>
  );
};

export default SinglePost;

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
  Box,
} from "@chakra-ui/react";
import axios from "axios";
import VoteButtons from "./VoteButtons";
import PostService from "../services/post.service";

const SinglePost = ({ currentUser }) => {
  const [post, setPost] = useState(null);
  const [text, setText] = useState("");
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
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await PostService.addComment(currentUser.username, id, text).then(
        () => {
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

  // Changes the post's date to finnish format
  const date = new Date(post?.created);
  const formattedDate = date.toLocaleString("en-FI", {
    dateStyle: "short",
  });

  return (
    <Flex w="100%" flexDir={"column"}>
      <Flex flexDir={"column"} borderBottom="1px solid grey">
        <Flex alignItems={"center"} justify="space-between" flexWrap={"wrap"}>
          <Heading>{post?.title}</Heading>
          <Button onClick={click}></Button>
        </Flex>
        <HStack fontSize="sm" spacing={9} marginBottom="2">
          <Text>
            Created: <Text as="time">{formattedDate}</Text>
          </Text>
          <Text>Posted by: {post?.user.username}</Text>
        </HStack>
      </Flex>
      <Grid
        marginTop={"6"}
        templateColumns="max-content 1fr"
        maxW={"100%"}
        borderBottom="7px solid #DAE0E6"
      >
        <GridItem>
          {post?.votes && <VoteButtons isComment={false} post={post} />}
        </GridItem>
        <GridItem>
          <Text marginBottom={"4"}>{post?.codeSnippet}</Text>
        </GridItem>
      </Grid>
      <Flex marginTop={"4"} flexDir="column" borderBottom="7px solid #DAE0E6">
        <Text>Write a comment</Text>
        <Textarea
          minH={"150px"}
          marginTop={"2"}
          placeholder="What are your thoughts?"
          onChange={(event) => setText(event.target.value)}
        ></Textarea>
        <Button
          onClick={handleSubmit}
          alignSelf={"flex-start"}
          backgroundColor="#0A95FF"
          marginY={"3.5"}
        >
          Submit
        </Button>
      </Flex>

      {post?.comments.length !== 0 && (
        <Box>
          <Heading marginTop="2.5" fontSize={"xl"}>
            Comments
          </Heading>

          {post?.comments.map((comment) => (
            <Grid
              templateColumns="max-content 1fr"
              marginTop="4"
              key={comment._id}
              borderBottom="1px solid"
            >
              <GridItem>
                <VoteButtons isComment={true} post={post} comment={comment} />
              </GridItem>
              <GridItem>
                <Text>Commented by: {comment.user}</Text>
                <Text>
                  {comment.text}
                  borderBottomborderBottomborderBottomborderBottomborderBottomborderBottomborderBottomborderBottomborderBottomborderBottomborderBottomborderBottomborderBottomborderBottomborderBottomborderBottomborderBottomborderBottomborderBottomborderBottomborderBottomborderBottomborderBottomborderBottomborderBottomborderBottomborderBottomborderBottomborderBottomborderBottomborderBottomborderBottomborderBottomborderBottomborderBottomborderBottom
                </Text>
              </GridItem>
            </Grid>
          ))}
        </Box>
      )}
    </Flex>
  );
};

export default SinglePost;

import React, { useState, useEffect, useContext } from "react";
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
import { CurrentUserContext } from "../CurrentUserContext";

const SinglePost = () => {
  const [post, setPost] = useState(null);
  const [text, setText] = useState("");

  // Current user from context
  const currentUser = useContext(CurrentUserContext);

  // useParams() gets the current posts id from the url
  const { id } = useParams();

  // Fetch the post data when the post is loaded
  useEffect(() => {
    const fetchPost = async () => {
      const { data } = await axios.get(`/api/post/${id}`);
      setPost(data);
    };
    fetchPost();
  }, [id]);

  // Handle the submittion of the comment
  const handleSubmit = async (event) => {
    if (!currentUser) {
      alert("Please login to comment");
      return;
    }
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
      <Flex marginTop={"4"} flexDir="column">
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
              marginY="4"
              key={comment._id}
              borderBottom="1px solid"
            >
              <GridItem>
                <VoteButtons isComment={true} post={post} comment={comment} />
              </GridItem>
              <GridItem>
                <Text>Commented by: {comment.user}</Text>
                <Text>{comment.text}</Text>
              </GridItem>
            </Grid>
          ))}
        </Box>
      )}
    </Flex>
  );
};

export default SinglePost;

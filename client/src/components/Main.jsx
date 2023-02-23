import React, { useEffect, useState } from "react";
import { Flex, Text } from "@chakra-ui/react";
import VoteButtons from "./VoteButtons";
import { Link } from "react-router-dom";
import PostService from "../services/post.service";

const Main = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    PostService.getAllPosts().then(
      (response) => {
        setPosts(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);
  return (
    <Flex w="100%" flexDir="column">
      {posts.map((post) => (
        <Link to={`/post/${post._id}`} key={post._id}>
          <Flex
            padding="2.5"
            border="1px"
            marginBottom={"2"}
            borderRadius="5"
            cursor="pointer"
            _hover={{ border: "2px" }}
          >
            <VoteButtons votes={1} />
            <Text>{post.title}</Text>
            <Text>Answers: {post.comments.length}</Text>
          </Flex>
        </Link>
      ))}
    </Flex>
  );
};

export default Main;

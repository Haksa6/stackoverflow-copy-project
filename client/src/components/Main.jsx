import React, { useEffect, useState } from "react";
import { Flex, Text } from "@chakra-ui/react";

const Main = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("/api/post")
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.log(error));
  }, []);
  console.log(posts);
  return (
    <Flex w="100%" flexDir="column">
      {posts.map((post) => (
        <Flex
          key={post._id}
          padding="2.5"
          background={"#f0e7db"}
          flexDir="column"
          marginBottom={"2"}
          borderRadius="5"
        >
          <Text>{post.title}</Text>
          <Text>Comments: {post.comments.length}</Text>
        </Flex>
      ))}
    </Flex>
  );
};

export default Main;

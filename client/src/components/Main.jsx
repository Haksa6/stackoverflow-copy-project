import React, { useEffect, useState } from "react";
import { Flex, Text, Box } from "@chakra-ui/react";
import VoteButtons from "./VoteButtons";
import { Link } from "react-router-dom";
import PostService from "../services/post.service";
import { useTranslation } from "react-i18next";

const Main = () => {
  const [posts, setPosts] = useState([]);
  const { t } = useTranslation();

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
    <Flex minW="100%" flexDir="column">
      {posts.map((post) => (
        <Flex
          padding="2"
          border="1px"
          key={post._id}
          marginBottom={"2"}
          borderRadius="5"
        >
          <VoteButtons isComment={false} post={post} />

          <Flex
            flexDir={"column"}
            justify="space-between"
            id="post-content"
            maxW="100%"
            flexWrap={"wrap"}
          >
            <Box>
              <Link to={`/post/${post._id}`}>
                <Text
                  cursor="pointer"
                  fontSize={"xl"}
                  color={"#0074CC"}
                  _hover={{
                    color: "hsl(206deg 100% 52%)",
                  }}
                >
                  {post.title}
                </Text>
              </Link>

              <Text fontSize={"sm"}>{post.codeSnippet}</Text>
            </Box>
            <Flex>
              <Text marginRight={{ base: "5", sm: "14" }}>
                {t("Answers")}: {post.comments.length}
              </Text>
            </Flex>
          </Flex>
        </Flex>
      ))}
    </Flex>
  );
};

export default Main;

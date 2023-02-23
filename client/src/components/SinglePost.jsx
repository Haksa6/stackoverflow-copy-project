import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Flex, Text, Heading, Button } from "@chakra-ui/react";
import axios from "axios";

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
  return (
    <Flex>
      <Text>{post?.title}</Text>
      <Button onClick={click}></Button>
    </Flex>
  );
};

export default SinglePost;

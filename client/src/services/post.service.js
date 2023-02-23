import axios from "axios";

// Get all the posts
const getAllPosts = () => {
  return axios.get("/api/post");
};

const PostService = {
  getAllPosts,
};

export default PostService;

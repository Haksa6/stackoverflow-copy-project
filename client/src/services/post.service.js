import axios from "axios";

// Get all the posts
const getAllPosts = () => {
  return axios.get("/api/post");
};

// Add a post
const addPost = (userID, title, codeSnippet) => {
  const token = JSON.parse(localStorage.getItem("token"));

  return axios
    .post(
      "api/post/add",
      {
        user: userID,
        title: title,
        codeSnippet: codeSnippet,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response) => {
      return response.data;
    });
};

const PostService = {
  getAllPosts,
  addPost,
};

export default PostService;

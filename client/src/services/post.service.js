import axios from "axios";

const token = JSON.parse(localStorage.getItem("token"));

// Get all the posts
const getAllPosts = () => {
  return axios.get("/api/post");
};

// Add a post
const addPost = (userID, title, codeSnippet) => {
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

// Add a comment on a post
const addComment = (username, postID, text) => {
  return axios
    .post(
      `http://localhost:3000/api/post/${postID}/comment`,
      {
        user: username,
        text: text,
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
  addComment,
};

export default PostService;

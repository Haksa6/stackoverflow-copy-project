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

// Add a vote on a post
const addVote = (postID, value) => {
  return axios
    .put(
      `http://localhost:3000/api/post/${postID}/vote`,
      {
        voteValue: value,
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

// Add a vote on a comment
const addVoteComment = (commentId, value) => {
  return axios
    .put(
      "http://localhost:3000/api/post/commentvote",
      {
        voteValue: value,
        commentId: commentId,
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
  addVote,
  addVoteComment,
};

export default PostService;

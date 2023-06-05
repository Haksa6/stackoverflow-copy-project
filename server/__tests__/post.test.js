const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const Post = require("../models/Post");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const auth = require("../utils/auth");

// Clear the database before each test
beforeEach(async () => {
  await Post.deleteMany();
});

// Close the database connection after all tests are completed
afterAll(async () => {
  await mongoose.connection.close();
});

describe("GET /api/post", () => {
  it("should get all posts", async () => {
    // Add sample posts to the database
    await Post.create({ title: "Post 1", codeSnippet: "Snippet 1" });
    await Post.create({ title: "Post 2", codeSnippet: "Snippet 2" });

    // Send a GET request to the route
    const response = await request(app).get("/api/post");

    // Expect the response to have a status of 200
    expect(response.status).toBe(200);
    // Expect the response bodies to contain correct titles and posts
    expect(response.body[1].title).toBe("Post 2");
    expect(response.body[0].codeSnippet).toBe("Snippet 1");
  });
});

describe("POST /api/post/add", () => {
  let user;
  let token;

  beforeAll(async () => {
    await User.deleteMany({});
    // Create the user
    user = await User.create({ username: "test", password: "password" });
    // Generate a JWT token for the user
    token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  });

  it("should add a new post", async () => {
    // Apply the auth middleware to the app instance
    app.use(auth);

    // Send a POST request to the route with a new post data and bearer token
    const response = await request(app)
      .post("/api/post/add")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "New Post", codeSnippet: "New Snippet" });

    // Expect the response to have a status of 201
    expect(response.status).toBe(201);

    // Expect the response bodies to contain correct titles and posts
    expect(response.body.title).toBe("New Post");
    expect(response.body.codeSnippet).toBe("New Snippet");

    // Check if the post is added to the database
    const post = await Post.findOne({ title: "New Post" });
    expect(post).toBeTruthy();
  });
});

describe("GET /api/post/:id", () => {
  it("should get a single post by ID", async () => {
    // Add a sample post to the database
    const createdPost = await Post.create({
      title: "Test Post",
      codeSnippet: "Test Snippet",
    });

    // Send a GET request to the route with the ID of the created post
    const response = await request(app).get(`/api/post/${createdPost._id}`);

    // Expect the response to have a status of 201
    expect(response.status).toBe(201);
    // Expect the response bodies to contain correct titles and posts
    expect(response.body.title).toBe("Test Post");
    expect(response.body.codeSnippet).toBe("Test Snippet");
  });

  it("should return 404 if post is not found", async () => {
    // Send a GET request to the route with a non-existent post ID
    const id = mongoose.Types.ObjectId("noneexistent");
    const response = await request(app).get(`/api/post/${id}`);

    // Expect the response to have a status of 404
    expect(response.status).toBe(404);
    // Expect the response body to contain an error message
    expect(response.body).toEqual({ msg: "Post not found" });
  });
});

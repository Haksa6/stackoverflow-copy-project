const request = require("supertest");
const app = require("../app");
const User = require("../models/User");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const auth = require("../utils/auth");

// Close the database connection after all tests are completed
afterAll(async () => {
  await mongoose.connection.close();
});

describe("User routes", () => {
  beforeAll(async () => {
    // Create a user for testing
    const user = await User.create({
      username: "testUser",
      password: "testPassword1",
    });
  });

  describe("POST /api/user/register", () => {
    it("should register a new user", async () => {
      const response = await request(app)
        .post("/api/user/register")
        .send({ username: "newUser", password: "newPassword123" });

      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
    });

    it("should return an error if username is already in use", async () => {
      const response = await request(app)
        .post("/api/user/register")
        .send({ username: "testUser", password: "testPassword1" });
      expect(response.status).toBe(409);
      expect(response.text).toBe("Username already in use.");
    });

    it("should return an error if password is too short ", async () => {
      const response = await request(app)
        .post("/api/user/register")
        .send({ username: "user", password: "pass" });

      expect(response.status).toBe(400);
      expect(response.text).toBe("Password must be at least 5 characters long");
    });
    it("should return an error if password doesnt contain numbers ", async () => {
      const response = await request(app)
        .post("/api/user/register")
        .send({ username: "user", password: "passs" });

      expect(response.status).toBe(400);
      expect(response.text).toBe("Password must contain at least one number");
    });
  });

  describe("POST /api/user/login", () => {
    it("should log in an existing user", async () => {
      const response = await request(app)
        .post("/api/user/login")
        .send({ username: "testUser", password: "testPassword1" });

      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
    });

    it("should return an error if user is not found", async () => {
      const response = await request(app)
        .post("/api/user/login")
        .send({ username: "nonExistingUser", password: "testPassword" });

      expect(response.status).toBe(400);
      expect(response.text).toBe("User not found!");
    });

    it("should return an error if password is incorrect", async () => {
      const response = await request(app)
        .post("/api/user/login")
        .send({ username: "testUser", password: "incorrectPassword" });

      expect(response.status).toBe(400);
      expect(response.text).toBe("Incorrect password!");
    });
  });
});

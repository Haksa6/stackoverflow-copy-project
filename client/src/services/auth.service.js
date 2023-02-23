import axios from "axios";

// Register function
const register = (username, password) => {
  return axios
    .post("/api/user/register", {
      username,
      password,
    })
    .then((response) => {
      if (response.data) {
        // Set user in localstorage if the register was succesful
        localStorage.setItem("token", JSON.stringify(response.data));
      }

      return response.data;
    });
};

// Login function
const login = (username, password) => {
  return axios
    .post("/api/user/login", {
      username,
      password,
    })
    .then((response) => {
      if (response.data) {
        // Set user in localstorage if the login was succesful
        localStorage.setItem("token", JSON.stringify(response.data));
      }

      return response.data;
    });
};

// Logout function
const logout = () => {
  //Remove the token from localStorage
  localStorage.removeItem("token");
  // Reload the page so the navbar updates
  window.location.reload();
};

const AuthService = {
  register,
  login,
  logout,
};

export default AuthService;

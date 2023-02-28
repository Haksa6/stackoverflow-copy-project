import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import { Flex } from "@chakra-ui/react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import SinglePost from "./components/SinglePost";
import AskQuestion from "./components/AskQuestion";
import { useState, useEffect } from "react";
import AuthService from "./services/auth.service";
import NotFound from "./components/NotFound";
import { CurrentUserProvider } from "./CurrentUserContext";

function App() {
  // Get the current user information
  const [currentUser, setCurrentUser] = useState(undefined);

  // Get the current user
  useEffect(() => {
    AuthService.getCurrentUser().then(
      (value) => {
        setCurrentUser(value);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  return (
    <CurrentUserProvider>
      <ChakraProvider>
        <Flex
          as="main"
          w="100%"
          minH="100vh"
          marginInlineStart="auto"
          marginInlineEnd="auto"
          paddingInlineStart="1.5rem"
          paddingInlineEnd="1.5rem"
          paddingTop="28"
          justifyContent="center"
          wordBreak={"break-word"}
        >
          <Router>
            <Navbar currentUser={currentUser} />
            <Routes>
              <Route path="/" element={<Main />} />
              <Route
                path="/ask"
                element={<AskQuestion currentUser={currentUser} />}
              />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/post/:id"
                element={<SinglePost currentUser={currentUser} />}
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </Flex>
      </ChakraProvider>
    </CurrentUserProvider>
  );
}

export default App;

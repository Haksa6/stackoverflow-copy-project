import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import { Flex } from "@chakra-ui/react";
import Login from "./components/Login";
import Signup from "./components/Signup";
function App() {
  return (
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
      >
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Main />}></Route>
            <Route path="/about" element={<h1>hi</h1>}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/login" element={<Login />}></Route>
          </Routes>
        </Router>
      </Flex>
    </ChakraProvider>
  );
}

export default App;

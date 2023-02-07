import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<h1>hi</h1>}></Route>
          <Route path="/about" element={<h1>hi</h1>}></Route>
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;

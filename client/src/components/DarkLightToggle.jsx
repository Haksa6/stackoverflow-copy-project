import React from "react";
import { useColorMode, IconButton, useColorModeValue } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";

// The button showed on the navbar to change theme.
const DarkLightToggle = () => {
  const { toggleColorMode } = useColorMode();

  return (
    //wait removes the animation from the removed element
    <AnimatePresence mode="wait">
      <motion.div
        key={useColorModeValue("light", "dark")}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.2 }}
        exit={{ y: 20, opacity: 0 }}
        style={{ display: "inline-block" }}
      >
        <IconButton
          onClick={toggleColorMode}
          colorScheme={useColorModeValue("purple", "orange")}
          icon={useColorModeValue(<MoonIcon />, <SunIcon />)}
        ></IconButton>
      </motion.div>
    </AnimatePresence>
  );
};

export default DarkLightToggle;

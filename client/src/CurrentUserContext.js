import { createContext, useState, useEffect } from "react";
import AuthService from "./services/auth.service";

export const CurrentUserContext = createContext();

// Allows the components to get the current user without passing it as props
export const CurrentUserProvider = ({ children }) => {
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
    <CurrentUserContext.Provider value={currentUser}>
      {children}
    </CurrentUserContext.Provider>
  );
};

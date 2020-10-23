import React, { useState } from "react";

interface UserContextType {
  queuing: boolean;
  setQueuing: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UserContext = React.createContext<UserContextType>({
  queuing: false,
  setQueuing: () => {},
});

export const UserProvider: React.FC = ({ children }) => {
  const [queuing, setQueuing] = useState(false);
  return <UserContext.Provider value={{ queuing, setQueuing }}>{children}</UserContext.Provider>;
};

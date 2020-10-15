import React, { useState } from "react";

interface UserContextType {
  queuing: boolean;
  setQueuing: (value: boolean) => void;
}

export const UserContext = React.createContext<UserContextType>({
  queuing: false,
  setQueuing: () => {},
});

export const UserProvider: React.FC = ({ children }) => {
  const [queuing, setQueuing] = useState(false);
  return (
    <UserContext.Provider value={{ queuing, setQueuing: (value: boolean) => setQueuing(value) }}>
      {children}
    </UserContext.Provider>
  );
};

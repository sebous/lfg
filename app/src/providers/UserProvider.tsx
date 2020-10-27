import React, { useState } from "react";
import { User } from "../hooks/useLogin";

interface UserContextType {
  userInfo?: User;
  setUserInfo: React.Dispatch<React.SetStateAction<User | undefined>>;
  queuing: boolean;
  setQueuing: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UserContext = React.createContext<UserContextType>({
  setUserInfo: () => {},
  queuing: false,
  setQueuing: () => {},
});

export const UserProvider: React.FC = ({ children }) => {
  const [queuing, setQueuing] = useState(false);
  const [userInfo, setUserInfo] = useState<User>();
  return (
    <UserContext.Provider value={{ queuing, setQueuing, userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};

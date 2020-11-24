import React, { useState } from "react";
import { User } from "../hooks/useLogin";

export interface UserContextType {
  userInfo?: User;
  setUserInfo: React.Dispatch<React.SetStateAction<User | undefined>>;
  queuing: boolean;
  setQueuing: React.Dispatch<React.SetStateAction<boolean>>;
  isAuth: boolean;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UserContext = React.createContext<UserContextType>({
  setUserInfo: () => {},
  queuing: false,
  setQueuing: () => {},
  isAuth: false,
  setIsAuth: () => {},
});

export const UserProvider: React.FC = ({ children }) => {
  const [queuing, setQueuing] = useState(false);
  const [userInfo, setUserInfo] = useState<User>();
  const [isAuth, setIsAuth] = useState(false);
  return (
    <UserContext.Provider value={{ queuing, setQueuing, userInfo, setUserInfo, isAuth, setIsAuth }}>
      {children}
    </UserContext.Provider>
  );
};

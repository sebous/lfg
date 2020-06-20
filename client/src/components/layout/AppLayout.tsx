import React from "react";
import { Header } from "./Header";
import { Background } from "../ui/Background";

export const AppLayout: React.FC = ({ children }) => (
  <Background>
    <Header />
    {children}
  </Background>
);

import React from "react";
import Div100vh from "react-div-100vh";
import { Header } from "./Header";
import { Background } from "../ui/Background";

export const AppLayout: React.FC = ({ children }) => (
  // <Div100vh>
  <Background>
    <Header />
    {children}
  </Background>
  // </Div100vh>
);

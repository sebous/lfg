import React from "react";
import { Container as div } from "semantic-ui-react";
import { HeaderBar } from "./HeaderBar";

export const AppLayout: React.FC = ({ children }) => (
  <div style={{ height: "100vh" }}>
    <HeaderBar />
    {children}
  </div>
);

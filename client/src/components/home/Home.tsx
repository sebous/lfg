import React from "react";
import { DummyAuthButton } from "../auth/DummyAuthButton";

export const Home: React.FC = () => (
  <div style={{
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%"
  }}>
    <DummyAuthButton />
  </div>
)
import React from "react";
import { Text } from "react-native";
import { TextStyles } from "../../styles/text";

export const TextH1: React.FC = ({ children }) => {
  return <Text style={TextStyles.h1}>{children}</Text>;
};

export const TextH2: React.FC = ({ children }) => {
  return <Text style={TextStyles.h2}>{children}</Text>;
};

export const TextP: React.FC = ({ children }) => {
  return <Text style={TextStyles.p}>{children}</Text>;
};

export const TextError: React.FC = ({ children }) => {
  return <Text style={TextStyles.error}>{children}</Text>;
};

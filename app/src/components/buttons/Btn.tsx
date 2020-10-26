import { Icon } from "expo";
import React from "react";
import { GestureResponderEvent, Text, TouchableOpacity, View } from "react-native";
import { ButtonStyles } from "../../styles/button";

interface BtnProps {
  onPress: (e: GestureResponderEvent) => void;
}

export const Btn: React.FC<BtnProps> = ({ onPress, children }) => {
  return (
    <TouchableOpacity style={ButtonStyles.btn} delayPressIn={0.05} onPress={onPress}>
      <Text style={ButtonStyles.btnText}>{children}</Text>
    </TouchableOpacity>
  );
};

interface BtnIconProps {
  onPress: (e: GestureResponderEvent) => void;
  icon: Icon;
  background?: string;
  color?: string;
  align?: "center" | "flex-start" | "flex-end";
}

export const BtnIcon: React.FC<BtnIconProps> = ({
  onPress,
  children,
  icon,
  background,
  color,
  align,
}) => {
  return (
    <TouchableOpacity
      style={{
        ...ButtonStyles.btn,
        backgroundColor: background ?? ButtonStyles.btn.backgroundColor,
        justifyContent: align ?? ButtonStyles.btn.alignItems,
      }}
      delayPressIn={0.05}
      onPress={onPress}
    >
      <Text style={{ ...ButtonStyles.btnText, color: color ?? ButtonStyles.btnText.color }}>
        {children}
      </Text>
      {icon}
    </TouchableOpacity>
  );
};

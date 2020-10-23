import { StyleSheet } from "react-native";
import { AppColors } from "./colors";

export const ButtonStyles = StyleSheet.create({
  btn: {
    textAlign: "center",
    backgroundColor: AppColors.GREEN,
    height: 56,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  btnText: {
    fontWeight: "600",
    color: AppColors.WHITE,
    fontSize: 18,
    letterSpacing: 0.75,
    marginRight: 10,
  },
  queueBtn: {
    alignItems: "center",
    padding: 12,
    backgroundColor: "lightgreen",
    position: "absolute",
    borderRadius: 5,
    bottom: 40,
    right: 16,
  },
});

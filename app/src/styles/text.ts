import { StyleSheet } from "react-native";
import { AppColors } from "./colors";

export const TextStyles = StyleSheet.create({
  h1: {
    fontSize: 32,
    fontWeight: "700",
    color: AppColors.WHITE,
  },

  h2: {
    fontSize: 18,
    fontWeight: "500",
    color: AppColors.WHITE,
  },
  p: {
    fontSize: 16,
    color: AppColors.WHITE,
  },
  light: {
    fontSize: 18,
    color: AppColors.TEXT_LIGHT,
  },
  error: {
    color: AppColors.RED,
    paddingTop: 5,
    paddingLeft: 5,
  },
});

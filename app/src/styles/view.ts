import { StyleSheet } from "react-native";
import { AppColors } from "./colors";

export const ViewStyles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: AppColors.DARK_BACKGROUND,
  },
  tile: {
    backgroundColor: AppColors.DARK_MENU,
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginTop: 20,
    borderRadius: 8,
    color: AppColors.WHITE,
  },
  tileWrapper: {
    paddingHorizontal: 20,
  },
  spacer: {
    marginBottom: 40,
  },
});

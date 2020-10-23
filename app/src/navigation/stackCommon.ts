import { StackNavigationOptions } from "@react-navigation/stack";
import { AppColors } from "../styles/colors";

export const stackScreenOptions: StackNavigationOptions = {
  headerStyle: {
    backgroundColor: AppColors.DARK_BACKGROUND,
    borderColor: AppColors.DARK_BACKGROUND,
    shadowColor: AppColors.DARK_MENU,
    shadowOffset: { height: 2, width: 0 },
    shadowOpacity: 0.5,
  },
  headerTintColor: AppColors.WHITE,
};

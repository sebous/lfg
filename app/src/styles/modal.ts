import { StyleSheet } from "react-native";
import { AppColors } from "./colors";

export const ModalStyles = StyleSheet.create({
  addPlaceModal: {
    backgroundColor: AppColors.DARK_MENU,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: "88%",
    top: "12%",
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  formContainer: {
    marginTop: 40,
  },
  inputGroup: {
    marginBottom: 20,
  },
  input: {
    height: 50,
    width: "100%",
    borderBottomColor: AppColors.DARK_BACKGROUND,
    borderBottomWidth: 1,
    color: AppColors.WHITE,
    fontSize: 18,
    paddingHorizontal: 5,
  },
});

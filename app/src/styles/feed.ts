import { StyleSheet } from "react-native";
import { AppColors } from "./colors";

export const FeedStyles = StyleSheet.create({
  feedTileImage: {
    height: 100,
    resizeMode: "cover",
    borderRadius: 8,
    flex: 1,
  },
  feedTileContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 100,
  },
  joinedUsersWrapper: { paddingLeft: 20, flexDirection: "row" },
  joinedUsersText: { fontSize: 20, paddingLeft: 10, color: AppColors.TEXT_LIGHT },
});

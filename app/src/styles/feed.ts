import { StyleSheet } from "react-native";

export const FeedStyles = StyleSheet.create({
  feedTileImage: {
    width: "100%",
    height: 200,
    resizeMode: "center",
    borderRadius: 8,
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
});
import React from "react";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { View } from "react-native";
import { Image } from "react-native";
import { ReactNativeFile } from "apollo-upload-client";
import { AppColors } from "../../styles/colors";
import { ModalStyles } from "../../styles/modal";
import { TextLight } from "../text/Text";

interface ImageInputPreviewProps {
  pickImage: () => Promise<void>;
  takeImage: () => Promise<void>;
  image?: ReactNativeFile;
}

export const ImageInputPreview: React.FC<ImageInputPreviewProps> = ({
  pickImage,
  takeImage,
  image,
}) => {
  return (
    <View style={ModalStyles.imageInputGroup}>
      <View style={ModalStyles.imageInputHeader}>
        <TextLight>Image</TextLight>
        <Ionicons
          name="ios-image"
          size={36}
          color={AppColors.GREEN}
          style={{ marginLeft: "auto" }}
          onPress={pickImage}
        />
        <AntDesign
          name="camera"
          size={40}
          color={AppColors.GREEN}
          style={{ marginLeft: 20 }}
          onPress={takeImage}
        />
      </View>
      {image && (
        <Image source={{ uri: image?.uri }} style={{ height: 100, width: 100, borderRadius: 3 }} />
      )}
    </View>
  );
};

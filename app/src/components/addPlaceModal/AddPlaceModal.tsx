import React, { useState } from "react";
import { ScrollView, TextInput, View } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import { ReactNativeFile } from "apollo-upload-client";
import { ModalStyles } from "../../styles/modal";
import { TextError, TextH1 } from "../text/Text";
import { AppColors } from "../../styles/colors";
import { BtnIcon } from "../buttons/Btn";
import { ViewStyles } from "../../styles/view";
import { RootNavProps } from "../../navigation/rootStack/RootParamList";
import { useMutation } from "@apollo/client";
import { AddPlace, AddPlaceVariables } from "../../graphqlTypes";
import { ADD_PLACE, GET_PLACES } from "../../gql/places.graphql";
import { ImageInputPreview } from "./ImageInputPreview";

interface AddPlaceFormInput {
  name: string;
  description: string;
}

export const AddPlaceModal: React.FC<RootNavProps<"AddPlace">> = ({ navigation }) => {
  const { handleSubmit, control, errors, setValue } = useForm<AddPlaceFormInput>({});
  const [image, setImage] = useState<ReactNativeFile>();
  const [addPlaceMutation, { data: addPlaceResponse, error: addPlaceError, loading }] = useMutation<
    AddPlace,
    AddPlaceVariables
  >(ADD_PLACE);

  const onSubmit = (data: { name: string; description: string }) => {
    // console.log("submitting", data);
    const { name, description } = data;
    const imageFile = image;
    if (imageFile) {
      imageFile.name = name;
    }
    addPlaceMutation({
      variables: { placeInput: { name, description, imageUpload: imageFile } },
      refetchQueries: [{ query: GET_PLACES }],
    });
    navigation.navigate("Dashboard");
  };

  const pickImage = async () => {
    const { granted } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (!granted) return;

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.25,
    });
    if (pickerResult.cancelled) return;

    // save image uri
    const { uri, type } = pickerResult;
    const imageFile = new ReactNativeFile({
      uri,
      type,
    });
    setImage(imageFile);
  };

  const takeImage = async () => {
    const { granted } = await Permissions.askAsync(Permissions.CAMERA);
    if (!granted) return;

    const cameraResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.25,
    });
    if (cameraResult.cancelled) return;

    // save image uri
    const { uri, type } = cameraResult;
    const imageFile = new ReactNativeFile({
      uri,
      type,
    });
    setImage(imageFile);
  };

  return (
    <View style={ModalStyles.addPlaceModal}>
      <TextH1>Add place</TextH1>
      <ScrollView style={ModalStyles.formContainer}>
        <View style={ModalStyles.inputGroup}>
          <Controller
            control={control}
            name="name"
            defaultValue=""
            rules={{
              required: { value: true, message: "required" },
              minLength: { value: 3, message: "write something longer" },
            }}
            render={({ onChange, onBlur, value }) => (
              <TextInput
                style={ModalStyles.input}
                placeholder="Name"
                placeholderTextColor={AppColors.TEXT_LIGHT}
                underlineColorAndroid={AppColors.TEXT_LIGHT}
                onChangeText={(value) => onChange(value)}
                value={value}
              />
            )}
          />
          {errors?.name && <TextError>{errors?.name?.message}</TextError>}
        </View>
        <View style={ModalStyles.inputGroup}>
          <Controller
            control={control}
            name="description"
            defaultValue=""
            rules={{
              required: { value: true, message: "required" },
              minLength: { value: 3, message: "write something longer" },
            }}
            render={({ onChange, onBlur, value }) => (
              <TextInput
                style={ModalStyles.input}
                placeholder="Description"
                placeholderTextColor={AppColors.TEXT_LIGHT}
                underlineColorAndroid={AppColors.TEXT_LIGHT}
                onChangeText={(value) => onChange(value)}
                value={value}
              />
            )}
          />
          {errors?.description && <TextError>{errors?.description?.message}</TextError>}
        </View>

        <ImageInputPreview pickImage={pickImage} takeImage={takeImage} image={image} />

        <View style={ViewStyles.spacer} />
        <BtnIcon
          onPress={handleSubmit(onSubmit)}
          icon={<AntDesign name="arrowright" color={AppColors.WHITE} size={20} />}
        >
          Publish
        </BtnIcon>
      </ScrollView>
    </View>
  );
};

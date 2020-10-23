import React, { useEffect, useState } from "react";
import { Button, Modal, ScrollView, TextInput, View } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { AntDesign } from "@expo/vector-icons";
import { ModalStyles } from "../styles/modal";
import { TextError, TextH1, TextP } from "./text/Text";
import { AppColors } from "../styles/colors";
import { BtnIcon } from "./buttons/Btn";
import { ViewStyles } from "../styles/view";
import { ButtonStyles } from "../styles/button";
import { RootNavProps } from "../navigation/rootStack/RootParamList";
import { useMutation } from "@apollo/client";
import { AddPlace, AddPlaceVariables } from "../graphqlTypes";
import { ADD_PLACE } from "../gql/places.graphql";

export const AddPlaceModal: React.FC<RootNavProps<"AddPlace">> = ({ navigation }) => {
  const { handleSubmit, control, errors } = useForm({});
  const [addPlaceMutation, { data: addPlaceResponse, error: addPlaceError, loading }] = useMutation<
    AddPlace,
    AddPlaceVariables
  >(ADD_PLACE);

  const onSubmit = (data: { name: string; description: string }) => {
    console.log("submitting", data);
    const { name, description } = data;
    addPlaceMutation({ variables: { placeInput: { name, description } } });
    navigation.navigate("Dashboard");
  };

  return (
    <View style={ModalStyles.addPlaceModal}>
      <TextH1>Add place</TextH1>
      <View style={ModalStyles.formContainer}>
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
        <View style={ViewStyles.spacer} />
        <BtnIcon
          onPress={handleSubmit(onSubmit)}
          icon={<AntDesign name="arrowright" color={AppColors.WHITE} size={20} />}
        >
          Publish
        </BtnIcon>
      </View>
    </View>
  );
};

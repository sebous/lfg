import React, { useEffect, useState } from "react";
import { Button, Modal, ScrollView, TextInput, View } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { ModalStyles } from "../styles/modal";
import { TextH1, TextP } from "./text/Text";
import { AppColors } from "../styles/colors";

interface AddPlaceModalProps {}

export const AddPlaceModal: React.FC<AddPlaceModalProps> = ({}) => {
  const { handleSubmit, control, errors } = useForm({});

  const onSubmit = (data: { name: string; description: string }) => {
    console.log("submitting", data);
  };
  console.log("errors", errors);

  return (
    <View style={ModalStyles.addPlaceModal}>
      <TextH1>Add place to go</TextH1>
      <View style={ModalStyles.formContainer}>
        <Controller
          control={control}
          name="name"
          defaultValue=""
          rules={{ required: true, minLength: 3 }}
          render={({ onChange, onBlur, value }) => (
            <TextInput
              style={ModalStyles.input}
              placeholder="name"
              placeholderTextColor={AppColors.TEXT_LIGHT}
              underlineColorAndroid={AppColors.TEXT_LIGHT}
              onChangeText={(value) => onChange(value)}
              value={value}
            />
          )}
        />
        <Controller
          control={control}
          name="description"
          defaultValue=""
          rules={{ required: true, minLength: 3 }}
          render={({ onChange, onBlur, value }) => (
            <TextInput
              style={ModalStyles.input}
              placeholder="description"
              placeholderTextColor={AppColors.TEXT_LIGHT}
              underlineColorAndroid={AppColors.TEXT_LIGHT}
              onChangeText={(value) => onChange(value)}
              value={value}
            />
          )}
        />
        <Button title="submit" onPress={handleSubmit(onSubmit)} color="red" />
      </View>
    </View>
  );
};

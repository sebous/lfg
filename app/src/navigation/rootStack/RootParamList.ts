import { StackNavigationProp } from "@react-navigation/stack";

export type RootParamList = {
  Dashboard: undefined;
  AddPlace: undefined;
};

export type RootNavProps<T extends keyof RootParamList> = {
  navigation: StackNavigationProp<RootParamList, T>;
};

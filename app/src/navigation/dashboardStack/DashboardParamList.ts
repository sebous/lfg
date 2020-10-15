import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export type DashboardParamList = {
  Dashboard: undefined;
  Place: {
    name: string;
  };
  UserProfile: {
    name?: string;
  };
};

export type DashboardNavProps<T extends keyof DashboardParamList> = {
  navigation: StackNavigationProp<DashboardParamList, T>;
  route: RouteProp<DashboardParamList, T>;
};

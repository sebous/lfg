import React, { useEffect, useState } from "react";
import * as Facebook from "expo-facebook";
import Constants from "expo-constants";
import { AsyncStorage } from "react-native";

export type User = {
  id: string;
  name: string;
  email: string;
  picture: string;
};

export const USER_LOGGED = "USER_LOGGED";

export function useLogin() {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    try {
      const fbLogin = async () => {
        const user = await AsyncStorage.getItem(USER_LOGGED);
        if (user) {
          console.log(user);
          setAuth(true);
          return;
        }

        await Facebook.initializeAsync({
          appId: Constants.manifest.facebookAppId,
        });

        const auth = await Facebook.logInWithReadPermissionsAsync({
          permissions: ["public_profile", "email"],
        });

        if (auth.type === "success") {
          const response = await fetch(
            `https://graph.facebook.com/me?access_token=${auth.token}&fields=id,name,email,picture`,
          );
          const userData = await response.json();
          await AsyncStorage.setItem(
            USER_LOGGED,
            JSON.stringify({ ...userData, picture: userData.picture.data.url }),
          );
          setAuth(true);
        } else {
          // failed
          console.log(auth.type);
        }
      };
      fbLogin();
    } catch ({ message }) {
      console.log(message);
    }
  }, []);

  return { auth };
}

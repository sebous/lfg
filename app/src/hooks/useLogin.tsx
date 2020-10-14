import React, { useEffect, useState } from "react";
import * as Facebook from "expo-facebook";
import Constants from "expo-constants";
import { AsyncStorage } from "react-native";
import { useLazyQuery, useMutation } from "@apollo/client";
import { FB_LOGIN, LOGIN_VIA_COOKIE } from "../gql/login.graphql";
import { FBlogin, LoginViaCookie } from "../types/graphqlTypes";

export type User = {
  id: string;
  username: string;
  name: string | null;
  fbId: string | null;
  avatar: string | null;
  queuing: boolean;
};

export const USER_LOGGED = "USER_LOGGED";

export function useLogin() {
  const [auth, setAuth] = useState(false);
  console.log(auth);

  const [loginViaCookie, { data: cookieLoginData, error: cookieError }] = useLazyQuery<LoginViaCookie>(
    LOGIN_VIA_COOKIE,
  );
  const [loginViaFbAuth, { data: fbLoginData, error: fbLoginError }] = useMutation<FBlogin>(FB_LOGIN);

  useEffect(() => {
    loginViaCookie();
  }, [loginViaCookie]);

  useEffect(() => {
    const login = async () => {
      await AsyncStorage.setItem(USER_LOGGED, JSON.stringify(cookieLoginData?.loginViaCookie));
      setAuth(true);
    };
    if (cookieLoginData?.loginViaCookie) {
      login();
    }
  }, [cookieLoginData]);

  useEffect(() => {
    try {
      const fbLogin = async () => {
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
          const { id, picture, name } = userData;

          loginViaFbAuth({
            variables: {
              input: {
                fbId: id,
                name,
                accessToken: auth.token,
                avatar: picture?.data?.url,
              },
            },
          });
        } else {
          // failed
          console.log(auth.type);
        }
      };

      if (cookieError) {
        fbLogin();
      }
    } catch ({ message }) {
      console.log(message);
    }
  }, [cookieError, loginViaFbAuth]);

  useEffect(() => {
    const authUser = async () => {
      console.log(fbLoginData?.FBlogin);
      await AsyncStorage.setItem(USER_LOGGED, JSON.stringify({ ...fbLoginData?.FBlogin }));
    };

    if (fbLoginData?.FBlogin) {
      authUser();
    }
    if (fbLoginError) {
      console.log(fbLoginError);
    }
  }, [fbLoginData, fbLoginError]);

  return { auth };
}

import { useContext, useEffect, useState } from "react";
import * as Facebook from "expo-facebook";
import Constants from "expo-constants";
import { AsyncStorage } from "react-native";
import { useMutation, useQuery } from "@apollo/client";
import { useAsyncCallback } from "react-use-async-callback";
import {
  FBlogin,
  FBloginVariables,
  FBlogin_FBlogin,
  LoginViaCookie,
  LoginViaCookie_loginViaCookie,
} from "../graphqlTypes";
import { FB_LOGIN, LOGIN_VIA_COOKIE } from "../gql/login.graphql";
import { UserContext } from "../providers/UserProvider";

export const USER_LOGGED = "USER_LOGGED";
export type User = FBlogin_FBlogin | LoginViaCookie_loginViaCookie;

export function useLogin() {
  const [auth, setAuth] = useState(false);
  const { setQueuing, setUserInfo } = useContext(UserContext);

  const { data: loginViaCookie, error: errorLoggingViaCookie } = useQuery<LoginViaCookie>(
    LOGIN_VIA_COOKIE,
  );
  const [loginToApi, { data: userFromApi, error: loginApiError }] = useMutation<
    FBlogin,
    FBloginVariables
  >(FB_LOGIN);

  // save local auth state
  const [authUser] = useAsyncCallback(async (user: User) => {
    await AsyncStorage.setItem(USER_LOGGED, JSON.stringify({ ...user }));
    setQueuing(user.queuing);
    setUserInfo({...user});
    setAuth(true);
  }, []);

  // authenticate user via FB SDK, creates new user or logs existing
  const [fbLogin] = useAsyncCallback(async () => {
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
      const fbUserData = await response.json();
      // console.log("userData", fbUserData);
      const { id, name, email, picture } = fbUserData;

      loginToApi({
        variables: {
          input: {
            fbId: id,
            accessToken: auth.token,
            name,
            avatar: picture.data.url,
          },
        },
      });
    } else {
      console.log(auth.type);
    }
  }, []);

  // handle results of login via cookie
  useEffect(() => {
    if (loginViaCookie?.loginViaCookie === null || errorLoggingViaCookie) {
      fbLogin();
    }
    if (loginViaCookie?.loginViaCookie) {
      authUser(loginViaCookie.loginViaCookie);
    }
  }, [loginViaCookie, errorLoggingViaCookie, loginToApi, authUser, fbLogin]);

  // handle results of login via FB
  useEffect(() => {
    if (userFromApi?.FBlogin) {
      authUser(userFromApi.FBlogin);
    }
    if (loginApiError) {
      console.log("error logging to api", loginApiError);
    }
  }, [userFromApi, loginApiError, authUser]);

  return { auth };
}

import { useContext, useEffect, useState } from "react";
import * as Facebook from "expo-facebook";
import Constants from "expo-constants";
import { useMutation, useQuery } from "@apollo/client";
import SecureStore from "expo-secure-store";
import { useAsyncCallback } from "react-use-async-callback";
import {
  FBlogin,
  FBlogin_FBlogin_user,
  FBloginVariables,
  CheckToken,
  CheckToken_checkToken,
} from "../graphqlTypes";
import { FB_LOGIN, CHECK_TOKEN } from "../gql/login.graphql";
import { UserContext } from "../providers/UserProvider";

export const USER_LOGGED = "USER_LOGGED";
export const REFRESH_TOKEN = "REFRESH_TOKEN";
export const ACCESS_TOKEN = "ACCESS_TOKEN";
export type User = FBlogin_FBlogin_user | CheckToken_checkToken;

export function useLogin() {
  const [auth, setAuth] = useState(false);
  const { setQueuing, setUserInfo } = useContext(UserContext);

  const { data: checkTokenResult, error: checkTokenError } = useQuery<CheckToken>(CHECK_TOKEN);

  const [fbLoginToApi, { data: fbLoginResult, error: fbLoginError }] = useMutation<
    FBlogin,
    FBloginVariables
  >(FB_LOGIN);

  // save local auth state
  const [authUser] = useAsyncCallback(
    async (user: User, refreshToken?: string, accessToken?: string) => {
      if (refreshToken) {
        await SecureStore.setItemAsync(REFRESH_TOKEN, refreshToken);
      }
      if (accessToken) {
        await SecureStore.setItemAsync(ACCESS_TOKEN, accessToken);
      }

      setQueuing(user.queuing);
      setUserInfo({ ...user });
      setAuth(true);
    },
    [],
  );

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

      fbLoginToApi({
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

  // handle checkTokenResult
  useEffect(() => {
    if (checkTokenResult?.checkToken === null || checkTokenError) {
      fbLogin();
    }
    if (checkTokenResult?.checkToken) {
      authUser(checkTokenResult.checkToken);
    }
  }, [checkTokenResult, checkTokenError]);

  // handle results of login via FB
  useEffect(() => {
    if (fbLoginResult?.FBlogin) {
      const { user, refreshToken, accessToken } = fbLoginResult.FBlogin;
      authUser(user, refreshToken, accessToken);
    }
    if (fbLoginError) {
      console.log("error logging to api", fbLoginError);
    }
  }, [fbLoginResult, fbLoginError]);

  return { auth };
}

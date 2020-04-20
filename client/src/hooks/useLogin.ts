import { useState, useEffect } from "react";
import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import { ReactFacebookLoginInfo } from "react-facebook-login";
import { useHistory } from "react-router-dom";
import { LoginViaCookie, FBlogin } from "../common/graphqlTypes";
import { LOGIN_VIA_COOKIE, FB_LOGIN } from "../gql/login.graphql";
import { useGlobalState } from "../common/state";

export const useLogin = () => {
  const [userState, setUserState] = useGlobalState("user");
  const [isAuth, setIsAuth] = useGlobalState("isAuthorized");

  const [cookieAuthSuccess, setCookieAuthSuccess] = useState<boolean | undefined>(undefined);
  // true if user is authenticated via FB SDK
  const [fbAuthResponse, setFbAuthResponse] = useState<ReactFacebookLoginInfo | undefined>(undefined);

  const [loginViaCookie, { data: cookieLoginData, error: cookieError }] = useLazyQuery<LoginViaCookie>(
    LOGIN_VIA_COOKIE
  );
  const [loginViaFbAuth, { data: fbLoginData, error: fbLoginError }] = useMutation<FBlogin>(FB_LOGIN);

  const history = useHistory();

  function redirectToDashboard() {
    history.replace("/dashboard");
  }

  // try login via cookie
  useEffect(() => {
    loginViaCookie();
  }, [loginViaCookie]);

  // handle login via cookie result
  useEffect(() => {
    if (cookieError) {
      // TODO: show err message
      console.log(cookieError, "error");
      setCookieAuthSuccess(false);
    }
    // null returned -> cookie not in session
    if (cookieLoginData?.loginViaCookie === null) {
      setCookieAuthSuccess(false);
    }
    if (cookieLoginData?.loginViaCookie) {
      setCookieAuthSuccess(true);
      const { id, avatar, username } = cookieLoginData.loginViaCookie;
      setUserState({
        id,
        username,
        avatar: avatar ?? undefined,
      });
      setIsAuth(true);
      redirectToDashboard();
    }
  }, [cookieLoginData, cookieError]);

  // login user via userInfo from FB login
  useEffect(() => {
    if (fbAuthResponse) {
      const { accessToken, id, name, picture } = fbAuthResponse;
      loginViaFbAuth({
        variables: {
          input: {
            fbId: id,
            name,
            accessToken,
            avatar: picture?.data?.url,
          },
        },
      });
    }
  }, [fbAuthResponse]);

  // handle fbLogin result
  useEffect(() => {
    if (fbLoginError) {
      // TODO: show err message
    }
    if (fbLoginData?.FBlogin === null) {
      // TODO: show err message -> fb token invalid
    }
    if (fbLoginData?.FBlogin) {
      const { id, username, avatar } = fbLoginData.FBlogin;
      setUserState({ id, username, avatar: avatar ?? undefined });
      setIsAuth(true);
      redirectToDashboard();
    }
  }, [fbLoginData, fbLoginError]);

  return { setFbAuthResponse, shouldLoadFbSDK: cookieAuthSuccess === false };
};

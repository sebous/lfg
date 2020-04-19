import { useState, useEffect } from "react";
import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import { ReactFacebookLoginInfo } from "react-facebook-login";
import { useHistory } from "react-router-dom";
import { LoginViaCookie, FBlogin } from "../common/graphqlTypes";
import { LOGIN_VIA_COOKIE, FB_LOGIN } from "../gql/login.graphql";
import { useGlobalState } from "../common/state";

export const useLogin = () => {
  const [loginViaCookie, { data: cookieLoginData, error: cookieError }] = useLazyQuery<LoginViaCookie>(
    LOGIN_VIA_COOKIE
  );
  const [fbLogin, { data: fbLoginData, error: fbLoginError }] = useMutation<FBlogin>(FB_LOGIN);
  const [cookieAuthSuccess, setCookieAuthSuccess] = useState<boolean | undefined>(undefined);
  const [fbAuthResponse, setFbAuthResponse] = useState<ReactFacebookLoginInfo | undefined>(undefined);
  const [userState, setUserState] = useGlobalState("user");
  const [isAuth, setIsAuth] = useGlobalState("isAuthorized");

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
      console.log("from cookies");
      setCookieAuthSuccess(true);
      const { id, avatar, username } = cookieLoginData.loginViaCookie;
      setUserState({
        id,
        username,
        avatar: avatar ?? undefined,
      });
      setIsAuth(true);
      // TODO: redirect to dashboard
      redirectToDashboard();
    }
  }, [cookieLoginData, cookieError]);

  // login user via userInfo from FB login
  useEffect(() => {
    if (fbAuthResponse) {
      const { accessToken, id, name, picture } = fbAuthResponse;
      fbLogin({
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
      // TODO: redirect to dashboard
      redirectToDashboard();
    }
  }, [fbLoginData, fbLoginError]);

  return { setFbAuthResponse, shouldLoadFbLogin: cookieAuthSuccess === false };
};

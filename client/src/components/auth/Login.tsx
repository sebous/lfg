import React from "react";
import FacebookLogin from "react-facebook-login";
import { useLogin } from "../../hooks/useLogin";

export const Login: React.FC = () => {
  const { setFbAuthResponse, shouldLoadFbSDK } = useLogin();

  return (
    <>
      {shouldLoadFbSDK && (
        <FacebookLogin
          containerStyle={{ display: "none" }}
          appId="2540415289566455"
          autoLoad
          fields="name,email,picture"
          callback={info => {
            console.log(info);
            setFbAuthResponse(info);
          }}
        />
      )}
    </>
  );
};

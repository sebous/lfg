import axios from "axios";

const CHECK_TOKEN_URL = "https://graph.facebook.com/debug_token";

export const checkIfTokenValid = async (accessToken: string) => {
  try {
    const response = await axios.get(CHECK_TOKEN_URL, {
      params: {
        input_token: accessToken,
        access_token: `${process.env.APP_ID}|${process.env.APP_SECRET}`,
      },
    });
    const { data } = response;
    return data.is_valid as boolean;
  } catch (err) {
    return false;
  }
};

import jwt from "jsonwebtoken";

export function createToken(userId: string) {
  const token = jwt.sign(userId, process.env.APP_SECRET as string, { expiresIn: "1d" });
  return token;
}

export function validateToken(token: string) {
  try {
    jwt.verify(token, process.env.APP_SECRET as string);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export async function decodeAndValidate(token: string) {
  try {
    const decoded = await jwt.verify(token, process.env.APP_SECRET as string);
    return decoded as string;
  } catch (err) {
    console.log(err);
  }
}

import jwt from "jsonwebtoken";

export async function createToken(userId: string) {
  const token = await jwt.sign(userId, process.env.APP_SECRET || "abc", { expiresIn: "1d" });
  return token;
}

export async function validateToken(token: string) {
  try {
    await jwt.verify(token, process.env.APP_SECRET || "abc");
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

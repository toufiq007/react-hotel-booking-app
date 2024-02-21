import jwt from "jsonwebtoken";
import User from "../src/models/user.model";
export const generateNewToken = (userId: string) => {
  const token = jwt.sign(
    { userId: userId },
    process.env.JWT_SECRET_KEY as string,
    {
      expiresIn: "1d",
    }
  );
  return token;
};

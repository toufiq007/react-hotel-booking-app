import { Request, Response } from "express";
import User from "../models/user.model";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import { generateNewToken } from "../../utils/generateJsonWebToken";

// registration controller
const userRegister = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: errors.array(),
    });
  }
  try {
    // all of registration functionality
    const { email } = req.body;
    let user = await User.findOne({ email: email });
    if (user) {
      return res.status(400).json({
        message: "User is already exists",
      });
    }
    user = new User(req.body);
    await user.save();

    //! generate jwt token
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET_KEY as string,
      { expiresIn: "2d" }
    );

    //! set http cookie
    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 86400000,
    });

    // send response to frontend
    return res.status(200).json({
      message: "user created successfully",
      user: user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Something went Wrong!",
    });
  }
};

// login controller
export const userLogin = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }

  const { email, password } = req.body;
  try {
    // const user = await User.findOne({email:email})
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch && email !== user.email) {
      res.status(400).json({ message: "invalid credentials" });
    }
    const token = generateNewToken(user._id);

    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 86400000,
    });
    return res.status(200).json({
      message: "User logged in successfully",
      id: user._id,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export default {
  userRegister,
  userLogin,
};

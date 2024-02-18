import { Request, Response } from "express";
import User from "../models/user.model";
import jwt from "jsonwebtoken";

const userRegister = async (req: Request, res: Response) => {
  try {
    const { email, name, password, confirm_password } = req.body;
    let user = await User.findOne({ email: email });
    if (user) {
      res.status(400).json({
        message: "email already exist!!",
      });
    } else {
      user = new User(req.body);
      await user.save();

      //! generate jwt token
      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET_KEY as string,
        { expiresIn: "2d" }
      );

      //! set token to the cookies
      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 86400000,
      });
      res.status(201).json({
        message: "user created successfully",
        user,
      });
    }
  } catch (errr) {
    res.status(500).json({
      message: "Something went wrong!!",
      error: errr,
    });
  }
};

export default {
  userRegister,
};

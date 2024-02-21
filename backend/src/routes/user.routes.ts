import express, { Request, Response } from "express";
import userController from "../controllers/user.controller";
import { check } from "express-validator";
import User from "../models/user.model";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";

const router = express.Router();

// registration route
router.post(
  "/register",
  [
    check("firstName", "First Name is required").isString(),
    check("lastName", "Last Name is required").isString(),
    check("email", "Email is required").isEmail(),
    check("password", "Password with 6 or more characters required").isLength({
      min: 6,
    }),
  ],
  userController.userRegister
);

// login route
router.post(
  "/login",
  [
    check("email", "Email is requried!!").isEmail(),
    check("password", "Password should be 6 or more character").isLength({
      min: 6,
    }),
  ],
  userController.userLogin
);

export default router;

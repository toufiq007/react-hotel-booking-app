import express, { Request } from "express";
import userController from "../controllers/user.controller";

const router = express.Router();

router.post("/register", userController.userRegister);

export default router;

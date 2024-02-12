import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "../config/connectDB";
dotenv.config();

const app = express();

connectDB();
// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/test", (req: Request, res: Response) => {
  res.status(201).json({
    success: true,
    message: "all files are set",
  });
});

app.listen(3000, () => {
  console.log("app is running");
});

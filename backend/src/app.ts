import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "../config/connectDB";
import userRoutes from "./routes/user.routes";
dotenv.config();

const app = express();
const port = process.env.PORT as string | 5000

connectDB();
// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// setup routes
app.use("/api/users/", userRoutes);

app.listen(port , () => {
  console.log(`app is running ${port}`);
});

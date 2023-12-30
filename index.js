import "express-async-errors";
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import authRouter from "./routes/authRouter.js";
import adminRouter from "./routes/adminRouter.js";
import {
  authenticateUser,
  checkForAdmin,
} from "./middleware/authMiddleware.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.get("/", (req, res) => {
  res.send("Welcome to bmax ts portal api");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/admin", authenticateUser, checkForAdmin, adminRouter);

app.use("*", (req, res) => {
  res.status(404).json({ msg: "Not Found" });
});
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

try {
  await mongoose.connect(process.env.MONGODB_URI);
  app.listen(port, () => {
    console.log("successfully connected to server");
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}

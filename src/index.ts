import * as dotenv from "dotenv";
import express, { Express } from "express";
// require("dotenv");
import dbConnection from "./db";
import appRoute from "./routes";

import errorMiddleware from "./middleware/error";

import cors from "cors";

dotenv.config();

const app: Express = express();

// const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use(appRoute);

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  console.log("Server Started 🎉", process.env.PORT);
  dbConnection();
});

import express, { Express, Request, Response, NextFunction } from "express";
require("dotenv").config({ path: "./src/env-files/config.env" });
import dbConnection from "./db";
import appRoute from "./routes";
import HttpException from "./exceptions/HttpException";
import errorMiddleware from "./middleware/error";

const cors = require("cors");

const app: Express = express();

const port = process.env.port || 5000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use(appRoute);

app.use(errorMiddleware);

app.listen(port, () => {
  console.log("Server Started 🎉");
  dbConnection();
});

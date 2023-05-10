import { Express, Request, Response, NextFunction } from "express";
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "../src/env-files/config.env" });

declare global {
  namespace Express {
    interface Request {
      userId?: number;
    }
  }
}

const userSecretKey = process.env.SECRET_KEY;

export const getUserId = (req: Request, res: Response, next: NextFunction) => {
  try {
    const userToken = req.header("Authorization")?.replace("Bearer ", "");

    console.log("token", userToken);

    if (!userToken)
      return res.status(400).json({ message: "User not logged in!!!" });

    const userId = jwt.verify(userToken, userSecretKey);
    req.userId = userId;
    next();
    return;
  } catch (error) {
    console.log("user token error ", error);
    return res
      .status(500)
      .json({ error: { code: 500, message: "Internal server error." } });
  }
};

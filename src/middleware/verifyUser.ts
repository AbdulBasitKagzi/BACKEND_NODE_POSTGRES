import * as dotenv from "dotenv";
import { Express, Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

dotenv.config();

declare global {
  namespace Express {
    interface Request {
      userId?: number;
    }
  }
}

const userSecretKey = process.env.SECRET_KEY;

export const getUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userToken = req.header("Authorization")?.replace("Bearer ", "");

    console.log("token", userToken, userSecretKey);

    if (!userToken)
      return res
        .status(401)
        .json({ error: { code: 401, message: "User not logged in!!!" } });

    const userId = jwt.verify(userToken, userSecretKey as string);
    req.userId = Number(userId);
    next();
    return;
  } catch (error) {
    console.log("user token error ", error);
    return res
      .status(500)
      .json({ error: { code: 500, message: "Internal server error." } });
  }
};

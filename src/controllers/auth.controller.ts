import * as dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import { logginService } from "../services/auth.service";
import HttpException from "../exceptions/HttpException";

dotenv.config();

const userSecretKey = process.env.SECRET_KEY;

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await logginService(req.body, userSecretKey as string, next);

    if (data)
      return res.status(200).json({
        message: "User logged in 😁 ",
        data: { user: data.user, token: data.token },
      });
    return;
  } catch (error) {
    throw new HttpException(400, "Something went wrong", [
      { domain: "domain", message: "Something went wrong" },
    ]);
  }
};

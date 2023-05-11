import { NextFunction, Request, Response } from "express";
import { createOrderService } from "../services/order.service";
import HttpException from "../exceptions/HttpException";

export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await createOrderService(req.body, req.userId, next);

    if (data) {
      return res.status(200).json({ message: data.message });
    }
    return;
  } catch (error) {
    console.log(error);
    throw new HttpException(400, "Something went wrong", [
      { domain: "server", message: "Something went wrong" },
    ]);
  }
};

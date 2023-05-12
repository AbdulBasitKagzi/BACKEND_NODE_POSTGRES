import { NextFunction, Request, Response } from "express";
import { addShippingDetailService } from "../services/shippingDetail.service";
import HttpException from "../exceptions/HttpException";

export const addShippingDetail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await addShippingDetailService(req.body, req.userId, next);
    if (data) {
      return res
        .status(200)
        .json({ message: "Shipping detail added.", data: data });
    }
    return;
  } catch (error) {
    console.log("add shipping detail error", error);
    throw new HttpException(400, "Internal sever error", [
      { domain: "server", message: "Internal server error!" },
    ]);
  }
};

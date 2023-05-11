import { NextFunction, Request, Response } from "express";
import { addPaymentDetailService } from "../services/paymentDetail.service";
import HttpException from "../exceptions/HttpException";

export const addPaymentDetail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await addPaymentDetailService(req.body, req.userId, next);
    return res
      .status(200)
      .json({ message: "Payment detail added.", data: { data } });
  } catch (error) {
    console.log("add shipping detail error", error);
    throw new HttpException(400, "Internal sever error", [
      { domain: "server", message: "Internal server error!" },
    ]);
  }
};

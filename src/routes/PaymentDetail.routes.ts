import express from "express";
import { addPaymentDetail } from "../controllers/paymentDetail.controller";
import { getUserId } from "../middleware/verifyUser";
import { validatePaymentDetail } from "../validator/paymentDetail.validate";

export const paymentDetailRoute = express.Router();

paymentDetailRoute.post(
  "/api/payment-detail",
  validatePaymentDetail,
  getUserId,
  addPaymentDetail
);

import express from "express";
import { addPaymentDetail } from "../controllers/paymentDetail.controller";
import { getUserId } from "../middleware/verifyUser";

const {
  validatePaymentDetail,
} = require("../validator/paymentDetail.validate");

export const paymentDetailRoute = express.Router();

paymentDetailRoute.post(
  "/api/payment-detail",
  validatePaymentDetail,
  getUserId,
  addPaymentDetail
);

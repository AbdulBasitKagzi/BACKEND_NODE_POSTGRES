import express from "express";
import { addShippingDetail } from "../controllers/shippingDetail.controller";
import { getUserId } from "../middleware/verifyUser";
import { validateShippingDetail } from "../validator/shippingDetail.validate";

export const shippingDetailRoute = express.Router();

shippingDetailRoute.post(
  "/api/shipping-detail",
  validateShippingDetail,
  getUserId,
  addShippingDetail
);

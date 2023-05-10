import express from "express";
import { createOrder } from "../controllers/order.controller";
import { getUserId } from "../middleware/verifyUser";

export const orderRoute = express.Router();

orderRoute.post("/api/order", getUserId, createOrder);

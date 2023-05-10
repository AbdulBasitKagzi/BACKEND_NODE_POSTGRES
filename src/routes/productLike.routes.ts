import express from "express";
import {
  addProductLike,
  getLikeProduct,
} from "../controllers/productLike.controller";
import { getUserId } from "../middleware/verifyUser";

export const productLikeRoute = express.Router();

productLikeRoute.post("/api/product-like", getUserId, addProductLike);
productLikeRoute.get("/api/product-like", getUserId, getLikeProduct);

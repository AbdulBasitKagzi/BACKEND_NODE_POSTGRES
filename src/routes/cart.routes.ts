import express from "express";
import {
  addProductToCart,
  getCartProducts,
  increment_decrement_cartProduct,
  updateCartProduct,
} from "../controllers/cart.controller";
import { getUserId } from "../middleware/verifyUser";

export const cartRoute = express.Router();

cartRoute.post("/api/cart/:id", getUserId, addProductToCart);
cartRoute.patch("/api/cart/:id", getUserId, updateCartProduct);
cartRoute.patch(
  "/api/cart-increment-decrement/:id",
  getUserId,
  increment_decrement_cartProduct
);
cartRoute.get("/api/cart", getUserId, getCartProducts);

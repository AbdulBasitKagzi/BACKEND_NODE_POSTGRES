import express from "express";
import {
  addProduct,
  filterProduct,
  getProduct,
  getProducts,
  testImage,
} from "../controllers/product.controller";
import { upload } from "../controllers/product.controller";

export const productRoute = express.Router();

productRoute.post("/api/product", upload.single("images"), addProduct);
productRoute.post("/upload", upload.single("image"), testImage);
productRoute.get("/api/products", getProducts);
productRoute.get("/api/product/:id", getProduct);
productRoute.get("/api/filter/product", filterProduct);

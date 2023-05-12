import express from "express";
import { addBrand, updateBrand } from "../controllers/brand.controller";
import { validateBrand } from "../validator/brand.validate";

export const brandRoute = express.Router();

brandRoute.route("/api/brand").post(validateBrand, addBrand);
brandRoute.route("/api/brand/:id").patch(validateBrand, updateBrand);

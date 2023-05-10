import express, { Express } from "express";

import {
  addCategory,
  updateCategory,
} from "../controllers/category.controller";
const { validateCategory } = require("../validator/category.validate");
export const categoryRoute = express.Router();

categoryRoute.route("/api/category").post(validateCategory, addCategory);
categoryRoute
  .route("/api/category/:id")
  .patch(validateCategory, updateCategory);

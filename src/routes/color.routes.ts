import express from "express";

import { addColor, updateColor } from "../controllers/color.controller";
const { validateColor } = require("../validator/color.validate");
export const colorRoute = express.Router();

colorRoute.route("/api/color").post(validateColor, addColor);
colorRoute.route("/api/color/:id").patch(validateColor, updateColor);

import express from "express";
import { addSize, updateSize } from "../controllers/size.controller";
import { validateSize } from "../validator/size.validate";

export const sizeRoute = express.Router();

sizeRoute.route("/api/size").post(validateSize, addSize);
sizeRoute.route("/api/size/:id").patch(validateSize, updateSize);

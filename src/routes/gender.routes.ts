import express from "express";

import { addGender, updateGender } from "../controllers/gender.controller";
import { validateGender } from "../validator/gender.validate";

export const genderRoute = express.Router();

genderRoute.route("/api/gender").post(validateGender, addGender);
genderRoute.route("/api/gender/:id").post(validateGender, updateGender);

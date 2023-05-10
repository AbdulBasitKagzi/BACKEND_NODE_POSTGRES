import express from "express";
import { createUser, loginUser } from "../controllers/user.controller";

const { validateUser } = require("../validator/user.validate");
export const userRoute = express.Router();

userRoute.route("/api/user").post(validateUser, createUser);
userRoute.route("/api/login").post(loginUser);

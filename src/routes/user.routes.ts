import express from "express";
import { createUser } from "../controllers/user.controller";
import { loginUser } from "../controllers/auth.controller";

const { validateUser } = require("../validator/user.validate");
const { validateLogin } = require("../validator/login.validate");
export const userRoute = express.Router();

userRoute.route("/api/user").post(validateUser, createUser);
userRoute.route("/api/login").post(validateLogin, loginUser);

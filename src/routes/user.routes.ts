import express from "express";
import { createUser } from "../controllers/user.controller";
import { loginUser } from "../controllers/auth.controller";
import { validateUser } from "../validator/user.validate";

export const userRoute = express.Router();

userRoute.post("/api/user", validateUser, createUser);
userRoute.post("/api/login", loginUser);

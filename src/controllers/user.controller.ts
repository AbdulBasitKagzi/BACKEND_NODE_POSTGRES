import { Request, Response } from "express";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "./src/env-files/config.env" });

import { User } from "../entities/user.entities";

const userSecretKey = process.env.SECRET_KEY;

export const createUser = async (req: Request, res: Response) => {
  try {
    const { first_name, last_name, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);

    const existingUser = await User.findOneBy({ email: email });

    if (existingUser)
      return res
        .status(409)
        .json({ error: { code: 409, messgae: "User already exists" } });

    const createdUser = User.create({
      first_name,
      last_name,
      email,
      password: encryptedPassword,
    });

    await User.save(createdUser);

    return res
      .status(200)
      .json({ message: "User created", date: { createdUser } });
  } catch (error) {
    console.log("error creating user", error);
    return res
      .status(500)
      .json({ error: { code: 500, message: "Internal server error" } });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOneBy({ email });
    if (!user)
      return res
        .status(404)
        .json({ error: { code: 404, message: "User does not exists" } });

    const checkPassword = bcrypt.compareSync(password, user.password);
    if (!checkPassword)
      return res
        .status(401)
        .json({ error: { code: 401, message: "Incorrect password" } });

    const token = jwt.sign(user.id, userSecretKey);
    return res
      .status(200)
      .json({ message: "User logged in 😁 ", data: { user, token } });
  } catch (error) {
    return res
      .status(200)
      .json({ error: { code: 500, message: "Internal server error." } });
  }
};

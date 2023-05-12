import { Request, Response } from "express";

import { genSalt, hash } from "bcrypt";

import { User } from "../entities/user.entities";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { first_name, last_name, email, password } = req.body;
    const salt = await genSalt(10);
    const encryptedPassword = await hash(password, salt);

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

import { compareSync } from "bcrypt";
import { User } from "../entities/user.entities";
import jwt from "jsonwebtoken";
import NotFoundException from "../exceptions/NotFoundException";
import { NextFunction } from "express";

export const loggin = async (
  body: { email: string; password: string },
  userSecretKey: string,
  next: NextFunction
) => {
  try {
    const { email, password } = body;

    const user = await User.findOneBy({ email });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    const checkPassword = compareSync(password, user.password);
    if (!checkPassword) {
      throw new NotFoundException("Incorrect password");
    }

    const token = jwt.sign(user.id.toString(), userSecretKey as string);
    return { user, token };
  } catch (error) {
    next(error);
    return;
  }
};

import { NextFunction, Request, Response } from "express";

import { Brand } from "../entities/Brand.entities";
import HttpException from "../exceptions/HttpException";

export const addbrand = async (
  body: { value: string; slug: string },
  next: NextFunction
) => {
  try {
    const { value, slug } = body;

    const newBrand = Brand.create({
      value,
      slug,
    });

    await Brand.save(newBrand);

    return newBrand;
  } catch (error) {
    console.log("error creating brand", error);
    throw new HttpException(400, "Internal sever error", [
      { domain: "server", message: "Internal server error!" },
    ]);
  }
};

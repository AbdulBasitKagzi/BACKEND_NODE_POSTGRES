import express, { Response, Request, NextFunction } from "express";

import {
  addProductToCartService,
  getCartProductsService,
  increment_decrement_cartProductService,
  updateCartProductService,
} from "../services/cart.service";
import HttpException from "../exceptions/HttpException";

export const addProductToCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await addProductToCartService(
      req.params,
      req.body,
      req.userId,
      next
    );
    if (data) {
      return res
        .status(200)
        .json({ message: "Product added to cart", data: { data } });
    }
    return;
  } catch (error) {
    console.log("cart error", error);
    throw new HttpException(400, "Something went wrong", [
      { domain: "domain", message: "Something went wrong" },
    ]);
  }
};

export const updateCartProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await updateCartProductService(
      req.body,
      req.params,
      req.userId,
      next
    );

    if (data) {
      return res
        .status(200)
        .json({ message: "Product updated.", data: { data } });
    }
    return;
  } catch (error) {
    console.log("update cart error", error);
    throw new HttpException(400, "Something went wrong", [
      { domain: "domain", message: "Something went wrong" },
    ]);
  }
};

export const increment_decrement_cartProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await increment_decrement_cartProductService(
      req.body,
      req.params,
      req.userId,
      next
    );
    if (data) {
      return res
        .status(200)
        .json({ data: data, message: "Cart product updated" });
    }
    return;
  } catch (error) {
    console.log("increment decrement error", error);
    throw new HttpException(422, "Unable to update cart product", [
      { domain: "domain", message: "Unable to update cart product" },
    ]);
  }
};

export const getCartProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await getCartProductsService(req.userId, next);

    if (data && !data.length)
      return res.status(404).json({
        error: { code: 404, message: "Cart not found", data: data },
      });
    return res
      .status(200)
      .json({ message: "Cart found", data: { items: data } });
  } catch (error) {
    console.log("cart found error", error);
    throw new HttpException(422, "Unable to update cart product", [
      { domain: "domain", message: "Unable to update cart product" },
    ]);
  }
};

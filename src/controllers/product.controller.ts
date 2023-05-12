import { NextFunction, Request, Response } from "express";
import multer from "multer";

import { Product } from "../entities/Product.entites";
import { ProductSize } from "../entities/product_size.entities";
import { productColors } from "../entities/product_color.entities";
import { productLists } from "../data/productConstant";
import { Size } from "../entities/size.entities";
import { Gender } from "../entities/Gender.entities";
import { Color } from "../entities/Color.entities";
import {
  filterProductService,
  getProductService,
  getProductsService,
} from "../services/product.service";
import HttpException from "../exceptions/HttpException";

// multer function to upload image

const storage = multer.diskStorage({
  destination: function (req: Request, file: any, cb: any) {
    cb(null, "../Images");
  },
  filename: function (req: Request, file: any, cb: any) {
    console.log("file", file);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

export const upload = multer({ storage: storage });

export const addProduct = async (req: any, res: Response) => {
  try {
    productLists.map(
      async ({
        id,
        productName,
        gender,
        category,
        brand,
        productCurrentPrice,
        productOriginalPrice,
        productDescription,
        reviewRate,
        slug,
        productImages,
        size,
        color,
      }: any) => {
        const product = new Product();

        (product.productName = productName),
          (product.gender = gender),
          (product.category = category),
          (product.brand = brand),
          (product.productCurrentPrice = productCurrentPrice),
          (product.productOriginalPrice = productOriginalPrice),
          (product.productDescription = productDescription),
          (product.reviewRate = reviewRate),
          (product.slug = slug),
          (product.productImages = productImages),
          await Product.save(product);

        size?.map(async (size: number) => {
          const addSize = ProductSize.create({
            product: product.id,
            size: size,
          });

          await ProductSize.save(addSize);
        });

        color?.map(async (color: number) => {
          const addColor = productColors.create({
            product: product.id,
            color: color,
          });
          await productColors.save(addColor);
        });
      }
    );

    return;
  } catch (error) {
    console.log("err", error);
    return res
      .status(500)
      .json({ error: { code: 500, message: "Internal server error" } });
  }
};

export const getProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await getProductsService(next);
    if (data?.length) {
      return res
        .status(200)
        .json({ message: "All products", data: { items: data } });
    }

    return;
  } catch (error) {
    console.log("get all products error", error);
    throw new HttpException(400, "Internal sever error", [
      { domain: "server", message: "Internal server error!" },
    ]);
  }
};

export const getProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await getProductService(req.params, next);

    if (data) return res.status(200).json({ message: "Product", data: data });
    return;
  } catch (error) {
    console.log("get  product error", error);
    throw new HttpException(400, "Internal sever error", [
      { domain: "server", message: "Internal server error!" },
    ]);
  }
};

export const filterProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await filterProductService(req.query, next);

    if (data?.result)
      return res.status(200).json({
        message: "Filtered products 😁",
        data: { items: data.result, count: data.totalCount },
      });
    return;
  } catch (error) {
    throw new HttpException(400, "Internal sever error", [
      { domain: "server", message: "Internal server error!" },
    ]);
  }
};
export const testImage = async (req: any, res: Response) => {};

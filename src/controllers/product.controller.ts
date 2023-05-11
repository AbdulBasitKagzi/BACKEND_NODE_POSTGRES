import { NextFunction, Request, Response } from "express";
const multer = require("multer");

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
    // const {
    //   product_name,
    //   sizes,
    //   color,
    //   gender,
    //   category,
    //   brand,
    //   product_current_price,
    //   product_original_price,
    //   product_description,
    //   review_rate,
    //   slug,
    //   productImages,
    // } = req.body;

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
        // const product = Product.create({
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
          // });
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

    // const product = await getConnection()
    //   .createQueryBuilder()
    //   .insert()
    //   .into(Product)
    //   .values([
    //     {
    //       product_name,
    //       gender,
    //       category,
    //       brand,
    //       product_current_price,
    //       product_original_price,
    //       product_description,
    //       review_rate,
    //       slug,
    //     },
    //   ])
    //   .returning("*")
    //   .execute();

    // productImages.map((image: { id: number; productImage: string }) => {
    //   console.log("image", image);
    //   storage.single(image.productImage);
    // });

    // const product = Product.create({
    //   product_name,
    //   gender,
    //   category,
    //   brand,
    //   product_current_price,
    //   product_original_price,
    //   product_description,
    //   review_rate,
    //   slug,
    // });
    // await Product.save(product);

    // if (!product.id)
    //   return res.status(400).json({ message: "Product id not found." });
    // sizes.map((size: number) => {
    //   getConnection()
    //     .createQueryBuilder()
    //     .insert()
    //     .into(ProductSize)
    //     .values({
    //       product: product.id,
    //       size: size,
    //     })
    //     .returning("*")
    //     .execute();
    // });
    // sizes?.map(async (size: number) => {
    //   const addSize = ProductSize.create({
    //     product: product.id,
    //     size: size,
    //   });

    //   await ProductSize.save(addSize);
    // });
    // color?.map(async (color: number) => {
    //   const addColor = productColors.create({
    //     product: product.id,
    //     color: color,
    //   });
    //   await productColors.save(addColor);
    // });

    // return res.status(200).json({ message: "Product added", product });
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
    // const products = await Product.createQueryBuilder("product")
    //   .select([
    //     "product.id AS id",
    //     "product_name AS productName",
    //     "product_images AS productImages",
    //     "product_description AS productDescription",
    //     "product_original_price AS productOriginalPrice",
    //     "product_current_price AS productCurrentPrice",
    //     "review_rate AS reviewRate",
    //     "slug AS slug",
    //     "gender_id AS gender",
    //     "category_id AS  category",
    //     "brand_id AS brand",
    //   ])
    //   .leftJoinAndSelect("")
    //   .getRawMany();
    // const products: any = await Product.createQueryBuilder("product")
    //   .select("product")
    //   .innerJoinAndMapMany(
    //     "product.ps",
    //     ProductSize,
    //     "ps",
    //     "ps.product=product.id"
    //   )
    //   .leftJoinAndMapMany("ps.s", Size, "s", "s.id=ps.size_id")
    //   // .select(["s.id"])
    //   .getMany();
    // const products = await Product.find({
    //   relations: {
    //     productSizes: { size: true },
    //     productColors: { color: true },
    //     gender: true,
    //     brand: true,
    //     category: true,
    //   },
    // });

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
    // const product = await Product.findOne({
    //   where: { id: parseInt(id) },
    //   // relations: ["productSizes"],
    //   // where: [{ id: parseInt(id) }, { productSizes: { size } }],
    //   relations: {
    //     productSizes: true,
    //     productColors: { color: true },
    //     gender: true,
    //     brand: true,
    //     category: true,
    //   },
    // });
    // const product = await Product.createQueryBuilder("product")
    //   .where("product.id=:id", { id: id })
    //   .leftJoinAndSelect("product.gender", "gender")
    //   .leftJoinAndSelect("product.category", "category")
    //   .leftJoinAndSelect("product.brand", "brand")
    //   .innerJoinAndMapMany(
    //     "productSizes",
    //     ProductSize,
    //     "productSizes",
    //     "productSizes.product=product.id"
    //   )
    //   .leftJoinAndMapMany(
    //     "product.sizes",
    //     Size,
    //     "sizes",
    //     "sizes.id=productSizes.size_id"
    //   )
    //   .innerJoinAndMapMany(
    //     "productColors",
    //     productColors,
    //     "productColors",
    //     "productColors.product=product.id"
    //   )
    //   .leftJoinAndMapMany(
    //     "product.colors",
    //     Color,
    //     "colors",
    //     "colors.id=productColors.colorId"
    //   )
    //   .getOne();

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

    if (data?.result.length)
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

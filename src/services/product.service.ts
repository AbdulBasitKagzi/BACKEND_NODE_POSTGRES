import { ProductSize } from "../entities/product_size.entities";
import { Product } from "../entities/Product.entites";
import { Size } from "../entities/size.entities";
import { productColors } from "../entities/product_color.entities";
import { Color } from "../entities/Color.entities";
import NotFoundException from "../exceptions/NotFoundException";
import { NextFunction } from "express";

export const getProductsService = async (next: NextFunction) => {
  try {
    const products = await Product.createQueryBuilder("product")
      .leftJoinAndSelect("product.gender", "gender")
      .leftJoinAndSelect("product.category", "category")
      .leftJoinAndSelect("product.brand", "brand")
      .innerJoinAndMapMany(
        "productSizes",
        ProductSize,
        "productSizes",
        "productSizes.product=product.id"
      )
      .leftJoinAndMapMany(
        "product.sizes",
        Size,
        "sizes",
        "sizes.id=productSizes.size_id"
      )
      .innerJoinAndMapMany(
        "productColors",
        productColors,
        "productColors",
        "productColors.product=product.id"
      )
      .leftJoinAndMapMany(
        "product.colors",
        Color,
        "colors",
        "colors.id=productColors.colorId"
      )
      .getMany();

    if (!products.length) throw new NotFoundException("No products found");
    return products;
  } catch (error) {
    console.log("get all products error", error);
    next(error);
    return;
  }
};

export const getProductService = async (pid: any, next: NextFunction) => {
  try {
    const { id } = pid;

    const product = await Product.createQueryBuilder("product")
      .where("product.id=:id", { id: id })
      .leftJoinAndSelect("product.gender", "gender")
      .leftJoinAndSelect("product.category", "category")
      .leftJoinAndSelect("product.brand", "brand")
      .innerJoinAndMapMany(
        "productSizes",
        ProductSize,
        "productSizes",
        "productSizes.product=product.id"
      )
      .leftJoinAndMapMany(
        "product.sizes",
        Size,
        "sizes",
        "sizes.id=productSizes.size_id"
      )
      .innerJoinAndMapMany(
        "productColors",
        productColors,
        "productColors",
        "productColors.product=product.id"
      )
      .leftJoinAndMapMany(
        "product.colors",
        Color,
        "colors",
        "colors.id=productColors.colorId"
      )
      .getOne();

    if (!product) throw new NotFoundException("Product not found");
    return product;
  } catch (error) {
    console.log("get  product error", error);
    next(error);
    return;
  }
};

export const filterProductService = async (query: any, next: NextFunction) => {
  try {
    let result;
    let postPerPage = 9;
    let totalCount: number = 0;

    const { gender, categories, brands, page, min, max, sizes } = query;

    let filterProducts = Product.createQueryBuilder("product")
      .leftJoinAndSelect("product.gender", "gender")
      .leftJoinAndSelect("product.category", "category")
      .leftJoinAndSelect("product.brand", "brand")
      .innerJoinAndMapMany(
        "productSizes",
        ProductSize,
        "productSizes",
        "productSizes.product=product.id"
      )
      .leftJoinAndMapMany(
        "product.sizes",
        Size,
        "sizes",
        "sizes.id=productSizes.size_id"
      )
      .innerJoinAndMapMany(
        "productColors",
        productColors,
        "productColors",
        "productColors.product=product.id"
      )
      .leftJoinAndMapMany(
        "product.colors",
        Color,
        "colors",
        "colors.id=productColors.colorId"
      )
      .where("gender.id = :gid", { gid: gender });

    if (categories?.length) {
      filterProducts = filterProducts.andWhere("category.id IN(:...cid)", {
        cid: categories,
      });
    }
    if (brands?.length) {
      filterProducts = filterProducts.andWhere("brand.id IN(:...bid)", {
        bid: brands,
      });
    }
    if (min && max) {
      filterProducts = filterProducts.andWhere(
        "product.productCurrentPrice BETWEEN :start AND :end",
        { start: +min, end: +max }
      );
    }
    if (sizes?.length) {
      filterProducts = filterProducts.andWhere("sizes.id IN (:...sid)", {
        sid: sizes,
      });
    }

    if (page) {
      totalCount = await filterProducts.getCount();
      result = await filterProducts
        .skip((+page - 1) * postPerPage)
        .take(postPerPage)
        .getMany();
    }
    console.log("result", result);
    if (result && !result?.length) {
      return { result, totalCount };
    }

    return { result, totalCount };
  } catch (error) {
    console.log("error", error);
    next(error);
    return;
  }
};

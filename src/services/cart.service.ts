import { NextFunction } from "express";
import { Product } from "../entities/Product.entites";
import { ProductSize } from "../entities/product_size.entities";
import { Size } from "../entities/size.entities";
import { productColors } from "../entities/product_color.entities";
import { Color } from "../entities/Color.entities";
import { Cart, CartTypes } from "../entities/Cart.entities";
import NotFoundException from "../exceptions/NotFoundException";
import HttpException from "../exceptions/HttpException";

export const addProductToCartService = async (
  pid: any,
  body: any,
  userId: any,
  next: NextFunction
) => {
  try {
    const { id } = pid;

    const fetchProduct = await Product.createQueryBuilder("product")
      .where("product.id = :id", { id: id })
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

    if (!fetchProduct) {
      throw new NotFoundException("Product not found");
    }

    const foundCartProduct = await Cart.createQueryBuilder()
      .select("cart")
      .from(Cart, "cart")
      .where("cart.user=:user", { user: userId })
      .andWhere("cart.product=:product", { product: id })
      .andWhere("cart.color=:color", {
        color: body.selectedColor ? body.selectedColor : body.colors[0].id,
      })
      .andWhere("cart.size=:size", {
        size: body.selectedSize ? body.selectedSize : body.sizes[0].id,
      })
      .getOne();

    if (foundCartProduct) {
      foundCartProduct.quantity++;
      foundCartProduct.total_amount =
        foundCartProduct.quantity * foundCartProduct.total_amount;
      await Cart.save(foundCartProduct);
      return foundCartProduct;
    }

    if (fetchProduct) {
      const result = Cart.create({
        user: userId,
        product: parseInt(id),
        color: body.selectedColor ? body.selectedColor : body.colors[0].id,
        size: body.selectedSize ? body.selectedSize : body.sizes[0].id,
        quantity: 1,
        total_amount: +fetchProduct.productCurrentPrice * 1,
      });
      await Cart.save(result);
      return result;
    }
  } catch (error) {
    console.log("error making cart", error);
    next(error);
  }
  return;
};

export const updateCartProductService = async (
  body: any,
  cartId: any,
  userId: any,
  next: NextFunction
) => {
  try {
    const { id } = cartId;
    const foundCartProduct = await Cart.createQueryBuilder()
      .select("cart")
      .from(Cart, "cart")
      .where("cart.user=:user", { user: userId })
      .andWhere("cart.id=:id", { id: id })
      .getOne();

    if (foundCartProduct) {
      const updatedProduct = await Cart.update(
        {
          user: userId,
          id: parseInt(id),
        },
        { ...body }
      );
      return updatedProduct;
    }
    throw new NotFoundException("Product doesnot exist in user's cart");
  } catch (error) {
    console.log("update cart error", error);
    next(error);
    return;
  }
};

export const increment_decrement_cartProductService = async (
  body: any,
  cartId: any,
  userId: any,
  next: NextFunction
) => {
  try {
    const { id } = cartId;
    const { type, product_id } = body;

    const fetchProduct = await Product.createQueryBuilder("product")
      .where("product.id = :id", { id: product_id })
      .getOne();

    if (!fetchProduct) throw new NotFoundException("Product not found");

    const foundCartProduct = await Cart.createQueryBuilder()
      .select("cart")
      .from(Cart, "cart")
      .where("cart.user=:user", { user: userId })
      .andWhere("cart.id=:id", { id: id })
      .getOne();

    if (!foundCartProduct) {
      throw new NotFoundException("Product doesnot exist in the cart");
    }

    if (foundCartProduct && CartTypes.DELETE === type) {
      await Cart.createQueryBuilder("cart")
        .select("cart")
        .from(Cart, "cart")
        .softDelete()
        .where("cart.id =:id", {
          id: id,
        })
        .execute();

      return foundCartProduct;
    }
    if (foundCartProduct && CartTypes.INCREMENT === type) {
      foundCartProduct.quantity++;

      foundCartProduct.total_amount =
        foundCartProduct.quantity * fetchProduct.productCurrentPrice;

      await Cart.save(foundCartProduct);
      return foundCartProduct;
    }
    if (foundCartProduct && CartTypes.DECREMENT === type) {
      foundCartProduct.quantity--;

      foundCartProduct.total_amount =
        foundCartProduct.quantity * fetchProduct?.productCurrentPrice;
      await Cart.save(foundCartProduct);

      if (foundCartProduct.quantity === 0) {
        await Cart.createQueryBuilder("cart")
          .softDelete()
          .where("cart.quantity =:quantity", {
            quantity: 0,
          })
          .execute();
      }
      return foundCartProduct;
    }
    throw new HttpException(422, "Unable to update cart product", [
      { domain: "domain", message: "Unable to update cart product" },
    ]);
  } catch (error) {
    console.log("increment decrement error", error);
    next(error);
    return;
  }
};

export const getCartProductsService = async (
  userId: any,
  next: NextFunction
) => {
  try {
    const cartProducts = await Cart.createQueryBuilder("cart")
      .where("cart.user=:id", { id: userId })
      .leftJoinAndSelect("cart.product", "product")
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
      .orderBy("cart.created_At", "ASC")
      .getMany();

    if (!cartProducts.length) return cartProducts;
    return cartProducts;
  } catch (error) {
    console.log("cart found error", error);
    next(error);
    return;
  }
};

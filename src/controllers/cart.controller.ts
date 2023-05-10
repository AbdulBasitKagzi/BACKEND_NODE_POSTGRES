import express, { Response, Request } from "express";
import { Cart, CartTypes } from "../entities/Cart.entities";
import { Product } from "../entities/Product.entites";
import { ProductSize } from "../entities/product_size.entities";
import { Size } from "../entities/size.entities";
import { productColors } from "../entities/product_color.entities";
import { Color } from "../entities/Color.entities";

export const addProductToCart = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    // const { selectedColor, selectedSize } = req.body;

    const fetchProduct = await Product.createQueryBuilder("product")
      .where("product.id = :id", { id: req.body.id })
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

    // todo : need to find solution for the below query
    // const foundCartProduct = await Cart.find({
    //   where: {
    //     product: id,
    //     color: selectedColor,
    //     size: selectedSize,
    //   },
    //   take: 1,
    // });

    const foundCartProduct = await Cart.createQueryBuilder()
      .select("cart")
      .from(Cart, "cart")
      .where("cart.user=:user", { user: req.userId })
      .andWhere("cart.product=:product", { product: id })
      .andWhere("cart.color=:color", {
        color: req.body.selectedColor
          ? req.body.selectedColor
          : req.body.colors[0].id,
      })
      .andWhere("cart.size=:size", {
        size: req.body.selectedSize
          ? req.body.selectedSize
          : req.body.sizes[0].id,
      })
      .getOne();

    console.log("foundCartprod", foundCartProduct);

    if (foundCartProduct) {
      // const updatedCartProduct = await Cart.update(
      //   {
      //     product: id,
      //     //   quantity: parseInt(quantity),
      //     color: parseInt(selectedColor),
      //     size: parseInt(selectedSize),
      //   },
      //   { quantity: 10}
      // );
      // console.log("updated product", updatedCartProduct);

      foundCartProduct.quantity++;
      foundCartProduct.total_amount =
        foundCartProduct.quantity * foundCartProduct.total_amount;
      Cart.save(foundCartProduct);
      return res.status(200).json({ message: "Product added to cart." });
    }

    if (fetchProduct) {
      // if (!selectedColor) {
      //   const result = Cart.create({
      //     user: req.userId,
      //     product: parseInt(id),
      //     size: req.body.productColors[0],
      //     color: selectedColor,
      //     quantity: quantity,
      //     total_amount: +fetchProduct.productCurrentPrice * parseInt(quantity),
      //   });
      // }

      const result = Cart.create({
        user: req.userId,
        product: parseInt(id),

        color: req.body.selectedColor
          ? req.body.selectedColor
          : req.body.colors[0].id,

        size: req.body.selectedSize
          ? req.body.selectedSize
          : req.body.sizes[0].id,
        quantity: 1,
        total_amount: +fetchProduct.productCurrentPrice * 1,
      });
      await Cart.save(result);
      return res
        .status(200)
        .json({ message: "Product added to cart", data: { result } });
    }
    return res
      .status(200)
      .json({ error: 400, message: "Unable to add to cart" });
  } catch (error) {
    console.log("cart error", error);
    return res
      .status(500)
      .json({ error: { code: 500, message: "Internal server error" } });
  }
};

export const updateCartProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // const { selectedSize, selectedColor } = req.body;

    const foundCartProduct = await Cart.createQueryBuilder()
      .select("cart")
      .from(Cart, "cart")
      .where("cart.user=:user", { user: req.userId })
      .andWhere("cart.id=:id", { id: id })
      .getOne();

    if (foundCartProduct) {
      const updatedProduct = await Cart.update(
        {
          user: req.userId,
          id: parseInt(id),
        },
        { ...req.body }
      );
      return res
        .status(200)
        .json({ message: "Product updated.", data: { updatedProduct } });
    }
    return res
      .status(400)
      .json({ error: { code: 400, message: "Unable to update cart product" } });
  } catch (error) {
    console.log("update cart error", error);
    return res
      .status(500)
      .json({ error: { code: 500, message: "Internal server error" } });
  }
};

export const increment_decrement_cartProduct = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const { type, product_id } = req.body;

    const fetchProduct = await Product.createQueryBuilder("product")
      .where("product.id = :id", { id: product_id })
      .getOne();

    const foundCartProduct = await Cart.createQueryBuilder()
      .select("cart")
      .from(Cart, "cart")
      .where("cart.user=:user", { user: req.userId })
      .andWhere("cart.id=:id", { id: id })
      .getOne();

    if (!foundCartProduct)
      return res.status(404).json({
        error: {
          code: 404,
          message: "Cart not found",
        },
      });

    if (foundCartProduct && CartTypes.DELETE === type) {
      await Cart.createQueryBuilder("cart")
        .select("cart")
        .from(Cart, "cart")
        .softDelete()
        .where("cart.id =:id", {
          id: id,
        })
        .execute();

      return res.status(200).json({ message: " Product deleted from cart." });
    }
    if (foundCartProduct && CartTypes.INCREMENT === type) {
      foundCartProduct.quantity++;
      if (fetchProduct) {
        foundCartProduct.total_amount =
          foundCartProduct.quantity * fetchProduct.productCurrentPrice;
      }

      await Cart.save(foundCartProduct);
      return res.status(200).json({ message: "Quantity updated." });
    } else if (foundCartProduct && CartTypes.DECREMENT === type) {
      foundCartProduct.quantity--;
      if (fetchProduct) {
        foundCartProduct.total_amount =
          foundCartProduct.quantity * fetchProduct?.productCurrentPrice;
      }

      await Cart.save(foundCartProduct);

      if (foundCartProduct.quantity === 0) {
        await Cart.createQueryBuilder("cart")
          .softDelete()
          .where("cart.quantity =:quantity", {
            quantity: 0,
          })
          .execute();
      }
      return res.status(200).json({ message: "Quantity updated." });
    }
    return res
      .status(400)
      .json({ error: { code: 400, message: "Unable to update cart product" } });
  } catch (error) {
    console.log("increment decrement error", error);
    return res
      .status(500)
      .json({ error: { code: 500, message: "Internal server error" } });
  }
};

export const getCartProducts = async (req: Request, res: Response) => {
  try {
    // const cartProducts = await Cart.find({
    //   where: { user: { id: req.userId } },
    //   relations: {
    //     product: {
    //       productSizes: { size: true },
    //       productColors: { color: true },
    //     },
    //   },
    //   order: { created_At: "ASC" },
    // });

    const cartProducts = await Cart.createQueryBuilder("cart")
      .where("cart.user=:id", { id: req.userId })
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

    if (!cartProducts.length)
      return res.status(404).json({
        error: { code: 404, message: "Cart not found", data: cartProducts },
      });
    return res
      .status(200)
      .json({ message: "Cart found", data: { items: cartProducts } });
  } catch (error) {
    console.log("cart found error", error);
    return res
      .status(500)
      .json({ error: { code: 500, message: "Internal sever error  " } });
  }
};

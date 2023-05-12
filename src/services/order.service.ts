import { Cart } from "../entities/Cart.entities";
import { OrderDetails } from "../entities/OrderDetails";
import { OrderItems } from "../entities/OrderItems";
import NotFoundException from "../exceptions/NotFoundException";
import HttpException from "../exceptions/HttpException";
import { NextFunction } from "express";

export const createOrderService = async (
  body: any,
  userId: any,
  next: NextFunction
) => {
  try {
    const { shippingAddress } = body;
    let vat_tax = 64;
    let shippingCharge = 64;

    const foundCartProduct = await Cart.createQueryBuilder("cart")
      .leftJoinAndSelect("cart.product", "product")
      .where("cart.user = :userId", { userId: userId })
      .getMany();

    if (!foundCartProduct.length)
      throw new NotFoundException("Cannot place order");

    const total_amount = foundCartProduct.reduce((acc: number, curr: Cart) => {
      return acc + curr.total_amount;
    }, 0);

    if (!shippingAddress) throw new NotFoundException("Cannot place order");

    const orderDetail = OrderDetails.create({
      user: userId,
      shipping: shippingAddress,
      total_amount: total_amount + shippingCharge + vat_tax,
    });
    await OrderDetails.save(orderDetail);

    if (orderDetail) {
      foundCartProduct.map(async (product) => {
        const orderItem = OrderItems.create({
          quantity: product.quantity,
          size: product.size,
          color: product.color,
          product: product.product,
          orderDetail: orderDetail.id,
          amount: product.total_amount,
        });
        await OrderItems.save(orderItem);
      });
      const deleteCart = await Cart.createQueryBuilder("cart")
        .softDelete()
        .where("cart.user_id = :userId", { userId: userId })
        .execute();
      return { message: "Order placed" };
    }
    throw new HttpException(400, "Unable to place ordrer", [
      { domain: "server", message: "Unable to place order" },
    ]);
  } catch (error) {
    console.log(error);
    next(error);
    return;
  }
};

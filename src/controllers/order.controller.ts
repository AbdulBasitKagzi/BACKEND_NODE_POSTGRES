import { Request, Response } from "express";
import { OrderDetails } from "../entities/OrderDetails";
import { Cart } from "../entities/Cart.entities";
import { OrderItems } from "../entities/OrderItems";

export const createOrder = async (req: Request, res: Response) => {
  console.log("here", req.userId);
  try {
    let vat_tax = 64;
    let shippingCharge = 64;
    // const user_cart_products = await Cart.findOne({
    //   where: { user: req.userId },
    //   select: {
    //     id: true,
    //     quantity: true,
    //     size: true,
    //     color: true,
    //     created_At: true,
    //     updated_At: true,
    //   },
    // });
    // const user_cart_products = await Cart.find({
    // where:{}
    // });
    // const foundCartProduct = await Cart.createQueryBuilder()
    //   .select("DISTINCT cart")
    //   .from(Cart, "cart")
    //   .where("cart.user=:user", { user: 1 })
    //   .groupBy("cart.id")
    //   .getRawMany();

    // console.log({ foundCartProduct });

    const foundCartProduct = await Cart.createQueryBuilder("cart")
      .leftJoinAndSelect("cart.product", "product")
      .where("cart.user = :userId", { userId: req.userId })
      .getMany();

    const total_amount = foundCartProduct.reduce((acc: number, curr: Cart) => {
      return acc + curr.total_amount;
    }, 0);

    const { shippingAddress } = req.body;

    const orderDetail = OrderDetails.create({
      user: req.userId,
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
        .where("cart.user_id = :userId", { userId: req.userId })
        .execute();
      return res.status(200).json({ message: "Order Placed" });
    }
    return res
      .status(400)
      .json({ code: 400, message: "Unable to add orderDetails" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: { code: 500, message: "Internal server error" } });
  }
};

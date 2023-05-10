import { Request, Response } from "express";
import { LikeProducts } from "../entities/LikeProduct.entities";

export const addProductLike = async (req: Request, res: Response) => {
  try {
    const { product_id } = req.body;

    const likeProduct = await LikeProducts.createQueryBuilder("like_products")
      .where("like_products.user=:user", { user: req.userId })
      .andWhere("like_products.product=:product", { product: product_id })
      .getOne();

    if (likeProduct) {
      console.log("like", likeProduct);
      await LikeProducts.createQueryBuilder("like_products")
        .delete()
        .where("like_products.user_id=:user", { user: req.userId })
        .andWhere("like_products.product_id=:product", { product: product_id })
        .execute();
      return res.status(200).json({ message: "Like removed" });
    }

    const result = LikeProducts.create({
      user: req.userId,
      product: product_id,
    });
    await LikeProducts.save(result);
    return res.status(200).json({ message: "Like added", data: { result } });
  } catch (error) {
    console.log("like error", error);
    return res
      .status(500)
      .json({ error: { code: 500, message: "Internal server error" } });
  }
};

export const getLikeProduct = async (req: Request, res: Response) => {
  try {
    console.log("user", req.userId);
    const likedProducts = await LikeProducts.find({
      where: { user: { id: req.userId } },
      relations: { product: true },
    });
    if (!likedProducts.length)
      return res
        .status(404)
        .json({ error: { code: 404, message: "no liked products found" } });
    return res.status(200).json({
      message: "liked products found",
      data: { items: likedProducts },
    });
  } catch (error) {
    console.log("get like prod error", error);
    return res
      .status(500)
      .json({ error: { code: 500, message: "Internal sever error" } });
  }
};

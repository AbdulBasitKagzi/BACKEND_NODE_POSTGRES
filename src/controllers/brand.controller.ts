import { Request, Response, NextFunction } from "express";

import { Brand } from "../entities/Brand.entities";
import { addbrand } from "../services/brand.service";

export const addBrand = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await addbrand(req.body, next);

    return res.status(200).json({ message: "Brand added", data: { data } });
  } catch (error) {
    next(error);
    return;
  }
};

export const updateBrand = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const brand = await Brand.findOneBy({ id: parseInt(id) });

    if (!brand)
      return res
        .status(404)
        .json({ error: { code: 404, message: "Brand not found!!!" } });

    const { value, slug } = req.body;
    const updatedBrand = await Brand.update(
      { id: parseInt(id) },
      {
        value,
        slug,
      }
    );

    return res
      .status(200)
      .json({ message: "Brand updated!!!", date: { updatedBrand } });
  } catch (error) {
    return res
      .status(500)
      .json({ error: { code: 500, message: "Internal server error" } });
  }
};

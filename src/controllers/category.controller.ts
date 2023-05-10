import { Request, Response } from "express";

import { Category } from "../entities/Category.entities";

export const addCategory = async (req: Request, res: Response) => {
  try {
    const { value, slug } = req.body;

    const newCategory = Category.create({
      value,
      slug,
    });

    await Category.save(newCategory);

    return res
      .status(200)
      .json({ message: "Category added", data: { newCategory } });
  } catch (error) {
    console.log("error creating user", error);
    return res
      .status(500)
      .json({ error: { code: 500, message: "Internal server error" } });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const category = await Category.findOneBy({ id: parseInt(id) });

    if (!category)
      return res
        .status(404)
        .json({ error: { code: 404, message: "Category not found!!!" } });

    const { value, slug } = req.body;
    const updatedCategory = await Category.update(
      { id: parseInt(id) },
      {
        value,
        slug,
      }
    );
    return res
      .status(200)
      .json({ message: "Category updated!!!", data: { updatedCategory } });
  } catch (error) {
    return res
      .status(500)
      .json({ error: { code: 500, message: "Internal server error" } });
  }
};

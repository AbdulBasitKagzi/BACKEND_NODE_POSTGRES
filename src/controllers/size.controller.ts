import { Request, Response } from "express";

import { Size } from "../entities/size.entities";

export const addSize = async (req: Request, res: Response) => {
  try {
    const { value, slug } = req.body;

    const newSize = Size.create({
      value,
      slug,
    });

    await Size.save(newSize);

    return res.status(200).json({ message: "Size added", newSize });
  } catch (error) {
    console.log("error creating user", error);
    return res
      .status(500)
      .json({ error: { code: 500, message: "Internal server error" } });
  }
};

export const updateSize = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const size = await Size.findOneBy({ id: parseInt(id) });

    if (!size)
      return res
        .status(404)
        .json({ error: { code: 404, message: "Size not found" } });
    const { value, slug } = req.body;
    const updatedSize = await Size.update(
      { id: parseInt(id) },
      {
        value,
        slug,
      }
    );
    return res
      .status(200)
      .json({ message: "Size updated!!!", data: { updatedSize } });
  } catch (error) {
    return res
      .status(500)
      .json({ error: { code: 500, message: "Internal server error" } });
  }
};

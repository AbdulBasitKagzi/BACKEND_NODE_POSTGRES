import { Request, Response } from "express";

import { Color } from "../entities/Color.entities";

export const addColor = async (req: Request, res: Response) => {
  try {
    const { name, hax_value } = req.body;

    const newColor = Color.create({
      name,
      hax_value,
    });

    await Color.save(newColor);

    return res.status(200).json({ message: "Color added", data: { newColor } });
  } catch (error) {
    console.log("error adding color", error);
    return res
      .status(500)
      .json({ error: { code: 500, message: "Internal server error" } });
  }
};

export const updateColor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const color = await Color.findOneBy({ id: parseInt(id) });

    if (!color) return res.status(400).json({ message: "Color not found!!!" });

    const { name, hax_value } = req.body;
    const updatedColor = await Color.update(
      { id: parseInt(id) },
      {
        name,
        hax_value,
      }
    );
    return res.status(200).json({ message: "Color updated!!!", updatedColor });
  } catch (error) {
    return res
      .status(500)
      .json({ error: { code: 500, message: "Internal server error" } });
  }
};

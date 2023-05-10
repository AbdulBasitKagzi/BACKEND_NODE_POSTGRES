import { Request, Response } from "express";

import { Gender } from "../entities/Gender.entities";

export const addGender = async (req: Request, res: Response) => {
  try {
    const { value, slug } = req.body;

    const newGender = Gender.create({
      value,
      slug,
    });

    await Gender.save(newGender);

    return res
      .status(200)
      .json({ message: "Gender added", data: { newGender } });
  } catch (error) {
    return res
      .status(500)
      .json({ error: { code: 500, message: "Internal server error" } });
  }
};

export const updateGender = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const gender = await Gender.findOneBy({ id: parseInt(id) });

    if (!gender)
      return res
        .status(404)
        .json({ error: { code: 404, message: "Gender not found" } });

    const { value, slug } = req.body;
    const updatedGender = await Gender.update(
      { id: parseInt(id) },
      {
        value,
        slug,
      }
    );
    return res
      .status(200)
      .json({ message: "Gender updated!!!", data: { updatedGender } });
  } catch (error) {
    return res
      .status(500)
      .json({ error: { code: 500, message: "Internal server error" } });
  }
};

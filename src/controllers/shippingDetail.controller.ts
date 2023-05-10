import { Request, Response } from "express";
import { ShippingDetails } from "../entities/ShippingDetails.entities";

export const addShippingDetail = async (req: Request, res: Response) => {
  try {
    console.log("body", req.body);
    const {
      firstName,
      lastName,
      emailaddress,
      phoneNumber,
      city,
      address,
      zipCode,
      date,
      time,
    } = req.body;

    const addShippingDetail = ShippingDetails.create({
      user: req.userId,
      first_name: firstName,
      last_name: lastName,
      email: emailaddress,
      phone_number: phoneNumber,
      city: city,
      address: address,
      zip_code: zipCode,
      date: date,
      time: time,
    });

    await ShippingDetails.save(addShippingDetail);

    return res
      .status(200)
      .json({ message: "Shipping detail added.", data: { addShippingDetail } });
  } catch (error) {
    console.log("add shipping detail error", error);
    return res
      .status(500)
      .json({ error: { code: 500, message: "Internal server error" } });
  }
};

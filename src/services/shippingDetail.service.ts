import { NextFunction } from "express";
import { ShippingDetails } from "../entities/ShippingDetails.entities";

export const addShippingDetailService = async (
  body: any,
  userId: any,
  next: NextFunction
) => {
  try {
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
    } = body;

    const addShippingDetail = ShippingDetails.create({
      user: userId,
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
    return addShippingDetail;
  } catch (error) {
    console.log("add shipping detail error", error);
    next(error);
    return;
  }
};

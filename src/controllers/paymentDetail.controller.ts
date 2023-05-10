import { Request, Response } from "express";
import { PaymentDetail } from "../entities/userPaymentDetail.entities";

export const addPaymentDetail = async (req: Request, res: Response) => {
  try {
    const { cardName, cardNumber, expiration, cvv, radio_buttons } = req.body;

    const paymentDetail = PaymentDetail.create({
      User: req.userId,
      card_type: radio_buttons,
      card_holder_name: cardName,
      card_number: cardNumber,
      expiration: expiration,
      cvv: cvv,
    });

    await PaymentDetail.save(paymentDetail);

    return res
      .status(200)
      .json({ message: "Payment detail added.", data: { paymentDetail } });
  } catch (error) {
    console.log("add shipping detail error", error);
    return res
      .status(500)
      .json({ error: { code: 500, message: "Internal server error" } });
  }
};

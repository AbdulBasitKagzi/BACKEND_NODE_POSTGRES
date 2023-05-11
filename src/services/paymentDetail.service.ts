import { NextFunction } from "express";
import { PaymentDetail } from "../entities/userPaymentDetail.entities";

export const addPaymentDetailService = async (
  body: any,
  userId: any,
  next: NextFunction
) => {
  try {
    const { cardName, cardNumber, expiration, cvv, radio_buttons } = body;

    const paymentDetail = PaymentDetail.create({
      User: userId,
      card_type: radio_buttons,
      card_holder_name: cardName,
      card_number: cardNumber,
      expiration: expiration,
      cvv: cvv,
    });

    await PaymentDetail.save(paymentDetail);

    return paymentDetail;
  } catch (error) {
    console.log("add shipping detail error", error);
    next(error);
    return;
  }
};

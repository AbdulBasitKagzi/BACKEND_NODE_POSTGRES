import { NextFunction, Request, Response } from "express";

import { check, validationResult } from "express-validator";

export const validatePaymentDetail = [
  check("cardName", "Card holder name should not be empty")
    .trim()
    .not()
    .isEmpty(),
  check("cardNumber", "Please enter 16 digit card number").isLength({
    min: 16,
    max: 22,
  }),
  check("radio_buttons", "Please select card type").trim().not().isEmpty(),
  check("expiration", "Please enter valid expiration date").not().isEmpty(),
  check("cvv", "Please enter 3 digit cvv number")
    .isLength({
      min: 3,
      max: 3,
    })
    .isNumeric(),
  // .isEmpty(),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({
        error: {
          message: errors
            .array()
            .map((err) => {
              return err.msg;
            })
            .join(","),
        },
      });
    next();
    return;
  },
];

import { NextFunction, Request, Response } from "express";

const { check, validationResult } = require("express-validator");

export const validateShippingDetail = [
  check("firstName", "First name should not be empty").trim().not().isEmpty(),
  check("lastName", "Last name should not be empty").trim().not().isEmpty(),
  check("emailaddress", "Please enter valid email address").isEmail(),
  check("city", "City should not be empty").not().isEmpty(),

  check("phoneNumber", "Enter 10 digit phone number")
    .isMobilePhone()
    .withMessage("Enter valid phone number")
    .isLength({ min: 10, max: 10 }),
  check("address", "Address should not be empty").trim().not().isEmpty(),
  check("zipCode", "Please enter valid zip code")
    .isLength({ min: 6, max: 6 })
    .isNumeric(),
  check("date", "Enter valid date").isISO8601().toDate(),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({
        error: {
          message: {
            message: errors
              .array()
              .map(
                (err: {
                  type: string;
                  value: string;
                  msg: string;
                  path: string;
                  location: string;
                }) => {
                  return err.msg;
                }
              ),
            // .join(","),
          },
        },
      });
    next();
    return;
  },
];

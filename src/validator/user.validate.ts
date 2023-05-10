const { check, validationResult } = require("express-validator");
import { Request, Response, NextFunction } from "express";

exports.validateUser = [
  check("first_name")
    .trim()
    .not()
    .isEmpty()
    .withMessage("first name can not be empty!"),
  check("last_name")
    .trim()
    .not()
    .isEmpty()
    .withMessage("last name can not be empty!"),

  check("email", "Please enter valid email address").isEmail(),

  check("password", "Password should contain 6 characters").isLength({
    min: 6,
  }),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({
        error: {
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
            )
            .join(", "),
        },
      });
    next();
    return;
  },
];

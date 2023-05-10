const { check, validationResult } = require("express-validator");
import { Request, Response, NextFunction } from "express";

exports.validateColor = [
  check("name").trim().not().isEmpty().withMessage("value connot be empty!"),
  check("hax_value")
    .trim()
    .not()
    .isEmpty()
    .withMessage("hax value cannot be empty!"),

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

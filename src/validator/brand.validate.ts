const { check, validationResult } = require("express-validator");
import { Request, Response, NextFunction } from "express";

exports.validateBrand = [
  check("value").trim().not().isEmpty().withMessage("value connot be empty!"),
  check("slug").trim().not().isEmpty().withMessage("slug cannot be empty!"),

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

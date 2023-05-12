import { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";

export const validateUser = [
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
            .map((err) => {
              return err.msg;
            })
            .join(", "),
        },
      });
    next();
    return;
  },
];

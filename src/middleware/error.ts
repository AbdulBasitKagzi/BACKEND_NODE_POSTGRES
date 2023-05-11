import { NextFunction, Request, Response } from "express";
import HttpException from "../exceptions/HttpException";

const errorMiddleware = (
  error: HttpException,
  _request: Request,
  response: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _: NextFunction
) => {
  const status = error.code || 500;
  const message = error.message || "Something went wrong";

  // eslint-disable-next-line no-console
  console.log(error);

  response.status(status).send({
    error: {
      ...error,
      message,
    },
  });
};

export default errorMiddleware;

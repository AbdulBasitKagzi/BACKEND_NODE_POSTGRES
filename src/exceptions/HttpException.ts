class HttpException extends Error {
  public code: number;

  public errors: { domain: string; message: string }[];

  constructor(
    status: number,
    message: string,
    errors: { domain: string; message: string }[]
  ) {
    super(message);
    this.code = status;
    this.errors = errors;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default HttpException;

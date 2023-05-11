import HttpException from "./HttpException";

class NotFoundException extends HttpException {
  constructor(message: string) {
    console.log("test", message);
    super(404, message, [{ domain: "global", message }]);
  }
}

export default NotFoundException;

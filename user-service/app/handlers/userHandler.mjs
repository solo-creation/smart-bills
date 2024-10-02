import middy from "@middy/core";
import bodyParser from "@middy/http-json-body-parser";
import UserService from "../services/userService.mjs";
import {
  ErrorResponse,
  SuccessResponse,
  ValidationErrorResponse,
} from "../utils/response.mjs";
import UserValidator from "./validators/userValidator.mjs";

const service = new UserService();
const userValidator = new UserValidator();

export const SendOtpRequest = middy(async (event) => {
  const body = event.body;
  const schema = userValidator.SendOtpValidator();
  const { error, value } = schema.validate(body);
  if (error) {
    return ValidationErrorResponse(400, error);
  } else {
    const response = await service.SendOtopService(value);
    return response;
  }
}).use(bodyParser());

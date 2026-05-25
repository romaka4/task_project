import { ApiError } from "./ApiError";

export class BadRequest extends ApiError {
  constructor(message = 'BadRequest') {
    super(400, message);
  }
}
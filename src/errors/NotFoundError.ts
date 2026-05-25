import { ApiError } from "./ApiError";

export class NotFound extends ApiError {
  constructor(message = 'NotFound') {
    super(404, message);
  }
}
import { ApiError } from './ApiError';

export class Unauthorized extends ApiError {
  constructor(message = 'Unauthorized') {
    super(401, message);
  }
}

import { ApiError } from './ApiError';

export class Conflict extends ApiError {
  constructor(message = 'Conflict') {
    super(403, message);
  }
}
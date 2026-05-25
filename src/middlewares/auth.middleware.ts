import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Unauthorized } from '../errors/UnauthorizedError';


interface AuthRequest extends Request {
  user?: string | JwtPayload;
}

export const auth = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    const header = req.headers.authorization;
    
    if (!header || !header.startsWith('Bearer ')) {
      throw new Unauthorized('No token provided');
    }

    const token = header.split(' ')[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    );
    console.log('TOKEN OK:', decoded);

    req.user = decoded;

    next();
  } catch (error) {
    throw new Unauthorized('No token provided');
  }
};

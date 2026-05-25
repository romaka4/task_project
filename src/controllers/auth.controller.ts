import { Request, Response, NextFunction } from 'express';
import { authService } from '../services/auth.service';

// Задача:
// принять req
// вызвать сервис
// отдать res


interface RegisterBody {
  email: string;
  password: string;
}

interface LoginBody {
  email: string;
  password: string;
}

  
  export const register = async (
    req: Request<{}, {}, RegisterBody>,
    res: Response,
    next: NextFunction
  ) =>  {
    try { 
      const result = await authService.register(req.body);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  };

  export const login = async (
    req: Request<{}, {}, LoginBody>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      await authService.login(req.body);
    } catch (error) {
      next(error);
    }
  }


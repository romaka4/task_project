import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import env from '../config/env'
import { Unauthorized } from '../errors/UnauthorizedError';
import { BadRequest } from '../errors/BadRequestError';
import User from '../models/User';

// Задача:
// бизнес-логика
// работа с БД
// безопасность

interface RegisterDTO {
  email: string,
  password: string
}

interface LoginDTO {
  email: string,
  password: string
}

class AuthService {
  async register(data: RegisterDTO) {
    const { email, password } = data;
    const exists = await User.findOne({ email });
    if (exists) {
      throw new BadRequest('User already exists')
    }

    const hash = await bcrypt.hash(password, 10)

    const user = await User.create({
      email,
      password: hash
    });

    const token = jwt.sign({ userId: user._id }, 
      env.JWT_SECRET as string,
      { expiresIn: '120m' }
    );
    return {
      token,
      user: {
        id: user._id,
        email: user.email,
      },
    };
  }

  async login(data: LoginDTO) {
    const { email, password } = data;
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      throw new Unauthorized('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Unauthorized('Invalid credentials');
    }
    const token = jwt.sign({ userId: user._id }, 
      env.JWT_SECRET as string,
      { expiresIn: '45m' }
    );

    return {
      token,
      user: {
        id: user._id,
        email: user.email,
      },
    };
  }
}
export const authService = new AuthService();
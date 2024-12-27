import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtTokenService } from '../services/token-service-impl';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private jwt: JwtTokenService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
      throw new UnauthorizedException('Authorization header is missing');
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Token is missing');
    }

    try {
      const decoded = this.jwt.decode(token, 'secretKey');

      req.user = decoded;

      next(); 
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}

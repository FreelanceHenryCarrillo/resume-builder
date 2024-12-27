import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/User/domain/entities/user-entity';

@Injectable()
export class JwtTokenService {
  constructor(private readonly jwtService: JwtService) {}

  generateToken(user: { email: string; id?: number }): string {
    const payload = { email: user.email };
    return this.jwtService.sign(payload);
  }

  validateToken(token: string): any {
    return this.jwtService.verify(token);
  }

  decode(token: string, secretKey: string) {
    const decode = this.jwtService.decode(token);
    return decode;
  }
}

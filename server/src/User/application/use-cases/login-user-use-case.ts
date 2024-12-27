import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { UserRepository } from 'src/User/domain/interface/user-respository.interface';
import { JwtTokenService } from 'src/common/services/token-service-impl';
import * as bcrypt from 'bcryptjs';
import { IResultUser } from 'src/common/interfaces';

@Injectable()
export class LoginUserUseCase {
  constructor(
    @Inject('UserRepository') private userRepository: UserRepository,
    private readonly JwtTokenService: JwtTokenService,
  ) {}

  async execute(email: string, password: string): Promise<IResultUser> {
    const user = await this.userRepository.findByName(email);

    if (!user) {
      throw Error('User no exist in database!');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw Error('Password o email incorrect!');
    } else {
      const token = this.JwtTokenService.generateToken(user);
      return { token };
    }
  }
}

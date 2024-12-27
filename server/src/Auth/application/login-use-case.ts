import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { JwtTokenService } from 'src/common/services/token-service-impl';
import { AuthRepository } from '../infrastructure/repositories/resume-repository-impl';
import { IToken } from '../domain/interface/user-respository.interface';
import { SupabaseServiceService } from 'src/common/services/supabase-service.service';

import * as bcrypt from 'bcryptjs';
import { UserEntity } from 'src/User/domain/entities/user-entity';

@Injectable()
export class LoginAuthUseCase {
  constructor(
    @Inject('AuthRepository') private authRepository: AuthRepository,
    private readonly jwt: JwtTokenService,
    private readonly supabaseService: SupabaseServiceService,
  ) {}

  async execute(email: string, password: string) {
    const { data, error } = await this.supabaseService
      .getClient()
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !data) {
      throw new Error('Invalid email or password');
    }

    const isPasswordValid = await this.validatePassword(
      password,
      data.password,
    );

    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    const token = this.jwt.generateToken({
      email: data.email,
    });

    return token

  }

  async register(
    email: string,
    pass: string,
    confirmPassword: string,
    fullname: string,
  ): Promise<UserEntity> {
    const user = await this.authRepository.register(
      email,
      pass,
      confirmPassword,
      fullname,
    );

    return user;
  }

  private async validatePassword(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    const descryptPass = await bcrypt.compare(plainPassword, hashedPassword);
    return descryptPass;
  }
}

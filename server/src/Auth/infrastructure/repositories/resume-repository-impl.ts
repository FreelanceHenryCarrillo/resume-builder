import { Injectable } from '@nestjs/common';
import { SupabaseServiceService } from 'src/common/services/supabase-service.service';
import {
  AuthRepositoryImpls,
  IToken,
} from 'src/Auth/domain/interface/user-respository.interface';
import { JwtTokenService } from 'src/common/services/token-service-impl';
import { UserEntity } from 'src/User/domain/entities/user-entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthRepository implements AuthRepositoryImpls {
  private salt: number = 10;

  constructor(
    private readonly supabaseService: SupabaseServiceService,
    private jwt: JwtTokenService,
  ) {}

  async register(
    email: string,
    password: string,
    confirmPassword: string,
    fullname: string,
  ): Promise<UserEntity | null> {
    if (confirmPassword !== password) {
      throw new Error('password does not match');
    }

    const hashPassword = bcrypt.hashSync(password, this.salt);

    const { data, error } = await this.supabaseService
      .getClient()
      .from('users')
      .insert({
        email,
        password: hashPassword,
        name: fullname,
      })
      .select();

    const token = this.jwt.generateToken({ email });

    if (error) {
      throw new Error(error.message);
    }

    return data[0];
  }

  async login(email: string, password: string): Promise<IToken> {
    const { data, error } = await this.supabaseService
      .getClient()
      .from('users')
      .select('*')
      .eq('email', email);

    if (error) {
      throw new Error(error.message);
    }

    const token = this.jwt.generateToken(data[0]);
    return token as unknown as IToken;
  }
}

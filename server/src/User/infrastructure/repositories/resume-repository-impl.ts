import * as bcrypt from 'bcryptjs';
import {  Injectable } from '@nestjs/common';
import { SupabaseServiceService } from 'src/common/services/supabase-service.service';
import { UserEntity } from 'src/User/domain/entities/user-entity';
import { UserRepository } from 'src/User/domain/interface/user-respository.interface';

@Injectable()
export class UserSupabaseRepository implements UserRepository {
  private readonly Salt: number = 10;
  constructor(private readonly supabaseService: SupabaseServiceService) {}

  async findByName(email: string): Promise<UserEntity | null> {
    const { data, error } = await this.supabaseService
      .getClient()
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    return data;
  }

  async update(user: UserEntity): Promise<UserEntity> {
    const { data, error } = await this.supabaseService
      .getClient()
      .from('users')
      .update({
        name: user.name,
        email: user.email,
        password: user.password,
      })
      .eq('name', user.name);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  async save(user: UserEntity): Promise<UserEntity> {
    const hashedPassword = await bcrypt.hash(user.password, this.Salt);
    user.password = hashedPassword;

    const { data, error: insertError } = await this.supabaseService
      .getClient()
      .from('users')
      .insert([user])
      .select();

    if (insertError) {
      throw new Error(insertError.message);
    }

    return data[0];
  }
}
